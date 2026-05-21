import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import BookCover from './BookCover';
import { colors, fonts, shadow } from '../theme';

export default function BookCard({ book, onPress, width }) {
  const avail = book.available > 0;
  return (
    <Pressable
      onPress={() => onPress && onPress(book.id)}
      style={({ pressed }) => [styles.card, width != null && { width }, pressed && styles.pressed]}
    >
      <View style={styles.coverWrap}>
        <BookCover book={book} size="md" />
      </View>
      <View style={styles.chipsRow}>
        {book.tags.slice(0, 2).map(t => (
          <View key={t} style={styles.chip}><Text style={styles.chipText}>{t}</Text></View>
        ))}
      </View>
      <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
      <Text style={styles.meta}>{book.author} · {book.year}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.rating}>★ {book.rating.toFixed(1)}</Text>
        <View style={[styles.statusChip, avail ? styles.chipTeal : styles.chipWarn]}>
          <Text style={[styles.statusText, { color: avail ? colors.tealDark : colors.warn }]}>
            {avail ? `${book.available} disp.` : 'No disp.'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 8,
    width: 220,
    ...shadow.sm,
  },
  pressed: { opacity: 0.9, transform: [{ translateY: -1 }] },
  coverWrap: { alignItems: 'center', marginBottom: 4 },
  chipsRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  chip: { backgroundColor: colors.gray, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  chipText: { fontSize: 10, fontWeight: '600', color: colors.ink2, letterSpacing: 0.8, textTransform: 'uppercase' },
  title: { fontFamily: fonts.serif, fontSize: 17, color: colors.ink, lineHeight: 20 },
  meta: { fontSize: 12, color: colors.ink2 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2, gap: 6 },
  rating: { color: '#E8A93B', fontWeight: '700', fontSize: 13 },
  statusChip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  statusText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase' },
  chipTeal: { backgroundColor: 'rgba(45,150,150,0.12)' },
  chipWarn: { backgroundColor: 'rgba(194,65,12,0.10)' },
});
