import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NewsArticle, RootStackParamList } from '../types';
import { fetchNews } from '../services/newsService';
import NewsCard from '../components/NewsCard';
import SearchBar from '../components/SearchBar';
import UFPicker from '../components/UFPicker';
import LoadingIndicator from '../components/LoadingIndicator';
import EmptyState from '../components/EmptyState';

// ─── Tipos ──────────────────────────────────────────────────────────────────

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

// ─── Componente ────────────────────────────────────────────────────────────

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingQuery, setPendingQuery] = useState('');
  const [selectedUF, setSelectedUF] = useState('TODOS');

  // ── Busca de Notícias ─────────────────────────────────────────────────────

  const loadNews = useCallback(
    async (query: string, uf: string, refreshing = false) => {
      if (refreshing) {
        setIsRefreshing(true);
      } else if (!articles.length) {
        setIsLoading(true);
      }
      setError(null);

      try {
        const data = await fetchNews(query, uf);
        setArticles(data);
      } catch (err) {
        setError('Não foi possível carregar as notícias. Tente novamente.');
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [articles.length]
  );

  // Carga inicial
  useEffect(() => {
    loadNews('', 'TODOS');
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleSearch = () => {
    setSearchQuery(pendingQuery);
    loadNews(pendingQuery, selectedUF);
  };

  const handleUFChange = (uf: string) => {
    setSelectedUF(uf);
    loadNews(searchQuery, uf);
  };

  const handleRefresh = () => {
    loadNews(searchQuery, selectedUF, true);
  };

  const handleClearFilters = () => {
    setPendingQuery('');
    setSearchQuery('');
    setSelectedUF('TODOS');
    loadNews('', 'TODOS');
  };

  const handleArticlePress = (article: NewsArticle) => {
    navigation.navigate('NewsDetail', { article });
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  const renderHeader = () => (
    <View>
      {/* Barra de busca */}
      <SearchBar
        value={pendingQuery}
        onChangeText={setPendingQuery}
        onSubmit={handleSearch}
        placeholder="Buscar por título, tag..."
      />

      {/* Filtro de UF */}
      <UFPicker selectedUF={selectedUF} onValueChange={handleUFChange} />

      {/* Indicador de filtros ativos */}
      {(searchQuery || selectedUF !== 'TODOS') && (
        <View style={styles.activeFilters}>
          <Text style={styles.activeFiltersText}>
            {articles.length} notícia(s) encontrada(s)
            {searchQuery ? ` para "${searchQuery}"` : ''}
            {selectedUF !== 'TODOS' ? ` em ${selectedUF}` : ''}
          </Text>
          <TouchableOpacity onPress={handleClearFilters}>
            <Text style={styles.clearFiltersText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <LoadingIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <EmptyState
          title="Erro ao carregar"
          message={error}
          onRetry={() => loadNews(searchQuery, selectedUF)}
          retryLabel="Tentar novamente"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsCard article={item} onPress={handleArticlePress} />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <EmptyState onRetry={handleClearFilters} />
        }
        contentContainerStyle={
          articles.length === 0
            ? styles.emptyContainer
            : styles.listContent
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#e53935']}
            tintColor="#e53935"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// ─── Estilos ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f5',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  activeFilters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#fce4ec',
    borderRadius: 8,
  },
  activeFiltersText: {
    fontSize: 13,
    color: '#e53935',
    flex: 1,
  },
  clearFiltersText: {
    fontSize: 13,
    color: '#e53935',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default HomeScreen;
