# Portfolio

Personal portfolio with a terminal/dev look: pinned horizontal project carousel with flip cards, a typing code window, an interactive terminal, live GitHub activity and a few easter eggs. Bilingual (pt-BR / en).

**Stack:** Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · next-intl · Server Actions + zod + Resend · Vitest · Playwright · Vercel.

## Getting started

Requires Node 22 (see `.nvmrc`) and pnpm.

```bash
nvm use
pnpm install
cp .env.example .env.local   # optional, see below
pnpm dev
```

Open http://localhost:3000. It redirects to `/pt-BR` or `/en` based on your browser language.

## Make it yours

All personal data lives in `src/content/`. Search for `TODO` and replace each placeholder:

| File                                           | What to change                                                          |
| ---------------------------------------------- | ----------------------------------------------------------------------- |
| `src/content/profile.ts`                       | Name, role, tagline, bio, email, GitHub username, LinkedIn, repo URL    |
| `src/content/projects.ts`                      | Projects for the carousel (summary, stack, hardest part, impact, links) |
| `src/content/experience.ts`                    | Work history, most recent first                                         |
| `src/content/skills.ts`                        | Skill bars and highlights (certifications, talks...)                    |
| `public/resume-pt.pdf`, `public/resume-en.pdf` | Your resume in each language                                            |

Localized fields use `{ "pt-BR": "...", en: "..." }`. UI copy is in `src/messages/{pt-BR,en}.json`. A unit test fails if the two files' keys drift apart.

## Environment variables

| Variable                             | Purpose                                                                                 |
| ------------------------------------ | --------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`               | Production URL, used for canonical links, sitemap and OG images                         |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL` | Enable the contact form. Without them the form shows an "unavailable, email me" message |
| `CONTACT_FROM_EMAIL`                 | Optional sender on a domain verified in Resend                                          |
| `GITHUB_TOKEN`                       | Optional, raises the GitHub API rate limit                                              |

## Scripts

| Command                     | Description                                              |
| --------------------------- | -------------------------------------------------------- |
| `pnpm dev`                  | Dev server                                               |
| `pnpm build` / `pnpm start` | Production build / serve                                 |
| `pnpm lint` / `pnpm format` | ESLint / Prettier                                        |
| `pnpm typecheck`            | Generates route types, then runs `tsc`                   |
| `pnpm test`                 | Unit tests (Vitest)                                      |
| `pnpm test:e2e`             | Smoke tests (Playwright; builds and serves on port 3100) |

Commits follow [Conventional Commits](https://www.conventionalcommits.org/), enforced by commitlint in a Husky hook. lint-staged formats staged files.

## Easter eggs

- Press <kbd>&#96;</kbd> to open the terminal (`help` lists commands; try `theme pink` or `lang en`).
- Press <kbd>1</kbd>–<kbd>5</kbd> to jump between sections.
- Konami code: ↑ ↑ ↓ ↓ ← → ← → B A.
- Right-click anywhere, click the bug in the footer, or stay idle for 30 seconds.

All motion respects `prefers-reduced-motion`.

## Deploy

Import the repo on [Vercel](https://vercel.com/new), set the environment variables above, and deploy. Vercel Analytics is already wired in.
