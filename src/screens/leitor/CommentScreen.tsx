import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

// ─── Tipos ──────────────────────────────────────────────────────────────────

type CommentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Comment'
>;
type CommentScreenRouteProp = RouteProp<RootStackParamList, 'Comment'>;

interface Props {
  navigation: CommentScreenNavigationProp;
  route: CommentScreenRouteProp;
}

const MAX_CHARS = 500;

// ─── Componente ────────────────────────────────────────────────────────────

const CommentScreen: React.FC<Props> = ({ navigation, route }) => {
  const { articleTitle } = route.params;
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const remaining = MAX_CHARS - text.length;

  const handleSend = async () => {
    if (!text.trim()) {
      Alert.alert('Atenção', 'Escreva um comentário antes de enviar.');
      return;
    }
    setIsSending(true);
    // Simula envio para a API
    await new Promise<void>((resolve) => setTimeout(resolve, 700));
    setIsSending(false);
    Alert.alert('Comentário enviado!', 'Seu comentário foi publicado.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Contexto da notícia */}
        <View style={styles.articleRef}>
          <Text style={styles.articleRefLabel}>Comentando sobre:</Text>
          <Text style={styles.articleRefTitle} numberOfLines={2}>
            {articleTitle}
          </Text>
        </View>

        {/* Input do comentário */}
        <Text style={styles.label}>Seu comentário</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={(t) => t.length <= MAX_CHARS && setText(t)}
          placeholder="Escreva o que você pensa sobre esta notícia..."
          placeholderTextColor="#aaaaaa"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          autoFocus
        />
        <Text
          style={[styles.counter, remaining < 50 && styles.counterWarning]}
        >
          {remaining} caracteres restantes
        </Text>

        {/* Botão Enviar */}
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!text.trim() || isSending) && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!text.trim() || isSending}
        >
          {isSending ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.sendButtonText}>Enviar Comentário</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  articleRef: {
    backgroundColor: '#fce4ec',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#e53935',
  },
  articleRefLabel: {
    fontSize: 11,
    color: '#e53935',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  articleRefTitle: {
    fontSize: 14,
    color: '#1a1a2e',
    fontWeight: '600',
    lineHeight: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444444',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 14,
    fontSize: 15,
    color: '#1a1a2e',
    minHeight: 140,
    textAlignVertical: 'top',
  },
  counter: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'right',
    marginTop: 6,
    marginBottom: 24,
  },
  counterWarning: {
    color: '#e53935',
  },
  sendButton: {
    backgroundColor: '#e53935',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CommentScreen;
