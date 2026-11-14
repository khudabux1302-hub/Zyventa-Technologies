// src/app/services.tsx
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Footer from '../components/footer';
import { colors } from '../themes/colors';

type IconName = ComponentProps<typeof Ionicons>['name'];
type Service = {
  icon: IconName;
  title: string;
  description: string;
  items: string[];
};

const SERVICES: Service[] = [
  {
    icon: 'bar-chart',
    title: 'Business Intelligence & Analytics',
    description:
      'Turn raw data into executive clarity with dashboards and reports that drive decisions.',
    items: [
      'Power BI Dashboards',
      'Executive Reporting',
      'KPI Monitoring',
      'SQL Analytics',
      'Data Visualization',
    ],
  },
  {
    icon: 'hardware-chip',
    title: 'AI & Automation',
    description:
      'Deploy intelligent AI systems that learn, predict, and automate your most complex challenges.',
    items: [
      'AI Assistants',
      'OCR Systems',
      'Process Automation',
      'AI Recruitment',
      'AI Meeting Intelligence',
    ],
  },
  {
    icon: 'eye',
    title: 'Computer Vision',
    description:
      "See what humans can't at scale — real-time detection, recognition, and monitoring.",
    items: [
      'AI Proctoring',
      'Object Detection',
      'Facial Recognition',
      'Monitoring Systems',
      'Real-Time Alerting',
    ],
  },
  {
    icon: 'globe',
    title: 'Web Development',
    description:
      'Scalable, secure, and blazing fast web applications built on modern tech stacks.',
    items: [
      'Business Websites',
      'Corporate Portals',
      'SaaS Platforms',
      'React Applications',
      'API Integrations',
    ],
  },
  {
    icon: 'phone-portrait',
    title: 'Mobile App Development',
    description:
      'Native and cross-platform mobile experiences that connect you with users anywhere.',
    items: ['Android Apps', 'Business Apps', 'Internal Tools', 'Dashboard Apps'],
  },
  {
    icon: 'construct',
    title: 'Custom Software',
    description:
      'Bespoke software systems designed precisely around your unique business workflows.',
    items: [
      'Enterprise Systems',
      'CRM Platforms',
      'Internal Tools',
      'Workflow Systems',
    ],
  },
];

function ServiceCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      style={styles.cell}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
    >
      <View style={[styles.card, hovered && styles.cardHovered]}>
        <View style={styles.iconBox}>
          <Ionicons name={service.icon} size={26} color={colors.primary} />
        </View>

        <Text style={styles.cardTitle}>{service.title}</Text>
        <Text style={styles.cardDesc}>{service.description}</Text>

        <View style={styles.list}>
          {service.items.map((item) => (
            <View key={item} style={styles.row}>
              <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
              <Text style={styles.item}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}
type Engagement = {
  icon: IconName;
  title: string;
  tag: string;
  description: string;
};

const ENGAGEMENTS: Engagement[] = [
  {
    icon: 'cash',
    title: 'Fixed Price Projects',
    tag: 'IDEAL FOR: Dashboard Development, Power BI, Automation',
    description:
      'Clear budget, defined milestones, predictable delivery. Ideal for projects with a defined scope and timeline.',
  },
  {
    icon: 'sync',
    title: 'Monthly Retainer',
    tag: 'IDEAL FOR: Growing businesses, ongoing automation',
    description:
      'Dedicated support, continuous improvement, strategic partnership. For ongoing analytics and development support.',
  },
  {
    icon: 'bulb',
    title: 'Consultancy & Strategy',
    tag: 'IDEAL FOR: Digital transformation, data architecture',
    description:
      'Expert guidance, risk reduction, long-term planning. High-level advisory for AI adoption and tech roadmaps.',
  },
];

function EngagementCard({ item }: { item: Engagement }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      style={styles.cell}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
    >
      <View style={[styles.card, hovered && styles.cardHovered]}>
        <View style={styles.iconBox}>
          <Ionicons name={item.icon} size={26} color={colors.primary} />
        </View>

        <Text style={styles.cardTitle}>{item.title}</Text>

        <View style={styles.tagPill}>
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>

        <Text style={styles.cardDesc}>{item.description}</Text>
      </View>
    </Pressable>
  );
}
export default function ServicesScreen() {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Our Services</Text>
      <Text style={styles.subtitle}>
        Comprehensive analytics, intelligent automation, and bespoke software
        solutions.
      </Text>

            <View style={styles.grid}>
        {SERVICES.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Engagement Models</Text>

      <View style={[styles.grid, { marginTop: 40 }]}>
        {ENGAGEMENTS.map((item) => (
          <EngagementCard key={item.title} item={item} />
        ))}
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  title: {
    fontSize: 37,
    fontWeight: '800',
    color: colors.dark,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 14,
    maxWidth: 700,
    fontSize: 18,
    lineHeight: 28,
    color: colors.accent,
    textAlign: 'center',
  },
  grid: {
    width: '100%',
    maxWidth: 1100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 56,
  },

  cell: { flexGrow: 1, flexBasis: 300 },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(139, 94, 60, 0.18)',
  },
  cardHovered: {
    borderColor: colors.primary,
    transform: [{ translateY: -4 }],
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 94, 60, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardTitle: { fontSize: 20, fontWeight: '700', color: colors.dark },
  cardDesc: { marginTop: 10, fontSize: 15, lineHeight: 23, color: colors.accent },
  list: { marginTop: 18, gap: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  item: { fontSize: 14, color: colors.dark },
    sectionTitle: {
    marginTop: 96,
    fontSize: 32,
    fontWeight: '800',
    color: colors.dark,
    textAlign: 'center',
  },
  tagPill: {
    alignSelf: 'flex-start',
    marginTop: 12,
    backgroundColor: 'rgba(139, 94, 60, 0.15)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.accent,
  },
});