import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';

export default function Header({ route, navigate, search, setSearch }) {
  const links = [
    { id: 'home',    label: 'Inicio' },
    { id: 'catalog', label: 'Catálogo' },
    { id: 'events',  label: 'Eventos' },
    { id: 'account', label: 'Cuenta' },
  ];
  return (
    <View style={styles.wrap}>
      <View style={styles.topStrip}>
        <Text style={styles.topStripText}>Biblioteca Pública Digital · Red Municipal</Text>
        <Text style={styles.topStripText}>Lun–Sáb · 9 a 21h · 12 sedes</Text>
      </View>
      <View style={styles.main}>
        <Pressable onPress={() => navigate('home')}>
          <Text style={styles.logo}>Biblioteca</Text>
          <Text style={styles.logoSub}>PÚBLICA · DIGITAL</Text>
        </Pressable>
        <View style={styles.searchWrap}>
          <TextInput
            style={styles.search}
            placeholder="Buscar libros, autores, géneros…"
            placeholderTextColor={colors.ink3}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => navigate('catalog')}
          />
        </View>
        <View style={styles.nav}>
          {links.map(l => (
            <Pressable key={l.id} onPress={() => navigate(l.id)}>
              <Text style={[styles.navLink, route === l.id && styles.navLinkActive]}>{l.label}</Text>
            </Pressable>
          ))}
        </View>
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
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingHorizontal: 28,
    paddingVertical: 14,
    flexWrap: 'wrap',
  },
  logo: { fontFamily: fonts.serif, fontSize: 22, color: colors.blue, lineHeight: 24 },
  logoSub: { fontSize: 9, letterSpacing: 2.2, color: colors.ink2 },
  searchWrap: { flex: 1, minWidth: 220, maxWidth: 520 },
  search: {
    backgroundColor: '#FAFAF7',
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
  },
  nav: { flexDirection: 'row', alignItems: 'center', gap: 22 },
  navLink: { fontSize: 13, fontWeight: '600', color: colors.ink, letterSpacing: 1.2, textTransform: 'uppercase' },
  navLinkActive: { color: colors.blue, borderBottomWidth: 2, borderBottomColor: colors.teal, paddingBottom: 2 },
});
