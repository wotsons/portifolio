import type { Highlight, Skill } from "./types";

// The first four names also appear in the hero code window's `stack` array.
export const skills: Skill[] = [
  { name: "React / React Native", level: 95 },
  { name: "TypeScript / JavaScript", level: 92 },
  { name: "Node.js / Express", level: 85 },
  { name: "Next.js", level: 85 },
  { name: "Redux Toolkit / TanStack Query / Zustand", level: 90 },
  { name: "Tailwind / Styled-Components / SASS", level: 92 },
  { name: "PostgreSQL / MySQL / MongoDB", level: 75 },
  { name: "RabbitMQ / Redis / WebSockets", level: 75 },
  { name: "Vitest / Jest / Testing Library", level: 80 },
  { name: "Docker / CI/CD (Bitbucket Pipelines)", level: 70 },
  { name: "PHP / Java / Asterisk", level: 55 },
];

export const highlights: Highlight[] = [
  {
    title: {
      "pt-BR": "Tecnólogo em Análise e Desenvolvimento de Sistemas",
      en: "Technologist Degree in Systems Analysis and Development",
    },
    detail: {
      "pt-BR": "Instituto Federal da Paraíba (IFPB), Campus Cajazeiras",
      en: "Federal Institute of Paraíba (IFPB), Cajazeiras campus",
    },
    year: "2020–2025",
  },
  {
    title: { "pt-BR": "+4 milhões de chats/mês", en: "4M+ chats a month" },
    detail: {
      "pt-BR": "Suite, a plataforma omnichannel em que trabalho na Smart NX",
      en: "Suite, the omnichannel platform I work on at Smart NX",
    },
    year: "2022–",
  },
  {
    title: { "pt-BR": "Inglês", en: "English" },
    detail: {
      "pt-BR": "Leitura técnica avançada; escrita e conversação intermediárias",
      en: "Advanced technical reading; intermediate writing and speaking",
    },
    year: "—",
  },
];
