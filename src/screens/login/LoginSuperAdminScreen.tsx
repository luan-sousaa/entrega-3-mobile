import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { useUser, MOCK_USERS } from '../../context/UserContext';
import RoleLoginForm from './RoleLoginForm';

// ─── Tipos ──────────────────────────────────────────────────────────────────

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'LoginSuperAdmin'>;
};

// ─── Credenciais mock ──────────────────────────────────────────────────────

const VALID_EMAIL = 'ana@newsapp.com';
const VALID_PASSWORD = 'admin123';

// ─── Componente ────────────────────────────────────────────────────────────

const LoginSuperAdminScreen: React.FC<Props> = ({ navigation }) => {
  const { setCurrentUser } = useUser();

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 800));

    if (
      email.toLowerCase() === VALID_EMAIL &&
      password === VALID_PASSWORD
    ) {
      setCurrentUser(MOCK_USERS.superadmin);
      navigation.replace('Home');
      return true;
    }
    return false;
  };

  return (
    <RoleLoginForm
      role="superadmin"
      roleLabel="Super Admin"
      roleIcon="👑"
      hintEmail={VALID_EMAIL}
      hintPassword={VALID_PASSWORD}
      onLogin={handleLogin}
    />
  );
};

export default LoginSuperAdminScreen;
