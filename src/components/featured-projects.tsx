// src/components/featured-projects.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Project } from '../constants/project';
import { PROJECTS } from '../constants/project';
import { colors } from '../themes/colors';
const FEATURED = PROJECTS.filter((project) => project.featured);
function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      style={styles.cell}
      onPress={() =>
        router.push({ pathname: '/portfolio', params: { project: project.slug } })
      }
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      accessibilityRole="button"
      accessibilityLabel={`View project: ${project.title}`}
    >
      <View style={[styles.card, hovered && styles.cardHovered]}>
        <View style={styles.cover}>
          {project.cover ? (
            <Image source={project.cover} style={styles.coverImage} resizeMode="cover" />
          ) : (
            <Ionicons name={project.icon} size={48} color={colors.primary} />
          )}
        </View>

        <View style={styles.body}>
          <View style={styles.tags}>
            {project.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.cardTitle}>{project.title}</Text>
          <Text style={styles.cardDesc}>{project.description}</Text>

          <View style={styles.more}>
            <Text style={styles.moreText}>View project</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.primary} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function FeaturedProjects() {
  const router = useRouter();

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Featured Projects</Text>
      <Text style={styles.subtitle}>
        A closer look at some of our best work, from AI proctoring to intelligent
        meeting tools.
      </Text>

      <View style={styles.grid}>
                {FEATURED.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </View>

      <Pressable style={styles.allButton} onPress={() => router.push('/portfolio')}>
        <Text style={styles.allButtonText}>View All Projects</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { width: '100%', maxWidth: 1100, marginTop: 140, alignItems: 'center' },
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
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 48,
  },

  cell: { flexGrow: 1, flexBasis: 300 },
  card: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(139, 94, 60, 0.18)',
    boxShadow: '0 8px 24px rgba(46, 27, 14, 0.10)',
  },
  cardHovered: {
    borderColor: colors.primary,
    boxShadow: '0 18px 40px rgba(46, 27, 14, 0.18)',
    transform: [{ translateY: -6 }],
  },
  cover: {
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(139, 94, 60, 0.15)',
  },
  coverImage: { width: '100%', height: '100%' },
  body: { flex: 1, padding: 24, gap: 12 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    backgroundColor: 'rgba(139, 94, 60, 0.15)',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  tagText: { fontSize: 13, fontWeight: '600', color: colors.accent },
  cardTitle: { fontSize: 22, lineHeight: 29, fontWeight: '700', color: colors.dark },
  cardDesc: { fontSize: 15, lineHeight: 23, color: colors.accent },
  more: {
    marginTop: 'auto',
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moreText: { fontSize: 15, fontWeight: '700', color: colors.primary },

  allButton: {
    marginTop: 40,
    backgroundColor: colors.dark,
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  allButtonText: { color: colors.textOnDark, fontSize: 16, fontWeight: '600' },
});