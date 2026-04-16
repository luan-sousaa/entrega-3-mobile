import { NewsArticle } from '../types';

// ─── Dados Mockados ────────────────────────────────────────────────────────

const MOCK_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: 'São Paulo anuncia novo plano de mobilidade urbana',
    description:
      'A prefeitura de São Paulo apresentou um ambicioso plano para reformular o transporte público da cidade nos próximos 10 anos.',
    content:
      'A prefeitura de São Paulo apresentou nesta segunda-feira um ambicioso plano para reformular o transporte público da cidade nos próximos 10 anos. O projeto prevê a expansão da rede de metrô, a criação de novas ciclovias e a modernização da frota de ônibus. O investimento total previsto é de R$ 15 bilhões, sendo R$ 8 bilhões de recursos federais e R$ 7 bilhões do município. As obras devem começar ainda neste ano, com previsão de conclusão para 2034.',
    imageUrl:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&auto=format&fit=crop',
    publishedAt: '2026-04-15T10:00:00Z',
    source: 'Jornal da Cidade',
    uf: 'SP',
    tags: ['mobilidade', 'transporte', 'são paulo', 'metrô'],
  },
  {
    id: '2',
    title: 'Rio de Janeiro registra recorde de turismo no carnaval',
    description:
      'O carnaval carioca de 2026 bateu todos os recordes de público, movimentando mais de R$ 4 bilhões na economia local.',
    content:
      'O carnaval carioca de 2026 bateu todos os recordes de público, com mais de 8 milhões de foliões nas ruas e sambódromos da cidade. O evento movimentou mais de R$ 4 bilhões na economia local, gerando cerca de 200 mil empregos temporários. O prefeito do Rio destacou que a segurança foi reforçada e que a festa transcorreu sem grandes incidentes. Para o próximo ano, já estão sendo planejadas melhorias na infraestrutura para comportar ainda mais visitantes.',
    imageUrl:
      'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=800&auto=format&fit=crop',
    publishedAt: '2026-04-14T14:30:00Z',
    source: 'Portal Brasil',
    uf: 'RJ',
    tags: ['carnaval', 'turismo', 'rio de janeiro', 'economia'],
  },
  {
    id: '3',
    title: 'Minas Gerais investe em energia solar para comunidades rurais',
    description:
      'Estado lança programa para levar energia solar a mais de 50 mil famílias em áreas rurais até o final de 2026.',
    content:
      'O governo de Minas Gerais lançou um programa inovador para levar energia solar a mais de 50 mil famílias em áreas rurais do estado até o final de 2026. O projeto, batizado de "Sol para Todos", prevê a instalação de painéis fotovoltaicos em residências e pequenas propriedades rurais. Cada família beneficiada receberá um kit completo de geração solar, com capacidade de produzir até 3 kWp. O programa também inclui capacitação técnica para moradores realizarem a manutenção dos equipamentos.',
    imageUrl:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop',
    publishedAt: '2026-04-13T09:15:00Z',
    source: 'Folha Regional',
    uf: 'MG',
    tags: ['energia solar', 'sustentabilidade', 'minas gerais', 'rural'],
  },
  {
    id: '4',
    title: 'Bahia sedia maior festival de gastronomia do Nordeste',
    description:
      'Salvador recebe o Festival Sabores do Brasil, reunindo chefs renomados e pratos típicos de todo o país.',
    content:
      'Salvador recebe, neste fim de semana, o Festival Sabores do Brasil, considerado o maior evento de gastronomia do Nordeste. O evento reúne mais de 200 chefs de todo o país, que prepararão pratos típicos e contemporâneos durante três dias de programação. Além das apresentações culinárias, o festival inclui workshops, palestras e a tradicional feira de produtores locais. A entrada é gratuita e a expectativa é receber mais de 100 mil visitantes ao longo do evento.',
    imageUrl:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
    publishedAt: '2026-04-12T16:45:00Z',
    source: 'Correio Baiano',
    uf: 'BA',
    tags: ['gastronomia', 'festival', 'bahia', 'cultura'],
  },
  {
    id: '5',
    title: 'Paraná inaugura maior parque tecnológico do Sul do Brasil',
    description:
      'O Tecnoparque Curitiba abre suas portas com mais de 80 empresas de tecnologia e 3 mil empregos diretos.',
    content:
      'Curitiba inaugurou nesta semana o Tecnoparque Curitiba, que se tornou o maior parque tecnológico do Sul do Brasil. O complexo, que ocupa uma área de 120 mil m², abriga mais de 80 empresas de tecnologia, startups e centros de pesquisa. São cerca de 3 mil empregos diretos criados, com foco em inteligência artificial, biotecnologia e energias renováveis. O parque conta ainda com um hub de inovação e um laboratório de prototipagem aberto a estudantes e empreendedores.',
    imageUrl:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop',
    publishedAt: '2026-04-11T11:00:00Z',
    source: 'Tech Sul News',
    uf: 'PR',
    tags: ['tecnologia', 'inovação', 'paraná', 'curitiba', 'startups'],
  },
  {
    id: '6',
    title: 'Ceará amplia programa de dessalinização de água',
    description:
      'Governo cearense expande projeto que beneficia municípios do semiárido com água potável de qualidade.',
    content:
      'O governo do Ceará anunciou a expansão do programa de dessalinização de água para mais 30 municípios do semiárido cearense. O projeto, que já beneficia 45 cidades, utiliza tecnologia de osmose reversa para transformar água salobra em potável. Cada unidade tem capacidade para abastecer até 5 mil pessoas por dia. A iniciativa é fruto de uma parceria com universidades federais e está sendo reconhecida internacionalmente como modelo de combate à escassez hídrica em regiões áridas.',
    imageUrl:
      'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&auto=format&fit=crop',
    publishedAt: '2026-04-10T08:30:00Z',
    source: 'Diário Nordestino',
    uf: 'CE',
    tags: ['água', 'semiárido', 'ceará', 'sustentabilidade', 'dessalinização'],
  },
  {
    id: '7',
    title: 'Amazonas cria maior reserva de biodiversidade urbana do mundo',
    description:
      'Manaus expande área de preservação ambiental dentro do perímetro urbano, tornando-se referência global.',
    content:
      'A cidade de Manaus criou a maior reserva de biodiversidade urbana do mundo, expandindo a Reserva Florestal Adolpho Ducke para uma área total de 15 mil hectares dentro do perímetro urbano da cidade. A reserva é lar de mais de 2 mil espécies de plantas, 500 espécies de aves e dezenas de espécies de mamíferos. O projeto inclui ainda a criação de corredores ecológicos que conectam a reserva à floresta amazônica. Pesquisadores de todo o mundo já manifestaram interesse em utilizar a área para estudos científicos.',
    imageUrl:
      'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=800&auto=format&fit=crop',
    publishedAt: '2026-04-09T13:20:00Z',
    source: 'Amazônia News',
    uf: 'AM',
    tags: ['amazônia', 'biodiversidade', 'preservação', 'manaus', 'meio ambiente'],
  },
  {
    id: '8',
    title: 'Rio Grande do Sul lança plano de reconstrução pós-enchentes',
    description:
      'Estado apresenta plano abrangente para reconstrução de cidades afetadas pelas enchentes históricas.',
    content:
      'O governo do Rio Grande do Sul apresentou o Plano Gaúcho de Reconstrução, um abrangente programa para recuperar as cidades afetadas pelas enchentes históricas de 2024. O plano prevê investimentos de R$ 30 bilhões ao longo de cinco anos, com foco em infraestrutura, habitação e prevenção de novos desastres. Entre as medidas, destacam-se a construção de diques e barreiras naturais, a criação de sistemas de alerta precoce e a realocação de famílias de áreas de risco. O programa conta com apoio federal e financiamento internacional.',
    imageUrl:
      'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&auto=format&fit=crop',
    publishedAt: '2026-04-08T15:00:00Z',
    source: 'Zero Hora Digital',
    uf: 'RS',
    tags: ['enchentes', 'reconstrução', 'rio grande do sul', 'infraestrutura'],
  },
  {
    id: '9',
    title: 'Pernambuco inaugura polo de energias renováveis no sertão',
    description:
      'Complexo de energia solar e eólica no sertão pernambucano vai gerar energia para 500 mil lares.',
    content:
      'Um novo polo de energias renováveis foi inaugurado no sertão pernambucano, reunindo um parque solar de 800 MW e um parque eólico de 400 MW. O complexo, chamado de Polo Energia Sertão, vai gerar energia suficiente para abastecer mais de 500 mil lares. O projeto gerou 4 mil empregos durante a construção e vai manter 300 postos de trabalho permanentes. Além da geração de energia, o polo vai exportar energia para outros estados do Nordeste através do sistema de transmissão interligado.',
    imageUrl:
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop',
    publishedAt: '2026-04-07T10:45:00Z',
    source: 'Jornal do Commercio PE',
    uf: 'PE',
    tags: ['energia renovável', 'solar', 'eólica', 'pernambuco', 'sertão'],
  },
  {
    id: '10',
    title: 'Goiás se destaca como maior produtor de soja orgânica do Brasil',
    description:
      'Estado alcança marca histórica na produção de soja orgânica, conquistando novos mercados internacionais.',
    content:
      'Goiás se tornou o maior produtor de soja orgânica do Brasil, alcançando uma produção de 2,5 milhões de toneladas na safra 2025/2026. O estado superou o Mato Grosso graças a um programa estadual de incentivo à agricultura orgânica, que oferece crédito facilitado e assistência técnica aos produtores rurais. A soja orgânica goiana já é exportada para mais de 20 países, especialmente para a Europa e Ásia. O preço pago pela soja orgânica é em média 40% maior que o da soja convencional, o que tem atraído cada vez mais produtores para o segmento.',
    imageUrl:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop',
    publishedAt: '2026-04-06T12:00:00Z',
    source: 'Agro Brasil',
    uf: 'GO',
    tags: ['agronegócio', 'soja orgânica', 'goiás', 'exportação', 'agricultura'],
  },
];

// ─── Simulação de delay de rede ────────────────────────────────────────────

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

// ─── Funções do Serviço ────────────────────────────────────────────────────

/**
 * Busca todas as notícias, com filtro opcional por query e UF.
 */
export async function fetchNews(query?: string, uf?: string): Promise<NewsArticle[]> {
  // Simula latência de rede
  await delay(800);

  let results = [...MOCK_NEWS];

  if (uf && uf !== 'TODOS') {
    results = results.filter(
      (article) => article.uf?.toUpperCase() === uf.toUpperCase()
    );
  }

  if (query && query.trim() !== '') {
    const q = query.toLowerCase().trim();
    results = results.filter(
      (article) =>
        article.title.toLowerCase().includes(q) ||
        article.description.toLowerCase().includes(q) ||
        article.content.toLowerCase().includes(q) ||
        article.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  return results;
}

/**
 * Busca uma notícia específica pelo ID.
 */
export async function fetchNewsById(id: string): Promise<NewsArticle | null> {
  await delay(300);
  return MOCK_NEWS.find((article) => article.id === id) ?? null;
}
