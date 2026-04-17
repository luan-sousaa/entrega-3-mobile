import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { useUser } from '../../context/UserContext';
import { getAllManagedArticles } from '../../services/managedNewsService';

// ─── Tipos ──────────────────────────────────────────────────────────────────

type EditorProfileNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditorProfile'
>;

interface Props {
  navigation: EditorProfileNavigationProp;
}

// ─── Componente ────────────────────────────────────────────────────────────

const EditorProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { currentUser } = useUser();
  const [total, setTotal] = useState(0);
  const [published, setPublished] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const articles = await getAllManagedArticles();
        setTotal(articles.length);
        setPublished(articles.filter((a) => a.published).length);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Card do perfil */}
      <View style={styles.profileCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {currentUser.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{currentUser.name}</Text>
        <Text style={styles.email}>{currentUser.email}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>Editor</Text>
        </View>
      </View>

      {/* Estatísticas */}
      {isLoading ? (
        <ActivityIndicator color="#e53935" style={{ marginVertical: 20 }} />
      ) : (
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={[styles.statCard, styles.statCardHighlight]}>
            <Text style={[styles.statNumber, { color: '#e53935' }]}>
              {published}
            </Text>
            <Text style={styles.statLabel}>Publicadas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{total - published}</Text>
            <Text style={styles.statLabel}>Rascunhos</Text>
          </View>
        </View>
      )}

      {/* Ação principal */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('EditorPainel')}
      >
        <Text style={styles.primaryButtonText}>Acessar Painel</Text>
      </TouchableOpacity>
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
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
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
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
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
  statsRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statCardHighlight: {
    borderWidth: 1,
    borderColor: '#fce4ec',
  },
  statNumber: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#e53935',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default EditorProfileScreen;
