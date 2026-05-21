import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { BOOKS, CATEGORIES } from '../data';
import BookCover from '../components/BookCover';
import BookCard from '../components/BookCard';
import { colors, fonts, radius, shadow } from '../theme';

const SYNOPSIS = {
  b01: 'Una guardabosques regresa a su pueblo natal después de veinte años para descubrir que los árboles guardan más secretos que las personas.',
  b02: 'Cien años contados a través de fotografías, carteles y testimonios. Un recorrido riguroso y emocionante por las transformaciones culturales de una era.',
  b03: 'Doce historias para leer en voz alta antes de dormir. Piratas amables, dragones tímidos y exploradoras curiosas.',
  b04: 'De la edición genética a los límites del cosmos: diez frentes abiertos de la ciencia contemporánea contados con claridad.',
  b05: 'Un manifiesto cálido a favor del tiempo, los caldos largos y las recetas que se cuentan a media voz.',
  b06: 'Una geografía íntima trazada en sesenta poemas: ciudades imaginarias, mapas amorosos y rutas que solo se recorren caminando despacio.',
  b07: 'Un puente práctico entre el lenguaje del diseño y el de la ingeniería. Sistemas, tokens y rituales para equipos que envían producto cada semana.',
  b08: 'La historia silenciada de las astrónomas del Observatorio de Harvard que catalogaron cientos de miles de estrellas a finales del siglo XIX.',
  b09: 'Veinte metros cuadrados son suficientes. Una guía afable para diseñar y cuidar un jardín comestible en balcones y patios.',
  b10: 'Qué dice exactamente un modelo cuando hablamos con él, y qué decimos nosotros al escucharlo. Un ensayo lúcido sobre lenguaje, código y conversación.',
  b11: 'Cincuenta años de fotografía documental española vistos desde el cuarto oscuro.',
  b12: 'Un copista descubre, en el reverso de un manuscrito medieval, una segunda historia escrita en una lengua que nadie ha leído en seiscientos años.',
  b13: 'Un álbum ilustrado sobre la amistad entre dos niños de pueblos costeros separados por una marea que cambia cada tarde.',
  b14: 'Un recorrido por la arquitectura humana: huesos como vigas, vasos como sistemas hidráulicos, neuronas como ciudades en miniatura.',
  b15: 'Rótulos pintados a mano, persianas viejas y carteles de mercerías: una arqueología cariñosa de la tipografía urbana ibérica.',
  b16: 'Cuarenta poemas escritos durante un invierno templado. Domesticidad, afectos largos y la sintaxis lenta de los días sin nada particular.',
};

