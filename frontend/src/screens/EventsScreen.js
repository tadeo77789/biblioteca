import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { EVENTS } from '../data';
import { colors, fonts, radius, shadow } from '../theme';

export default function EventsScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>AGENDA · MAYO / JUNIO</Text>
      <Text style={styles.title}>Eventos y talleres</Text>
      <Text style={styles.subtitle}>
        Encuentros gratuitos para socios. La inscripción se confirma por correo.
      </Text>

      <View style={styles.grid}>
        {EVENTS.map(ev => (
          <View key={ev.id} style={styles.card}>
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
  content: { padding: 40, paddingBottom: 80 },
  eyebrow: { color: colors.teal, fontWeight: '700', fontSize: 11, letterSpacing: 2, marginBottom: 8 },
  title: { fontFamily: fonts.serif, fontSize: 40, color: colors.ink, lineHeight: 44 },
  subtitle: { fontSize: 15, color: colors.ink2, marginTop: 10, maxWidth: 540, lineHeight: 22 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 18, marginTop: 32 },
  card: {
    backgroundColor: '#fff', borderColor: colors.line, borderWidth: 1,
    borderRadius: radius.md, padding: 22, gap: 12,
    minWidth: 280, flex: 1, maxWidth: 380,
    ...shadow.sm,
  },
  dateBadge: { flexDirection: 'row', alignItems: 'baseline', gap: 10 },
  dateBadgeText: { color: colors.teal, fontWeight: '700', fontSize: 13, letterSpacing: 1 },
  timeText: { color: colors.ink2, fontSize: 13, fontWeight: '600' },
  cardTitle: { fontFamily: fonts.serif, fontSize: 22, color: colors.ink, lineHeight: 26 },
  meta: { gap: 6, marginTop: 4 },
  metaText: { fontSize: 13, color: colors.ink2 },
  btn: { backgroundColor: colors.blue, paddingVertical: 12, borderRadius: radius.sm, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase' },
});
