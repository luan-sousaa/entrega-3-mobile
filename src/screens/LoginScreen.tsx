import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Tela de login — implementação pendente
const LoginScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5f5',
  },
  text: {
    fontSize: 18,
    color: '#1a1a2e',
  },
});

export default LoginScreen;
