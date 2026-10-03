# meineSteuer

Öffentliche Lern-Website zum Schweizer Steuerrecht und zur praktischen Steuererklärung für Privatpersonen.

## Conventions

- **Sprache:** Die gesamte Website ist auf Deutsch (Schweizer Rechtschreibung: «ss» statt «ß», Guillemets «»). Keine anderen Sprachversionen, solange nichts anderes entschieden ist.
- **Design:** SteinerDesign (`~/Code/design-system/`), vendored from a release tag (v1.1.0 or later: has the content-page components).
- **Desktop first:** people do their taxes at a desk. Design and test for desktop; phone width only needs to work (no horizontal scroll), not be polished.
- **Stack:** Astro + Svelte islands, static, GitHub Pages (public repo). See `design/decisions/0001`.
- **Figures:** never hand-type amounts in prose; every figure comes from the versioned data files with tax year and source (ADR 0001). Every page carries tax year, check date, sources and the «keine Steuerberatung» notice (ADR 0002).

## Structure

- `src/content/seiten/<bereich>/*.mdx`: pages. Front matter is schema-checked (`src/content.config.ts`): `steuerjahr`, `geprueft_am`, ≥ 1 `quellen` entry are required.
- `src/data/bund/<jahr>.yaml`, `src/data/kantone/<kt>-<jahr>.yaml`: every figure as `{ wert, einheit, typ, quelle, artikel?, hinweis?, ungeprueft? }`; `quelle` must be a key of the file's `quellen` map (checked at build).
- In MDX, insert figures with `<Betrag k="saeule3a_mit_pk" />` or `<Betrag ebene="zh" k="kinderabzug" />`; an unknown key fails the build. In YAML flow maps, quote any `hinweis` containing a comma.
- Canton pages are generated from the data (`src/pages/kantone/`). The canton-vs-federal table rows are in `src/lib/vergleich.ts`.
- Internal links go through `pfad()` (`src/lib/site.ts`) because of the GitHub Pages base path `/meineSteuer/`.
- `ENTWURFSPHASE` in `src/lib/site.ts` adds `noindex` and the «Entwurf» badge; switch off only at launch.
- SteinerDesign is vendored in `public/vendor/steinerdesign/` (see its `VERSION`). Site CSS in `src/styles/site.css`, role tokens only.

## Commands

- `npm run dev` (http://localhost:4321/meineSteuer/), `npm run build` (the build is the content check), `npx astro preview`.
- Push to `main` deploys via `.github/workflows/deploy.yml`.

## Pointers

- Decisions: `design/decisions/`.
- Research notes: `research_notes/`, synthesised report: `reports/`.
