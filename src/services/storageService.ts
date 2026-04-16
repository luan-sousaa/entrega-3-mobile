import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState } from '../types';

// ─── Chaves de Armazenamento ───────────────────────────────────────────────

const KEYS = {
  AUTH_STATE: '@news_app:auth_state',
} as const;

// ─── Funções do Serviço ────────────────────────────────────────────────────

/**
 * Salva o estado de autenticação no AsyncStorage.
 */
export async function saveAuthState(authState: AuthState): Promise<void> {
  try {
    const json = JSON.stringify(authState);
    await AsyncStorage.setItem(KEYS.AUTH_STATE, json);
  } catch (error) {
    console.error('[StorageService] Erro ao salvar estado de auth:', error);
  }
}

/**
 * Recupera o estado de autenticação do AsyncStorage.
 * Retorna null se não houver estado salvo.
 */
export async function getAuthState(): Promise<AuthState | null> {
  try {
    const json = await AsyncStorage.getItem(KEYS.AUTH_STATE);
    if (!json) return null;
    return JSON.parse(json) as AuthState;
  } catch (error) {
    console.error('[StorageService] Erro ao recuperar estado de auth:', error);
    return null;
  }
}

/**
 * Remove o estado de autenticação do AsyncStorage.
 */
export async function clearAuthState(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEYS.AUTH_STATE);
  } catch (error) {
    console.error('[StorageService] Erro ao limpar estado de auth:', error);
  }
}
