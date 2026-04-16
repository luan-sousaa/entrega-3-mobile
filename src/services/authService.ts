import { AuthCredentials } from '../types';

// ─── Credenciais Mockadas ──────────────────────────────────────────────────

const VALID_CREDENTIALS = [
  { email: 'usuario@email.com', password: '123456' },
  { email: 'admin@newsapp.com', password: 'admin123' },
  { email: 'teste@teste.com', password: 'teste123' },
];

// ─── Funções do Serviço ────────────────────────────────────────────────────

/**
 * Simula uma requisição de login. Retorna true se as credenciais forem válidas.
 */
export async function login(credentials: AuthCredentials): Promise<boolean> {
  // Simula latência de rede
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));

  const { email, password } = credentials;

  const isValid = VALID_CREDENTIALS.some(
    (cred) =>
      cred.email.toLowerCase() === email.toLowerCase() &&
      cred.password === password
  );

  return isValid;
}

/**
 * Valida o formato do e-mail.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida a senha (mínimo 6 caracteres).
 */
export function validatePassword(password: string): boolean {
  return password.length >= 6;
}
