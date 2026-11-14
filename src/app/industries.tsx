// src/app/industries.tsx
import Footer from '@/components/footer';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { colors } from '../themes/colors';


type IconName = ComponentProps<typeof Ionicons>['name'];
type Project = { title: string; slug: string };
type Industry = {
  icon: IconName;
  name: string;
  description: string;
  services: string[];
  projects: Project[];
};

// all project links start with this, so you only change it in one place
const BASE =
  'https://f3cb90c2-1a20-4af1-8712-cb6aca9a342a-00-37i0lbnh1zx82.worf.replit.dev/case-studies/';

const INDUSTRIES: Industry[] = [
  {
    icon: 'school',
    name: 'Education',
    description:
      'From attendance analytics to AI-powered exam proctoring, we help educational institutions make every decision data-driven.',
    services: [
      'AI Proctoring',
      'Student Analytics',
      'Attendance Automation',
      'Performance Dashboards',
    ],
    projects: [
      { title: 'AI Smart Examination Proctoring System', slug: 'ai-proctoring' },
      { title: 'Education Analytics Dashboard', slug: 'education-analytics' },
    ],
  },
  {
    icon: 'medkit',
    name: 'Healthcare',
    description:
      'Intelligent healthcare solutions from patient analytics to AI-powered diagnostic assistants.',
    services: [
      'AI Healthcare Assistants',
      'Patient Analytics',
      'Appointment Systems',
      'Health Dashboards',
    ],
    projects: [{ title: 'Cura AI Healthcare Assistant', slug: 'cura-ai' }],
  },
  {
    icon: 'cart',
    name: 'Retail',
    description:
      'Unified retail intelligence from point-of-sale to supply chain optimization.',
    services: [
      'Sales Analytics',
      'Inventory Optimization',
      'Customer Segmentation',
      'Retail Dashboards',
    ],
    projects: [
      { title: 'Retail Sales Analytics Dashboard', slug: 'retail-analytics' },
    ],
  },
  {
    icon: 'cellular',
    name: 'Telecom',
    description:
      'Churn prediction, network analytics, and customer intelligence for telecom operators.',
    services: [
      'Churn Prediction',
      'Network Analytics',
      'Customer Segmentation',
      'Revenue Analytics',
    ],
    projects: [
      { title: 'Telecom Customer Churn Dashboard', slug: 'telecom-churn' },
    ],
  },
  {
    icon: 'wallet',
    name: 'Finance',
    description:
      'Risk analytics, loan portfolio management, expense tracking, and regulatory compliance.',
    services: [
      'Risk Dashboards',
      'Loan Analytics',
      'Expense Management',
      'Compliance Reporting',
    ],
    projects: [
      { title: 'Bank Loan Risk Dashboard', slug: 'bank-loan-risk' },
      { title: 'Finance Expense Tracker', slug: 'finance-expense' },
    ],
  },
  {
    icon: 'business',
    name: 'Government',
    description:
      'Data-driven governance through GIS analytics, public service optimization, and digital transformation.',
    services: [
      'GIS Analytics',
      'Public Service Dashboards',
      'Policy Analysis',
      'Digital Services',
    ],
    projects: [{ title: 'Flood Risk Prediction System', slug: 'flood-risk' }],
  },
  {
    icon: 'cog',
    name: 'Manufacturing',
    description:
      'Supply chain visibility, production analytics, and operational efficiency dashboards.',
    services: [
      'Supply Chain Analytics',
      'Production Dashboards',
      'Quality Analytics',
      'OEE Monitoring',
    ],
    projects: [],
  },
];

// one industry in the selector list (a row on wide screens, a chip on phones)
function IndustryTab({
  industry,
  active,
  vertical,
  onPress,
}: {
  industry: Industry;
  active: boolean;
  vertical: boolean;
  onPress: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[
        styles.tab,
        vertical ? styles.tabRow : styles.tabChip,
        active ? styles.tabActive : hovered && styles.tabHover,
      ]}
    >
      <Ionicons
        name={industry.icon}
        size={22}
        color={active ? colors.textOnDark : colors.primary}
      />
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {industry.name}
      </Text>
    </Pressable>
  );
}

