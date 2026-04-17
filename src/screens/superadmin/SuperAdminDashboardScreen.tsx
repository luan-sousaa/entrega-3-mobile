import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, UserRole } from '../../types';
import { useUser, MOCK_USERS } from '../../context/UserContext';
import { getAllManagedArticles } from '../../services/managedNewsService';

// ─── Tipos ──────────────────────────────────────────────────────────────────

type SuperAdminDashboardNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SuperAdminDashboard'
>;

interface Props {
  navigation: SuperAdminDashboardNavigationProp;
}

// ─── Componente ────────────────────────────────────────────────────────────

const SuperAdminDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useUser();
  const [totalArticles, setTotalArticles] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const articles = await getAllManagedArticles();
        setTotalArticles(articles.length);
        setPublishedCount(articles.filter((a) => a.published).length);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  const handleSwitchRole = (role: UserRole) => {
    Alert.alert(
      'Simular Perfil',
      `Trocar para o perfil de ${MOCK_USERS[role].name} (${role})?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            setCurrentUser(MOCK_USERS[role]);
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  const ROLE_LABELS: Record<UserRole, string> = {
    leitor: 'Leitor',
    autor: 'Autor',
    editor: 'Editor',
    superadmin: 'Super Admin',
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Boas-vindas */}
      <View style={styles.welcomeCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {currentUser.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.welcomeLabel}>Bem-vindo,</Text>
        <Text style={styles.welcomeName}>{currentUser.name}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>Super Admin</Text>
        </View>
      </View>

      {/* Estatísticas */}
      <Text style={styles.sectionTitle}>Visão Geral</Text>
      {isLoading ? (
        <ActivityIndicator color="#e53935" style={{ marginVertical: 20 }} />
      ) : (
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, styles.statCardWide]}>
            <Text style={styles.statNumber}>{totalArticles}</Text>
            <Text style={styles.statLabel}>Total de Notícias</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#2e7d32' }]}>
              {publishedCount}
            </Text>
            <Text style={styles.statLabel}>Publicadas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {totalArticles - publishedCount}
            </Text>
            <Text style={styles.statLabel}>Rascunhos</Text>
          </View>
        </View>
      )}

      {/* Ações rápidas */}
      <Text style={styles.sectionTitle}>Ações Rápidas</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('EditorPainel')}
        >
          <Text style={styles.actionIcon}>📋</Text>
          <Text style={styles.actionLabel}>Painel do Editor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() =>
            Alert.alert('Em breve', 'Gerenciamento de usuários em desenvolvimento.')
          }
        >
          <Text style={styles.actionIcon}>👥</Text>
          <Text style={styles.actionLabel}>Gerenciar Usuários</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.actionIcon}>📰</Text>
          <Text style={styles.actionLabel}>Ver Notícias</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionCard, { opacity: 0.5 }]}
          disabled
        >
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionLabel}>Relatórios</Text>
        </TouchableOpacity>
      </View>

      {/* Simular perfil (ferramenta de desenvolvimento) */}
      <View style={styles.devSection}>
        <Text style={styles.devSectionTitle}>Simular Perfil (Dev)</Text>
        <Text style={styles.devSectionSubtitle}>
          Use para testar as telas de cada perfil
        </Text>
        <View style={styles.roleButtons}>
          {(Object.keys(MOCK_USERS) as UserRole[]).map((role) => (
            <TouchableOpacity
              key={role}
              style={[
                styles.roleButton,
                currentUser.role === role && styles.roleButtonActive,
              ]}
              onPress={() => handleSwitchRole(role)}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  currentUser.role === role && styles.roleButtonTextActive,
                ]}
              >
                {ROLE_LABELS[role]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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
    padding: 16,
    paddingBottom: 40,
  },
  welcomeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#e53935',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  welcomeLabel: {
    fontSize: 13,
    color: '#888888',
  },
  welcomeName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 10,
  },
  roleBadge: {
    backgroundColor: '#fce4ec',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  roleText: {
    fontSize: 13,
    color: '#e53935',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    minWidth: '30%',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statCardWide: {
    width: '100%',
    flex: 0,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '500',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    width: '47%',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    textAlign: 'center',
  },
  devSection: {
    backgroundColor: '#fff8e1',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ffe082',
  },
  devSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f57f17',
    marginBottom: 2,
  },
  devSectionSubtitle: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 12,
  },
  roleButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  roleButton: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  roleButtonActive: {
    backgroundColor: '#e53935',
    borderColor: '#e53935',
  },
  roleButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444444',
  },
  roleButtonTextActive: {
    color: '#ffffff',
  },
});

export default SuperAdminDashboardScreen;
