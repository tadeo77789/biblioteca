import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { BOOKS } from '../data';
import { colors, fonts, radius, shadow } from '../theme';
import useBreakpoint from '../useBreakpoint';

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
  const { isMobile } = useBreakpoint();
  const [tab, setTab] = useState('active');
  const pad = isMobile ? 16 : 40;

  if (!user) {
    return (
      <View style={[styles.guestWrap, { padding: pad, paddingTop: 60 }]}>
        <Text style={[styles.guestTitle, isMobile && styles.guestTitleMobile]}>Acceso a tu cuenta</Text>
        <Text style={styles.guestText}>
          Inicia sesión para ver tus préstamos, reservas e historial. Si aún no tienes carné digital,
          puedes crear uno gratis en menos de un minuto.
        </Text>
        <View style={[styles.guestBtns, isMobile && { flexDirection: 'column', alignSelf: 'stretch' }]}>
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
      <View style={[styles.header, { padding: pad, paddingBottom: 0 }]}>
        <View style={[styles.userCard, isMobile && styles.userCardMobile]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}</Text>
          </View>
          <View style={{ flex: 1, minWidth: 180 }}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userMeta}>Carné nº #{user.cardNumber} · {user.branch || 'Sede central'}</Text>
            <Text style={styles.userMetaDim}>{user.email}</Text>
          </View>
          <Pressable style={styles.logoutBtn} onPress={onLogout}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </Pressable>
        </View>

        <View style={[styles.stats, isMobile && { flexDirection: 'row', gap: 8 }]}>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, isMobile && styles.statValueMobile]}>{activeBooks.length}</Text>
            <Text style={styles.statLabel}>Activos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, isMobile && styles.statValueMobile]}>{reservedBooks.length}</Text>
            <Text style={styles.statLabel}>Reservas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, isMobile && styles.statValueMobile]}>{historyBooks.length}</Text>
            <Text style={styles.statLabel}>Devueltos</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
          {[
            { id: 'active',  label: `Activos (${activeBooks.length})` },
            { id: 'reserved', label: `Reservas (${reservedBooks.length})` },
            { id: 'history', label: `Historial (${historyBooks.length})` },
          ].map(t => (
            <Pressable key={t.id} onPress={() => setTab(t.id)} style={[styles.tab, tab === t.id && styles.tabActive]}>
              <Text style={[styles.tabText, tab === t.id && styles.tabTextActive]}>{t.label}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.body, { padding: pad, paddingTop: 20 }]}>
        {tab === 'active' && (
          activeBooks.length === 0
            ? <Empty title="Sin préstamos activos" text="Cuando solicites un libro, aparecerá aquí." />
            : activeBooks.map(item => {
                const days = daysUntil(item.due);
                const overdue = days < 0;
                const urgent = !overdue && days <= 3;
                return (
                  <View key={item.bookId} style={[styles.row, isMobile && styles.rowMobile]}>
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
                <View key={item.bookId} style={[styles.row, isMobile && styles.rowMobile]}>
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
                <Pressable key={item.bookId + item.returned} onPress={() => openBook(item.book.id)} style={[styles.row, isMobile && styles.rowMobile]}>
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
  header: {},
  userCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#fff', borderColor: colors.line, borderWidth: 1,
    borderRadius: radius.lg, padding: 18,
    flexWrap: 'wrap',
    ...shadow.sm,
  },
  userCardMobile: { gap: 10 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  userName: { fontFamily: fonts.serif, fontSize: 20, color: colors.ink },
  userMeta: { color: colors.ink2, fontSize: 13, marginTop: 2 },
  userMetaDim: { color: colors.ink3, fontSize: 12, marginTop: 2 },
  logoutBtn: { borderColor: colors.line, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.sm },
  logoutText: { color: colors.ink2, fontWeight: '600', fontSize: 12 },

  stats: { flexDirection: 'row', gap: 12, marginTop: 14 },
  statCard: { flex: 1, backgroundColor: '#fff', borderColor: colors.line, borderWidth: 1, borderRadius: radius.md, padding: 14 },
  statValue: { fontFamily: fonts.serif, fontSize: 32, color: colors.blue },
  statValueMobile: { fontSize: 24 },
  statLabel: { color: colors.ink2, fontSize: 11, fontWeight: '600', letterSpacing: 0.6, marginTop: 2 },

  tabs: { flexDirection: 'row', gap: 4, marginTop: 18, borderBottomWidth: 1, borderBottomColor: colors.line },
  tab: { paddingVertical: 12, paddingHorizontal: 14 },
  tabActive: { borderBottomWidth: 2, borderBottomColor: colors.teal },
  tabText: { color: colors.ink2, fontWeight: '600', fontSize: 13 },
  tabTextActive: { color: colors.blue },

  body: { gap: 10 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#fff', borderColor: colors.line, borderWidth: 1,
    borderRadius: radius.md, padding: 14,
    ...shadow.sm,
  },
  rowMobile: { flexDirection: 'column', alignItems: 'stretch' },
  rowMain: { flex: 1 },
  rowTitle: { fontFamily: fonts.serif, fontSize: 17, color: colors.ink },
  rowAuthor: { color: colors.ink2, fontSize: 13, marginTop: 2 },
  rowMeta: { color: colors.ink2, fontSize: 12, marginTop: 6 },
  overdue: { color: colors.warn, fontWeight: '700' },
  urgent: { color: '#a06030', fontWeight: '600' },
  rowActions: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  smallBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.line, backgroundColor: '#fff' },
  smallBtnPrimary: { backgroundColor: colors.blue, borderColor: colors.blue },
  smallBtnText: { color: colors.ink, fontWeight: '600', fontSize: 12 },

  empty: { backgroundColor: '#fff', borderColor: colors.line, borderStyle: 'dashed', borderWidth: 1, borderRadius: radius.md, padding: 32, alignItems: 'center' },
  emptyTitle: { fontFamily: fonts.serif, fontSize: 18, color: colors.ink, marginBottom: 6 },
  emptyText: { color: colors.ink2, fontSize: 13, textAlign: 'center' },

  guestWrap: { alignItems: 'center', gap: 16, backgroundColor: colors.bg },
  guestTitle: { fontFamily: fonts.serif, fontSize: 28, color: colors.ink, textAlign: 'center' },
  guestTitleMobile: { fontSize: 22 },
  guestText: { color: colors.ink2, fontSize: 14, lineHeight: 20, textAlign: 'center', maxWidth: 460 },
  guestBtns: { flexDirection: 'row', gap: 12, marginTop: 8 },
  primaryBtn: { backgroundColor: colors.blue, paddingHorizontal: 22, paddingVertical: 12, borderRadius: radius.sm, alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase' },
  ghostBtn: { borderColor: colors.line, borderWidth: 1, paddingHorizontal: 22, paddingVertical: 12, borderRadius: radius.sm, backgroundColor: '#fff', alignItems: 'center' },
  ghostBtnText: { color: colors.blue, fontWeight: '700', fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase' },
});
