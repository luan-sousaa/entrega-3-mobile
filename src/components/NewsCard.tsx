import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { NewsArticle } from '../types';

// ─── Constantes ────────────────────────────────────────────────────────────

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;
const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop';

// ─── Helpers ───────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// ─── Props ─────────────────────────────────────────────────────────────────

interface NewsCardProps {
  article: NewsArticle;
  onPress: (article: NewsArticle) => void;
}

// ─── Componente ────────────────────────────────────────────────────────────

const NewsCard: React.FC<NewsCardProps> = ({ article, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(article)}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: article.imageUrl ?? PLACEHOLDER_IMAGE }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        {/* Fonte e UF */}
        <View style={styles.metaRow}>
          <Text style={styles.source} numberOfLines={1}>
            {article.source}
          </Text>
          {article.uf && (
            <View style={styles.ufBadge}>
              <Text style={styles.ufText}>{article.uf}</Text>
            </View>
          )}
        </View>

        {/* Título */}
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>

        {/* Descrição */}
        <Text style={styles.description} numberOfLines={3}>
          {article.description}
        </Text>

        {/* Data */}
        <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
      </View>
    </TouchableOpacity>
  );
};

// ─── Estilos ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#e0e0e0',
  },
  content: {
    padding: 14,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  source: {
    fontSize: 12,
    color: '#e53935',
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  ufBadge: {
    backgroundColor: '#e53935',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ufText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    lineHeight: 22,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: '#999999',
  },
});

export default NewsCard;
