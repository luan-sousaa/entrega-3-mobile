import React from 'react';
import { Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { useUser } from '../../context/UserContext';
import { createArticle } from '../../services/managedNewsService';
import NewsArticleForm, { NewsFormValues } from '../shared/NewsArticleForm';

// ─── Tipos ──────────────────────────────────────────────────────────────────

type NovaNoticiaNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NovaNoticia'
>;

interface Props {
  navigation: NovaNoticiaNavigationProp;
}

// ─── Componente ────────────────────────────────────────────────────────────

const NovaNoticiaScreen: React.FC<Props> = ({ navigation }) => {
  const { currentUser } = useUser();

  const handleSave = async (values: NewsFormValues) => {
    try {
      await createArticle({
        authorId: currentUser.id,
        published: false,
        title: values.title,
        description: values.description,
        content: values.content,
        imageUrl: values.imageUrl || undefined,
        tags: values.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        uf: values.uf !== 'TODOS' ? values.uf : undefined,
        publishedAt: new Date().toISOString(),
        source: currentUser.name,
      });
      Alert.alert('Notícia criada!', 'Salva como rascunho.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a notícia. Tente novamente.');
    }
  };

  return <NewsArticleForm onSave={handleSave} submitLabel="Criar Notícia" />;
};

export default NovaNoticiaScreen;
