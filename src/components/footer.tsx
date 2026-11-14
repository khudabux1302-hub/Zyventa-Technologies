// src/components/footer.tsx
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../themes/colors';

type IconName = ComponentProps<typeof Ionicons>['name'];

// use the same logo file as your navbar
const LOGO = require('../../assets/images/logo.jpeg');

const ABOUT =
  'Zyventa Technologies helps organizations turn their data into decisions through analytics, automation, and AI.';

// replace these with your real details
const CONTACT = {
  email: 'your-email@example.com',
  phone: '+00 000 0000000',
  address: 'Your office address, City, Country',
};

const SOCIALS: { label: string; url: string; icon?: IconName }[] = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com', icon: 'logo-linkedin' },
  { label: 'Facebook', url: 'https://www.facebook.com', icon: 'logo-facebook' },
  { label: 'Instagram', url: 'https://www.instagram.com', icon: 'logo-instagram' },
  { label: 'X', url: 'https://x.com' }, // no icon: shows a letter X
];

function SocialButton({ social }: { social: (typeof SOCIALS)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      accessibilityLabel={social.label}
      onPress={() => Linking.openURL(social.url)}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[styles.social, hovered && styles.socialHover]}
    >
      {social.icon ? (
        <Ionicons name={social.icon} size={18} color={colors.textOnDark} />
      ) : (
        <Text style={styles.socialX}>X</Text>
      )}
    </Pressable>
  );
}

function ContactRow({
  icon,
  text,
  url,
}: {
  icon: IconName;
  text: string;
  url?: string;
}) {
  const content = (
    <>
      <Ionicons name={icon} size={20} color={colors.textOnDark} />
      <Text style={styles.contactText}>{text}</Text>
    </>
  );

  if (!url) return <View style={styles.contactRow}>{content}</View>;

  return (
    <Pressable onPress={() => Linking.openURL(url)} style={styles.contactRow}>
      {content}
    </Pressable>
  );
}

export default function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.inner}>
        <View style={styles.top}>
          <View style={styles.brandCol}>
            <View style={styles.brandRow}>
              <Image source={LOGO} style={styles.logo} />
              <Text style={styles.brandName}>Zyventa Technologies</Text>
            </View>

            <Text style={styles.about}>{ABOUT}</Text>

            <View style={styles.socials}>
              {SOCIALS.map((social) => (
                <SocialButton key={social.label} social={social} />
              ))}
            </View>
          </View>

          <View style={styles.contactCol}>
            <Text style={styles.heading}>Contact</Text>
            <ContactRow icon="mail" text={CONTACT.email} url={`mailto:${CONTACT.email}`} />
            <ContactRow
              icon="call"
              text={CONTACT.phone}
              url={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
            />
            <ContactRow icon="location" text={CONTACT.address} />
          </View>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.copy}>
            © {new Date().getFullYear()} Zyventa Technologies. All rights reserved.
          </Text>
        </View>
      </View>
    </View>
  );
}

const LINE = 'rgba(245, 239, 230, 0.3)';

const styles = StyleSheet.create({
  // the negative margins cancel the screen's padding, so the band reaches the edges
  footer: {
    alignSelf: 'stretch',
    marginHorizontal: -24,
    marginBottom: -80,
    marginTop: 120,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 14,
    alignItems: 'center',
  },
  inner: { width: '100%', maxWidth: 1100 },
  top: { flexDirection: 'row', flexWrap: 'wrap', gap: 48 },

  brandCol: { flexGrow: 2, flexBasis: 320, gap: 18 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logo: { width: 44, height: 44, borderRadius: 22 },
  brandName: { fontSize: 20, fontWeight: '700', color: colors.textOnDark },
  about: {
    maxWidth: 460,
    fontSize: 15,
    lineHeight: 24,
    color: colors.textOnDark,
  },
  socials: { flexDirection: 'row', gap: 10, marginTop: 6 },
  social: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: colors.textOnDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialHover: { backgroundColor: 'rgba(245, 239, 230, 0.18)' },
  socialX: { fontSize: 16, fontWeight: '800', color: colors.textOnDark },

  contactCol: { flexGrow: 1, flexBasis: 260, gap: 14 },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textOnDark,
    marginBottom: 4,
  },
  contactRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  contactText: { flex: 1, fontSize: 15, lineHeight: 22, color: colors.textOnDark },

  bottom: { marginTop: 28, paddingTop: 10, borderTopWidth: 1, borderTopColor: LINE },
  copy: { fontSize: 14, color: colors.textOnDark, textAlign: 'center' },
});