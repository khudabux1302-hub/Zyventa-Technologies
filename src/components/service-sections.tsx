// src/components/services-section.tsx
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../themes/colors';
import CardStack from './stack-cards'; // use your own file name here, for example './stack-cards'

export default function ServicesSection({ compact }: { compact: boolean }) {
  return (
    <View style={styles.section}>
      <View style={compact ? styles.splitCompact : styles.split}>
        <View style={compact ? undefined : styles.textCol}>
          <Text style={styles.eyebrow}>OUR SERVICES</Text>
          <Text
            style={[
              styles.subtitle,
              { fontSize: compact ? 28 : 42, lineHeight: compact ? 38 : 54 },
            ]}
          >
            Comprehensive analytics, intelligent automation, and bespoke
            software solutions.
          </Text>
        </View>

        <CardStack compact={compact} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { width: '100%', maxWidth: 1100, marginTop: 96,marginBottom:50},
  split: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 48,
  },
  splitCompact: { flexDirection: 'column', gap: 40 },
  textCol: { flex: 1 },
  eyebrow: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    color: colors.primary,
  },
  subtitle: { marginTop: 14, fontWeight: '700', color: colors.dark },
});