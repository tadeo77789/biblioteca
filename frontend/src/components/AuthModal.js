import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Modal, StyleSheet } from 'react-native';
import { colors, fonts, radius, shadow } from '../theme';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateEmail(email) {
  if (!email) return 'El email es obligatorio.';
  if (!EMAIL_RE.test(email)) return 'Introduce un email válido (ej. nombre@dominio.com).';
  return '';
}

function validatePassword(password) {
  if (!password) return 'La contraseña es obligatoria.';
  if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
  return '';
}

function validateName(name) {
  if (!name || name.trim().length < 2) return 'Introduce tu nombre completo.';
  return '';
}

export default function AuthModal({ visible, mode: initialMode, onClose, onSubmit, onResetPassword }) {
  const [mode, setMode] = useState(initialMode || 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState('');

  useEffect(() => {
    if (visible) {
      setMode(initialMode || 'login');
      setName(''); setEmail(''); setPassword('');
      setErrors({}); setInfo('');
    }
  }, [visible, initialMode]);

  const changeMode = (next) => {
    setMode(next);
    setErrors({});
    setInfo('');
    setPassword('');
  };

  const submit = () => {
    const next = {};
    next.email = validateEmail(email);
    if (mode !== 'forgot') next.password = validatePassword(password);
    if (mode === 'register') next.name = validateName(name);

    const hasError = Object.values(next).some(Boolean);
    setErrors(next);
    if (hasError) return;

    if (mode === 'forgot') {
      onResetPassword && onResetPassword(email);
      setInfo(`Si existe una cuenta para ${email}, recibirás un enlace para restablecer tu contraseña.`);
      return;
    }

    const displayName = mode === 'register' ? name.trim() : (email.split('@')[0] || 'Socio');
    onSubmit({ name: displayName, email });
  };

  const titles = {
    login:    { eyebrow: 'ACCEDER',     title: 'Bienvenido/a',           subtitle: 'Entra con tu correo para acceder a tus préstamos.' },
    register: { eyebrow: 'NUEVO SOCIO', title: 'Crea tu carné digital',  subtitle: 'Es gratuito. Te emitiremos un carné digital inmediatamente.' },
    forgot:   { eyebrow: 'RECUPERAR',   title: 'Restablece tu contraseña', subtitle: 'Introduce tu email y te enviaremos un enlace para crear una nueva contraseña.' },
  };
  const t = titles[mode];

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Pressable onPress={onClose} style={styles.close} accessibilityLabel="Cerrar">
            <Text style={styles.closeText}>✕</Text>
          </Pressable>

          <Text style={styles.eyebrow}>{t.eyebrow}</Text>
          <Text style={styles.title}>{t.title}</Text>
          <Text style={styles.subtitle}>{t.subtitle}</Text>

          {mode === 'register' && (
            <View style={styles.field}>
              <Text style={styles.label}>NOMBRE COMPLETO</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={name}
                onChangeText={(v) => { setName(v); if (errors.name) setErrors({ ...errors, name: '' }); }}
                placeholder="Ej. María García"
                placeholderTextColor={colors.ink3}
                autoCapitalize="words"
                autoComplete="name"
              />
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>
          )}

          <View style={styles.field}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={email}
              onChangeText={(v) => { setEmail(v); if (errors.email) setErrors({ ...errors, email: '' }); }}
              onBlur={() => { const err = validateEmail(email); if (err) setErrors({ ...errors, email: err }); }}
              placeholder="tu@email.com"
              placeholderTextColor={colors.ink3}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              autoComplete="email"
              inputMode="email"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          {mode !== 'forgot' && (
            <View style={styles.field}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>CONTRASEÑA</Text>
                {mode === 'login' && (
                  <Pressable onPress={() => changeMode('forgot')}>
                    <Text style={styles.smallLink}>¿La olvidaste?</Text>
                  </Pressable>
                )}
              </View>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                value={password}
                onChangeText={(v) => { setPassword(v); if (errors.password) setErrors({ ...errors, password: '' }); }}
                placeholder={mode === 'register' ? 'Mínimo 6 caracteres' : '••••••••'}
                placeholderTextColor={colors.ink3}
                secureTextEntry
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              />
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
            </View>
          )}

          {info ? <Text style={styles.info}>{info}</Text> : null}

          <Pressable style={styles.submitBtn} onPress={submit}>
            <Text style={styles.submitText}>
              {mode === 'login'    ? 'Iniciar sesión'
                : mode === 'register' ? 'Crear cuenta'
                                      : 'Enviar enlace'}
            </Text>
          </Pressable>

          <View style={styles.switchRow}>
            {mode === 'login' && (
              <Pressable onPress={() => changeMode('register')}>
                <Text style={styles.switchText}>¿No tienes carné? <Text style={styles.switchTextBold}>Hazte socio</Text></Text>
              </Pressable>
            )}
            {mode === 'register' && (
              <Pressable onPress={() => changeMode('login')}>
                <Text style={styles.switchText}>¿Ya eres socio? <Text style={styles.switchTextBold}>Inicia sesión</Text></Text>
              </Pressable>
            )}
            {mode === 'forgot' && (
              <Pressable onPress={() => changeMode('login')}>
                <Text style={styles.switchText}>← Volver al inicio de sesión</Text>
              </Pressable>
            )}
          </View>
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
  subtitle: { fontSize: 14, color: colors.ink2, marginBottom: 6, lineHeight: 20 },
  field: { gap: 6 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 11, fontWeight: '700', color: colors.ink2, letterSpacing: 1.2 },
  smallLink: { fontSize: 11, fontWeight: '700', color: colors.blue, letterSpacing: 0.4 },
  input: {
    backgroundColor: '#fff', borderColor: colors.line, borderWidth: 1, borderRadius: radius.sm,
    paddingHorizontal: 14, paddingVertical: 11, fontSize: 14,
  },
  inputError: { borderColor: colors.warn, backgroundColor: 'rgba(194,65,12,0.04)' },
  errorText: { color: colors.warn, fontSize: 12, fontWeight: '600' },
  info: { color: colors.tealDark, fontSize: 13, fontWeight: '600', backgroundColor: 'rgba(45,150,150,0.10)', padding: 12, borderRadius: radius.sm, lineHeight: 18 },
  submitBtn: { backgroundColor: colors.blue, paddingVertical: 13, borderRadius: radius.sm, alignItems: 'center', marginTop: 4 },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase' },
  switchRow: { alignItems: 'center', marginTop: 6 },
  switchText: { color: colors.ink2, fontSize: 13 },
  switchTextBold: { color: colors.blue, fontWeight: '700' },
});
