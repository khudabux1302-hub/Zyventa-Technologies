// src/components/project-video.tsx
import { Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useState } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../themes/colors';

function Player({ source }: { source: number }) {
  const player = useVideoPlayer(source, (p) => {
    p.play();
  });

  return (
        <VideoView
      player={player}
      style={styles.fill}
      nativeControls
      contentFit="contain"
    />
  );
}

export default function ProjectVideo({
  source,
  poster,
}: {
  source: number;
  poster?: ImageSourcePropType;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <View style={styles.wrap}>
      {playing ? (
        <Player source={source} />
      ) : (
        <Pressable
          style={styles.fill}
          onPress={() => setPlaying(true)}
          accessibilityLabel="Play video"
        >
          {poster ? (
            <Image source={poster} style={styles.fill} resizeMode="cover" />
          ) : null}
          <View style={styles.overlay}>
            <View style={styles.playButton}>
              <Ionicons name="play" size={32} color={colors.textOnDark} />
            </View>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.dark,
  },
  fill: { width: '100%', height: '100%' },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(46, 27, 14, 0.25)',
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
  },
});