import type { Experience } from "./types";

// TODO: replace with your real experience, most recent first.
// Senior-level tip: 2–3 bullets per role, each with an action and a measurable result.
export const experience: Experience[] = [
  {
    company: "Empresa Atual",
    role: { "pt-BR": "Engenheiro de Software Sênior", en: "Senior Software Engineer" },
    start: "2022-03",
    end: null,
    location: { "pt-BR": "Remoto", en: "Remote" },
    highlights: {
      "pt-BR": [
        "Liderei a migração do front-end para Next.js App Router, reduzindo o LCP em 45%.",
        "Defini padrões de arquitetura e code review adotados por 4 squads.",
        "Mentorei 5 devs plenos, 2 promovidos a sênior.",
      ],
      en: [
        "Led the front-end migration to the Next.js App Router, cutting LCP by 45%.",
        "Defined architecture and code-review standards adopted by 4 squads.",
        "Mentored 5 mid-level developers, 2 promoted to senior.",
      ],
    },
    stack: ["Next.js", "TypeScript", "Node.js", "AWS"],
  },
  {
    company: "Empresa Anterior",
    role: { "pt-BR": "Engenheiro de Software Pleno", en: "Software Engineer" },
    start: "2019-06",
    end: "2022-02",
    location: { "pt-BR": "São Paulo, BR", en: "São Paulo, BR" },
    highlights: {
      "pt-BR": [
        "Construí o design system da empresa do zero, usado em 12 aplicações.",
        "Implementei pipeline de CI/CD que reduziu o tempo de deploy de 40 para 8 minutos.",
      ],
      en: [
        "Built the company design system from scratch, used across 12 applications.",
        "Implemented a CI/CD pipeline that cut deploy time from 40 to 8 minutes.",
      ],
    },
    stack: ["React", "TypeScript", "GraphQL", "Docker"],
  },
  {
    company: "Primeira Empresa",
    role: { "pt-BR": "Desenvolvedor Júnior", en: "Junior Developer" },
    start: "2017-01",
    end: "2019-05",
    location: { "pt-BR": "Brasil", en: "Brazil" },
    highlights: {
      "pt-BR": ["Desenvolvi features full-stack em um SaaS B2B com 20 mil usuários."],
      en: ["Shipped full-stack features on a B2B SaaS with 20k users."],
    },
    stack: ["JavaScript", "React", "PHP", "MySQL"],
  },
];
