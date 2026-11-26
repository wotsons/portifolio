import type { Localized } from "./types";

export const profile = {
  name: "Wotson Sula",
  role: {
    "pt-BR": "Desenvolvedor Full Stack",
    en: "Full Stack Developer",
  } satisfies Localized,
  location: {
    "pt-BR": "João Pessoa, PB · Brasil",
    en: "João Pessoa, Brazil",
  } satisfies Localized,
  yearsOfExperience: 5,
  tagline: {
    "pt-BR":
      "Construo aplicações web de ponta a ponta com React, TypeScript e Node.js — interfaces rápidas e pixel-perfect, APIs e entrega contínua.",
    en: "I build web applications end to end with React, TypeScript and Node.js — fast, pixel-perfect interfaces, APIs and continuous delivery.",
  } satisfies Localized,
  bio: {
    "pt-BR": [
      "Sou desenvolvedor full stack com 5 anos de experiência, especializado no ecossistema React, TypeScript e Node.js. No front-end, construo interfaces pixel-perfect, dinâmicas e altamente interativas; no back-end, trabalho com Node.js, Express, bancos SQL e NoSQL e integração de APIs REST.",
      "Tenho histórico sólido em aplicações performáticas e escaláveis: arquitetura de componentes modulares, otimização de performance (Web Vitals) e pipelines de CI/CD. Hoje atuo em uma plataforma de atendimento que processa mais de 4 milhões de chats por mês.",
    ],
    en: [
      "I'm a full stack developer with 5 years of experience, specialized in the React, TypeScript and Node.js ecosystem. On the front end I build pixel-perfect, dynamic and highly interactive interfaces; on the back end I work with Node.js, Express, SQL and NoSQL databases and REST API integration.",
      "I have a solid track record with performant, scalable applications: modular component architecture, performance optimization (Web Vitals) and CI/CD pipelines. Today I work on a customer-service platform that handles more than 4 million chats a month.",
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
