import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from './src/components/Header';
import HomeScreen from './src/screens/HomeScreen';
import { colors, fonts } from './src/theme';

export default function App() {
  const [route, setRoute] = useState('home');
  const [search, setSearch] = useState('');

  const navigate = (next) => setRoute(next);

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar style="light" />
      <Header route={route} navigate={navigate} search={search} setSearch={setSearch} />
      <View style={styles.body}>
        {route === 'home' && <HomeScreen navigate={navigate} />}
        {route !== 'home' && (
          <ScrollView contentContainerStyle={styles.placeholder}>
            <Text style={styles.placeholderTitle}>En construcción</Text>
            <Text style={styles.placeholderText}>
              La vista "{route}" aún no está implementada. Esta POC solo incluye la pantalla de Inicio.
            </Text>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  placeholder: { padding: 60, alignItems: 'center', gap: 12 },
  placeholderTitle: { fontFamily: fonts.serif, fontSize: 28, color: colors.ink },
  placeholderText: { fontSize: 14, color: colors.ink2, textAlign: 'center', maxWidth: 400 },
});
