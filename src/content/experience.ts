import type { Experience } from "./types";

// Most recent first. Each bullet: an action plus a measurable result.
export const experience: Experience[] = [
  {
    company: "Smart NX",
    role: { "pt-BR": "Desenvolvedor Front-end Pleno", en: "Mid-level Front-end Developer" },
    start: "2022-02",
    end: null,
    location: { "pt-BR": "Juiz de Fora, MG", en: "Juiz de Fora, Brazil" },
    highlights: {
      "pt-BR": [
        "Otimizei a performance de aplicações React/TypeScript, reduzindo o tempo de carregamento em 17% e aumentando a conversão em 10% com code-splitting, lazy loading e otimização de bundles no Webpack.",
        "Arquitetei e desenvolvi uma biblioteca de componentes modulares com Ant Design e Styled-Components, adotada por 4 squads, reduzindo o tempo de desenvolvimento de novas features em ~20%.",
        "Liderei a migração do gerenciamento de estado para Redux + Redux Toolkit em uma aplicação com mais de 50 telas, eliminando prop drilling e melhorando a manutenibilidade.",
        "Implementei e mantive pipelines de CI/CD com Jenkins, reduzindo o tempo de deploy de 40 para menos de 10 minutos, com entregas contínuas e zero downtime.",
        "Desenvolvi e aprimorei a tela de atendimento ao usuário, otimizando a experiência para lidar com mais de 4.000.000 de chats mensais de forma fluida e responsiva.",
        "Estabeleci convenções de branching e revisão de código no Bitbucket que reduziram conflitos de merge em projetos multi-time.",
        "Trabalhei lado a lado com UI/UX, design e back-end para entregar interfaces pixel-perfect e integrar APIs RESTful complexas de forma escalável.",
      ],
      en: [
        "Optimized React/TypeScript applications, cutting load time by 17% and raising conversion by 10% through code-splitting, lazy loading and Webpack bundle optimization.",
        "Architected and built a modular component library with Ant Design and Styled-Components, adopted by 4 squads and cutting new-feature development time by ~20%.",
        "Led the state-management migration to Redux + Redux Toolkit in an application with 50+ screens, eliminating prop drilling and improving maintainability.",
        "Implemented and maintained Jenkins CI/CD pipelines, cutting deploy time from 40 to under 10 minutes with continuous, zero-downtime releases.",
        "Built and improved the customer-service screen, optimizing the experience to handle more than 4,000,000 chats a month smoothly and responsively.",
        "Set up branching and code-review conventions on Bitbucket that reduced merge conflicts across multi-team projects.",
        "Worked closely with UI/UX, design and back-end teams to ship pixel-perfect interfaces and integrate complex RESTful APIs at scale.",
      ],
    },
    stack: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Ant Design",
      "Styled-Components",
      "Webpack",
      "Jenkins",
    ],
  },
  {
    company: "Loopis Jr",
    role: { "pt-BR": "Desenvolvedor Front-end Júnior", en: "Junior Front-end Developer" },
    start: "2021-12",
    end: "2022-02",
    location: { "pt-BR": "Cajazeiras, PB", en: "Cajazeiras, Brazil" },
    highlights: {
      "pt-BR": [
        "Desenvolvi e aprimorei websites de e-commerce em ambiente colaborativo.",
        "Usei SCRUM no gerenciamento de projetos, contribuindo para a entrega de 3 projetos dentro do prazo.",
      ],
      en: [
        "Built and improved e-commerce websites in a collaborative environment.",
        "Used SCRUM for project management, helping deliver 3 projects on schedule.",
      ],
    },
    stack: ["React", "JavaScript", "HTML/CSS", "Node.js"],
  },
  {
    company: "IFPB",
    companyUrl: "https://www.ifpb.edu.br/cajazeiras",
    role: {
      "pt-BR": "Monitor de Algoritmos e Lógica de Programação",
      en: "Algorithms & Programming Logic Teaching Assistant",
    },
    start: "2021-07",
    end: "2022-03",
    location: { "pt-BR": "Cajazeiras, PB", en: "Cajazeiras, Brazil" },
    highlights: {
      "pt-BR": [
        "Auxiliei mais de 50 alunos com dificuldades em algoritmos e lógica de programação em C, contribuindo para a redução da reprovação na disciplina.",
      ],
      en: [
        "Helped 50+ students struggling with algorithms and programming logic in C, contributing to a lower failure rate in the course.",
      ],
    },
    stack: ["C"],
  },
];
