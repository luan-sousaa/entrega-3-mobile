import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// ─── Dados das UFs ─────────────────────────────────────────────────────────

export const UF_LIST = [
  { label: 'Todos os estados', value: 'TODOS' },
  { label: 'Acre (AC)', value: 'AC' },
  { label: 'Alagoas (AL)', value: 'AL' },
  { label: 'Amapá (AP)', value: 'AP' },
  { label: 'Amazonas (AM)', value: 'AM' },
  { label: 'Bahia (BA)', value: 'BA' },
  { label: 'Ceará (CE)', value: 'CE' },
  { label: 'Distrito Federal (DF)', value: 'DF' },
  { label: 'Espírito Santo (ES)', value: 'ES' },
  { label: 'Goiás (GO)', value: 'GO' },
  { label: 'Maranhão (MA)', value: 'MA' },
  { label: 'Mato Grosso (MT)', value: 'MT' },
  { label: 'Mato Grosso do Sul (MS)', value: 'MS' },
  { label: 'Minas Gerais (MG)', value: 'MG' },
  { label: 'Pará (PA)', value: 'PA' },
  { label: 'Paraíba (PB)', value: 'PB' },
  { label: 'Paraná (PR)', value: 'PR' },
  { label: 'Pernambuco (PE)', value: 'PE' },
  { label: 'Piauí (PI)', value: 'PI' },
  { label: 'Rio de Janeiro (RJ)', value: 'RJ' },
  { label: 'Rio Grande do Norte (RN)', value: 'RN' },
  { label: 'Rio Grande do Sul (RS)', value: 'RS' },
  { label: 'Rondônia (RO)', value: 'RO' },
  { label: 'Roraima (RR)', value: 'RR' },
  { label: 'Santa Catarina (SC)', value: 'SC' },
  { label: 'São Paulo (SP)', value: 'SP' },
  { label: 'Sergipe (SE)', value: 'SE' },
  { label: 'Tocantins (TO)', value: 'TO' },
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

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedUF}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor="#1a73e8"
          mode="dropdown"
        >
          {UF_LIST.map((uf) => (
            <Picker.Item
              key={uf.value}
              label={uf.label}
              value={uf.value}
              color={Platform.OS === 'ios' ? '#1a1a2e' : undefined}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

// ─── Estilos ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  label: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
    marginBottom: 4,
  },
  pickerWrapper: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  picker: {
    height: Platform.OS === 'ios' ? 150 : 50,
    color: '#1a1a2e',
  },
});

export default UFPicker;
