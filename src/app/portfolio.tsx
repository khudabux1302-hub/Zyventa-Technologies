// src/app/portfolio.tsx
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Footer from '../components/footer';
import ProjectVideo from '../components/project-videos';
import { PROJECTS } from '../constants/project';
import { colors } from '../themes/colors';

export default function PortfolioScreen() {
  const { width } = useWindowDimensions();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // the first render is always the wide layout, so server and browser match
  const isWide = !mounted || width >= 900;

  // when you arrive from a card or link, scroll down to that project
  const { project: target } = useLocalSearchParams<{ project?: string }>();
  const scrollRef = useRef<any>(null);
  const listY = useRef(0);
  const blockY = useRef<Record<string, number>>({});
  const done = useRef(false);

  const jump = () => {
    if (done.current || !target) return;
    const y = blockY.current[target];
    if (y === undefined) return;
    done.current = true;
    scrollRef.current?.scrollTo({
      y: Math.max(listY.current + y - 24, 0),
      animated: true,
    });
  };

  useEffect(() => {
    done.current = false;
    jump();
  }, [target]);

  return (
    <ScrollView
      ref={scrollRef}
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>Our Portfolio</Text>
      <Text style={styles.subtitle}>
        A selection of the systems we have designed and built, with videos and
        photos from each project.
      </Text>

      <View
        style={styles.list}
        onLayout={(e) => {
          listY.current = e.nativeEvent.layout.y;
          jump();
        }}
      >
        {PROJECTS.map((project) => {
          const images = project.images ?? [];
          const github = project.github;
          const hasMedia = project.video !== undefined || images.length > 0;

          return (
            <View
              key={project.slug}
              style={styles.project}
              onLayout={(e) => {
                blockY.current[project.slug] = e.nativeEvent.layout.y;
                jump();
              }}
            >
              <View style={[styles.row, isWide && styles.rowWide]}>
                <View style={isWide ? styles.textCol : undefined}>
                  <View style={styles.tags}>
                    {project.tags.map((tag) => (
                      <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>

                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.desc}>{project.description}</Text>

                  <Text style={styles.label}>{project.chipsLabel}</Text>
                  <View style={styles.chips}>
                    {project.chips.map((chip) => (
                      <View key={chip} style={styles.chip}>
                        <Text style={styles.chipText}>{chip}</Text>
                      </View>
                    ))}
                  </View>

                  {github ? (
                    <Pressable
                      style={styles.github}
                      onPress={() => Linking.openURL(github)}
                      accessibilityLabel={`View code for ${project.title} on GitHub`}
                    >
                      <Ionicons name="logo-github" size={20} color={colors.textOnDark} />
                      <Text style={styles.githubText}>View Code on GitHub</Text>
                    </Pressable>
                  ) : null}
                </View>

                <View style={[styles.mediaCol, isWide && styles.mediaColWide]}>
                  {project.video !== undefined ? (
                    <ProjectVideo source={project.video} poster={images[0]} />
                  ) : null}

                  {images.length > 0 ? (
                    <View style={styles.gallery}>
                      {images.map((image, i) => (
                        <View key={i} style={styles.photo}>
                          <Image source={image} style={styles.photoImage} resizeMode="cover" />
                        </View>
                      ))}
                    </View>
                  ) : null}

                  {!hasMedia ? (
                    <View style={styles.placeholder}>
                      <Ionicons name={project.icon} size={40} color={colors.primary} />
                      <Text style={styles.placeholderText}>
                        Video and photos coming soon
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          );
        })}
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

  list: { width: '100%', maxWidth: 1100, marginTop: 56 },
  project: { paddingVertical: 48, borderTopWidth: 1, borderTopColor: LINE },
  row: { gap: 28 },
  rowWide: { flexDirection: 'row', alignItems: 'flex-start', gap: 48 },
  textCol: { width: 380 },
  mediaCol: { gap: 12 },
  mediaColWide: { flex: 1 },

  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    backgroundColor: 'rgba(139, 94, 60, 0.15)',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  tagText: { fontSize: 13, fontWeight: '600', color: colors.accent },
  projectTitle: {
    marginTop: 16,
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '800',
    color: colors.dark,
  },
  desc: { marginTop: 14, fontSize: 17, lineHeight: 27, color: colors.accent },
  label: { marginTop: 24, fontSize: 16, fontWeight: '700', color: colors.primary },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  chip: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 14,
  },
  chipText: { fontSize: 14, fontWeight: '600', color: colors.primary },
  github: {
    marginTop: 28,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.dark,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  githubText: { color: colors.textOnDark, fontSize: 15, fontWeight: '600' },

  gallery: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  photo: {
    flexGrow: 1,
    flexBasis: 240,
    aspectRatio: 1.6,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  photoImage: { width: '100%', height: '100%' },
  placeholder: {
    aspectRatio: 1.6,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 94, 60, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  placeholderText: { fontSize: 15, color: colors.accent },
});