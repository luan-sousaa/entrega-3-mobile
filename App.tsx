import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';
import { getAuthState } from './src/services/storageService';

// ─── Componente Raiz ───────────────────────────────────────────────────────

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<'Login' | 'Home'>('Login');

  // Verifica se há sessão salva ao iniciar o app
  useEffect(() => {
    async function checkAuth() {
      try {
        const authState = await getAuthState();

        // Se "Lembrar de mim" estava ativo e o usuário estava logado,
        // redireciona direto para a Home
        if (authState?.isLoggedIn && authState?.rememberMe) {
          setInitialRoute('Home');
        }
      } catch (error) {
        console.warn('[App] Erro ao verificar autenticação:', error);
      } finally {
        setIsReady(true);
      }
    }

    checkAuth();
  }, []);

  // Splash screen enquanto verifica a sessão
  if (!isReady) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color="#1a73e8" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <AppNavigator />
    </NavigationContainer>
  );
}

// ─── Estilos ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
  },
});
