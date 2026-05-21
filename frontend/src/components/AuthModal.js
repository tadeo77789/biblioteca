import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Modal, StyleSheet } from 'react-native';
import { colors, fonts, radius, shadow } from '../theme';

export default function AuthModal({ visible, mode: initialMode, onClose, onSubmit }) {
  const [mode, setMode] = useState(initialMode || 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible) {
      setMode(initialMode || 'login');
      setName(''); setEmail(''); setPassword(''); setError('');
    }
  }, [visible, initialMode]);

  const submit = () => {
    if (!email || !password) {
      setError('Email y contraseña son obligatorios.');
      return;
    }
    if (mode === 'register' && !name) {
      setError('Necesitamos tu nombre para emitir el carné.');
      return;
    }
    const displayName = mode === 'register' ? name : (email.split('@')[0] || 'Socio');
    onSubmit({ name: displayName, email });
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Pressable onPress={onClose} style={styles.close}>
            <Text style={styles.closeText}>✕</Text>
          </Pressable>

          <Text style={styles.eyebrow}>{mode === 'login' ? 'ACCEDER' : 'NUEVO SOCIO'}</Text>
          <Text style={styles.title}>
            {mode === 'login' ? 'Bienvenido/a' : 'Crea tu carné digital'}
          </Text>
          <Text style={styles.subtitle}>
            {mode === 'login'
              ? 'Entra con tu correo para acceder a tus préstamos.'
              : 'Es gratuito. Te emitiremos un carné digital inmediatamente.'}
          </Text>

          {mode === 'register' && (
            <View style={styles.field}>
              <Text style={styles.label}>NOMBRE COMPLETO</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Ej. María García"
                placeholderTextColor={colors.ink3}
              />
            </View>
          )}

          <View style={styles.field}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="tu@email.com"
              placeholderTextColor={colors.ink3}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>CONTRASEÑA</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={colors.ink3}
              secureTextEntry
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable style={styles.submitBtn} onPress={submit}>
            <Text style={styles.submitText}>
              {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
            </Text>
          </Pressable>

          <Pressable onPress={() => setMode(mode === 'login' ? 'register' : 'login')}>
            <Text style={styles.switchText}>
              {mode === 'login'
                ? '¿No tienes carné? Hazte socio'
                : '¿Ya eres socio? Inicia sesión'}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(14,30,55,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: radius.lg,
    padding: 32,
    width: '100%',
    maxWidth: 460,
    gap: 14,
    ...shadow.md,
  },
  close: { position: 'absolute', top: 14, right: 14, width: 32, height: 32, borderRadius: 16, backgroundColor: colors.gray, alignItems: 'center', justifyContent: 'center' },
  closeText: { color: colors.ink2, fontWeight: '600' },
  eyebrow: { color: colors.teal, fontWeight: '700', fontSize: 11, letterSpacing: 2 },
  title: { fontFamily: fonts.serif, fontSize: 28, color: colors.ink, lineHeight: 32 },
  subtitle: { fontSize: 14, color: colors.ink2, marginBottom: 6 },
  field: { gap: 6 },
  label: { fontSize: 11, fontWeight: '700', color: colors.ink2, letterSpacing: 1.2 },
  input: {
    backgroundColor: '#fff', borderColor: colors.line, borderWidth: 1, borderRadius: radius.sm,
    paddingHorizontal: 14, paddingVertical: 11, fontSize: 14,
  },
  error: { color: colors.warn, fontSize: 13, fontWeight: '600' },
  submitBtn: { backgroundColor: colors.blue, paddingVertical: 13, borderRadius: radius.sm, alignItems: 'center', marginTop: 4 },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase' },
  switchText: { textAlign: 'center', color: colors.blue, fontWeight: '600', fontSize: 13, marginTop: 6 },
});
