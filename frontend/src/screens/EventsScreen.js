import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { EVENTS } from '../data';
import { colors, fonts, radius, shadow } from '../theme';
import useBreakpoint from '../useBreakpoint';

export default function EventsScreen() {
  const { isMobile } = useBreakpoint();
  const pad = isMobile ? 16 : 40;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { padding: pad }]}>
      <Text style={styles.eyebrow}>AGENDA · MAYO / JUNIO</Text>
      <Text style={[styles.title, isMobile && styles.titleMobile]}>Eventos y talleres</Text>
      <Text style={styles.subtitle}>
        Encuentros gratuitos para socios. La inscripción se confirma por correo.
      </Text>

      <View style={styles.grid}>
        {EVENTS.map(ev => (
          <View key={ev.id} style={[styles.card, isMobile && styles.cardMobile]}>
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeText}>{ev.date}</Text>
              <Text style={styles.timeText}>{ev.time}</Text>
            </View>
            <Text style={styles.cardTitle}>{ev.title}</Text>
            <View style={styles.meta}>
              <Text style={styles.metaText}>📍 {ev.room}</Text>
              <Text style={styles.metaText}>🪑 {ev.spots}</Text>
            </View>
            <Pressable style={styles.btn}>
              <Text style={styles.btnText}>Apuntarse</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: colors.bg },
  content: { paddingBottom: 80 },
  eyebrow: { color: colors.teal, fontWeight: '700', fontSize: 11, letterSpacing: 2, marginBottom: 8 },
  title: { fontFamily: fonts.serif, fontSize: 36, color: colors.ink, lineHeight: 40 },
  titleMobile: { fontSize: 26, lineHeight: 30 },
  subtitle: { fontSize: 14, color: colors.ink2, marginTop: 8, maxWidth: 540, lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 24 },
  card: {
    backgroundColor: '#fff', borderColor: colors.line, borderWidth: 1,
    borderRadius: radius.md, padding: 18, gap: 10,
    minWidth: 260, flex: 1, maxWidth: 380,
    ...shadow.sm,
  },
  cardMobile: { flexBasis: '100%', maxWidth: '100%' },
  dateBadge: { flexDirection: 'row', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' },
  dateBadgeText: { color: colors.teal, fontWeight: '700', fontSize: 13, letterSpacing: 1 },
  timeText: { color: colors.ink2, fontSize: 13, fontWeight: '600' },
  cardTitle: { fontFamily: fonts.serif, fontSize: 20, color: colors.ink, lineHeight: 24 },
  meta: { gap: 6, marginTop: 2 },
  metaText: { fontSize: 13, color: colors.ink2 },
  btn: { backgroundColor: colors.blue, paddingVertical: 12, borderRadius: radius.sm, alignItems: 'center', marginTop: 4 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase' },
});
