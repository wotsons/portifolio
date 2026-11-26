import type { Highlight, Skill } from "./types";

// The first four names also appear in the hero code window's `stack` array.
export const skills: Skill[] = [
  { name: "React / React Native", level: 95 },
  { name: "TypeScript / JavaScript", level: 92 },
  { name: "Node.js / Express", level: 85 },
  { name: "Next.js", level: 85 },
  { name: "Redux / React Query / Zustand", level: 90 },
  { name: "CSS / Tailwind / Styled-Components", level: 92 },
  { name: "PostgreSQL / MySQL", level: 72 },
  { name: "MongoDB / Redis", level: 70 },
  { name: "Docker / CI/CD (Jenkins)", level: 70 },
  { name: "Jest / Testing Library / Vitest", level: 75 },
  { name: "AWS (EC2, S3, API Gateway)", level: 55 },
];

export const highlights: Highlight[] = [
  {
    title: {
      "pt-BR": "Análise e Desenvolvimento de Sistemas",
      en: "Systems Analysis and Development",
    },
    detail: {
      "pt-BR": "Instituto Federal da Paraíba (IFPB), Campus Cajazeiras",
      en: "Federal Institute of Paraíba (IFPB), Cajazeiras campus",
    },
    year: "2025",
  },
  {
    title: { "pt-BR": "+4 milhões de chats/mês", en: "4M+ chats a month" },
    detail: {
      "pt-BR": "Tela de atendimento que desenvolvo e otimizo na Smart NX",
      en: "Customer-service screen I build and optimize at Smart NX",
    },
    year: "2022–",
  },
  {
    title: { "pt-BR": "Inglês avançado", en: "Advanced English" },
    detail: {
      "pt-BR": "Leitura, escrita e conversação técnica",
      en: "Technical reading, writing and conversation",
    },
    year: "—",
  },
];
