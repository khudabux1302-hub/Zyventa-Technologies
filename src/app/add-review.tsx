// src/app/add-review.tsx
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import type { TextInputProps } from 'react-native';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { API_URL } from '../constants/api';
import { colors } from '../themes/colors';

type Status = 'idle' | 'sending' | 'done' | 'error';

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

export default function AddReviewScreen() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [gmail, setGmail] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const submit = async () => {
    if (!name.trim() || !text.trim() || rating === 0) {
      setStatus('error');
      setMessage('Please add your name, a star rating, and your review.');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim(),
          rating,
          gmail: gmail.trim(),
          text: text.trim(),
        }),
      });
      const data = await response.json();

      if (data.success) {
        setStatus('done');
      } else {
        setStatus('error');
        setMessage(data.message || 'Sorry, we could not save your review. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Could not reach the server. Please try again later.');
    }
  };

  if (status === 'done') {
    return (
      <View style={styles.center}>
        <Ionicons name="checkmark-circle" size={64} color={colors.primary} />
        <Text style={styles.thanksTitle}>Thank you!</Text>
        <Text style={styles.subtitle}>Your review has been received.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Share Your Experience</Text>
      <Text style={styles.subtitle}>
        Tell us about working with Zyventa Technologies. It only takes a minute.
      </Text>

      <View style={styles.form}>
        <Field label="Your name" value={name} onChangeText={setName} placeholder="Full name" />

        <Field
          label="Job title and company"
          value={role}
          onChangeText={setRole}
          placeholder="For example: Operations Manager, ABC Company"
        />

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Rating</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Pressable
                key={n}
                onPress={() => setRating(n)}
                accessibilityLabel={`${n} star${n > 1 ? 's' : ''}`}
              >
                <Ionicons
                  name={n <= rating ? 'star' : 'star-outline'}
                  size={36}
                  color={colors.primary}
                />
              </Pressable>
            ))}
          </View>
        </View>

        <Field
          label="Gmail"
          value={gmail}
          onChangeText={setGmail}
          placeholder="xyz@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Field
          label="Your review"
          value={text}
          onChangeText={setText}
          placeholder="What was it like working with us?"
          multiline
        />

        {status === 'error' ? <Text style={styles.error}>{message}</Text> : null}

        <Pressable
          onPress={submit}
          disabled={status === 'sending'}
          style={[styles.button, status === 'sending' && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>
            {status === 'sending' ? 'Sending...' : 'Submit Review'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 80,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  thanksTitle: { fontSize: 32, fontWeight: '800', color: colors.dark },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.dark,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 12,
    maxWidth: 520,
    fontSize: 17,
    lineHeight: 26,
    color: colors.accent,
    textAlign: 'center',
  },
  form: { width: '100%', maxWidth: 560, marginTop: 40, gap: 20 },
  field: { gap: 8 },
  fieldLabel: { fontSize: 15, fontWeight: '700', color: colors.dark },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(139, 94, 60, 0.3)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.dark,
  },
  inputMultiline: { minHeight: 140, textAlignVertical: 'top' },
  stars: { flexDirection: 'row', gap: 6 },
  error: { fontSize: 15, color: '#9B2C2C' },
  button: {
    backgroundColor: colors.dark,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: colors.textOnDark, fontSize: 16, fontWeight: '700' },
});