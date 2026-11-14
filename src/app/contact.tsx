// src/app/contact.tsx
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { TextInputProps } from 'react-native';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Footer from '../components/footer';
import { API_URL } from '../constants/api';
import { colors } from '../themes/colors';
type IconName = ComponentProps<typeof Ionicons>['name'];
type Status = 'idle' | 'sending' | 'done' | 'error';

// The access key decides which inbox receives the messages.
// Get it at web3forms.com by registering aimanali.bnip@gmail.com (see the steps below).
const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

const CONTACT = {
  name: 'Ms. Aiman Naeem',
  role: 'Founder & Principal Consultant',
  email: 'aimanali.bnip@gmail.com',
  phone: '+00 000 0000000', // replace with the real phone number
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({ label, ...props }: { label: string } & TextInputProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.muted}
        style={[styles.input, props.multiline && styles.inputMultiline]}
        {...props}
      />
    </View>
  );
}

function DetailRow({
  icon,
  label,
  value,
  url,
}: {
  icon: IconName;
  label: string;
  value: string;
  url: string;
}) {
  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      style={styles.detailRow}
      accessibilityLabel={`${label}: ${value}`}
    >
      <View style={styles.detailIcon}>
        <Ionicons name={icon} size={22} color={colors.primary} />
      </View>
      <View style={styles.detailText}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </Pressable>
  );
}

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const send = async () => {
    if (!name.trim() || !company.trim() || !message.trim()) {
      setStatus('error');
      setError('Please fill in your name, company and message.');
      return;
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus('error');
      setError('Please enter a valid email address.');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          message: message.trim(),
        }),
      });
      const data = await response.json();

      if (data.success) {
        setStatus('done');
      } else {
        setStatus('error');
        setError(data.message || 'Sorry, your message could not be sent. Please try again.');
      }
    } catch {
      setStatus('error');
      setError('Could not reach the server. Please try again later.');
    }
  };

  const reset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setStatus('idle');
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.subtitle}>
        Have a project or an idea in mind? Send us a message and we will get back
        to you.
      </Text>

      <View style={styles.split}>
        {/* Part 1: contact details */}
        <View style={styles.infoPanel}>
          <Text style={styles.infoTitle}>Get in touch</Text>

          <View style={styles.person}>
            <Text style={styles.personName}>{CONTACT.name}</Text>
            <Text style={styles.personRole}>{CONTACT.role}</Text>
          </View>

          <DetailRow
            icon="mail"
            label="Email"
            value={CONTACT.email}
            url={`mailto:${CONTACT.email}`}
          />
          <DetailRow
            icon="call"
            label="Phone"
            value={CONTACT.phone}
            url={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
          />
        </View>

        {/* Part 2: message form */}
        <View style={styles.formPanel}>
          {status === 'done' ? (
            <View style={styles.thanks}>
              <Ionicons name="checkmark-circle" size={64} color={colors.primary} />
              <Text style={styles.thanksTitle}>Message sent</Text>
              <Text style={styles.thanksText}>
                Thank you for reaching out. We will reply to you by email soon.
              </Text>
              <Pressable onPress={reset} style={styles.againButton}>
                <Text style={styles.againText}>Send another message</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.form}>
              <Text style={styles.formTitle}>Send us a message</Text>

              <Field
                label="Your name"
                value={name}
                onChangeText={setName}
                placeholder="Full name"
              />
              <Field
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Field
                label="Company"
                value={company}
                onChangeText={setCompany}
                placeholder="Your company name"
              />
              <Field
                label="Message"
                value={message}
                onChangeText={setMessage}
                placeholder="How can we help you?"
                multiline
              />

              {status === 'error' ? <Text style={styles.error}>{error}</Text> : null}

              <Pressable
                onPress={send}
                disabled={status === 'sending'}
                style={[styles.button, status === 'sending' && styles.buttonDisabled]}
              >
                <Text style={styles.buttonText}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 80,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.dark,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 14,
    maxWidth: 640,
    fontSize: 18,
    lineHeight: 28,
    color: colors.accent,
    textAlign: 'center',
  },

  split: {
    width: '100%',
    maxWidth: 1100,
    marginTop: 56,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },

  // part 1: details
  infoPanel: {
    flexGrow: 1,
    flexBasis: 320,
    backgroundColor: colors.primary,
    borderRadius: 28,
    padding: 36,
    gap: 24,
  },
  infoTitle: { fontSize: 30, fontWeight: '800', color: colors.textOnDark },
  person: { gap: 4 },
  personName: { fontSize: 20, fontWeight: '700', color: colors.textOnDark },
  personRole: { fontSize: 16, color: colors.textOnDark },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  detailIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.textOnDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: { flex: 1 },
  detailLabel: { fontSize: 13, fontWeight: '600', color: colors.textOnDark },
  detailValue: { fontSize: 17, fontWeight: '700', color: colors.textOnDark },

  // part 2: form
  formPanel: {
    flexGrow: 2,
    flexBasis: 420,
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 36,
    justifyContent: 'center',
  },
  form: { gap: 20 },
  formTitle: { fontSize: 26, fontWeight: '800', color: colors.dark },
  field: { gap: 8 },
  fieldLabel: { fontSize: 15, fontWeight: '700', color: colors.dark },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: 'rgba(139, 94, 60, 0.3)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.dark,
  },
  inputMultiline: { minHeight: 140, textAlignVertical: 'top' },
  error: { fontSize: 15, color: '#9B2C2C' },
  button: {
    backgroundColor: colors.dark,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: colors.textOnDark, fontSize: 16, fontWeight: '700' },

  thanks: { alignItems: 'center', gap: 12, paddingVertical: 24 },
  thanksTitle: { fontSize: 28, fontWeight: '800', color: colors.dark },
  thanksText: {
    maxWidth: 360,
    fontSize: 16,
    lineHeight: 25,
    color: colors.accent,
    textAlign: 'center',
  },
  againButton: {
    marginTop: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  againText: { color: colors.primary, fontSize: 15, fontWeight: '700' },
});