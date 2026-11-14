// src/app/_layout.tsx
import { Slot } from 'expo-router';
import { View } from 'react-native';
import Navbar from '../components/navbar';
import { colors } from '../themes/colors';

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Navbar />
      <Slot />
    </View>
  );
}