import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BOOKS, EVENTS, CATEGORIES } from '../data';
import BookCard from '../components/BookCard';
import { colors, fonts, radius, shadow } from '../theme';

export default function HomeScreen({ navigate }) {
  const featured = BOOKS.slice(0, 6);
  const newArrivals = BOOKS.slice(6, 12);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 60 }}>
      {/* Hero */}
      <LinearGradient
        colors={['#0e2f56', '#1A4B82', '#2a5e91']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.heroEyebrow}>RED MUNICIPAL · DESDE 1928</Text>
        <Text style={styles.heroTitle}>Mil historias{'\n'}para llevar a casa</Text>
        <Text style={styles.heroSubtitle}>
          Tu carné da acceso a doce sedes, miles de libros, talleres y salas de estudio.
          Reserva, retira y devuelve, todo en un solo lugar.
        </Text>
        <View style={styles.heroButtons}>
          <Pressable style={styles.btnTeal} onPress={() => navigate('catalog')}>
            <Text style={styles.btnTealText}>Explorar catálogo</Text>
          </Pressable>
          <Pressable style={styles.btnOutline} onPress={() => navigate('events')}>
            <Text style={styles.btnOutlineText}>Ver eventos</Text>
          </Pressable>
        </View>
      </LinearGradient>

      {/* Featured */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.eyebrow}>DESTACADOS DEL MES</Text>
            <Text style={styles.sectionTitle}>Lo que están leyendo en la red</Text>
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
            <View style={{ marginRight: 16 }}>
              <BookCard book={item} onPress={(id) => navigate('book', { id })} />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 28 }}
        />
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.eyebrow}>EXPLORA POR GÉNERO</Text>
        <Text style={styles.sectionTitle}>Encuentra tu próxima lectura</Text>
        <View style={styles.categoriesGrid}>
          {CATEGORIES.filter(c => c.id !== 'all').map(c => (
            <Pressable key={c.id} style={styles.categoryChip} onPress={() => navigate('catalog', { category: c.id })}>
              <Text style={styles.categoryChipText}>{c.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* New arrivals */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.eyebrow}>NOVEDADES</Text>
            <Text style={styles.sectionTitle}>Recién llegados a la red</Text>
          </View>
        </View>
        <FlatList
          horizontal
          data={newArrivals}
          keyExtractor={(b) => b.id}
          renderItem={({ item }) => (
            <View style={{ marginRight: 16 }}>
              <BookCard book={item} onPress={(id) => navigate('book', { id })} />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 28 }}
        />
      </View>

      {/* Events */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.eyebrow}>AGENDA</Text>
            <Text style={styles.sectionTitle}>Próximos eventos y talleres</Text>
          </View>
          <Pressable onPress={() => navigate('events')}>
            <Text style={styles.link}>Ver agenda →</Text>
          </Pressable>
        </View>
        <View style={styles.eventsGrid}>
          {EVENTS.map(ev => (
            <View key={ev.id} style={styles.eventCard}>
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
  heroEyebrow: { color: '#fff', opacity: 0.65, fontSize: 11, letterSpacing: 2.2 },
  heroTitle: { color: '#fff', fontFamily: fonts.serif, fontSize: 52, lineHeight: 56 },
  heroSubtitle: { color: 'rgba(255,255,255,0.82)', fontSize: 15, lineHeight: 22, maxWidth: 540 },
  heroButtons: { flexDirection: 'row', gap: 12, marginTop: 12 },
  btnTeal: { backgroundColor: colors.teal, paddingHorizontal: 18, paddingVertical: 12, borderRadius: radius.sm },
  btnTealText: { color: '#fff', fontWeight: '700', fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase' },
  btnOutline: { borderColor: 'rgba(255,255,255,0.5)', borderWidth: 1, paddingHorizontal: 18, paddingVertical: 12, borderRadius: radius.sm },
  btnOutlineText: { color: '#fff', fontWeight: '700', fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase' },

  section: { paddingTop: 48, paddingHorizontal: 28 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 },
  eyebrow: { color: colors.teal, fontSize: 11, letterSpacing: 2, fontWeight: '700', marginBottom: 6 },
  sectionTitle: { fontFamily: fonts.serif, fontSize: 28, color: colors.ink, lineHeight: 32 },
  link: { color: colors.blue, fontWeight: '700', fontSize: 13, letterSpacing: 1 },

  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 8 },
  categoryChip: { backgroundColor: '#fff', borderColor: colors.line, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999 },
  categoryChipText: { color: colors.ink, fontWeight: '600', fontSize: 13 },

  eventsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 8 },
  eventCard: {
    backgroundColor: '#fff', borderColor: colors.line, borderWidth: 1, borderRadius: radius.md,
    padding: 18, gap: 8, minWidth: 260, flex: 1,
    ...shadow.sm,
  },
  eventDate: { color: colors.teal, fontWeight: '700', fontSize: 12, letterSpacing: 1 },
  eventTitle: { fontFamily: fonts.serif, fontSize: 18, color: colors.ink, lineHeight: 22 },
  eventFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  eventRoom: { color: colors.ink2, fontSize: 12 },
  eventSpots: { color: colors.ink2, fontSize: 12, fontWeight: '600' },
});
