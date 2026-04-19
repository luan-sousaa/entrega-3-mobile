import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { UserRole } from '../../types';

// ─── Tipos ──────────────────────────────────────────────────────────────────

interface Props {
  role: UserRole;
  roleLabel: string;
  roleIcon: string;
  hintEmail: string;
  hintPassword: string;
  onLogin: (email: string, password: string) => Promise<boolean>;
}

// ─── Componente ────────────────────────────────────────────────────────────

const RoleLoginForm: React.FC<Props> = ({
  roleLabel,
  roleIcon,
  hintEmail,
  hintPassword,
  onLogin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Preencha e-mail e senha.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const success = await onLogin(email.trim(), password);
      if (!success) {
        setError('E-mail ou senha incorretos.');
      }
    } finally {
      setIsLoading(false);
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
        {/* Cabeçalho do perfil */}
        <View style={styles.header}>
          <Text style={styles.roleIcon}>{roleIcon}</Text>
          <Text style={styles.title}>Entrar como</Text>
          <Text style={styles.roleLabel}>{roleLabel}</Text>
        </View>

        {/* Campos */}
        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            value={email}
            onChangeText={(t) => { setEmail(t); setError(''); }}
            placeholder="seu@email.com"
            placeholderTextColor="#aaaaaa"
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />

          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, styles.passwordInput, error ? styles.inputError : null]}
              value={password}
              onChangeText={(t) => { setPassword(t); setError(''); }}
              placeholder="Sua senha"
              placeholderTextColor="#aaaaaa"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword((v) => !v)}
            >
              <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.loginButtonText}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Dica de credenciais (dev) */}
        <View style={styles.devHint}>
          <Text style={styles.devHintTitle}>Credenciais de teste</Text>
          <Text style={styles.devHintText}>E-mail: {hintEmail}</Text>
          <Text style={styles.devHintText}>Senha: {hintPassword}</Text>
        </View>
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
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 8,
  },
  roleIcon: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    color: '#888888',
    marginBottom: 4,
  },
  roleLabel: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444444',
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1a1a2e',
  },
  inputError: {
    borderColor: '#e53935',
  },
  passwordWrapper: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  eyeIcon: {
    fontSize: 18,
  },
  errorText: {
    color: '#e53935',
    fontSize: 13,
    marginTop: 8,
  },
  loginButton: {
    backgroundColor: '#e53935',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  devHint: {
    backgroundColor: '#fff8e1',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ffe082',
  },
  devHintTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#f57f17',
    marginBottom: 6,
  },
  devHintText: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 18,
  },
});

export default RoleLoginForm;
