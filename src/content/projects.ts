import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "suite",
    preview: "chat",
    title: "Suite",
    status: "production",
    summary: {
      "pt-BR":
        "Plataforma omnichannel da Smart NX com mais de 4 milhões de chats por mês. Código privado.",
      en: "Smart NX's omnichannel platform, handling more than 4 million chats a month. Private code.",
    },
    stack: ["React", "TypeScript", "Node.js", "Redux Toolkit", "TanStack Query"],
    challenge: {
      "pt-BR":
        "Desenvolver e escalar funcionalidades ponta a ponta em uma plataforma de alto volume.",
      en: "Building and scaling end-to-end features on a high-volume platform.",
    },
    impact: {
      "pt-BR":
        "Mais de 4 milhões de chats mensais, com estado e cache padronizados e suíte de testes criada do zero.",
      en: "More than 4 million chats a month, with standardized state and caching and a test suite built from scratch.",
    },
  },
  {
    slug: "webchatplus",
    preview: "widget",
    title: "WebChatPlus",
    status: "production",
    summary: {
      "pt-BR":
        "Widget de atendimento embarcado nos sites dos clientes da Smart NX. Código privado.",
      en: "Support widget embedded in Smart NX clients' websites. Private code.",
    },
    stack: ["React", "Tailwind", "Webpack"],
    challenge: {
      "pt-BR": "Empacotar uma aplicação React para rodar embarcada em sites de terceiros.",
      en: "Packaging a React app to run embedded in third-party websites.",
    },
    impact: {
      "pt-BR": "Canal de atendimento direto nos sites dos clientes, integrado ao Suite.",
      en: "A support channel right on clients' websites, connected to Suite.",
    },
  },
  {
    slug: "integrations",
    preview: "integrations",
    title: "Hub de Integrações",
    status: "production",
    summary: {
      "pt-BR":
        "Webhooks e filas assíncronas conectando WhatsApp, Zenvia, Telegram, SMS, e-mail e Asterisk. Código privado.",
      en: "Webhooks and async queues connecting WhatsApp, Zenvia, Telegram, SMS, email and Asterisk. Private code.",
    },
    stack: ["Node.js", "RabbitMQ", "Redis", "Webhooks", "WhatsApp Business API"],
    challenge: {
      "pt-BR": "Processar mensagens de vários canais de forma assíncrona com filas.",
      en: "Processing messages from many channels asynchronously through queues.",
    },
    impact: {
      "pt-BR": "6 canais integrados à plataforma via RabbitMQ e Redis.",
      en: "6 channels integrated into the platform via RabbitMQ and Redis.",
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
