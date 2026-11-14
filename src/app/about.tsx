// src/app/about.tsx
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Footer from '../components/footer';
import { colors } from '../themes/colors';

type IconName = ComponentProps<typeof Ionicons>['name'];

const REASONS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'layers',
    title: 'Analytics + Automation + AI',
    text: 'A rare triple-stack of expertise — not siloed tools, but an integrated capability that compounds across your organization.',
  },
  {
    icon: 'git-network',
    title: 'End-to-End Solutions',
    text: 'From data strategy and infrastructure to dashboards, automations, and AI models — we own the full lifecycle.',
  },
  {
    icon: 'trending-up',
    title: 'Business-Focused Approach',
    text: "Every solution maps to a business outcome. We don't deliver technology; we deliver results your stakeholders can measure.",
  },
  {
    icon: 'construct',
    title: 'Custom Development',
    text: 'No templates, no off-the-shelf compromises. Every build is architected for your data, your workflows, and your team.',
  },
  {
    icon: 'shield-checkmark',
    title: 'Enterprise-Level Quality',
    text: 'Production-grade code, robust testing, and documentation that ensures your systems run reliably at scale.',
  },
  {
    icon: 'headset',
    title: 'Ongoing Support',
    text: "We don't disappear after delivery. Our clients get continuous optimization, updates, and a team that grows with them.",
  },
];

