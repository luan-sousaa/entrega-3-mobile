import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

// ─── Props ─────────────────────────────────────────────────────────────────

interface LoadingIndicatorProps {
  message?: string;
}

// ─── Componente ────────────────────────────────────────────────────────────

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = 'Carregando notícias...',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1a73e8" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

// ─── Estilos ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    marginTop: 16,
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
  },
});

export default LoadingIndicator;
