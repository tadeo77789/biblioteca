import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';
import useBreakpoint from '../useBreakpoint';

export default function Header({ route, navigate, search, setSearch, user, onAuth }) {
  const { isMobile } = useBreakpoint();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: 'home',    label: 'Inicio' },
    { id: 'catalog', label: 'Catálogo' },
    { id: 'events',  label: 'Eventos' },
    { id: 'account', label: user ? 'Mi cuenta' : 'Cuenta' },
  ];

  const go = (id) => { setMenuOpen(false); navigate(id); };

  return (
    <View style={styles.wrap}>
      {!isMobile && (
        <View style={styles.topStrip}>
          <Text style={styles.topStripText}>Biblioteca Pública Digital · Red Municipal</Text>
          <Text style={styles.topStripText}>Lun–Sáb · 9 a 21h · 12 sedes</Text>
        </View>
      )}

      <View style={[styles.main, isMobile && styles.mainMobile]}>
        <View style={styles.row}>
          <Pressable onPress={() => go('home')}>
            <Text style={[styles.logo, isMobile && styles.logoMobile]}>Biblioteca</Text>
            {!isMobile && <Text style={styles.logoSub}>PÚBLICA · DIGITAL</Text>}
          </Pressable>

          {isMobile ? (
            <Pressable onPress={() => setMenuOpen(!menuOpen)} style={styles.burger} accessibilityLabel="Menu">
              <View style={styles.burgerLine} />
              <View style={styles.burgerLine} />
              <View style={styles.burgerLine} />
            </Pressable>
          ) : (
            <View style={styles.nav}>
              {links.map(l => (
                <Pressable key={l.id} onPress={() => go(l.id)}>
                  <Text style={[styles.navLink, route === l.id && styles.navLinkActive]}>{l.label}</Text>
                </Pressable>
              ))}
              {!user && (
                <Pressable onPress={() => onAuth('login')} style={styles.loginBtn}>
                  <Text style={styles.loginBtnText}>Iniciar sesión</Text>
                </Pressable>
              )}
            </View>
          )}
        </View>

        <TextInput
          style={styles.search}
          placeholder="Buscar libros, autores, géneros…"
          placeholderTextColor={colors.ink3}
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => go('catalog')}
        />

        {isMobile && menuOpen && (
          <View style={styles.mobileMenu}>
            {links.map(l => (
              <Pressable key={l.id} onPress={() => go(l.id)} style={styles.mobileLink}>
                <Text style={[styles.mobileLinkText, route === l.id && styles.mobileLinkActive]}>{l.label}</Text>
              </Pressable>
            ))}
            {!user && (
              <Pressable onPress={() => { setMenuOpen(false); onAuth('login'); }} style={[styles.mobileLink, styles.mobileLoginBtn]}>
                <Text style={styles.mobileLoginText}>Iniciar sesión</Text>
              </Pressable>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: colors.line },
  topStrip: {
    backgroundColor: colors.blue,
    paddingHorizontal: 28,
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topStripText: { color: '#fff', opacity: 0.85, fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase' },
  main: { paddingHorizontal: 28, paddingVertical: 14, gap: 12 },
  mainMobile: { paddingHorizontal: 16, paddingVertical: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  logo: { fontFamily: fonts.serif, fontSize: 22, color: colors.blue, lineHeight: 24 },
  logoMobile: { fontSize: 20 },
  logoSub: { fontSize: 9, letterSpacing: 2.2, color: colors.ink2 },

  nav: { flexDirection: 'row', alignItems: 'center', gap: 22, flexWrap: 'wrap' },
  navLink: { fontSize: 13, fontWeight: '600', color: colors.ink, letterSpacing: 1.2, textTransform: 'uppercase' },
  navLinkActive: { color: colors.blue, borderBottomWidth: 2, borderBottomColor: colors.teal, paddingBottom: 2 },

  loginBtn: { backgroundColor: colors.blue, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 6 },
  loginBtnText: { color: '#fff', fontWeight: '700', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' },

  search: {
    backgroundColor: '#FAFAF7',
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
  },

  burger: { padding: 8, gap: 4, justifyContent: 'center' },
  burgerLine: { width: 22, height: 2, backgroundColor: colors.ink, borderRadius: 2 },

  mobileMenu: { gap: 4, paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.line },
  mobileLink: { paddingVertical: 10 },
  mobileLinkText: { fontSize: 14, fontWeight: '600', color: colors.ink, letterSpacing: 0.6 },
  mobileLinkActive: { color: colors.blue },
  mobileLoginBtn: { backgroundColor: colors.blue, borderRadius: 6, paddingHorizontal: 14, marginTop: 4 },
  mobileLoginText: { color: '#fff', fontWeight: '700', fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' },
});