const CREDENTIALS = [
  'MPhil Computer Science',
  'CS Lecturer',
  'Data Analytics Consultant',
  'AI Solutions Architect',
];
function ReasonCard({ reason }: { reason: (typeof REASONS)[number] }) {
  return (
    <View style={styles.reasonCard}>
      <Ionicons name={reason.icon} size={32} color={colors.primary} />
      <Text style={styles.reasonTitle}>{reason.title}</Text>
      <Text style={styles.reasonText}>{reason.text}</Text>
    </View>
  );
}
export default function AboutScreen() {
  const { width } = useWindowDimensions();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // the first render is always the wide layout, so server and browser match
  const isWide = !mounted || width >= 900;

  // arched top corners for the photo frame
  const archRadius = isWide ? 190 : 140;
  const arch = {
    borderTopLeftRadius: archRadius,
    borderTopRightRadius: archRadius,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      {/* Why Zyventa Technologies */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Why Zyventa Technologies</Text>

        <View style={[styles.intro, isWide && styles.introWide]}>
          <Text
            style={[
              styles.statement,
              { fontSize: isWide ? 56 : 36, lineHeight: isWide ? 64 : 44 },
              isWide && { flex: 1 },
            ]}
          >
            Built Different. Proven.
          </Text>
          <Text style={[styles.lead, isWide && styles.leadWide]}>
            Here is what separates us from every other analytics vendor you have
            ever considered.
          </Text>
        </View>

                <View style={styles.reasons}>
          {REASONS.map((reason) => (
            <ReasonCard key={reason.title} reason={reason} />
          ))}
        </View>
      </View>

      {/* Meet the founder */}
      <View style={[styles.founder, isWide && styles.founderWide]}>
        <View
          style={[
            styles.photoWrap,
            isWide ? styles.photoWrapWide : styles.photoWrapCompact,
          ]}
        >
          <View style={[styles.photoBlock, arch]} />
          <View style={[StyleSheet.absoluteFill, styles.photoFrame, arch]}>
            <Image
              source={require('../../assets/images/founder.jpg')}
              style={styles.photo}
              resizeMode="cover"
              accessibilityLabel="Aiman Naeem, founder of Zyventa Technologies"
            />
          </View>
        </View>

        <View style={isWide ? styles.founderText : undefined}>
          <Text style={styles.sectionLabel}>Meet the founder</Text>
          <Text
            style={[
              styles.name,
              { fontSize: isWide ? 48 : 36, lineHeight: isWide ? 56 : 44 },
            ]}
          >
            Aiman Naeem
          </Text>
          <Text style={styles.role}>Founder & Principal Consultant</Text>
          <Text style={styles.roleSub}>
            Data Analytics Consultant and Lecturer in Computer Science
          </Text>

          <View style={styles.credentials}>
            {CREDENTIALS.map((item) => (
              <View key={item} style={styles.credential}>
                <Text style={styles.credentialText}>{item}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.bio}>
            With a strong foundation in academic computer science and years of
            enterprise consulting experience, Aiman built Zyventa Technologies to
            bridge the gap between cutting-edge technology and real-world
            business challenges.
          </Text>

          <View style={styles.mission}>
            <Text style={styles.missionText}>
              Our mission is to help organizations harness their data through AI,
              automation, and advanced business intelligence to make
              precision-driven decisions.
            </Text>
          </View>
        </View>
      </View>

      {/* Closing call to action */}
      <View style={styles.cta}>
        <Text
          style={[
            styles.ctaTitle,
            { fontSize: isWide ? 32 : 24, lineHeight: isWide ? 40 : 32 },
          ]}
        >
          Ready to turn your data into decisions?
        </Text>
        <Link href="/contact" asChild>
          <Pressable style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Book Free Consultation</Text>
          </Pressable>
        </Link>
      </View>
      <Footer />
    </ScrollView>
  );
}

const LINE = 'rgba(139, 94, 60, 0.28)';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 80,
  },
  section: { width: '100%', maxWidth: 1100 },
  sectionLabel: { fontSize: 16, fontWeight: '700', color: colors.primary },

  // why section
  intro: { marginTop: 16, gap: 20 },
  introWide: { flexDirection: 'row', alignItems: 'flex-end', gap: 48 },
  statement: { fontWeight: '800', color: colors.dark },
  lead: { fontSize: 18, lineHeight: 28, color: colors.accent },
  leadWide: { width: 380 },
  reason: {
    paddingVertical: 28,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  reasonWide: { flexDirection: 'row', alignItems: 'flex-start', gap: 48 },
  reasonTitleWide: { width: 340 },

  // founder
  founder: { width: '100%', maxWidth: 1100, marginTop: 140 },
  founderWide: { flexDirection: 'row', alignItems: 'center', gap: 72 },
  founderText: { flex: 1 },
  photoWrap: { position: 'relative' },
  photoWrapWide: { width: 380, aspectRatio: 0.85, marginRight: 16 },
  photoWrapCompact: {
    width: 280,
    aspectRatio: 0.85,
    alignSelf: 'center',
    marginBottom: 56,
  },
  photoBlock: {
    position: 'absolute',
    top: -2,
    left: -3,
    right: -3,
    bottom: -2,
    backgroundColor: colors.primary,
  },
  photoFrame: { overflow: 'hidden', backgroundColor: colors.surface },
  photo: { width: '100%', height: '100%' },
  name: { marginTop: 12, fontWeight: '800', color: colors.dark },
  role: { marginTop: 8, fontSize: 20, fontWeight: '700', color: colors.accent },
  roleSub: { marginTop: 4, fontSize: 17, color: colors.accent },
  credentials: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 24 },
  credential: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 14,
  },
  credentialText: { fontSize: 14, fontWeight: '600', color: colors.primary },
  bio: { marginTop: 28, fontSize: 17, lineHeight: 28, color: colors.dark },
  mission: {
    marginTop: 28,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    paddingLeft: 20,
  },
  missionText: {
    fontSize: 18,
    lineHeight: 29,
    fontStyle: 'italic',
    color: colors.accent,
  },

  // closing call to action
  cta: {
    width: '100%',
    maxWidth: 1100,
    marginTop: 140,
    backgroundColor: colors.surface,
    borderRadius: 32,
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 24,
  },
  ctaTitle: { fontWeight: '800', color: colors.dark, textAlign: 'center' },
  ctaButton: {
    backgroundColor: colors.dark,
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  ctaButtonText: { color: colors.textOnDark, fontSize: 16, fontWeight: '600' },
    reasons: { marginTop: 56, flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  reasonCell: { flexGrow: 1, flexBasis: 300 },
  reasonCard: {
    flexGrow: 1,
    flexBasis: 300,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderTopWidth: 5,
    borderTopColor: colors.primary,
    padding: 28,
    gap: 12,
  },
  reasonCardHovered: {
    backgroundColor: '#EFE3CF',
    transform: [{ translateY: -4 }],
  },
  reasonTitle: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
    color: colors.dark,
  },
  reasonText: { fontSize: 16, lineHeight: 25, color: colors.accent },
});