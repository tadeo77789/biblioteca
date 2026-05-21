import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';
import { BOOKS, CATEGORIES } from '../data';
import BookCard from '../components/BookCard';
import { colors, fonts, radius } from '../theme';
import useBreakpoint from '../useBreakpoint';

export default function CatalogScreen({ navigate, search, setSearch, initialCategory }) {
  const { isMobile, columns, width } = useBreakpoint();
  const [cat, setCat] = useState(initialCategory || 'all');
  const [availability, setAvailability] = useState('any');
  const [sort, setSort] = useState('relevance');

  const filtered = useMemo(() => {
    const q = (search || '').toLowerCase().trim();
    let list = BOOKS.filter(b => {
      if (cat !== 'all' && b.category !== cat) return false;
      if (availability === 'available' && b.available <= 0) return false;
      if (q && !`${b.title} ${b.author} ${b.tags.join(' ')}`.toLowerCase().includes(q)) return false;
      return true;
    });
    if (sort === 'rating') list = list.slice().sort((a, b) => b.rating - a.rating);
    else if (sort === 'year') list = list.slice().sort((a, b) => b.year - a.year);
    else if (sort === 'title') list = list.slice().sort((a, b) => a.title.localeCompare(b.title, 'es'));
    return list;
  }, [search, cat, availability, sort]);

  const pad = isMobile ? 16 : 40;
  const gap = 14;
  const gridWidth = width - pad * 2;
  const cardWidth = Math.max(150, (gridWidth - gap * (columns - 1)) / columns);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 60 }}>
      <View style={[styles.header, { padding: pad }]}>
        <Text style={styles.eyebrow}>CATÁLOGO</Text>
        <Text style={[styles.title, isMobile && styles.titleMobile]}>Explora la colección</Text>
        <Text style={styles.subtitle}>{BOOKS.length} libros en {CATEGORIES.length - 1} categorías</Text>

        <TextInput
          style={styles.search}
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por título, autor o tema…"
          placeholderTextColor={colors.ink3}
        />

        <View style={styles.filtersBox}>
          <Text style={styles.filterLabel}>CATEGORÍA</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            {CATEGORIES.map(c => {
              const active = cat === c.id;
              return (
                <Pressable key={c.id} onPress={() => setCat(c.id)} style={[styles.chip, active && styles.chipActive]}>
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{c.label}</Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={[styles.filterRow, isMobile && { flexDirection: 'column', gap: 12 }]}>
            <View style={{ flex: 1, minWidth: 200 }}>
              <Text style={styles.filterLabel}>DISPONIBILIDAD</Text>
              <View style={styles.toggleRow}>
                {[
                  { id: 'any',       label: 'Todos' },
                  { id: 'available', label: 'Disponibles' },
                ].map(opt => {
                  const active = availability === opt.id;
                  return (
                    <Pressable key={opt.id} onPress={() => setAvailability(opt.id)} style={[styles.toggle, active && styles.toggleActive]}>
                      <Text style={[styles.toggleText, active && styles.toggleTextActive]}>{opt.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
            <View style={{ flex: 1, minWidth: 200 }}>
              <Text style={styles.filterLabel}>ORDENAR POR</Text>
              <View style={styles.toggleRow}>
                {[
                  { id: 'relevance', label: 'Relevancia' },
                  { id: 'rating',    label: 'Valoración' },
                  { id: 'year',      label: 'Año' },
                  { id: 'title',     label: 'Título' },
                ].map(opt => {
                  const active = sort === opt.id;
                  return (
                    <Pressable key={opt.id} onPress={() => setSort(opt.id)} style={[styles.toggle, active && styles.toggleActive]}>
                      <Text style={[styles.toggleText, active && styles.toggleTextActive]}>{opt.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.results}>{filtered.length} resultados</Text>
      </View>

      <View style={[styles.grid, { paddingHorizontal: pad, gap }]}>
        {filtered.map(b => (
          <BookCard key={b.id} book={b} width={cardWidth} onPress={(id) => navigate('book', { id })} />
        ))}
        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Sin resultados</Text>
            <Text style={styles.emptyText}>Prueba con otra búsqueda o quita filtros.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: colors.bg },
  header: { paddingBottom: 16 },
  eyebrow: { color: colors.teal, fontWeight: '700', fontSize: 11, letterSpacing: 2 },
  title: { fontFamily: fonts.serif, fontSize: 40, color: colors.ink, lineHeight: 44, marginTop: 6 },
  titleMobile: { fontSize: 28, lineHeight: 32 },
  subtitle: { fontSize: 14, color: colors.ink2, marginTop: 6 },
  search: {
    backgroundColor: '#fff', borderColor: colors.line, borderWidth: 1, borderRadius: radius.sm,
    paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, marginTop: 20,
  },
  filtersBox: { backgroundColor: '#fff', borderColor: colors.line, borderWidth: 1, borderRadius: radius.md, padding: 16, marginTop: 14, gap: 12 },
  filterLabel: { fontSize: 10, fontWeight: '700', color: colors.ink2, letterSpacing: 1.2, marginBottom: 6 },
  filterRow: { flexDirection: 'row', gap: 20, flexWrap: 'wrap' },
  chipRow: { gap: 8, paddingVertical: 2 },
  chip: { backgroundColor: colors.gray, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999 },
  chipActive: { backgroundColor: colors.blue },
  chipText: { fontSize: 12, color: colors.ink2, fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  toggleRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  toggle: { backgroundColor: colors.gray, paddingHorizontal: 12, paddingVertical: 7, borderRadius: radius.sm },
  toggleActive: { backgroundColor: colors.teal },
  toggleText: { fontSize: 12, color: colors.ink2, fontWeight: '600' },
  toggleTextActive: { color: '#fff' },
  results: { color: colors.ink2, fontSize: 13, fontWeight: '600', marginTop: 14 },

  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  empty: { padding: 40, alignItems: 'center', width: '100%' },
  emptyTitle: { fontFamily: fonts.serif, fontSize: 22, color: colors.ink, marginBottom: 6 },
  emptyText: { color: colors.ink2, fontSize: 14 },
});
