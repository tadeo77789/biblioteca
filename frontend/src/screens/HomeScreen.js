import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BOOKS, EVENTS, CATEGORIES } from '../data';
import BookCard from '../components/BookCard';
import { colors, fonts, radius, shadow } from '../theme';
import useBreakpoint from '../useBreakpoint';

export default function HomeScreen({ navigate }) {
  const { isMobile } = useBreakpoint();
  const featured = BOOKS.slice(0, 6);
  const newArrivals = BOOKS.slice(6, 12);
  const pad = isMobile ? 16 : 28;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 60 }}>
      <LinearGradient
        colors={['#0e2f56', '#1A4B82', '#2a5e91']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, isMobile && styles.heroMobile]}
      >
        <Text style={styles.heroEyebrow}>RED MUNICIPAL · DESDE 1928</Text>
        <Text style={[styles.heroTitle, isMobile && styles.heroTitleMobile]}>Mil historias{'\n'}para llevar a casa</Text>
        <Text style={[styles.heroSubtitle, isMobile && styles.heroSubtitleMobile]}>
          Tu carné da acceso a doce sedes, miles de libros, talleres y salas de estudio.
        </Text>
        <View style={[styles.heroButtons, isMobile && styles.heroButtonsMobile]}>
          <Pressable style={styles.btnTeal} onPress={() => navigate('catalog')}>
            <Text style={styles.btnTealText}>Explorar catálogo</Text>
          </Pressable>
          <Pressable style={styles.btnOutline} onPress={() => navigate('events')}>
            <Text style={styles.btnOutlineText}>Ver eventos</Text>
          </Pressable>
        </View>
      </LinearGradient>

      <View style={[styles.section, { paddingHorizontal: pad }]}>
        <View style={styles.sectionHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.eyebrow}>DESTACADOS</Text>
            <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>Lo que están leyendo</Text>
          </View>
          <Pressable onPress={() => navigate('catalog')}>
            <Text style={styles.link}>Ver todos →</Text>
          </Pressable>
        </View>
        <FlatList
          horizontal
          data={featured}
          keyExtractor={(b) => b.id}
          renderItem={({ item }) => (
            <View style={{ marginRight: 14 }}>
              <BookCard book={item} onPress={(id) => navigate('book', { id })} />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={[styles.section, { paddingHorizontal: pad }]}>
        <Text style={styles.eyebrow}>EXPLORA POR GÉNERO</Text>
        <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>Encuentra tu próxima lectura</Text>
        <View style={styles.categoriesGrid}>
          {CATEGORIES.filter(c => c.id !== 'all').map(c => (
            <Pressable key={c.id} style={styles.categoryChip} onPress={() => navigate('catalog', { category: c.id })}>
              <Text style={styles.categoryChipText}>{c.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={[styles.section, { paddingHorizontal: pad }]}>
        <Text style={styles.eyebrow}>NOVEDADES</Text>
        <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>Recién llegados</Text>
        <FlatList
          horizontal
          data={newArrivals}
          keyExtractor={(b) => b.id}
          renderItem={({ item }) => (
            <View style={{ marginRight: 14 }}>
              <BookCard book={item} onPress={(id) => navigate('book', { id })} />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={[styles.section, { paddingHorizontal: pad }]}>
        <View style={styles.sectionHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.eyebrow}>AGENDA</Text>
            <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>Próximos eventos</Text>
          </View>
          <Pressable onPress={() => navigate('events')}>
            <Text style={styles.link}>Ver agenda →</Text>
          </Pressable>
        </View>
        <View style={styles.eventsGrid}>
          {EVENTS.map(ev => (
            <View key={ev.id} style={[styles.eventCard, isMobile && styles.eventCardMobile]}>
              <Text style={styles.eventDate}>{ev.date} · {ev.time}</Text>
              <Text style={styles.eventTitle}>{ev.title}</Text>
              <View style={styles.eventFooter}>
                <Text style={styles.eventRoom}>{ev.room}</Text>
                <Text style={styles.eventSpots}>{ev.spots}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: colors.bg },
  hero: { padding: 48, paddingVertical: 72, gap: 16 },
  heroMobile: { padding: 24, paddingVertical: 48 },
  heroEyebrow: { color: '#fff', opacity: 0.65, fontSize: 11, letterSpacing: 2.2 },
  heroTitle: { color: '#fff', fontFamily: fonts.serif, fontSize: 52, lineHeight: 56 },
  heroTitleMobile: { fontSize: 34, lineHeight: 38 },
  heroSubtitle: { color: 'rgba(255,255,255,0.82)', fontSize: 15, lineHeight: 22, maxWidth: 540 },
  heroSubtitleMobile: { fontSize: 14, lineHeight: 20 },
  heroButtons: { flexDirection: 'row', gap: 12, marginTop: 12, flexWrap: 'wrap' },
  heroButtonsMobile: { flexDirection: 'column', alignItems: 'stretch' },
  btnTeal: { backgroundColor: colors.teal, paddingHorizontal: 18, paddingVertical: 12, borderRadius: radius.sm, alignItems: 'center' },
  btnTealText: { color: '#fff', fontWeight: '700', fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase' },
  btnOutline: { borderColor: 'rgba(255,255,255,0.5)', borderWidth: 1, paddingHorizontal: 18, paddingVertical: 12, borderRadius: radius.sm, alignItems: 'center' },
  btnOutlineText: { color: '#fff', fontWeight: '700', fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase' },

  section: { paddingTop: 40 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16, gap: 12 },
  eyebrow: { color: colors.teal, fontSize: 11, letterSpacing: 2, fontWeight: '700', marginBottom: 4 },
  sectionTitle: { fontFamily: fonts.serif, fontSize: 28, color: colors.ink, lineHeight: 32 },
  sectionTitleMobile: { fontSize: 22, lineHeight: 26 },
  link: { color: colors.blue, fontWeight: '700', fontSize: 13, letterSpacing: 1 },

  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  categoryChip: { backgroundColor: '#fff', borderColor: colors.line, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999 },
  categoryChipText: { color: colors.ink, fontWeight: '600', fontSize: 13 },

  eventsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 12 },
  eventCard: {
    backgroundColor: '#fff', borderColor: colors.line, borderWidth: 1, borderRadius: radius.md,
    padding: 18, gap: 6, minWidth: 240, flex: 1,
    ...shadow.sm,
  },
  eventCardMobile: { flexBasis: '100%' },
  eventDate: { color: colors.teal, fontWeight: '700', fontSize: 12, letterSpacing: 1 },
  eventTitle: { fontFamily: fonts.serif, fontSize: 18, color: colors.ink, lineHeight: 22 },
  eventFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, flexWrap: 'wrap', gap: 6 },
  eventRoom: { color: colors.ink2, fontSize: 12 },
  eventSpots: { color: colors.ink2, fontSize: 12, fontWeight: '600' },
});
