import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { UF_LIST } from '../../components/UFPicker';

// ─── Tipos ──────────────────────────────────────────────────────────────────

export interface NewsFormValues {
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  tags: string;
  uf: string;
}

interface Props {
  initialValues?: Partial<NewsFormValues>;
  onSave: (values: NewsFormValues) => Promise<void>;
  submitLabel?: string;
}

// ─── Componente ────────────────────────────────────────────────────────────

const NewsArticleForm: React.FC<Props> = ({
  initialValues = {},
  onSave,
  submitLabel = 'Salvar',
}) => {
  const [title, setTitle] = useState(initialValues.title ?? '');
  const [description, setDescription] = useState(
    initialValues.description ?? ''
  );
  const [content, setContent] = useState(initialValues.content ?? '');
  const [imageUrl, setImageUrl] = useState(initialValues.imageUrl ?? '');
  const [tags, setTags] = useState(
    initialValues.tags ?? ''
  );
  const [uf, setUf] = useState(initialValues.uf ?? 'TODOS');
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<NewsFormValues>>({});

  const parsedTags = tags
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const validate = (): boolean => {
    const newErrors: Partial<NewsFormValues> = {};
    if (!title.trim()) newErrors.title = 'Título obrigatório';
    if (!description.trim()) newErrors.description = 'Descrição obrigatória';
    if (!content.trim()) newErrors.content = 'Conteúdo obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setIsSaving(true);
    try {
      await onSave({ title, description, content, imageUrl, tags, uf });
    } finally {
      setIsSaving(false);
    }
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
        {/* Título */}
        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={[styles.input, errors.title ? styles.inputError : null]}
          value={title}
          onChangeText={setTitle}
          placeholder="Digite o título da notícia"
          placeholderTextColor="#aaaaaa"
          maxLength={200}
        />
        {errors.title ? (
          <Text style={styles.errorText}>{errors.title}</Text>
        ) : null}

        {/* Descrição */}
        <Text style={styles.label}>Descrição *</Text>
        <TextInput
          style={[
            styles.input,
            styles.inputMultiline,
            errors.description ? styles.inputError : null,
          ]}
          value={description}
          onChangeText={setDescription}
          placeholder="Resumo da notícia"
          placeholderTextColor="#aaaaaa"
          multiline
          numberOfLines={3}
          maxLength={500}
        />
        {errors.description ? (
          <Text style={styles.errorText}>{errors.description}</Text>
        ) : null}

        {/* Conteúdo */}
        <Text style={styles.label}>Conteúdo *</Text>
        <TextInput
          style={[
            styles.input,
            styles.inputMultilineLarge,
            errors.content ? styles.inputError : null,
          ]}
          value={content}
          onChangeText={setContent}
          placeholder="Texto completo da notícia"
          placeholderTextColor="#aaaaaa"
          multiline
          numberOfLines={6}
          maxLength={5000}
          textAlignVertical="top"
        />
        {errors.content ? (
          <Text style={styles.errorText}>{errors.content}</Text>
        ) : null}

        {/* URL da Imagem */}
        <Text style={styles.label}>URL da Imagem (opcional)</Text>
        <TextInput
          style={styles.input}
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="https://..."
          placeholderTextColor="#aaaaaa"
          autoCapitalize="none"
          keyboardType="url"
        />

        {/* Tags */}
        <Text style={styles.label}>Tags (separadas por vírgula)</Text>
        <TextInput
          style={styles.input}
          value={tags}
          onChangeText={setTags}
          placeholder="ex: tecnologia, brasil, inovação"
          placeholderTextColor="#aaaaaa"
          autoCapitalize="none"
        />
        {parsedTags.length > 0 && (
          <View style={styles.tagsPreview}>
            {parsedTags.map((tag, i) => (
              <View key={i} style={styles.tagChip}>
                <Text style={styles.tagChipText}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}

        {/* UF */}
        <Text style={styles.label}>Estado (UF)</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ufScroll}
        >
          {UF_LIST.filter((item) => item.value !== 'TODOS').map((item) => (
            <TouchableOpacity
              key={item.value}
              onPress={() => setUf(item.value)}
              style={[
                styles.ufChip,
                uf === item.value && styles.ufChipSelected,
              ]}
            >
              <Text
                style={[
                  styles.ufChipText,
                  uf === item.value && styles.ufChipTextSelected,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Botão Salvar */}
        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.saveButtonText}>{submitLabel}</Text>
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
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444444',
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1a1a2e',
  },
  inputMultiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputMultilineLarge: {
    height: 140,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#e53935',
  },
  errorText: {
    color: '#e53935',
    fontSize: 12,
    marginTop: 4,
  },
  tagsPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  tagChip: {
    backgroundColor: '#fce4ec',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagChipText: {
    fontSize: 12,
    color: '#e53935',
    fontWeight: '500',
  },
  ufScroll: {
    paddingVertical: 4,
    gap: 6,
  },
  ufChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    minWidth: 44,
    alignItems: 'center',
  },
  ufChipSelected: {
    backgroundColor: '#e53935',
    borderColor: '#e53935',
  },
  ufChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  ufChipTextSelected: {
    color: '#ffffff',
  },
  saveButton: {
    backgroundColor: '#e53935',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default NewsArticleForm;
