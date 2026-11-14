// src/components/card-stack.tsx
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { colors } from '../themes/colors';

type IconName = ComponentProps<typeof Ionicons>['name'];

const SERVICES: {
  icon: IconName;
  title: string;
  description: string;
  items: string[];
}[] = [
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

const N = SERVICES.length;
const HOLD = 3500; // how long the front card stays (ms)
const MOVE = 750; // how long the slide takes (ms)
const CARD_H = 440;

// A card's "slot": -1 = gone (left), 0 = front, 1 and 2 = behind, 3 = waiting
const SLOTS = [-1, 0, 1, 2, 3];
const BG = ['#EADBC3', '#EADBC3', '#D8C0A0', '#C3A37F', '#C3A37F']; // beige, tan, soft brown
const OPACITY = [0, 1, 1, 1, 0];
const ROTATE = ['-14deg', '-2.5deg', '2.5deg', '6deg', '4deg'];
const SCALE = [1, 1, 0.97, 0.97, 0.94];

const WIDE = { w: 360, left: 0, x: [-64, 0, 24, 48, 66], y: [-12, 0, 20, 30, 20] };
const COMPACT = { w: 260, left: 0, x: [-30, 0, 14, 14, 40], y: [-8, 0, 14, 40, 28] };

// number values (opacity, position, scale)
const num = (slot: Animated.Value, out: number[]) =>
  slot.interpolate({ inputRange: SLOTS, outputRange: out, extrapolate: 'clamp' });

// text values (colors, rotation like '-3deg')
const str = (slot: Animated.Value, out: string[]) =>
  slot.interpolate({ inputRange: SLOTS, outputRange: out, extrapolate: 'clamp' });

export default function CardStack({ compact }: { compact: boolean }) {
  const P = compact ? COMPACT : WIDE;

  const slots = useRef(SERVICES.map((_, i) => new Animated.Value(i))).current;
  const pos = useRef(SERVICES.map((_, i) => i)); // plain-number copy of each card's slot
  const [positions, setPositions] = useState(SERVICES.map((_, i) => i)); // for stacking order

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    slots.forEach((slot, i) => slot.setValue(pos.current[i]));

    const tick = () => {
      // every card moves one slot forward
      const moves = slots.map((slot, i) => {
        pos.current[i] -= 1;
        return Animated.timing(slot, {
          toValue: pos.current[i],
          duration: MOVE,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false, // colors can't use the native driver
        });
      });

      Animated.parallel(moves).start(({ finished }) => {
        if (cancelled || !finished) return;
        // the card that left goes (invisibly) to the back of the line
        slots.forEach((slot, i) => {
          if (pos.current[i] < 0) {
            pos.current[i] = N - 1;
            slot.setValue(N - 1);
          }
        });
        setPositions([...pos.current]);
        timer = setTimeout(tick, HOLD);
      });
    };

    timer = setTimeout(tick, HOLD);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      slots.forEach((slot) => slot.stopAnimation());
    };
  }, []);

  return (
    <View
    style={[
    { width: P.left + P.w + P.x[3] + 8, height: CARD_H + P.y[4] + 8 },
    compact && styles.centered,
  ]}
>   
      {SERVICES.map((s, i) => {
        const slot = slots[i];
        return (
          <Animated.View
            key={s.title}
            style={[
              styles.card,
              {
                width: P.w,
                left: P.left,
                zIndex: 10 - positions[i],
                backgroundColor: str(slot, BG),
                opacity: num(slot, OPACITY),
                transform: [
                    { translateX: num(slot, P.x) },
                    { translateY: num(slot, P.y) },
                    { rotate: str(slot, ROTATE) },
                    { scale: num(slot, SCALE) },
                ],
                },
            ]}
          >
            <View style={styles.photo}>
              <View style={styles.badge}>
                <Ionicons name={s.icon} size={28} color={colors.textOnDark} />
              </View>
            </View>

            <Text style={styles.title}>{s.title}</Text>
            <Text style={styles.desc}>{s.description}</Text>

            <View style={styles.list}>
              {s.items.map((item) => (
                <View key={item} style={styles.row}>
                  <View style={styles.dot} />
                  <Text style={styles.item}>{item}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { alignSelf: 'center' },
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: CARD_H,
    borderRadius: 20,
    padding: 16,
    paddingBottom: 22,
    borderWidth: 1,
    borderColor: 'rgba(92, 58, 33, 0.15)',
    boxShadow: '0 12px 28px rgba(46, 27, 14, 0.16)',
  },
  photo: {
    height: 90,
    borderRadius: 12,
    backgroundColor: 'rgba(92, 58, 33, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 14,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '700',
    color: colors.dark,
  },
  desc: { marginTop: 8, fontSize: 14, lineHeight: 21, color: colors.accent },
  list: { marginTop: 14, gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary },
  item: { fontSize: 14, color: colors.dark },
});