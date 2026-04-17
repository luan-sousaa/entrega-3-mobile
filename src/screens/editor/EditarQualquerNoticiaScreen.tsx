import React from 'react';
import { Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { updateArticle } from '../../services/managedNewsService';
import NewsArticleForm, { NewsFormValues } from '../shared/NewsArticleForm';

// ─── Tipos ──────────────────────────────────────────────────────────────────

type EditarQualquerNoticiaNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditarQualquerNoticia'
>;
type EditarQualquerNoticiaRouteProp = RouteProp<
  RootStackParamList,
  'EditarQualquerNoticia'
>;

interface Props {
  navigation: EditarQualquerNoticiaNavigationProp;
  route: EditarQualquerNoticiaRouteProp;
}

// ─── Componente ────────────────────────────────────────────────────────────

const EditarQualquerNoticiaScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { article } = route.params;

  const handleSave = async (values: NewsFormValues) => {
    try {
      await updateArticle(article.id, {
        title: values.title,
        description: values.description,
        content: values.content,
        imageUrl: values.imageUrl || undefined,
        tags: values.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        uf: values.uf !== 'TODOS' ? values.uf : undefined,
      });
      Alert.alert('Notícia atualizada!', '', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert(
        'Erro',
        'Não foi possível atualizar a notícia. Tente novamente.'
      );
    }
  };

  return (
    <NewsArticleForm
      initialValues={{
        title: article.title,
        description: article.description,
        content: article.content,
        imageUrl: article.imageUrl ?? '',
        tags: article.tags.join(', '),
        uf: article.uf ?? 'TODOS',
      }}
      onSave={handleSave}
      submitLabel="Salvar Alterações"
    />
  );
};

export default EditarQualquerNoticiaScreen;
