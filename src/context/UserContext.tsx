import React, { createContext, useContext, useState } from 'react';
import { User, UserRole } from '../types';

// ─── Usuários Mock (remover quando o login estiver pronto) ─────────────────

export const MOCK_USERS: Record<UserRole, User> = {
  leitor: {
    id: 'u1',
    name: 'João Silva',
    email: 'joao@email.com',
    role: 'leitor',
  },
  autor: {
    id: 'u2',
    name: 'Maria Santos',
    email: 'maria@newsapp.com',
    role: 'autor',
  },
  editor: {
    id: 'u3',
    name: 'Carlos Lima',
    email: 'carlos@newsapp.com',
    role: 'editor',
  },
  superadmin: {
    id: 'u4',
    name: 'Ana Ribeiro',
    email: 'ana@newsapp.com',
    role: 'superadmin',
  },
};

// ─── Contexto ──────────────────────────────────────────────────────────────

interface UserContextValue {
  currentUser: User;
  // O dev de login deve chamar setCurrentUser(user) após autenticação bem-sucedida
  setCurrentUser: (user: User) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

// ─── Provider ──────────────────────────────────────────────────────────────

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // TODO (dev de login): substituir pelo usuário autenticado
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS.leitor);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser deve ser usado dentro de UserProvider');
  return ctx;
}
