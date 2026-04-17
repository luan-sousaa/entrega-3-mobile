import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { NewsArticleManaged, RootStackParamList } from '../../types';
import { useUser } from '../../context/UserContext';
import { getArticlesByAuthor } from '../../services/managedNewsService';

// ─── Tipos ──────────────────────────────────────────────────────────────────

type MinhasNoticiasNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MinhasNoticias'
>;

interface Props {
  navigation: MinhasNoticiasNavigationProp;
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

const MinhasNoticiasScreen: React.FC<Props> = ({ navigation }) => {
  const { currentUser } = useUser();
  const [articles, setArticles] = useState<NewsArticleManaged[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getArticlesByAuthor(currentUser.id);
      setArticles(data);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser.id]);

  useFocusEffect(
    useCallback(() => {
      loadArticles();
    }, [loadArticles])
  );

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

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditarNoticia', { article: item })}
      >
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>
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
      contentContainerStyle={
        articles.length === 0 ? styles.emptyContainer : styles.listContent
      }
      data={articles}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Nenhuma notícia ainda</Text>
          <Text style={styles.emptyMessage}>
            Crie sua primeira notícia tocando no botão abaixo.
          </Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('NovaNoticia')}
          >
            <Text style={styles.createButtonText}>+ Criar Notícia</Text>
          </TouchableOpacity>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5f5',
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
  editButton: {
    backgroundColor: '#fce4ec',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    color: '#e53935',
    fontWeight: '600',
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: '#e53935',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  createButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default MinhasNoticiasScreen;
