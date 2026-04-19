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

export interface NewsArticleManaged extends NewsArticle {
  authorId: string;
  published: boolean;
}

// ─── Tipos de Usuário ──────────────────────────────────────────────────────

export type UserRole = 'leitor' | 'autor' | 'editor' | 'superadmin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// ─── Comentários ───────────────────────────────────────────────────────────

export interface Comment {
  id: string;
  articleId: string;
  articleTitle: string;
  userId: string;
  content: string;
  createdAt: string;
}

// ─── Tipos de Navegação ────────────────────────────────────────────────────

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  LoginLeitor: undefined;
  LoginAutor: undefined;
  LoginEditor: undefined;
  LoginSuperAdmin: undefined;
  NewsDetail: { article: NewsArticle };
  // Leitor
  LeitorProfile: undefined;
  Comment: { articleId: string; articleTitle: string };
  // Autor
  AutorProfile: undefined;
  MinhasNoticias: undefined;
  NovaNoticia: undefined;
  EditarNoticia: { article: NewsArticleManaged };
  // Editor
  EditorPainel: undefined;
  EditorProfile: undefined;
  EditarQualquerNoticia: { article: NewsArticleManaged };
  // Super Admin
  SuperAdminDashboard: undefined;
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
