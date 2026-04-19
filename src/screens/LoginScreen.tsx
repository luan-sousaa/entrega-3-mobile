import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

// ─── Tipos ──────────────────────────────────────────────────────────────────

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

// ─── Perfis disponíveis ────────────────────────────────────────────────────

const ROLES = [
  {
    label: 'Leitor',
    icon: '📖',
    description: 'Leia e comente notícias',
    route: 'LoginLeitor' as const,
  },
  {
    label: 'Autor',
    icon: '✍️',
    description: 'Crie e gerencie suas notícias',
    route: 'LoginAutor' as const,
  },
  {
    label: 'Editor',
    icon: '📋',
    description: 'Revise e publique notícias',
    route: 'LoginEditor' as const,
  },
  {
    label: 'Super Admin',
    icon: '👑',
    description: 'Controle total do sistema',
    route: 'LoginSuperAdmin' as const,
  },
];

// ─── Componente ────────────────────────────────────────────────────────────

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Logo / Título */}
      <View style={styles.header}>
        <Text style={styles.logo}>📰</Text>
        <Text style={styles.appName}>NewsApp</Text>
        <Text style={styles.subtitle}>Selecione seu perfil para entrar</Text>
      </View>

      {/* Cards de perfil */}
      <View style={styles.cards}>
        {ROLES.map((role) => (
          <TouchableOpacity
            key={role.route}
            style={styles.card}
            onPress={() => navigation.navigate(role.route)}
            activeOpacity={0.85}
          >
            <Text style={styles.cardIcon}>{role.icon}</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.cardLabel}>{role.label}</Text>
              <Text style={styles.cardDescription}>{role.description}</Text>
            </View>
            <Text style={styles.cardArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// ─── Estilos ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f5',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginVertical: 32,
  },
  logo: {
    fontSize: 64,
    marginBottom: 12,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#888888',
  },
  cards: {
    gap: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardIcon: {
    fontSize: 36,
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 3,
  },
  cardDescription: {
    fontSize: 13,
    color: '#888888',
  },
  cardArrow: {
    fontSize: 26,
    color: '#e53935',
    fontWeight: '300',
  },
});

export default LoginScreen;
