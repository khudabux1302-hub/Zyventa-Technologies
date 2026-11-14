// src/components/navbar.tsx
import { Link, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { colors } from '../themes/colors';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export default function Navbar() {
  const pathname = usePathname();
const { width } = useWindowDimensions();
const [open, setOpen] = useState(false);
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

// the first render is always the wide layout, so server and browser match
const isWide = !mounted || width >= 930;

  // close the mobile menu after moving to another page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

const navLinks = links.map((item) => {
  const active = pathname === item.href;
  return (
    <Link key={item.href} href={item.href} asChild>
      <Pressable
        style={StyleSheet.flatten([styles.link, active && styles.linkActive])}
      >
        <Text style={[styles.linkText, active && styles.linkTextActive]}>
          {item.label}
        </Text>
      </Pressable>
    </Link>
  );
});

  const consultButton = (
    <Pressable style={styles.button}>
      <Text style={styles.buttonText}>Book Consultation</Text>
    </Pressable>
  );
    const overlay = pathname === '/'; // on the home page the navbar floats over the image
  return (
        <View style={overlay ? styles.wrapperOverlay : styles.wrapper}>
      <View style={styles.bar}>
        {/* Logo + name */}
        <View style={styles.brand}>
          <Image
            source={require('../../assets/images/logo1.jpeg')}
            style={styles.logo}
          />
          <Text style={styles.brandText} numberOfLines={1}>Zyventa Technologies</Text>
        </View>

        {isWide ? (
          <>
            <View style={styles.links}>{navLinks}</View>
            {consultButton}
          </>
        ) : (
          <Pressable onPress={() => setOpen(!open)}>
            <Text style={styles.menuIcon}>{open ? '✕' : '☰'}</Text>
          </Pressable>
        )}
      </View>

      {/* Dropdown for small screens */}
      {!isWide && open && (
        <View style={styles.dropdown}>
          {navLinks}
          {consultButton}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: colors.background,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
  },
    wrapperOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 40, height: 40, borderRadius: 3 },
  links: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  linkActive: { backgroundColor: colors.primary },
  linkTextActive: { color: colors.textOnDark },
  menuIcon: { fontSize: 22, color: colors.dark },
  dropdown: {
    marginTop: 8,
    padding: 12,
    gap: 4,
    backgroundColor: colors.surface,
    borderRadius: 28,
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  brandText: { fontSize: 17, fontWeight: '700', color: colors.dark },
  link: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999 },
  linkText: { fontSize: 14, fontWeight: '500', color: colors.accent },
  button: {
    backgroundColor: colors.dark,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: { color: colors.textOnDark, fontWeight: '600', fontSize: 14 },
});