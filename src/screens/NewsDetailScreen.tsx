import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

// ─── Constantes ────────────────────────────────────────────────────────────

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop';

// ─── Tipos ──────────────────────────────────────────────────────────────────

type NewsDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NewsDetail'
>;
type NewsDetailScreenRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;

interface Props {
  navigation: NewsDetailScreenNavigationProp;
  route: NewsDetailScreenRouteProp;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function formatFullDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

// ─── Componente ────────────────────────────────────────────────────────────

const NewsDetailScreen: React.FC<Props> = ({ route }) => {
  const { article } = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Imagem de destaque */}
      <Image
        source={{ uri: article.imageUrl ?? PLACEHOLDER_IMAGE }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Conteúdo */}
      <View style={styles.body}>
        {/* Fonte e UF */}
        <View style={styles.metaRow}>
          <Text style={styles.source}>{article.source}</Text>
          {article.uf && (
            <View style={styles.ufBadge}>
              <Text style={styles.ufText}>{article.uf}</Text>
            </View>
          )}
        </View>

        {/* Título */}
        <Text style={styles.title}>{article.title}</Text>

        {/* Data */}
        <View style={styles.dateRow}>
          <Text style={styles.dateIcon}>🕐</Text>
          <Text style={styles.date}>{formatFullDate(article.publishedAt)}</Text>
        </View>

        {/* Divisor */}
        <View style={styles.divider} />

        {/* Descrição em destaque */}
        <Text style={styles.description}>{article.description}</Text>

        {/* Divisor */}
        <View style={styles.divider} />

        {/* Conteúdo completo */}
        <Text style={styles.contentText}>{article.content}</Text>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <View style={styles.tagsSection}>
            <Text style={styles.tagsLabel}>Tags:</Text>
            <View style={styles.tagsList}>
              {article.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

// ─── Estilos ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  content: {
    paddingBottom: 40,
  },
  image: {
    width: SCREEN_WIDTH,
    height: 240,
    backgroundColor: '#e0e0e0',
  },
  body: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  source: {
    fontSize: 13,
    color: '#1a73e8',
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  ufBadge: {
    backgroundColor: '#1a73e8',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  ufText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a2e',
    lineHeight: 30,
    marginBottom: 12,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  date: {
    fontSize: 13,
    color: '#888888',
  },
  divider: {
    height: 1,
    backgroundColor: '#eeeeee',
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  contentText: {
    fontSize: 15,
    color: '#444444',
    lineHeight: 26,
  },
  tagsSection: {
    marginTop: 24,
  },
  tagsLabel: {
    fontSize: 13,
    color: '#888888',
    fontWeight: '600',
    marginBottom: 8,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#e8f0fe',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#1a73e8',
    fontWeight: '500',
  },
});

export default NewsDetailScreen;
