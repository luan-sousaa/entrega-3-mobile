import { NewsArticleManaged } from '../types';

// ─── Dados Mockados ────────────────────────────────────────────────────────

let MANAGED_NEWS: NewsArticleManaged[] = [
  {
    id: 'm1',
    authorId: 'u2',
    published: true,
    title: 'Tecnologia transforma o jornalismo moderno',
    description:
      'Como as ferramentas digitais estão mudando a forma de produzir e consumir notícias.',
    content:
      'A revolução tecnológica tem impactado profundamente o jornalismo. Redações ao redor do mundo estão adotando inteligência artificial para automatizar tarefas repetitivas e permitir que jornalistas foquem em reportagens mais complexas e investigativas.',
    imageUrl:
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop',
    publishedAt: '2026-04-15T10:00:00Z',
    source: 'NewsApp',
    uf: 'SP',
    tags: ['tecnologia', 'jornalismo', 'digital'],
  },
  {
    id: 'm2',
    authorId: 'u2',
    published: false,
    title: 'Inteligência Artificial no Brasil: oportunidades e desafios',
    description: 'Análise sobre o avanço da IA no mercado brasileiro.',
    content:
      'O Brasil está entre os países que mais crescem em adoção de IA. Setores como saúde, educação e agronegócio lideram a transformação, mas ainda há desafios regulatórios e de infraestrutura a serem superados.',
    publishedAt: '2026-04-14T08:00:00Z',
    source: 'NewsApp',
    uf: 'RJ',
    tags: ['ia', 'tecnologia', 'brasil'],
  },
  {
    id: 'm3',
    authorId: 'u2',
    published: true,
    title: 'Startup gaúcha recebe aporte milionário',
    description:
      'Empresa de tecnologia do RS capta R$ 50 milhões em rodada série B.',
    content:
      'Uma startup gaúcha especializada em fintech anunciou captação de R$ 50 milhões em rodada série B. O investimento será usado para expansão nacional e desenvolvimento de novas funcionalidades.',
    imageUrl:
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop',
    publishedAt: '2026-04-12T14:00:00Z',
    source: 'NewsApp',
    uf: 'RS',
    tags: ['startup', 'fintech', 'rio grande do sul'],
  },
  {
    id: 'm4',
    authorId: 'u3',
    published: true,
    title: 'Festival de cinema do Nordeste bate recorde',
    description: 'Evento em Fortaleza reuniu mais de 300 filmes inscritos.',
    content:
      'O Festival de Cinema do Nordeste registrou número recorde de inscrições em sua 15ª edição. A programação inclui mostras competitivas, workshops e debates sobre o audiovisual brasileiro.',
    publishedAt: '2026-04-10T09:00:00Z',
    source: 'NewsApp',
    uf: 'CE',
    tags: ['cinema', 'cultura', 'ceará'],
  },
  {
    id: 'm5',
    authorId: 'u3',
    published: false,
    title: 'Novo programa de habitação popular no Nordeste',
    description:
      'Governo federal anuncia construção de 20 mil unidades habitacionais.',
    content:
      'O programa prevê a construção de 20 mil unidades habitacionais em municípios do Nordeste com déficit habitacional acima de 15%. As obras devem começar no segundo semestre de 2026.',
    publishedAt: '2026-04-08T11:00:00Z',
    source: 'NewsApp',
    uf: 'BA',
    tags: ['habitação', 'nordeste', 'governo federal'],
  },
];

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

// ─── Funções do Serviço ────────────────────────────────────────────────────

export async function getArticlesByAuthor(
  authorId: string
): Promise<NewsArticleManaged[]> {
  await delay(400);
  return MANAGED_NEWS.filter((a) => a.authorId === authorId);
}

export async function getAllManagedArticles(): Promise<NewsArticleManaged[]> {
  await delay(400);
  return [...MANAGED_NEWS];
}

export async function createArticle(
  article: Omit<NewsArticleManaged, 'id'>
): Promise<NewsArticleManaged> {
  await delay(600);
  const newArticle: NewsArticleManaged = {
    ...article,
    id: `m${Date.now()}`,
  };
  MANAGED_NEWS = [newArticle, ...MANAGED_NEWS];
  return newArticle;
}

export async function updateArticle(
  id: string,
  updates: Partial<Omit<NewsArticleManaged, 'id'>>
): Promise<NewsArticleManaged | null> {
  await delay(600);
  const index = MANAGED_NEWS.findIndex((a) => a.id === id);
  if (index === -1) return null;
  MANAGED_NEWS[index] = { ...MANAGED_NEWS[index], ...updates };
  return MANAGED_NEWS[index];
}

export async function togglePublish(id: string): Promise<boolean | null> {
  await delay(300);
  const index = MANAGED_NEWS.findIndex((a) => a.id === id);
  if (index === -1) return null;
  MANAGED_NEWS[index] = {
    ...MANAGED_NEWS[index],
    published: !MANAGED_NEWS[index].published,
  };
  return MANAGED_NEWS[index].published;
}
