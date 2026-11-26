import type { Localized } from "./types";

export const profile = {
  name: "Wotson Sula",
  role: {
    "pt-BR": "Desenvolvedor Full-Stack",
    en: "Full-Stack Developer",
  } satisfies Localized,
  location: {
    "pt-BR": "Brasil · Remoto",
    en: "Brazil · Remote",
  } satisfies Localized,
  yearsOfExperience: 5,
  tagline: {
    "pt-BR":
      "Construo aplicações web escaláveis e sistemas de comunicação em tempo real, de ponta a ponta — do React ao Node.js, filas e banco de dados.",
    en: "I build scalable web applications and real-time communication systems end to end — from React to Node.js, queues and databases.",
  } satisfies Localized,
  bio: {
    "pt-BR": [
      "Sou desenvolvedor full-stack com 5 anos de experiência na construção, evolução e sustentação de aplicações web escaláveis e sistemas de comunicação em tempo real.",
      "Atuo de ponta a ponta, unindo front-end moderno (React, Next.js, TypeScript, Design Systems e gerenciamento de estado/cache) a back-end, mensageria e dados (Node.js, APIs REST, RabbitMQ, Redis, PostgreSQL, MySQL e MongoDB). Tenho histórico em plataformas de alto volume (4M+ interações mensais), testes automatizados, CI/CD e manutenção de sistemas legados críticos.",
    ],
    en: [
      "I'm a full-stack developer with 5 years of experience building, evolving and maintaining scalable web applications and real-time communication systems.",
      "I work end to end, combining modern front-end (React, Next.js, TypeScript, Design Systems and state/cache management) with back-end, messaging and data (Node.js, REST APIs, RabbitMQ, Redis, PostgreSQL, MySQL and MongoDB). I have a track record with high-volume platforms (4M+ monthly interactions), automated testing, CI/CD and critical legacy system maintenance.",
    ],
  } satisfies Localized<string[]>,
  email: "wotsonbsf@hotmail.com",
  github: "wotsons",
  linkedin: "https://www.linkedin.com/in/wotson-sula",
  sourceRepo: "https://github.com/wotsons/portifolio",
  resume: {
    "pt-BR": "/resume/resume-pt.pdf",
    en: "/resume/resume-en.pdf",
  } satisfies Localized,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const hasGithub = !profile.github.startsWith("TODO");
