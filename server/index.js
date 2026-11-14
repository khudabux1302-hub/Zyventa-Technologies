// server/index.js
console.log('index.js is starting...');
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');

const app = express();
app.set('trust proxy', 1);
app.use(cors()); // lets your website call this server
app.use(express.json({ limit: '50kb' }));

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: String(process.env.DB_PASSWORD || '1234'),
  database: process.env.DB_NAME,
  connectionTimeoutMillis: 8000, // stop waiting after 8 seconds and show the error
});

const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
});

const AUTO_APPROVE = process.env.AUTO_APPROVE !== 'false'; // reviews show right away
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isText = (value, max = 5000) =>
  typeof value === 'string' && value.trim().length > 0 && value.length <= max;

// stops one visitor from sending too many requests
const hits = new Map();
function limit(maxPerHour) {
  return (req, res, next) => {
    const id = `${req.path}:${req.ip}`;
    const now = Date.now();
    const recent = (hits.get(id) || []).filter((t) => now - t < 60 * 60 * 1000);
    if (recent.length >= maxPerHour) {
      return res
        .status(429)
        .json({ success: false, message: 'Too many requests. Please try again later.' });
    }
    recent.push(now);
    hits.set(id, recent);
    next();
  };
}

// quick check: open http://localhost:3000 in a browser
app.get('/', (req, res) => res.send('Zyventa server is running'));

// contact form: sends an email to aimanali.bnip@gmail.com
app.post('/api/contact', limit(10), async (req, res) => {
  const { name, email, company, message } = req.body || {};
  if (![name, company, message].every((v) => isText(v)) || !EMAIL.test(String(email))) {
    return res
      .status(400)
      .json({ success: false, message: 'Please fill in all fields with a valid email.' });
  }

  try {
    await mailer.sendMail({
      from: `"Zyventa website" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email, // pressing Reply answers the visitor directly
      subject: `New message from ${name.trim()} (${company.trim()})`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`,
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error.message);
    res.status(500).json({ success: false, message: 'Could not send the email.' });
  }
});

// review form: stores the review in PostgreSQL
app.post('/api/reviews', limit(5), async (req, res) => {
  const { name, role = '', rating, text, gmail = '' } = req.body || {};
  const stars = Number(rating);

  if (!isText(name, 100) || !isText(text, 2000) || !Number.isInteger(stars) || stars < 1 || stars > 5) {
    return res
      .status(400)
      .json({ success: false, message: 'Please add your name, a star rating, and your review.' });
  }

  try {
    await pool.query(
      'INSERT INTO reviews (name, role, rating, text, gmail, approved) VALUES ($1, $2, $3, $4, $5, $6)',
      
      [
        name.trim(),
        String(role).trim().slice(0, 150),
        stars,
        text.trim(),
        String(gmail).trim().slice(0, 150),
        AUTO_APPROVE,
      ]
    );
        console.log('Review saved from', name.trim())
    ;

    // tell Aiman a new review arrived (not important if this fails)
    mailer
      .sendMail({
        from: `"Zyventa website" <${process.env.GMAIL_USER}>`,
        to: process.env.CONTACT_TO,
        subject: `New review from ${name.trim()}`,
        text: `${stars}/5\n\n${text}\n\n${name} - ${role}\n\nApprove it in the database to show it on the website.`,
      })
      .catch(() => {});

    res.json({ success: true });
  } catch (error) {
    console.error('Review error:', error.message);
    res.status(500).json({ success: false, message: 'Could not save your review.' });
  }
});

// the home page reads the newest approved reviews (never the Gmail)
app.get('/api/reviews', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT name, role, rating, text FROM reviews WHERE approved = true ORDER BY created_at DESC LIMIT 10'
    );
    res.json(rows);
  } catch (error) {
    console.error('Read error:', error.message);
    res.status(500).json([]);
  }
});

async function setup() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT '',
      rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
      text TEXT NOT NULL,
      gmail TEXT NOT NULL DEFAULT '',
      approved BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
}

const PORT = process.env.PORT || 3000;

// 1) start listening right away, so you can see the server is alive
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Using database:', process.env.DB_NAME);
  console.log('Connecting to the database...');
});

// 2) then connect to the database and say clearly if it worked
setup()
  .then(() => console.log('Database connected. The reviews table is ready.'))
  .catch((error) => console.error('DATABASE PROBLEM:', error.message));

// checks the Gmail login when the server starts
mailer
  .verify()
  .then(() => console.log('Email is ready to send.'))
  .catch((error) => console.error('EMAIL PROBLEM:', error.message));