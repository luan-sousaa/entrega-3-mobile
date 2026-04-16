# 📰 NewsApp — React Native + Expo SDK 54

Aplicação mobile de notícias desenvolvida com React Native e Expo SDK 54, utilizando TypeScript, React Navigation e AsyncStorage.

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Expo Go instalado no celular **ou** emulador Android/iOS configurado

### Instalação e execução

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o projeto
npx expo start
```

Após iniciar, você pode:
- Pressionar **`a`** para abrir no emulador Android
- Pressionar **`i`** para abrir no simulador iOS (macOS)
- Escanear o **QR Code** com o app **Expo Go** no celular

---

## 🔐 Credenciais de teste

| E-mail | Senha |
|--------|-------|
| usuario@email.com | 123456 |
| admin@newsapp.com | admin123 |
| teste@teste.com | teste123 |

---

## 📁 Estrutura do Projeto

```
news-app/
├── App.tsx                        # Ponto de entrada — verifica sessão salva
├── app.json                       # Configuração do Expo
├── package.json
├── tsconfig.json
├── babel.config.js
│
└── src/
    ├── types/
    │   └── index.ts               # Interfaces TypeScript (NewsArticle, RootStackParamList, etc.)
    │
    ├── services/
    │   ├── newsService.ts         # Lógica de busca de notícias (dados mockados)
    │   ├── authService.ts         # Validação de login (credenciais mockadas)
    │   └── storageService.ts      # Persistência com AsyncStorage
    │
    ├── components/
    │   ├── NewsCard.tsx           # Card de notícia para a lista
    │   ├── SearchBar.tsx          # Campo de busca por palavra-chave/tag
    │   ├── UFPicker.tsx           # Dropdown de seleção de UF
    │   ├── LoadingIndicator.tsx   # Indicador de carregamento
    │   └── EmptyState.tsx         # Estado vazio (sem resultados)
    │
    ├── screens/
    │   ├── LoginScreen.tsx        # Tela de login com validação
    │   ├── HomeScreen.tsx         # Lista de notícias com filtros
    │   └── NewsDetailScreen.tsx   # Detalhes completos da notícia
    │
    └── navigation/
        └── AppNavigator.tsx       # Stack Navigator (Login → Home → NewsDetail)
```

---

## ✅ Funcionalidades implementadas

| Requisito | Status |
|-----------|--------|
| Tela Home com lista de notícias | ✅ |
| Cards com título, imagem e descrição | ✅ |
| Busca por tag/palavra-chave | ✅ |
| Filtro por UF (dropdown com todos os 27 estados) | ✅ |
| Tela de detalhes da notícia | ✅ |
| Título completo, imagem, conteúdo e data | ✅ |
| Tela de login com email e senha | ✅ |
| Botão "Lembrar de mim" com AsyncStorage | ✅ |
| Indicador de loading | ✅ |
| Mensagem de estado vazio | ✅ |
| Pull-to-refresh | ✅ |
| Tratamento de erros | ✅ |
| TypeScript | ✅ |
| React Navigation (Stack) | ✅ |

---

## 🛠️ Tecnologias utilizadas

- **React Native** — framework mobile
- **Expo SDK 54** — tooling e abstrações nativas
- **TypeScript** — tipagem estática
- **React Navigation v6** — navegação entre telas (Stack Navigator)
- **AsyncStorage** — persistência local do estado de login
- **@react-native-picker/picker** — dropdown de UF

---

## 📝 Observações

- As notícias são **dados mockados** com 10 artigos cobrindo diferentes UFs brasileiras.
- O login é **validado localmente** sem backend real.
- A funcionalidade **"Lembrar de mim"** persiste o estado de login entre sessões usando `AsyncStorage`. Ao reabrir o app com essa opção ativa, o usuário é redirecionado direto para a Home.
- O filtro de UF e a busca por texto funcionam de forma combinada.
