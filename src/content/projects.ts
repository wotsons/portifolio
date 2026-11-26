import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "atendimento",
    preview: "chat",
    title: "Plataforma de Atendimento",
    status: "production",
    summary: {
      "pt-BR":
        "Tela de atendimento ao usuário da Smart NX, otimizada para mais de 4 milhões de chats por mês. Código privado.",
      en: "Smart NX's customer-service screen, optimized for more than 4 million chats a month. Private code.",
    },
    stack: ["React", "TypeScript", "Redux Toolkit", "Ant Design", "REST"],
    challenge: {
      "pt-BR":
        "Manter a interface fluida e responsiva com um volume de mais de 4.000.000 de chats mensais.",
      en: "Keeping the interface smooth and responsive at more than 4,000,000 chats a month.",
    },
    impact: {
      "pt-BR": "Atendimento em escala com experiência fluida para quem opera a plataforma.",
      en: "Customer service at scale with a smooth experience for the people running it.",
    },
  },
  {
    slug: "design-system",
    preview: "components",
    title: "Biblioteca de Componentes",
    status: "production",
    summary: {
      "pt-BR":
        "Biblioteca de componentes modulares que arquitetei na Smart NX com Ant Design e Styled-Components. Código privado.",
      en: "Modular component library I architected at Smart NX with Ant Design and Styled-Components. Private code.",
    },
    stack: ["React", "TypeScript", "Ant Design", "Styled-Components"],
    challenge: {
      "pt-BR": "Criar componentes genéricos o bastante para atender 4 squads diferentes.",
      en: "Making components generic enough to serve 4 different squads.",
    },
    impact: {
      "pt-BR": "Adotada por 4 squads e ~20% menos tempo para entregar novas features.",
      en: "Adopted by 4 squads, with ~20% faster delivery of new features.",
    },
  },
  {
    slug: "performance",
    preview: "performance",
    title: "Performance & Web Vitals",
    status: "production",
    summary: {
      "pt-BR":
        "Otimização de aplicações React/TypeScript na Smart NX com code-splitting, lazy loading e ajuste de bundles.",
      en: "Optimizing React/TypeScript applications at Smart NX with code-splitting, lazy loading and bundle tuning.",
    },
    stack: ["React", "TypeScript", "Webpack", "Web Vitals"],
    challenge: {
      "pt-BR": "Reduzir o peso dos bundles sem reescrever as aplicações.",
      en: "Shrinking bundles without rewriting the applications.",
    },
    impact: {
      "pt-BR": "-17% no tempo de carregamento e +10% na taxa de conversão.",
      en: "-17% load time and +10% conversion rate.",
    },
  },
  {
    slug: "nextjs-dashboard",
    preview: "dashboard",
    title: "Next.js Dashboard",
    status: "production",
    summary: {
      "pt-BR":
        "Dashboard financeiro com autenticação, métricas, gráfico de receita e CRUD de faturas e clientes.",
      en: "Financial dashboard with authentication, metrics, a revenue chart and invoice/customer CRUD.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL", "NextAuth", "Zod"],
    challenge: {
      "pt-BR":
        "Busca, paginação e formulários com Server Actions e validação Zod no App Router, com rotas protegidas.",
      en: "Search, pagination and forms with Server Actions and Zod validation in the App Router, behind protected routes.",
    },
    impact: {
      "pt-BR": "Aplicação full-stack publicada na Vercel com banco PostgreSQL.",
      en: "Full-stack app deployed on Vercel with a PostgreSQL database.",
    },
    liveUrl: "https://nextjs-dashboard-nine-orpin-87.vercel.app",
    sourceUrl: "https://github.com/wotsons/nextjs-dashboard",
  },
  {
    slug: "podcastr",
    preview: "player",
    title: "Podcastr",
    status: "archived",
    summary: {
      "pt-BR": "Plataforma de podcasts gerada estaticamente (SSG) com Next.js, com player próprio.",
      en: "Statically generated (SSG) podcast platform built with Next.js, with a custom player.",
    },
    stack: ["Next.js", "TypeScript", "SCSS", "Axios"],
    challenge: {
      "pt-BR":
        "Gerar páginas estáticas a partir de dados de uma API e manter o player entre navegações.",
      en: "Generating static pages from API data while keeping the player alive across navigations.",
    },
    impact: {
      "pt-BR": "Páginas estáticas e rápidas, sem servidor para servir o conteúdo.",
      en: "Fast static pages with no server needed to serve content.",
    },
    sourceUrl: "https://github.com/wotsons/podcaster",
  },
  {
    slug: "portfolio",
    preview: "terminal",
    title: "Portfolio",
    status: "production",
    summary: {
      "pt-BR":
        "Este site: estático, bilíngue, com Server Actions, terminal interativo e easter eggs.",
      en: "This site: static, bilingual, with Server Actions, an interactive terminal and easter eggs.",
    },
    stack: ["Next.js 16", "TypeScript", "Tailwind v4", "next-intl"],
    challenge: {
      "pt-BR": "Manter tudo pré-renderizado com Cache Components e i18n por rota.",
      en: "Keeping everything prerendered with Cache Components and per-route i18n.",
    },
    impact: {
      "pt-BR": "Testes unitários e E2E rodando em CI a cada push.",
      en: "Unit and E2E tests running in CI on every push.",
    },
    sourceUrl: "https://github.com/wotsons/portifolio",
  },
];
