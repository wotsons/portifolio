import type { Project } from "./types";

// TODO: replace with your real projects. Senior-level tip: emphasize scope, decisions and measurable impact.
export const projects: Project[] = [
  {
    slug: "platform",
    title: "Commerce Platform",
    status: "production",
    summary: {
      "pt-BR": "Plataforma de e-commerce multi-tenant com SSR e checkout otimizado.",
      en: "Multi-tenant e-commerce platform with SSR and an optimized checkout.",
    },
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis"],
    challenge: {
      "pt-BR": "Migrar o monolito para micro-frontends sem downtime.",
      en: "Migrating the monolith to micro-frontends with zero downtime.",
    },
    impact: {
      "pt-BR": "-45% no LCP e +12% de conversão no checkout.",
      en: "-45% LCP and +12% checkout conversion.",
    },
    liveUrl: "https://example.com",
    sourceUrl: "https://github.com",
  },
  {
    slug: "design-system",
    title: "Design System",
    status: "production",
    summary: {
      "pt-BR": "Biblioteca de componentes acessíveis usada por 6 times de produto.",
      en: "Accessible component library used by 6 product teams.",
    },
    stack: ["React", "TypeScript", "Storybook", "Radix", "Tailwind"],
    challenge: {
      "pt-BR": "Garantir adoção entre times com necessidades diferentes.",
      en: "Driving adoption across teams with different needs.",
    },
    impact: {
      "pt-BR": "Tempo de entrega de telas novas reduzido em ~30%.",
      en: "~30% faster delivery of new screens.",
    },
    sourceUrl: "https://github.com",
  },
  {
    slug: "realtime",
    title: "Realtime Dashboard",
    status: "production",
    summary: {
      "pt-BR": "Dashboard operacional com dados em tempo real via WebSocket.",
      en: "Operational dashboard with real-time data over WebSockets.",
    },
    stack: ["React", "WebSocket", "Go", "Kafka", "Grafana"],
    challenge: {
      "pt-BR": "Renderizar milhares de eventos por segundo sem travar a UI.",
      en: "Rendering thousands of events per second without blocking the UI.",
    },
    impact: {
      "pt-BR": "Tempo de detecção de incidentes caiu de minutos para segundos.",
      en: "Incident detection time dropped from minutes to seconds.",
    },
    liveUrl: "https://example.com",
  },
  {
    slug: "mobile",
    title: "Mobile App",
    status: "development",
    summary: {
      "pt-BR": "App React Native offline-first com sincronização incremental.",
      en: "Offline-first React Native app with incremental sync.",
    },
    stack: ["React Native", "Expo", "SQLite", "tRPC"],
    challenge: {
      "pt-BR": "Resolver conflitos de sincronização de forma previsível.",
      en: "Resolving sync conflicts predictably.",
    },
    impact: {
      "pt-BR": "Beta com 2 mil usuários e 4.8★ de avaliação.",
      en: "Beta with 2k users and a 4.8★ rating.",
    },
    sourceUrl: "https://github.com",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    status: "production",
    summary: {
      "pt-BR": "Site estático com i18n, Server Actions e easter eggs.",
      en: "Static site with i18n, Server Actions and easter eggs.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind", "next-intl"],
    challenge: {
      "pt-BR": "Manter tudo estático com Cache Components e i18n.",
      en: "Keeping everything static with Cache Components and i18n.",
    },
    impact: {
      "pt-BR": "100 no Lighthouse em performance e acessibilidade.",
      en: "100 Lighthouse score on performance and accessibility.",
    },
    sourceUrl: "https://github.com",
  },
];
