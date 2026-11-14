// src/components/stat-card.tsx
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, Text } from 'react-native';
import { colors } from '../themes/colors';

type Props = {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
  start: boolean;
  compact?: boolean;
};

export default function StatCard({
  value,
  label,
  suffix = '+',
  delay = 0,
  start,
  compact = false,
}: Props) {
  const appear = useRef(new Animated.Value(0)).current; // fade + slide
  const progress = useRef(new Animated.Value(0)).current; // count-up
  const [display, setDisplay] = useState(0);

  // update the number on screen while the count-up runs
  useEffect(() => {
    const id = progress.addListener(({ value: v }) => setDisplay(Math.round(v)));
    return () => progress.removeListener(id);
  }, []);

  useEffect(() => {
    if (!start) return;
    Animated.parallel([
      Animated.timing(appear, {
        toValue: 1,
        duration: 700,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(progress, {
        toValue: value,
        duration: 1800,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();
  }, [start]);

  const translateY = appear.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });

  return (
    <Animated.View
      style={[styles.card, { opacity: appear, transform: [{ translateY }] }]}
    >
      <Text style={[styles.number, { fontSize: compact ? 30 : 44 }]}>
        {display.toLocaleString('en-US')}
        {suffix}
      </Text>
      <Text style={styles.label}>{label}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexBasis: 140,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 28,
    paddingVertical: 28,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 94, 60, 0.18)',
    boxShadow: '0 8px 24px rgba(46, 27, 14, 0.10)',
  },
  number: {
    fontWeight: '900',
    color: colors.dark,
    fontVariant: ['tabular-nums'],
  },
  label: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: colors.accent,
    textAlign: 'center',
  },
});