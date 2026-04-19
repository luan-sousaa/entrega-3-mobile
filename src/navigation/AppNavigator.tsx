import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';

import { RootStackParamList, UserRole } from '../types';
import { useUser } from '../context/UserContext';

// Telas Públicas
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';

// Login por perfil
import LoginLeitorScreen from '../screens/login/LoginLeitorScreen';
import LoginAutorScreen from '../screens/login/LoginAutorScreen';
import LoginEditorScreen from '../screens/login/LoginEditorScreen';
import LoginSuperAdminScreen from '../screens/login/LoginSuperAdminScreen';

// Leitor
import LeitorProfileScreen from '../screens/leitor/LeitorProfileScreen';
import CommentScreen from '../screens/leitor/CommentScreen';

// Autor
import AutorProfileScreen from '../screens/autor/AutorProfileScreen';
import MinhasNoticiasScreen from '../screens/autor/MinhasNoticiasScreen';
import NovaNoticiaScreen from '../screens/autor/NovaNoticiaScreen';
import EditarNoticiaScreen from '../screens/autor/EditarNoticiaScreen';

// Editor
import EditorPainelScreen from '../screens/editor/EditorPainelScreen';
import EditorProfileScreen from '../screens/editor/EditorProfileScreen';
import EditarQualquerNoticiaScreen from '../screens/editor/EditarQualquerNoticiaScreen';

// Super Admin
import SuperAdminDashboardScreen from '../screens/superadmin/SuperAdminDashboardScreen';

// ─── Stack Navigator ───────────────────────────────────────────────────────

const Stack = createStackNavigator<RootStackParamList>();

// ─── Botão de Perfil no Header ─────────────────────────────────────────────

const PROFILE_ROUTES: Record<UserRole, keyof RootStackParamList> = {
  leitor: 'LeitorProfile',
  autor: 'AutorProfile',
  editor: 'EditorProfile',
  superadmin: 'SuperAdminDashboard',
};

const ProfileHeaderButton: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { currentUser } = useUser();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(PROFILE_ROUTES[currentUser.role])}
      style={{ marginRight: 16 }}
    >
      <Text style={{ fontSize: 14, color: '#e53935', fontWeight: '600' }}>
        Meu Perfil
      </Text>
    </TouchableOpacity>
  );
};

// ─── Componente ────────────────────────────────────────────────────────────

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
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
        cardStyle: { backgroundColor: '#fff5f5' },
      }}
    >
      {/* ── Telas Públicas ──────────────────────────────────────────────── */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Notícias',
          gestureEnabled: false,
          headerRight: () => <ProfileHeaderButton navigation={navigation} />,
        })}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Entrar', headerBackTitle: 'Voltar' }}
      />

      <Stack.Screen
        name="LoginLeitor"
        component={LoginLeitorScreen}
        options={{ title: 'Login — Leitor', headerBackTitle: 'Voltar' }}
      />

      <Stack.Screen
        name="LoginAutor"
        component={LoginAutorScreen}
        options={{ title: 'Login — Autor', headerBackTitle: 'Voltar' }}
      />

      <Stack.Screen
        name="LoginEditor"
        component={LoginEditorScreen}
        options={{ title: 'Login — Editor', headerBackTitle: 'Voltar' }}
      />

      <Stack.Screen
        name="LoginSuperAdmin"
        component={LoginSuperAdminScreen}
        options={{ title: 'Login — Super Admin', headerBackTitle: 'Voltar' }}
      />

      <Stack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={{ title: 'Notícia', headerBackTitle: 'Voltar' }}
      />

      {/* ── Leitor ──────────────────────────────────────────────────────── */}
      <Stack.Screen
        name="LeitorProfile"
        component={LeitorProfileScreen}
        options={{ title: 'Meu Perfil', headerBackTitle: 'Voltar' }}
      />

      <Stack.Screen
        name="Comment"
        component={CommentScreen}
        options={{ title: 'Comentar', headerBackTitle: 'Voltar' }}
      />

      {/* ── Autor ───────────────────────────────────────────────────────── */}
      <Stack.Screen
        name="AutorProfile"
        component={AutorProfileScreen}
        options={{ title: 'Meu Perfil', headerBackTitle: 'Voltar' }}
      />

      <Stack.Screen
        name="MinhasNoticias"
        component={MinhasNoticiasScreen}
        options={({ navigation }) => ({
          title: 'Minhas Notícias',
          headerBackTitle: 'Voltar',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('NovaNoticia')}
              style={{ marginRight: 16 }}
            >
              <Text style={{ fontSize: 24, color: '#e53935', fontWeight: '300' }}>
                +
              </Text>
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="NovaNoticia"
        component={NovaNoticiaScreen}
        options={{ title: 'Nova Notícia', headerBackTitle: 'Voltar' }}
      />

      <Stack.Screen
        name="EditarNoticia"
        component={EditarNoticiaScreen}
        options={{ title: 'Editar Notícia', headerBackTitle: 'Voltar' }}
      />

      {/* ── Editor ──────────────────────────────────────────────────────── */}
      <Stack.Screen
        name="EditorPainel"
        component={EditorPainelScreen}
        options={{ title: 'Painel do Editor', headerBackTitle: 'Voltar' }}
      />

      <Stack.Screen
        name="EditorProfile"
        component={EditorProfileScreen}
        options={{ title: 'Meu Perfil', headerBackTitle: 'Voltar' }}
      />

      <Stack.Screen
        name="EditarQualquerNoticia"
        component={EditarQualquerNoticiaScreen}
        options={{ title: 'Editar Notícia', headerBackTitle: 'Voltar' }}
      />

      {/* ── Super Admin ─────────────────────────────────────────────────── */}
      <Stack.Screen
        name="SuperAdminDashboard"
        component={SuperAdminDashboardScreen}
        options={{ title: 'Dashboard', headerBackTitle: 'Voltar' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
