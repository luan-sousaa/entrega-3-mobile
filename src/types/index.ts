// ─── Tipos de Notícia ──────────────────────────────────────────────────────

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
  source: string;
  uf?: string;
  tags: string[];
}

// ─── Tipos de Navegação ────────────────────────────────────────────────────

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  NewsDetail: { article: NewsArticle };
};

// ─── Tipos de Autenticação ─────────────────────────────────────────────────

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  email: string | null;
  rememberMe: boolean;
}

// ─── Filtros de Busca ──────────────────────────────────────────────────────

export interface NewsFilters {
  query: string;
  uf: string;
}
