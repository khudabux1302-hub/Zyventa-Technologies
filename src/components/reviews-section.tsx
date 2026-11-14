// src/components/reviews-section.tsx
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { API_URL } from '../constants/api';
import type { Review } from '../constants/reviews';
import { colors } from '../themes/colors';

const MAX = 10; // most reviews shown
const AUTO_MS = 6000; // time before it slides by itself
const SLIDE_MS = 500; // how long one slide takes

function ReviewsSlider({ reviews: allReviews, compact }: { reviews: Review[]; compact: boolean }) {
  const reviews = allReviews.slice(0, MAX);
  const N = reviews.length;

  // copies of the last and first review at the ends make the slider loop smoothly
  const slides = N > 1 ? [reviews[N - 1], ...reviews, reviews[0]] : reviews;
  const START = N > 1 ? 1 : 0;

  const [width, setWidth] = useState(0);
  const [pos, setPos] = useState(START);
  const x = useRef(new Animated.Value(0)).current;
  const posRef = useRef(START);
  const widthRef = useRef(0);
  const moving = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  widthRef.current = width;

  const slideTo = (target: number) => {
    if (moving.current || widthRef.current === 0) return;
    moving.current = true;
    posRef.current = target;
    setPos(target);

    Animated.timing(x, {
      toValue: -target * widthRef.current,
      duration: SLIDE_MS,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: Platform.OS !== 'web',
    }).start(() => {
      // after sliding onto a copy, jump (unseen) to the real review
      if (target === N + 1) {
        posRef.current = 1;
        setPos(1);
        x.setValue(-widthRef.current);
      } else if (target === 0) {
        posRef.current = N;
        setPos(N);
        x.setValue(-N * widthRef.current);
      }
      moving.current = false;
    });
  };

  const stopTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  const startTimer = () => {
    stopTimer();
    if (N > 1) {
      timer.current = setInterval(() => slideTo(posRef.current + 1), AUTO_MS);
    }
  };

  // when the slider is measured (or resized), place it and start the timer
  useEffect(() => {
    if (!width) return;
    x.setValue(-posRef.current * width);
    startTimer();
    return () => stopTimer();
  }, [width]);

  if (N === 0) return null;

  // clicking an arrow or dot also restarts the timer
  const go = (target: number) => {
    slideTo(target);
    startTimer();
  };

  const current = N > 1 ? (pos - 1 + N) % N : 0;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>What Our Clients Say</Text>
      <Text style={styles.quoteMark}></Text>

      <View
        style={styles.viewport}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      >
        {width > 0 ? (
          <Animated.View
            style={[
              styles.track,
              { width: width * slides.length, transform: [{ translateX: x }] },
            ]}
          >
            {slides.map((review, i) => (
              <View key={`${review.name}-${i}`} style={[styles.slide, { width }]}>
                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Ionicons
                      key={n}
                      name={n <= review.rating ? 'star' : 'star-outline'}
                      size={22}
                      color={colors.primary}
                    />
                  ))}
                </View>

                <Text
                  style={[
                    styles.quote,
                    { fontSize: compact ? 20 : 26, lineHeight: compact ? 30 : 38 },
                  ]}
                >
                  {review.text}
                </Text>

                <Text style={styles.name}>{review.name}</Text>
                <Text style={styles.role}>{review.role}</Text>
              </View>
            ))}
          </Animated.View>
        ) : null}
      </View>

      {N > 1 ? (
        <View style={styles.controls}>
          <Pressable
            onPress={() => go(posRef.current - 1)}
            style={styles.arrow}
            accessibilityLabel="Previous review"
          >
            <Ionicons name="chevron-back" size={22} color={colors.primary} />
          </Pressable>

          <View style={styles.dots}>
            {reviews.map((_, i) => (
              <Pressable
                key={i}
                onPress={() => go(i + 1)}
                hitSlop={8}
                accessibilityLabel={`Show review ${i + 1}`}
                style={[styles.dot, i === current && styles.dotActive]}
              />
            ))}
          </View>

          <Pressable
            onPress={() => go(posRef.current + 1)}
            style={styles.arrow}
            accessibilityLabel="Next review"
          >
            <Ionicons name="chevron-forward" size={22} color={colors.primary} />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
export default function ReviewsSection({ compact }: { compact: boolean }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/reviews`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) setReviews(data);
      })
      .catch(() => {});
  }, []);

  // the key restarts the slider when the reviews arrive
  return <ReviewsSlider key={reviews.length} reviews={reviews} compact={compact} />;
}
const styles = StyleSheet.create({
  section: { width: '100%', maxWidth: 800, marginTop: 140, alignItems: 'center' },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.dark,
    textAlign: 'center',
  },
  quoteMark: {
    marginTop: 32,
    fontSize: 80,
    lineHeight: 80,
    fontWeight: '800',
    color: colors.primary,
  },
  viewport: { width: '100%', overflow: 'hidden' },
  track: { flexDirection: 'row' },
  slide: { alignItems: 'center', paddingHorizontal: 12 },
  stars: { flexDirection: 'row', gap: 4 },
  quote: {
    marginTop: 20,
    fontWeight: '500',
    color: colors.dark,
    textAlign: 'center',
  },
  name: { marginTop: 24, fontSize: 18, fontWeight: '700', color: colors.dark },
  role: { marginTop: 4, fontSize: 15, color: colors.accent, textAlign: 'center' },
  controls: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  arrow: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(139, 94, 60, 0.3)',
  },
  dotActive: { backgroundColor: colors.primary },
});