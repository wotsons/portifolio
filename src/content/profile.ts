import type { Localized } from "./types";

/**
 * Single source of truth for personal data.
 * Every field marked TODO must be replaced with your real information.
 */
export const profile = {
  name: "Wotson Sula", // TODO: confirm how your name should appear
  role: {
    "pt-BR": "Engenheiro de Software Sênior",
    en: "Senior Software Engineer",
  } satisfies Localized,
  location: {
    "pt-BR": "Brasil · remoto", // TODO
    en: "Brazil · remote", // TODO
  } satisfies Localized,
  yearsOfExperience: 8, // TODO
  tagline: {
    // TODO: one sentence on what you build and the value you bring
    "pt-BR":
      "Construo produtos web escaláveis de ponta a ponta — da arquitetura ao deploy — e ajudo times a entregar com qualidade.",
    en: "I build scalable web products end to end — from architecture to deploy — and help teams ship with quality.",
  } satisfies Localized,
  bio: {
    // TODO: 2–3 short paragraphs. Lead with seniority, domain and impact.
    "pt-BR": [
      "Sou engenheiro de software com foco em front-end e full-stack TypeScript. Nos últimos anos liderei a arquitetura de aplicações usadas por milhares de pessoas, cuidando de performance, acessibilidade e experiência de desenvolvimento.",
      "Gosto de transformar problemas ambíguos em sistemas simples, mentorar outros devs e tomar decisões técnicas guiadas por métricas.",
    ],
    en: [
      "I'm a software engineer focused on front-end and full-stack TypeScript. Over the last few years I've led the architecture of applications used by thousands of people, owning performance, accessibility and developer experience.",
      "I enjoy turning ambiguous problems into simple systems, mentoring other developers and making metric-driven technical decisions.",
    ],
  } satisfies Localized<string[]>,
  email: "voce@exemplo.com", // TODO
  github: "TODO_GITHUB_USERNAME", // TODO: your GitHub username (powers the activity graph)
  linkedin: "https://www.linkedin.com/in/TODO", // TODO
  sourceRepo: "https://github.com/TODO_GITHUB_USERNAME/portifolio", // TODO
  resume: {
    // TODO: add the PDFs to /public
    "pt-BR": "/resume-pt.pdf",
    en: "/resume-en.pdf",
  } satisfies Localized,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/** True once the GitHub username placeholder has been replaced. */
export const hasGithub = !profile.github.startsWith("TODO");
