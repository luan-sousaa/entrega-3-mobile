import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useUser } from '../../context/UserContext';
import { Comment } from '../../types';

// ─── Comentários Mock ──────────────────────────────────────────────────────

const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    articleId: '1',
    articleTitle: 'São Paulo anuncia novo plano de mobilidade urbana',
    userId: 'u1',
    content:
      'Ótima iniciativa! Espero que dessa vez os projetos saiam do papel e a cidade realmente melhore.',
    createdAt: '2026-04-16T10:30:00Z',
  },
  {
    id: 'c2',
    articleId: '3',
    articleTitle: 'Minas Gerais investe em energia solar para comunidades rurais',
    userId: 'u1',
    content:
      'É muito importante investir em energia limpa para as comunidades mais carentes. Parabéns à iniciativa!',
    createdAt: '2026-04-15T14:20:00Z',
  },
  {
    id: 'c3',
    articleId: '5',
    articleTitle: 'Paraná inaugura maior parque tecnológico do Sul do Brasil',
    userId: 'u1',
    content:
      'Curitiba sempre na vanguarda da tecnologia. Que projeto incrível!',
    createdAt: '2026-04-13T09:05:00Z',
  },
];

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

const LeitorProfileScreen: React.FC = () => {
  const { currentUser } = useUser();

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentCard}>
      <Text style={styles.commentArticle} numberOfLines={1}>
        {item.articleTitle}
      </Text>
      <Text style={styles.commentContent}>{item.content}</Text>
      <Text style={styles.commentDate}>{formatDate(item.createdAt)}</Text>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.listContent}
      data={MOCK_COMMENTS}
      keyExtractor={(item) => item.id}
      renderItem={renderComment}
      ListHeaderComponent={
        <View>
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
              <Text style={styles.roleText}>Leitor</Text>
            </View>
          </View>

          {/* Seção de comentários */}
          <Text style={styles.sectionTitle}>
            Meus Comentários ({MOCK_COMMENTS.length})
          </Text>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhum comentário ainda.</Text>
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
    paddingBottom: 32,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  commentCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    padding: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  commentArticle: {
    fontSize: 12,
    color: '#e53935',
    fontWeight: '600',
    marginBottom: 4,
  },
  commentContent: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    marginBottom: 8,
  },
  commentDate: {
    fontSize: 11,
    color: '#999999',
  },
  empty: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999999',
  },
});

export default LeitorProfileScreen;