export default function BookDetailScreen({ bookId, navigate, user, loans, onBorrow, onReserve, openAuth }) {
  const book = BOOKS.find(b => b.id === bookId);
  if (!book) return null;

  const alreadyBorrowed = loans?.active?.some(l => l.bookId === book.id);
  const alreadyReserved = loans?.reservations?.some(r => r.bookId === book.id);
  const avail = book.available > 0;
  const category = CATEGORIES.find(c => c.id === book.category);
  const related = BOOKS.filter(b => b.category === book.category && b.id !== book.id).slice(0, 4);

  const handleAction = () => {
    if (!user) { openAuth('login'); return; }
    if (alreadyBorrowed) return;
    if (avail) onBorrow(book.id);
    else if (!alreadyReserved) onReserve(book.id);
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 60 }}>
      <Pressable onPress={() => navigate('catalog')} style={styles.back}>
        <Text style={styles.backText}>← Volver al catálogo</Text>
      </Pressable>

      <View style={styles.hero}>
        <View style={styles.coverWrap}>
          <BookCover book={book} size="lg" />
        </View>
        <View style={styles.info}>
          <Text style={styles.cat}>{category?.label || book.category}</Text>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author} · {book.year}</Text>
          <View style={styles.tags}>
            {book.tags.map(t => (
              <View key={t} style={styles.tagChip}><Text style={styles.tagText}>{t}</Text></View>
            ))}
          </View>
          <View style={styles.metaRow}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>VALORACIÓN</Text>
              <Text style={styles.metaValue}>★ {book.rating.toFixed(1)}</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>PÁGINAS</Text>
              <Text style={styles.metaValue}>{book.pages}</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>ISBN</Text>
              <Text style={styles.metaValueSmall}>{book.isbn}</Text>
            </View>
          </View>

          <View style={[styles.availBox, avail ? styles.availOk : styles.availWarn]}>
            <Text style={[styles.availTitle, { color: avail ? colors.tealDark : colors.warn }]}>
              {avail ? `${book.available} de ${book.total} ejemplares disponibles` : 'No hay ejemplares disponibles'}
            </Text>
            <Text style={styles.availSub}>
              {avail ? 'Recógelo en cualquiera de las 12 sedes.' : 'Puedes reservarlo y te avisaremos.'}
            </Text>
          </View>

          <Pressable
            style={[styles.actionBtn, alreadyBorrowed && styles.actionDisabled]}
            onPress={handleAction}
            disabled={alreadyBorrowed}
          >
            <Text style={styles.actionText}>
              {alreadyBorrowed ? 'Ya lo tienes prestado'
                : alreadyReserved ? 'Reservado · gestionar en Mi cuenta'
                : !user ? 'Inicia sesión para solicitar'
                : avail ? 'Solicitar préstamo' : 'Reservar libro'}
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sinopsis</Text>
        <Text style={styles.synopsis}>{SYNOPSIS[book.id] || 'Una obra a descubrir.'}</Text>
      </View>

      {related.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>También en {category?.label}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {related.map(r => (
              <View key={r.id} style={{ marginRight: 16 }}>
                <BookCard book={r} onPress={(id) => navigate('book', { id })} />
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: colors.bg },
  back: { padding: 24, paddingBottom: 0 },
  backText: { color: colors.blue, fontWeight: '600', fontSize: 13 },
  hero: { flexDirection: 'row', flexWrap: 'wrap', gap: 40, padding: 40, paddingTop: 24 },
  coverWrap: { alignItems: 'center' },
  info: { flex: 1, minWidth: 260, gap: 12 },
  cat: { color: colors.teal, fontWeight: '700', fontSize: 11, letterSpacing: 2 },
  title: { fontFamily: fonts.serif, fontSize: 40, color: colors.ink, lineHeight: 44 },
  author: { fontSize: 16, color: colors.ink2 },
  tags: { flexDirection: 'row', gap: 8, marginTop: 4, flexWrap: 'wrap' },
  tagChip: { backgroundColor: colors.gray, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999 },
  tagText: { fontSize: 11, fontWeight: '600', color: colors.ink2, letterSpacing: 1, textTransform: 'uppercase' },
  metaRow: { flexDirection: 'row', gap: 28, marginTop: 8 },
  metaCol: { gap: 4 },
  metaLabel: { fontSize: 10, color: colors.ink3, letterSpacing: 1.2, fontWeight: '700' },
  metaValue: { fontSize: 18, color: colors.ink, fontWeight: '700' },
  metaValueSmall: { fontSize: 13, color: colors.ink },
  availBox: { borderRadius: radius.md, padding: 16, marginTop: 14 },
  availOk: { backgroundColor: 'rgba(45,150,150,0.10)' },
  availWarn: { backgroundColor: 'rgba(194,65,12,0.08)' },
  availTitle: { fontWeight: '700', fontSize: 14 },
  availSub: { color: colors.ink2, fontSize: 12, marginTop: 4 },
  actionBtn: { backgroundColor: colors.blue, paddingVertical: 14, borderRadius: radius.sm, alignItems: 'center', marginTop: 12 },
  actionDisabled: { backgroundColor: colors.ink3 },
  actionText: { color: '#fff', fontWeight: '700', fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase' },

  section: { paddingHorizontal: 40, marginTop: 32 },
  sectionTitle: { fontFamily: fonts.serif, fontSize: 24, color: colors.ink, marginBottom: 14 },
  synopsis: { fontSize: 15, color: colors.ink2, lineHeight: 24, maxWidth: 720 },
});
