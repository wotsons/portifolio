import type { Localized } from "./types";

/** Single source of truth for personal data. */
export const profile = {
  name: "Wotson Sula",
  role: {
    "pt-BR": "Desenvolvedor Front-end",
    en: "Front-end Developer",
  } satisfies Localized,
  location: {
    "pt-BR": "João Pessoa, PB · Brasil",
    en: "João Pessoa, Brazil",
  } satisfies Localized,
  yearsOfExperience: 5,
  tagline: {
    "pt-BR":
      "Construo interfaces React e TypeScript rápidas, escaláveis e pixel-perfect — com foco em arquitetura de componentes e performance.",
    en: "I build fast, scalable, pixel-perfect React and TypeScript interfaces — with a focus on component architecture and performance.",
  } satisfies Localized,
  bio: {
    "pt-BR": [
      "Sou desenvolvedor front-end com 5 anos de experiência, especializado no ecossistema React e TypeScript. Construo interfaces pixel-perfect, dinâmicas e altamente interativas, sempre priorizando a experiência do usuário.",
      "Tenho histórico sólido na construção de aplicações performáticas e escaláveis, com expertise em arquitetura de componentes modulares e otimização de performance (Web Vitals). Hoje atuo em uma plataforma de atendimento que processa mais de 4 milhões de chats por mês.",
    ],
    en: [
      "I'm a front-end developer with 5 years of experience, specialized in the React and TypeScript ecosystem. I build pixel-perfect, dynamic and highly interactive interfaces that put the user experience first.",
      "I have a solid track record building performant, scalable applications, with expertise in modular component architecture and performance optimization (Web Vitals). Today I work on a customer-service platform that handles more than 4 million chats a month.",
    ],
  } satisfies Localized<string[]>,
  email: "wotsonbsf@hotmail.com",
  github: "wotsons",
  linkedin: "https://www.linkedin.com/in/wotson-sula",
  sourceRepo: "https://github.com/wotsons/portifolio",
  resume: {
    // TODO: add the PDFs to /public
    "pt-BR": "/resume-pt.pdf",
    en: "/resume-en.pdf",
  } satisfies Localized,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/** True once the GitHub username placeholder has been replaced. */
export const hasGithub = !profile.github.startsWith("TODO");
