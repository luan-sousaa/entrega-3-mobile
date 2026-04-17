import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { NewsArticleManaged, RootStackParamList } from '../../types';
import {
  getAllManagedArticles,
  togglePublish,
} from '../../services/managedNewsService';

// ─── Tipos ──────────────────────────────────────────────────────────────────

type EditorPainelNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditorPainel'
>;

interface Props {
  navigation: EditorPainelNavigationProp;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// ─── Componente ────────────────────────────────────────────────────────────

const EditorPainelScreen: React.FC<Props> = ({ navigation }) => {
  const [articles, setArticles] = useState<NewsArticleManaged[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const loadArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllManagedArticles();
      setArticles(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadArticles();
    }, [loadArticles])
  );

  const handleTogglePublish = async (article: NewsArticleManaged) => {
    const action = article.published ? 'despublicar' : 'publicar';
    Alert.alert(
      `Confirmar`,
      `Deseja ${action} "${article.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: action.charAt(0).toUpperCase() + action.slice(1),
          onPress: async () => {
            setTogglingId(article.id);
            try {
              await togglePublish(article.id);
              await loadArticles();
            } finally {
              setTogglingId(null);
            }
          },
        },
      ]
    );
  };

  const renderHeader = () => {
    const published = articles.filter((a) => a.published).length;
    const drafts = articles.length - published;
    return (
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{articles.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={[styles.statCard, styles.statCardHighlight]}>
          <Text style={[styles.statNumber, { color: '#2e7d32' }]}>
            {published}
          </Text>
          <Text style={styles.statLabel}>Publicadas</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{drafts}</Text>
          <Text style={styles.statLabel}>Rascunhos</Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }: { item: NewsArticleManaged }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.statusBadge,
            item.published ? styles.statusPublished : styles.statusDraft,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.published
                ? styles.statusTextPublished
                : styles.statusTextDraft,
            ]}
          >
            {item.published ? 'Publicada' : 'Rascunho'}
          </Text>
        </View>
        {item.uf && <Text style={styles.uf}>{item.uf}</Text>}
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
      <Text style={styles.date}>{formatDate(item.publishedAt)}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            item.published
              ? styles.toggleButtonUnpublish
              : styles.toggleButtonPublish,
          ]}
          onPress={() => handleTogglePublish(item)}
          disabled={togglingId === item.id}
        >
          {togglingId === item.id ? (
            <ActivityIndicator
              size="small"
              color={item.published ? '#e53935' : '#2e7d32'}
            />
          ) : (
            <Text
              style={[
                styles.toggleButtonText,
                item.published
                  ? styles.toggleTextUnpublish
                  : styles.toggleTextPublish,
              ]}
            >
              {item.published ? 'Despublicar' : 'Publicar'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate('EditarQualquerNoticia', { article: item })
          }
        >
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#e53935" />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.listContent}
      data={articles}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhuma notícia encontrada.</Text>
        </View>
      }
    />
  );
};

// ─── Estilos ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f5',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 12,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5f5',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statCardHighlight: {
    borderWidth: 1,
    borderColor: '#e8f5e9',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#888888',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  statusPublished: {
    backgroundColor: '#e8f5e9',
  },
  statusDraft: {
    backgroundColor: '#f5f5f5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextPublished: {
    color: '#2e7d32',
  },
  statusTextDraft: {
    color: '#757575',
  },
  uf: {
    fontSize: 12,
    color: '#e53935',
    fontWeight: '700',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a2e',
    lineHeight: 21,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 8,
  },
  date: {
    fontSize: 11,
    color: '#999999',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  toggleButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  toggleButtonPublish: {
    borderColor: '#2e7d32',
    backgroundColor: '#e8f5e9',
  },
  toggleButtonUnpublish: {
    borderColor: '#e53935',
    backgroundColor: '#fce4ec',
  },
  toggleButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  toggleTextPublish: {
    color: '#2e7d32',
  },
  toggleTextUnpublish: {
    color: '#e53935',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 13,
    color: '#444444',
    fontWeight: '600',
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999999',
  },
});

export default EditorPainelScreen;
