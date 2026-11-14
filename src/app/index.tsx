// src/app/index.tsx
import { Link } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import FeaturedProjects from '../components/featured-projects';
import Footer from '../components/footer';
import ReviewsSection from '../components/reviews-section';
import ServicesSection from '../components/service-sections';
import StatCard from '../components/stat-cards';
import { colors } from '../themes/colors';

const TITLE = 'Transform Your Business with Analytics, Automation & AI';
const SUBTITLE =
  'We help businesses automate reporting, streamline workflows, unlock actionable insights, and deploy AI-powered solutions that drive measurable growth.';
const STATS = [
  { value: 50, label: 'Projects Completed' },
  { value: 30, label: 'Dashboards Developed' },
  { value: 25, label: 'Processes Automated' },
  { value: 4500, label: 'Reports Generated' },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // the first render is always the wide layout, so server and browser match
  const isWide = !mounted || width >= 900;

  const [count, setCount] = useState(0); // how many letters are typed so far
  const fade = useRef(new Animated.Value(0)).current;
  const [statsStarted, setStatsStarted] = useState(false);
  const statsY = useRef(0); // where the stats section starts on the page
  const viewH = useRef(0); // height of the visible area
  const scrollY = useRef(0); // how far the user has scrolled

  const checkStats = () => {
    // start once the top of the stats section is 120px inside the screen
    if (viewH.current && scrollY.current + viewH.current > statsY.current + 120) {
      setStatsStarted(true);
    }
  };

  useEffect(() => {
    if (count < TITLE.length) {
      // type one more letter after 20ms
      const timer = setTimeout(() => setCount(count + 1), 20);
      return () => clearTimeout(timer);
    }
    // title finished, so fade in the subtitle and buttons
    Animated.timing(fade, {
      toValue: 1,
      duration: 700,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [count]);

  const typed = TITLE.slice(0, count);
  const rest = TITLE.slice(count);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      scrollEventThrottle={16}
      onLayout={(e) => {
        viewH.current = e.nativeEvent.layout.height;
        checkStats();
      }}
      onScroll={(e) => {
        scrollY.current = e.nativeEvent.contentOffset.y;
        checkStats();
      }}
    >
      <View style={styles.heroBg}>
        <Image
          source={require('../../assets/images/hero-bg.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />

        <View style={styles.hero}>
          <Text style={isWide ? styles.titleWide : styles.title}>
            {typed}
            <Text style={styles.hidden}>{rest}</Text>
          </Text>

          <Animated.View style={[styles.reveal, { opacity: fade }]}>
            <Text style={isWide ? styles.subtitleWide : styles.subtitle}>
              {SUBTITLE}
            </Text>

            <View style={styles.buttons}>
              <Link href="/contact" asChild>
                <Pressable style={styles.primaryButton}>
                  <Text style={styles.primaryText}>Book Free Consultation</Text>
                </Pressable>
              </Link>

              <Link href="/portfolio" asChild>
                <Pressable style={styles.secondaryButton}>
                  <Text style={styles.secondaryText}>View Portfolio</Text>
                </Pressable>
              </Link>
            </View>
          </Animated.View>
        </View>
      </View>

      <ServicesSection compact={!isWide} />

      <View
        style={styles.stats}
        onLayout={(e) => {
          statsY.current = e.nativeEvent.layout.y;
          checkStats();
        }}
      >
        {STATS.map((item, i) => (
          <StatCard
            key={item.label}
            value={item.value}
            label={item.label}
            delay={400 + i * 150}
            start={statsStarted}
            compact={!isWide}
          />
        ))}
      </View>

      <FeaturedProjects />
      <ReviewsSection compact={!isWide} />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 80,
  },

  // hero with background image
  heroBg: {
    alignSelf: 'stretch',
    marginHorizontal: -24,
    marginTop: -80,
    paddingHorizontal: 24,
    paddingTop: 170,
    paddingBottom: 120,
    minHeight: 640,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.dark,
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(46, 27, 14, 0.35)',
  },
  hero: { width: '100%', maxWidth: 900, alignItems: 'center' },

  title: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    color: colors.background,
    textAlign: 'center',
  },
  titleWide: {
    fontSize: 56,
    lineHeight: 66,
    fontWeight: '800',
    color: colors.background,
    textAlign: 'center',
  },
  hidden: { color: 'transparent' },

  reveal: { alignItems: 'center', width: '100%' },
  subtitle: {
    fontSize: 16,
    lineHeight: 25,
    color: colors.surface,
    textAlign: 'center',
    marginTop: 20,
    maxWidth: 700,
  },
  subtitleWide: {
    fontSize: 18,
    lineHeight: 28,
    color: colors.surface,
    textAlign: 'center',
    marginTop: 24,
    maxWidth: 700,
  },

  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginTop: 36,
  },
  primaryButton: {
    backgroundColor: colors.surface,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 999,
  },
  primaryText: { color: colors.dark, fontSize: 16, fontWeight: '600' },
  secondaryButton: {
    borderWidth: 2,
    borderColor: colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 999,
  },
  secondaryText: { color: colors.surface, fontSize: 16, fontWeight: '600' },

  // stats
  stats: {
    width: '100%',
    maxWidth: 1100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginTop: 72,
  },
});