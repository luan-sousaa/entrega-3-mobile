import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// ─── Dados das UFs ─────────────────────────────────────────────────────────

export const UF_LIST = [
  { label: 'TODOS', value: 'TODOS' },
  { label: 'AC', value: 'AC' },
  { label: 'AL', value: 'AL' },
  { label: 'AP', value: 'AP' },
  { label: 'AM', value: 'AM' },
  { label: 'BA', value: 'BA' },
  { label: 'CE', value: 'CE' },
  { label: 'DF', value: 'DF' },
  { label: 'ES', value: 'ES' },
  { label: 'GO', value: 'GO' },
  { label: 'MA', value: 'MA' },
  { label: 'MT', value: 'MT' },
  { label: 'MS', value: 'MS' },
  { label: 'MG', value: 'MG' },
  { label: 'PA', value: 'PA' },
  { label: 'PB', value: 'PB' },
  { label: 'PR', value: 'PR' },
  { label: 'PE', value: 'PE' },
  { label: 'PI', value: 'PI' },
  { label: 'RJ', value: 'RJ' },
  { label: 'RN', value: 'RN' },
  { label: 'RS', value: 'RS' },
  { label: 'RO', value: 'RO' },
  { label: 'RR', value: 'RR' },
  { label: 'SC', value: 'SC' },
  { label: 'SP', value: 'SP' },
  { label: 'SE', value: 'SE' },
  { label: 'TO', value: 'TO' },
];

// ─── Props ─────────────────────────────────────────────────────────────────

interface UFPickerProps {
  selectedUF: string;
  onValueChange: (value: string) => void;
}

// ─── Componente ────────────────────────────────────────────────────────────

const UFPicker: React.FC<UFPickerProps> = ({ selectedUF, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filtrar por estado:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {UF_LIST.map((uf) => {
          const isSelected = selectedUF === uf.value;
          return (
            <TouchableOpacity
              key={uf.value}
              onPress={() => onValueChange(uf.value)}
              style={[styles.chip, isSelected && styles.chipSelected]}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {uf.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

// ─── Estilos ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  label: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 12,
    gap: 6,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f5c6c6',
    backgroundColor: '#ffffff',
    minWidth: 48,
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: '#e53935',
    borderColor: '#e53935',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  chipTextSelected: {
    color: '#ffffff',
  },
});

export default UFPicker;
