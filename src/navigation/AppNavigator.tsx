import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, Alert } from 'react-native';

import { RootStackParamList } from '../types';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import { clearAuthState } from '../services/storageService';

// ─── Stack Navigator ───────────────────────────────────────────────────────

const Stack = createStackNavigator<RootStackParamList>();

// ─── Componente ────────────────────────────────────────────────────────────

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 2,
          shadowOpacity: 0.1,
        },
        headerTintColor: '#1a1a2e',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
        cardStyle: { backgroundColor: '#f0f4ff' },
      }}
    >
      {/* Tela de Login */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      {/* Tela Home */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: '📰 NewsApp',
          headerLeft: () => null, // Remove botão de voltar
          gestureEnabled: false,  // Impede swipe para voltar ao login
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Sair', 'Deseja realmente sair?', [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                      await clearAuthState();
                      navigation.replace('Login');
                    },
                  },
                ]);
              }}
              style={{ marginRight: 16 }}
            >
              <Text
                style={{ fontSize: 14, color: '#1a73e8', fontWeight: '600' }}
              >
                Sair
              </Text>
            </TouchableOpacity>
          ),
        })}
      />

      {/* Tela de Detalhes da Notícia */}
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={() => ({
          title: 'Notícia',
          headerBackTitle: 'Voltar',
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