// one featured project link
function ProjectLink({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      onPress={() => Linking.openURL(BASE + project.slug)}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[styles.projectRow, hovered && styles.projectRowHover]}
    >
      <Text style={styles.projectText}>{project.title}</Text>
      <Ionicons name="arrow-forward" size={20} color={colors.primary} />
    </Pressable>
  );
}

export default function IndustriesScreen() {
  const { width } = useWindowDimensions();
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // the first render is always the wide layout, so server and browser match
  const isWide = !mounted || width >= 900;
  const industry = INDUSTRIES[selected];

  const tabs = INDUSTRIES.map((item, i) => (
    <IndustryTab
      key={item.name}
      industry={item}
      active={i === selected}
      vertical={isWide}
      onPress={() => setSelected(i)}
    />
  ));

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Industries We Transform</Text>
      <Text style={styles.subtitle}>
        Domain-specific expertise delivering high-impact solutions across major
        sectors.
      </Text>

      <View style={[styles.layout, isWide && styles.layoutWide]}>
        {isWide ? (
          <View style={styles.sideList}>{tabs}</View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipScroll}
            contentContainerStyle={styles.chipRow}
          >
            {tabs}
          </ScrollView>
        )}

        <View style={[styles.panel, isWide && styles.panelWide]}>
          <View style={styles.panelHeader}>
            <View style={styles.panelIcon}>
              <Ionicons name={industry.icon} size={30} color={colors.textOnDark} />
            </View>
            <Text style={styles.panelTitle}>{industry.name}</Text>
          </View>

          <Text style={styles.panelDesc}>{industry.description}</Text>

          <Text style={styles.label}>RELEVANT SERVICES</Text>
          <View style={styles.pills}>
            {industry.services.map((service) => (
              <View key={service} style={styles.pill}>
                <Text style={styles.pillText}>{service}</Text>
              </View>
            ))}
          </View>

          {industry.projects.length > 0 && (
            <>
              <Text style={styles.label}>FEATURED PROJECTS</Text>
              <View style={styles.projects}>
                {industry.projects.map((project) => (
                  <ProjectLink key={project.slug} project={project} />
                ))}
              </View>
            </>
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
    paddingVertical: 40,
  },
  title: {
    fontSize: 40,
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

  layout: { width: '100%', maxWidth: 1100, marginTop: 56 },
  layoutWide: { flexDirection: 'row', alignItems: 'flex-start', gap: 32 },

  // selector
  sideList: { width: 280, gap: 6 },
  chipScroll: { flexGrow: 0, marginBottom: 20 },
  chipRow: { gap: 8 },
  tab: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  tabRow: { width: '100%', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 20 },
  tabChip: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 999 },
  tabActive: { backgroundColor: colors.primary },
  tabHover: { backgroundColor: colors.surface },
  tabText: { fontSize: 16, fontWeight: '600', color: colors.dark },
  tabTextActive: { color: colors.textOnDark },

  // detail panel
  panel: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(139, 94, 60, 0.18)',
  },
  panelWide: { flex: 1, minHeight: 440, padding: 40 },
  panelHeader: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  panelIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelTitle: { fontSize: 32, fontWeight: '800', color: colors.dark },
  panelDesc: { marginTop: 20, fontSize: 17, lineHeight: 27, color: colors.accent },
  label: {
    marginTop: 32,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: colors.primary,
  },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 },
  pill: {
    backgroundColor: 'rgba(139, 94, 60, 0.15)',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  pillText: { fontSize: 14, fontWeight: '600', color: colors.accent },
  projects: { gap: 10, marginTop: 14 },
  projectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 18,
    backgroundColor: 'rgba(139, 94, 60, 0.10)',
  },
  projectRowHover: { backgroundColor: 'rgba(139, 94, 60, 0.22)' },
  projectText: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.dark },
});