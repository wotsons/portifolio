# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Environment

- Node 26 LTS is required (`.nvmrc`, `engines`); the default system Node (20.9) is too old for commitlint and Vitest. In non-interactive shells, run `source ~/.nvm/nvm.sh && nvm use 26` first, including before `git commit`, because the Husky hooks run under whatever Node is on PATH.
- Node 26 has no corepack; pnpm is installed globally with npm (version pinned in `packageManager`).
- Use pnpm.

## Commands

```bash
pnpm dev                 # dev server
pnpm build               # production build (also validates Cache Components prerendering)
pnpm lint                # ESLint (includes React Compiler rules such as react-hooks/immutability)
pnpm format:check        # Prettier (with tailwind class sorting)
pnpm typecheck           # next typegen && tsc --noEmit (typegen is needed for next/root-params + LayoutProps)
pnpm test                # Vitest unit tests
pnpm exec vitest run src/components/terminal/commands.test.ts   # single file
pnpm exec vitest run -t "validates theme names"                 # single test by name
pnpm test:e2e            # Playwright, builds and serves on :3100
```

Playwright's Chromium can't launch in this WSL environment because system libraries are missing. E2E runs in CI (`.github/workflows/ci.yml`).

## Commits

Conventional Commits are enforced by commitlint in `.husky/commit-msg`, and body lines must be 100 characters or fewer. lint-staged runs ESLint and Prettier on staged files.

## Architecture

**Single page, two locales.** All routes live under `src/app/[locale]/`; there is no root `app/layout.tsx`. `src/proxy.ts` (Next 16's renamed middleware) runs next-intl to redirect `/` to `/pt-BR` or `/en`. The locale is read with `next/root-params` (`locale()`) in `src/i18n/request.ts` and the layout, not from `params`. This keeps `/pt-BR` and `/en` fully static. `next/root-params` does not work in Client Components, Server Actions, or route/metadata handlers; `opengraph-image.tsx` uses `params` instead.

**Cache Components is on** (`cacheComponents: true`). Anything non-deterministic in a Server Component, such as `new Date()` or `fetch`, must be in a `"use cache"` function (see `currentYear` in `Footer.tsx` and `src/lib/github.ts`), behind `<Suspense>`, or in a client component. Otherwise `pnpm build` fails.

**Content vs. copy.** Personal data is typed in `src/content/*.ts`. Fields that differ per language use `Localized<T> = Record<Locale, T>` and are read with `value[locale]`. UI strings are in `src/messages/*.json`, and `src/global.d.ts` types next-intl keys from `pt-BR.json`. A test checks that both message files have identical keys.

**Section registry.** `src/content/sections.ts` (`SECTIONS`) is the ordered list of section ids. It drives the side nav numbering, the `SectionHeading` index, the <kbd>1</kbd>–<kbd>5</kbd> shortcuts and the terminal `goto` command. Each section component renders `<section id={id}>` with that id.

**Server/client split.** Section components in `src/components/sections/` are async Server Components and pass translated strings into small client islands (`HeroClient`, `WorkCarousel`, `FlipCard`, `SkillBar`, `ContactForm`). Global client-only layers (matrix rain, cursor, reveal observer, terminal, easter eggs, boot screen) are mounted once by `components/effects/Effects.tsx`.

**Cross-component communication** uses the typed window CustomEvent bus in `src/lib/events.ts` (`emit` / `useAppEvent`), not a store. For example, the footer `[ admin ]` emits `terminal:open`, and the terminal `snake` command emits `game:open`.

**Boot gating.** `src/lib/boot.ts` is a tiny external store. `BootScreen` calls `beginBoot()` in a layout effect, before any passive effects run, so the hero typewriters (`useBootDone()`) wait until the boot screen finishes. Boot shows once per session (`sessionStorage.booted`).

**Settings store.** `src/lib/settings.ts` holds client state shared by unrelated components: `effectsStore` (rain + cursor trail; persisted in `localStorage.effects`, toggled by `matrix on|off`) and `konamiStore` (Konami count; 1+ unlocks the hidden `snake` command, 2+ triggers the light show).

**Terminal.** `components/terminal/commands.ts` is pure: `runCommand(input, ctx)` returns `{lines, effects}`; `ctx` carries `t`, `locale`, `history`, `snakeUnlocked` and `effectsOn`. `Terminal.tsx` performs the effects (theme, lang, goto, open, navigate, stats, effects, reset, hire, game). To add a command: handle it in `runCommand`, add it to `COMMANDS` (or leave it out to keep it hidden), add `terminal.help.<cmd>` in both locales, add argument completions to `ARG_COMPLETIONS` if any, and add a unit test.

**Theming.** Colors are Tailwind v4 tokens in `src/app/globals.css` (`bg`, `card`, `raised`, `line`, `fg`, `fg-2`, `muted`, `accent`...). `--accent` is a runtime CSS variable, so the terminal `theme` command can change it. `themeInitScript` in `src/lib/theme.ts` re-applies the persisted theme before paint and adds the `js` class that `.reveal` animations depend on. Neutral colors are declared in `@theme` (not `@theme inline`) so they compile to `var(--color-*)`; the `@media print` block in `globals.css` overrides them with a light palette. Elements that must not print get `print:hidden`; the work carousel uses `data-print-static` / `data-print-track` and flip cards `data-print-flat`.

**SVGs.** Icons and illustration parts live in `src/assets/icons/` and are imported as components with `?react` (SVGR via a Turbopack rule in `next.config.ts`; types in `src/svg.d.ts`). Use `fill`/`stroke="currentColor"` so they follow text color and the accent theme, and size them with `className`. Files that must be reachable by URL (the favicon) stay in `public/images/`.

**Contact form.** `src/lib/contact-action.ts` is a Server Action. It validates with `parseContact` (zod), sends with Resend, and returns field keys or reason codes that the client localizes. Without `RESEND_API_KEY` and `CONTACT_TO_EMAIL` it returns `reason: "notConfigured"`.
