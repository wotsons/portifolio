import type { Highlight, Skill } from "./types";

// TODO: adjust levels honestly — recruiters notice inflated bars.
export const skills: Skill[] = [
  { name: "TypeScript / JavaScript", level: 95 },
  { name: "React / Next.js", level: 92 },
  { name: "Node.js", level: 85 },
  { name: "CSS / Tailwind", level: 88 },
  { name: "SQL / PostgreSQL", level: 75 },
  { name: "Cloud / DevOps", level: 70 },
];

// TODO: certifications, talks, open-source, awards...
export const highlights: Highlight[] = [
  {
    title: { "pt-BR": "Certificação AWS", en: "AWS Certification" },
    detail: { "pt-BR": "Solutions Architect – Associate", en: "Solutions Architect – Associate" },
    year: "2024",
  },
  {
    title: { "pt-BR": "Palestra", en: "Talk" },
    detail: {
      "pt-BR": "Performance em Next.js na prática",
      en: "Next.js performance in practice",
    },
    year: "2023",
  },
];
