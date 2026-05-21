import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts } from '../theme';

export default function BookCover({ book, size = 'md' }) {
  if (!book) return null;
  const { palette } = book;
  const sizeStyle =
    size === 'lg' ? { width: 180, height: 270 } :
    size === 'sm' ? { width: 80,  height: 120 } :
                    { width: 130, height: 195 };
  const titleSize = size === 'lg' ? 22 : size === 'sm' ? 12 : 16;

  return (
    <LinearGradient
      colors={[palette.from, palette.to]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.cover, sizeStyle]}
    >
      <View style={[styles.band, { backgroundColor: palette.accent }]} />
      <View style={styles.topRow}>
        <Text style={styles.tag} numberOfLines={1}>{(book.tags && book.tags[0]) || 'Libro'}</Text>
        <View style={[styles.dot, { backgroundColor: palette.accent }]} />
      </View>
      <View>
        <Text style={[styles.title, { fontSize: titleSize }]} numberOfLines={3}>{book.title}</Text>
        <Text style={styles.author} numberOfLines={1}>{book.author}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cover: {
    borderRadius: 4,
    padding: 14,
    paddingLeft: 18,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  band: {
    position: 'absolute',
    left: 0, top: 0, bottom: 0, width: 6,
    opacity: 0.55,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  tag: { color: '#fff', fontSize: 9, letterSpacing: 1.8, textTransform: 'uppercase', opacity: 0.7 },
  dot: { width: 10, height: 10, borderRadius: 5, opacity: 0.85 },
  title: { color: '#fff', fontFamily: fonts.serif, lineHeight: 22 },
  author: { color: '#fff', fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', opacity: 0.78, marginTop: 8 },
});
