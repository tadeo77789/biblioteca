import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { BOOKS } from '../data';
import { colors, fonts, radius, shadow } from '../theme';

function daysUntil(iso) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const due = new Date(iso);
  return Math.round((due - today) / (1000 * 60 * 60 * 24));
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch { return iso; }
}

export default function AccountScreen({ user, loans, onReturn, onRenew, onCancelReservation, openBook, openAuth, onLogout }) {
  const [tab, setTab] = useState('active');

  if (!user) {
    return (
      <View style={styles.guestWrap}>
        <Text style={styles.guestTitle}>Acceso a tu cuenta</Text>
        <Text style={styles.guestText}>
          Inicia sesión para ver tus préstamos, reservas e historial. Si aún no tienes carné digital,
          puedes crear uno gratis en menos de un minuto.
        </Text>
        <View style={styles.guestBtns}>
          <Pressable style={styles.primaryBtn} onPress={() => openAuth('login')}>
            <Text style={styles.primaryBtnText}>Iniciar sesión</Text>
          </Pressable>
          <Pressable style={styles.ghostBtn} onPress={() => openAuth('register')}>
            <Text style={styles.ghostBtnText}>Crear carné</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const activeBooks = loans.active.map(l => ({ ...l, book: BOOKS.find(b => b.id === l.bookId) })).filter(x => x.book);
  const reservedBooks = loans.reservations.map(r => ({ ...r, book: BOOKS.find(b => b.id === r.bookId) })).filter(x => x.book);
  const historyBooks = loans.history.map(h => ({ ...h, book: BOOKS.find(b => b.id === h.bookId) })).filter(x => x.book);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 80 }}>
      <View style={styles.header}>
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userMeta}>Carné nº #{user.cardNumber} · {user.branch || 'Sede central'}</Text>
            <Text style={styles.userMetaDim}>{user.email}</Text>
          </View>
          <Pressable style={styles.logoutBtn} onPress={onLogout}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </Pressable>
        </View>

        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{activeBooks.length}</Text>
            <Text style={styles.statLabel}>Préstamos activos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{reservedBooks.length}</Text>
            <Text style={styles.statLabel}>Reservas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{historyBooks.length}</Text>
            <Text style={styles.statLabel}>Devueltos</Text>
          </View>
        </View>

        <View style={styles.tabs}>
          {[
            { id: 'active',  label: `Activos (${activeBooks.length})` },
            { id: 'reserved', label: `Reservas (${reservedBooks.length})` },
            { id: 'history', label: `Historial (${historyBooks.length})` },
          ].map(t => (
            <Pressable key={t.id} onPress={() => setTab(t.id)} style={[styles.tab, tab === t.id && styles.tabActive]}>
              <Text style={[styles.tabText, tab === t.id && styles.tabTextActive]}>{t.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.body}>
        {tab === 'active' && (
          activeBooks.length === 0
            ? <Empty title="Sin préstamos activos" text="Cuando solicites un libro, aparecerá aquí." />
            : activeBooks.map(item => {
                const days = daysUntil(item.due);
                const overdue = days < 0;
                const urgent = !overdue && days <= 3;
                return (
                  <View key={item.bookId} style={styles.row}>
                    <Pressable onPress={() => openBook(item.book.id)} style={styles.rowMain}>
                      <Text style={styles.rowTitle}>{item.book.title}</Text>
                      <Text style={styles.rowAuthor}>{item.book.author}</Text>
                      <Text style={[styles.rowMeta, overdue && styles.overdue, urgent && styles.urgent]}>
                        Devolver: {formatDate(item.due)}
                        {overdue ? ` · ${Math.abs(days)} días de atraso` : urgent ? ` · ${days} días restantes` : ''}
                      </Text>
                    </Pressable>
                    <View style={styles.rowActions}>
                      <Pressable style={styles.smallBtn} onPress={() => onRenew(item.bookId)}>
                        <Text style={styles.smallBtnText}>Renovar</Text>
                      </Pressable>
                      <Pressable style={[styles.smallBtn, styles.smallBtnPrimary]} onPress={() => onReturn(item.bookId)}>
                        <Text style={[styles.smallBtnText, { color: '#fff' }]}>Devolver</Text>
                      </Pressable>
                    </View>
                  </View>
                );
              })
        )}

        {tab === 'reserved' && (
          reservedBooks.length === 0
            ? <Empty title="Sin reservas" text="Reserva los libros que están prestados y te avisaremos." />
            : reservedBooks.map(item => (
                <View key={item.bookId} style={styles.row}>
                  <Pressable onPress={() => openBook(item.book.id)} style={styles.rowMain}>
                    <Text style={styles.rowTitle}>{item.book.title}</Text>
                    <Text style={styles.rowAuthor}>{item.book.author}</Text>
                    <Text style={styles.rowMeta}>Estimado disponible: {formatDate(item.estimatedReady)}</Text>
                  </Pressable>
                  <Pressable style={styles.smallBtn} onPress={() => onCancelReservation(item.bookId)}>
                    <Text style={styles.smallBtnText}>Cancelar</Text>
                  </Pressable>
                </View>
              ))
        )}

        {tab === 'history' && (
          historyBooks.length === 0
            ? <Empty title="Sin historial" text="Tus devoluciones aparecerán aquí." />
            : historyBooks.map(item => (
                <Pressable key={item.bookId + item.returned} onPress={() => openBook(item.book.id)} style={styles.row}>
                  <View style={styles.rowMain}>
                    <Text style={styles.rowTitle}>{item.book.title}</Text>
                    <Text style={styles.rowAuthor}>{item.book.author}</Text>
                    <Text style={styles.rowMeta}>Devuelto el {formatDate(item.returned)}</Text>
                  </View>
                </Pressable>
              ))
        )}
      </View>
    </ScrollView>
  );
}

function Empty({ title, text }) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: colors.bg },
  header: { padding: 40, paddingBottom: 0 },
  userCard: {
    flexDirection: 'row', alignItems: 'center', gap: 18,
    backgroundColor: '#fff', borderColor: colors.line, borderWidth: 1,
    borderRadius: radius.lg, padding: 22,
    ...shadow.sm,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 20 },
  userName: { fontFamily: fonts.serif, fontSize: 22, color: colors.ink },
  userMeta: { color: colors.ink2, fontSize: 13, marginTop: 2 },
  userMetaDim: { color: colors.ink3, fontSize: 12, marginTop: 2 },
  logoutBtn: { borderColor: colors.line, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.sm },
  logoutText: { color: colors.ink2, fontWeight: '600', fontSize: 12 },

  stats: { flexDirection: 'row', gap: 14, marginTop: 18 },
  statCard: { flex: 1, backgroundColor: '#fff', borderColor: colors.line, borderWidth: 1, borderRadius: radius.md, padding: 18 },
  statValue: { fontFamily: fonts.serif, fontSize: 36, color: colors.blue },
  statLabel: { color: colors.ink2, fontSize: 12, fontWeight: '600', letterSpacing: 0.6, marginTop: 4 },

  tabs: { flexDirection: 'row', gap: 6, marginTop: 22, borderBottomWidth: 1, borderBottomColor: colors.line },
  tab: { paddingVertical: 12, paddingHorizontal: 14 },
  tabActive: { borderBottomWidth: 2, borderBottomColor: colors.teal },
  tabText: { color: colors.ink2, fontWeight: '600', fontSize: 13 },
  tabTextActive: { color: colors.blue },

  body: { padding: 40, paddingTop: 24, gap: 10 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#fff', borderColor: colors.line, borderWidth: 1,
    borderRadius: radius.md, padding: 16,
    ...shadow.sm,
  },
  rowMain: { flex: 1 },
  rowTitle: { fontFamily: fonts.serif, fontSize: 18, color: colors.ink },
  rowAuthor: { color: colors.ink2, fontSize: 13, marginTop: 2 },
  rowMeta: { color: colors.ink2, fontSize: 12, marginTop: 6 },
  overdue: { color: colors.warn, fontWeight: '700' },
  urgent: { color: '#a06030', fontWeight: '600' },
  rowActions: { flexDirection: 'row', gap: 6 },
  smallBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.line, backgroundColor: '#fff' },
  smallBtnPrimary: { backgroundColor: colors.blue, borderColor: colors.blue },
  smallBtnText: { color: colors.ink, fontWeight: '600', fontSize: 12 },

  empty: { backgroundColor: '#fff', borderColor: colors.line, borderStyle: 'dashed', borderWidth: 1, borderRadius: radius.md, padding: 40, alignItems: 'center' },
  emptyTitle: { fontFamily: fonts.serif, fontSize: 20, color: colors.ink, marginBottom: 6 },
  emptyText: { color: colors.ink2, fontSize: 14, textAlign: 'center' },

  guestWrap: { padding: 60, alignItems: 'center', gap: 16, backgroundColor: colors.bg },
  guestTitle: { fontFamily: fonts.serif, fontSize: 32, color: colors.ink, textAlign: 'center' },
  guestText: { color: colors.ink2, fontSize: 15, lineHeight: 22, textAlign: 'center', maxWidth: 460 },
  guestBtns: { flexDirection: 'row', gap: 12, marginTop: 8 },
  primaryBtn: { backgroundColor: colors.blue, paddingHorizontal: 22, paddingVertical: 12, borderRadius: radius.sm },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase' },
  ghostBtn: { borderColor: colors.line, borderWidth: 1, paddingHorizontal: 22, paddingVertical: 12, borderRadius: radius.sm, backgroundColor: '#fff' },
  ghostBtnText: { color: colors.blue, fontWeight: '700', fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase' },
});
