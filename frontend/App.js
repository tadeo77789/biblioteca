import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './src/components/Header';
import AuthModal from './src/components/AuthModal';
import HomeScreen from './src/screens/HomeScreen';
import CatalogScreen from './src/screens/CatalogScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import EventsScreen from './src/screens/EventsScreen';
import AccountScreen from './src/screens/AccountScreen';
import { BOOKS, defaultLoans } from './src/data';
import { colors, fonts, radius, shadow } from './src/theme';

const STORAGE_KEY = 'biblio.state.v1';

export default function App() {
  const [route, setRoute] = useState('home');
  const [bookId, setBookId] = useState(null);
  const [catFilter, setCatFilter] = useState(null);
  const [search, setSearch] = useState('');

  const [user, setUser] = useState(null);
  const [loans, setLoans] = useState(defaultLoans());

  const [authVisible, setAuthVisible] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);
  const hydrated = useRef(false);

  // Restore from storage
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const stored = JSON.parse(raw);
          if (stored.user)  setUser(stored.user);
          if (stored.loans) setLoans(stored.loans);
        }
      } catch {}
      hydrated.current = true;
    })();
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ user, loans })).catch(() => {});
  }, [user, loans]);

  const navigate = useCallback((target, opts = {}) => {
    if (target === 'book' && opts.id) setBookId(opts.id);
    else setBookId(null);
    if (target === 'catalog' && opts.category) setCatFilter(opts.category);
    setRoute(target);
  }, []);

  const openBook = useCallback((id) => navigate('book', { id }), [navigate]);

  const pushToast = useCallback((t) => {
    const id = ++toastIdRef.current;
    setToasts(prev => [...prev, { id, ...t }]);
    setTimeout(() => setToasts(prev => prev.filter(x => x.id !== id)), 5500);
  }, []);
  const dismissToast = (id) => setToasts(prev => prev.filter(x => x.id !== id));

  const openAuth = useCallback((mode = 'login') => {
    setAuthMode(mode);
    setAuthVisible(true);
  }, []);

  const handleAuthSubmit = (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      cardNumber: '042-' + String(Math.floor(10000 + Math.random() * 89999)),
      branch: 'Sede central',
    };
    setUser(newUser);
    setAuthVisible(false);
    pushToast({
      kind: 'ok',
      title: authMode === 'login' ? '¡Bienvenido/a de nuevo!' : 'Carné digital activado',
      message: authMode === 'login'
        ? `Sesión iniciada como ${newUser.name}.`
        : `Tu carné nº #${newUser.cardNumber} ya está listo para usar.`,
    });
  };

  const logout = () => {
    setUser(null);
    setLoans(defaultLoans());
    pushToast({ kind: 'info', title: 'Sesión cerrada', message: 'Vuelve cuando quieras.' });
    setRoute('home');
  };

  const borrow = (id) => {
    if (!user) { openAuth('login'); return; }
    const today = new Date();
    const due = new Date(today); due.setDate(today.getDate() + 21);
    setLoans(prev => ({
      ...prev,
      active: [...prev.active, {
        bookId: id,
        borrowed: today.toISOString().slice(0, 10),
        due: due.toISOString().slice(0, 10),
      }],
    }));
    const b = BOOKS.find(x => x.id === id);
    pushToast({
      kind: 'ok',
      title: 'Préstamo confirmado',
      message: `«${b.title}» se ha añadido a tus préstamos activos. Devolver antes del ${due.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}.`,
    });
  };

  const reserve = (id) => {
    if (!user) { openAuth('login'); return; }
    const today = new Date();
    const ready = new Date(today); ready.setDate(today.getDate() + 14);
    setLoans(prev => ({
      ...prev,
      reservations: [...prev.reservations, {
        bookId: id,
        reservedOn: today.toISOString().slice(0, 10),
        estimatedReady: ready.toISOString().slice(0, 10),
      }],
    }));
    const b = BOOKS.find(x => x.id === id);
    pushToast({
      kind: 'info',
      title: 'Libro reservado',
      message: `Te avisaremos en cuanto «${b.title}» esté disponible (estimado: 14 días).`,
    });
  };

  const returnBook = (id) => {
    setLoans(prev => ({
      ...prev,
      active: prev.active.filter(l => l.bookId !== id),
      history: [{ bookId: id, returned: new Date().toISOString().slice(0, 10) }, ...prev.history],
    }));
    const b = BOOKS.find(x => x.id === id);
    pushToast({ kind: 'ok', title: 'Libro devuelto', message: `«${b.title}» se ha registrado como devuelto.` });
  };

  const renew = (id) => {
    setLoans(prev => ({
      ...prev,
      active: prev.active.map(l => {
        if (l.bookId !== id) return l;
        const newDue = new Date(l.due); newDue.setDate(newDue.getDate() + 14);
        return { ...l, due: newDue.toISOString().slice(0, 10) };
      }),
    }));
    const b = BOOKS.find(x => x.id === id);
    pushToast({ kind: 'ok', title: 'Préstamo renovado', message: `Has ganado 14 días más para «${b.title}».` });
  };

  const cancelReservation = (id) => {
    setLoans(prev => ({ ...prev, reservations: prev.reservations.filter(r => r.bookId !== id) }));
    pushToast({ kind: 'info', title: 'Reserva cancelada', message: 'Has liberado tu puesto en la cola.' });
  };

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar style="light" />
      <Header route={route} navigate={navigate} search={search} setSearch={setSearch} user={user} onAuth={openAuth} />

      <View style={styles.body}>
        {route === 'home'    && <HomeScreen navigate={navigate} />}
        {route === 'catalog' && <CatalogScreen navigate={navigate} search={search} setSearch={setSearch} initialCategory={catFilter} />}
        {route === 'events'  && <EventsScreen />}
        {route === 'account' && (
          <AccountScreen
            user={user}
            loans={loans}
            onReturn={returnBook}
            onRenew={renew}
            onCancelReservation={cancelReservation}
            openBook={openBook}
            openAuth={openAuth}
            onLogout={logout}
          />
        )}
        {route === 'book' && (
          <BookDetailScreen
            bookId={bookId}
            navigate={navigate}
            user={user}
            loans={loans}
            onBorrow={borrow}
            onReserve={reserve}
            openAuth={openAuth}
          />
        )}
      </View>

      <AuthModal
        visible={authVisible}
        mode={authMode}
        onClose={() => setAuthVisible(false)}
        onSubmit={handleAuthSubmit}
        onResetPassword={(email) => {
          pushToast({
            kind: 'info',
            title: 'Enlace enviado',
            message: `Si existe una cuenta para ${email}, recibirás un correo con instrucciones para restablecer la contraseña.`,
          });
        }}
      />

      <View style={[styles.toastStack, { pointerEvents: 'box-none' }]}>
        {toasts.map(t => (
          <View key={t.id} style={[styles.toast, t.kind === 'warn' ? styles.toastWarn : t.kind === 'info' ? styles.toastInfo : styles.toastOk]}>
            <View style={{ flex: 1 }}>
              {t.title ? <Text style={styles.toastTitle}>{t.title}</Text> : null}
              <Text style={styles.toastMsg}>{t.message}</Text>
            </View>
            <Pressable onPress={() => dismissToast(t.id)}><Text style={styles.toastClose}>✕</Text></Pressable>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  toastStack: { position: 'absolute', top: 90, right: 16, gap: 10, maxWidth: 360 },
  toast: {
    backgroundColor: '#fff', borderRadius: radius.md, padding: 14,
    borderColor: colors.line, borderWidth: 1, borderLeftWidth: 4,
    flexDirection: 'row', gap: 10, alignItems: 'flex-start',
    ...shadow.md,
  },
  toastOk:   { borderLeftColor: colors.teal },
  toastInfo: { borderLeftColor: colors.blue },
  toastWarn: { borderLeftColor: colors.warn },
  toastTitle: { fontWeight: '700', color: colors.ink, fontSize: 13, marginBottom: 2 },
  toastMsg: { color: colors.ink2, fontSize: 12, lineHeight: 17 },
  toastClose: { color: colors.ink3, fontSize: 14, paddingHorizontal: 4 },
});
