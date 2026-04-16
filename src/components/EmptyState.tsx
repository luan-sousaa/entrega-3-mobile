import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// ─── Props ─────────────────────────────────────────────────────────────────

interface EmptyStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

// ─── Componente ────────────────────────────────────────────────────────────

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Nenhuma notícia encontrada',
  message = 'Tente buscar por outro termo ou selecione outro estado.',
  onRetry,
  retryLabel = 'Limpar filtros',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📰</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>{retryLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// ─── Estilos ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#1a73e8',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  retryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default EmptyState;
