import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { useUser, MOCK_USERS } from '../../context/UserContext';
import RoleLoginForm from './RoleLoginForm';

// ─── Tipos ──────────────────────────────────────────────────────────────────

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'LoginEditor'>;
};

// ─── Credenciais mock ──────────────────────────────────────────────────────

const VALID_EMAIL = 'carlos@newsapp.com';
const VALID_PASSWORD = 'editor123';

// ─── Componente ────────────────────────────────────────────────────────────

const LoginEditorScreen: React.FC<Props> = ({ navigation }) => {
  const { setCurrentUser } = useUser();

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 800));

    if (
      email.toLowerCase() === VALID_EMAIL &&
      password === VALID_PASSWORD
    ) {
      setCurrentUser(MOCK_USERS.editor);
      navigation.replace('Home');
      return true;
    }
    return false;
  };

  return (
    <RoleLoginForm
      role="editor"
      roleLabel="Editor"
      roleIcon="📋"
      hintEmail={VALID_EMAIL}
      hintPassword={VALID_PASSWORD}
      onLogin={handleLogin}
    />
  );
};

export default LoginEditorScreen;
