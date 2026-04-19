import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { UserRole } from '../types';
import { useUser, MOCK_USERS } from '../context/UserContext';

const DRAWER_WIDTH = Dimensions.get('window').width * 0.84;

const ROLES = [
  { key: 'leitor' as UserRole, label: 'Leitor', email: 'joao@email.com', password: 'leitor123' },
  { key: 'autor' as UserRole, label: 'Autor / Editor', email: 'maria@newsapp.com', password: 'autor123' },
  { key: 'superadmin' as UserRole, label: 'Super Admin', email: 'ana@newsapp.com', password: 'admin123' },
];

const EDITOR_CREDENTIALS = { email: 'carlos@newsapp.com', password: 'editor123' };

type Tab = 'login' | 'register' | 'forgot';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const LoginDrawer: React.FC<Props> = ({ visible, onClose }) => {
  const { setCurrentUser } = useUser();

  const [activeTab, setActiveTab] = useState<Tab>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regMessage, setRegMessage] = useState('');
  const [regIsError, setRegIsError] = useState(false);

  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotIsError, setForgotIsError] = useState(false);

  const resetAll = () => {
    setActiveTab('login');
    setSelectedRole(null);
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
    setLoginLoading(false);
    setRegName('');
    setRegEmail('');
    setRegPassword('');
    setRegMessage('');
    setForgotEmail('');
    setForgotMessage('');
  };

  const handleClose = () => {
    resetAll();
    onClose();
  };

  const switchTab = (tab: Tab) => {
    setSelectedRole(null);
    setLoginError('');
    setRegMessage('');
    setForgotMessage('');
    setActiveTab(tab);
  };

  const handleLogin = async () => {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Preencha e-mail e senha.');
      return;
    }
    const role = ROLES.find((r) => r.key === selectedRole);
    if (!role) return;

    setLoginError('');
    setLoginLoading(true);
    await new Promise<void>((r) => setTimeout(r, 800));

    const email = loginEmail.trim().toLowerCase();

    if (email === role.email && loginPassword === role.password) {
      setCurrentUser(MOCK_USERS[role.key]);
      handleClose();
    } else if (
      role.key === 'autor' &&
      email === EDITOR_CREDENTIALS.email &&
      loginPassword === EDITOR_CREDENTIALS.password
    ) {
      setCurrentUser(MOCK_USERS.editor);
      handleClose();
    } else {
      setLoginError('E-mail ou senha incorretos.');
    }
    setLoginLoading(false);
  };

  const handleRegister = () => {
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegIsError(true);
      setRegMessage('Preencha todos os campos.');
      return;
    }
    setRegIsError(false);
    setRegMessage('Cadastro realizado com sucesso!');
  };

  const handleForgot = () => {
    if (!forgotEmail.trim()) {
      setForgotIsError(true);
      setForgotMessage('Informe seu e-mail.');
      return;
    }
    setForgotIsError(false);
    setForgotMessage('E-mail de recuperação enviado!');
  };

  const selectedRoleData = ROLES.find((r) => r.key === selectedRole);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          style={styles.drawerWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.drawer}>
            {/* Header */}
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>NewsApp</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'login' && styles.tabActive]}
                onPress={() => switchTab('login')}
              >
                <Text style={[styles.tabText, activeTab === 'login' && styles.tabTextActive]}>
                  Entrar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'register' && styles.tabActive]}
                onPress={() => switchTab('register')}
              >
                <Text style={[styles.tabText, activeTab === 'register' && styles.tabTextActive]}>
                  Cadastrar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'forgot' && styles.tabActive]}
                onPress={() => switchTab('forgot')}
              >
                <Text style={[styles.tabText, activeTab === 'forgot' && styles.tabTextActive]}>
                  Recuperar
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.scrollArea}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* ── Aba: Entrar ─────────────────────────────────────── */}
              {activeTab === 'login' && !selectedRole && (
                <>
                  <Text style={styles.sectionTitle}>Selecione seu perfil</Text>
                  {ROLES.map((role) => (
                    <TouchableOpacity
                      key={role.key}
                      style={styles.roleCard}
                      activeOpacity={0.8}
                      onPress={() => {
                        setSelectedRole(role.key);
                        setLoginEmail('');
                        setLoginPassword('');
                        setLoginError('');
                      }}
                    >
                      <Text style={styles.roleCardLabel}>{role.label}</Text>
                      <Text style={styles.roleCardArrow}>›</Text>
                    </TouchableOpacity>
                  ))}
                </>
              )}

              {activeTab === 'login' && selectedRole && selectedRoleData && (
                <>
                  <TouchableOpacity onPress={() => setSelectedRole(null)} style={styles.backBtn}>
                    <Text style={styles.backBtnText}>‹ Voltar</Text>
                  </TouchableOpacity>

                  <View style={styles.roleHeader}>
                    <Text style={styles.roleHeaderLabel}>{selectedRoleData.label}</Text>
                  </View>

                  <Text style={styles.fieldLabel}>E-mail</Text>
                  <TextInput
                    style={[styles.input, loginError ? styles.inputError : null]}
                    value={loginEmail}
                    onChangeText={(t) => { setLoginEmail(t); setLoginError(''); }}
                    placeholder="seu@email.com"
                    placeholderTextColor="#aaaaaa"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                  />

                  <Text style={styles.fieldLabel}>Senha</Text>
                  <TextInput
                    style={[styles.input, loginError ? styles.inputError : null]}
                    value={loginPassword}
                    onChangeText={(t) => { setLoginPassword(t); setLoginError(''); }}
                    placeholder="Sua senha"
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    autoCapitalize="none"
                  />

                  {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

                  <TouchableOpacity
                    style={[styles.primaryBtn, loginLoading && styles.btnDisabled]}
                    onPress={handleLogin}
                    disabled={loginLoading}
                  >
                    {loginLoading
                      ? <ActivityIndicator color="#ffffff" />
                      : <Text style={styles.primaryBtnText}>Entrar</Text>
                    }
                  </TouchableOpacity>

                  <View style={styles.hint}>
                    <Text style={styles.hintTitle}>Credenciais de teste</Text>
                    <Text style={styles.hintText}>Autor — {selectedRoleData.email} / {selectedRoleData.password}</Text>
                    {selectedRoleData.key === 'autor' && (
                      <Text style={styles.hintText}>Editor — {EDITOR_CREDENTIALS.email} / {EDITOR_CREDENTIALS.password}</Text>
                    )}
                  </View>
                </>
              )}

              {/* ── Aba: Cadastrar ───────────────────────────────────── */}
              {activeTab === 'register' && (
                <>
                  <Text style={styles.sectionTitle}>Criar conta</Text>

                  <Text style={styles.fieldLabel}>Nome completo</Text>
                  <TextInput
                    style={styles.input}
                    value={regName}
                    onChangeText={(t) => { setRegName(t); setRegMessage(''); }}
                    placeholder="Seu nome"
                    placeholderTextColor="#aaaaaa"
                  />

                  <Text style={styles.fieldLabel}>E-mail</Text>
                  <TextInput
                    style={styles.input}
                    value={regEmail}
                    onChangeText={(t) => { setRegEmail(t); setRegMessage(''); }}
                    placeholder="seu@email.com"
                    placeholderTextColor="#aaaaaa"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                  />

                  <Text style={styles.fieldLabel}>Senha</Text>
                  <TextInput
                    style={styles.input}
                    value={regPassword}
                    onChangeText={(t) => { setRegPassword(t); setRegMessage(''); }}
                    placeholder="Crie uma senha"
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    autoCapitalize="none"
                  />

                  {regMessage ? (
                    <Text style={[styles.messageText, regIsError ? styles.errorText : styles.successText]}>
                      {regMessage}
                    </Text>
                  ) : null}

                  <TouchableOpacity style={styles.primaryBtn} onPress={handleRegister}>
                    <Text style={styles.primaryBtnText}>Cadastrar</Text>
                  </TouchableOpacity>
                </>
              )}

              {/* ── Aba: Recuperar senha ─────────────────────────────── */}
              {activeTab === 'forgot' && (
                <>
                  <Text style={styles.sectionTitle}>Recuperar senha</Text>
                  <Text style={styles.forgotDesc}>
                    Informe seu e-mail e enviaremos as instruções de recuperação.
                  </Text>

                  <Text style={styles.fieldLabel}>E-mail</Text>
                  <TextInput
                    style={styles.input}
                    value={forgotEmail}
                    onChangeText={(t) => { setForgotEmail(t); setForgotMessage(''); }}
                    placeholder="seu@email.com"
                    placeholderTextColor="#aaaaaa"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                  />

                  {forgotMessage ? (
                    <Text style={[styles.messageText, forgotIsError ? styles.errorText : styles.successText]}>
                      {forgotMessage}
                    </Text>
                  ) : null}

                  <TouchableOpacity style={styles.primaryBtn} onPress={handleForgot}>
                    <Text style={styles.primaryBtnText}>Enviar e-mail</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>

        {/* Overlay escuro à direita — fecha o drawer ao tocar */}
        <TouchableOpacity style={styles.sideOverlay} activeOpacity={1} onPress={handleClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  drawerWrapper: {
    width: DRAWER_WIDTH,
  },
  drawer: {
    flex: 1,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 16,
  },
  sideOverlay: {
    flex: 1,
  },

  // Header
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 56 : 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#ffffff',
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
  },
  closeBtnText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },

  // Tabs
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#ffffff',
  },
  tab: {
    flex: 1,
    paddingVertical: 13,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#e53935',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#888888',
  },
  tabTextActive: {
    color: '#e53935',
    fontWeight: '700',
  },

  // Scroll
  scrollArea: {
    flex: 1,
    backgroundColor: '#fff5f5',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // Section
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 16,
  },
  forgotDesc: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 16,
  },

  // Role cards
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  roleCardLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  roleCardArrow: {
    fontSize: 22,
    color: '#e53935',
  },

  // Back button
  backBtn: {
    marginBottom: 16,
  },
  backBtnText: {
    fontSize: 14,
    color: '#e53935',
    fontWeight: '600',
  },

  // Role header (after selecting)
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  roleHeaderLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },

  // Fields
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444444',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#1a1a2e',
  },
  inputError: {
    borderColor: '#e53935',
  },
  errorText: {
    color: '#e53935',
    fontSize: 12,
    marginTop: 6,
  },
  messageText: {
    fontSize: 13,
    marginTop: 8,
    fontWeight: '500',
  },
  successText: {
    color: '#2e7d32',
  },

  // Button
  primaryBtn: {
    backgroundColor: '#e53935',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },

  // Dev hint
  hint: {
    backgroundColor: '#fff8e1',
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ffe082',
  },
  hintTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#f57f17',
    marginBottom: 4,
  },
  hintText: {
    fontSize: 11,
    color: '#666666',
    lineHeight: 17,
  },
});

export default LoginDrawer;
