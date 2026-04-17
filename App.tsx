import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/context/UserContext';

// ─── Componente Raiz ───────────────────────────────────────────────────────

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
