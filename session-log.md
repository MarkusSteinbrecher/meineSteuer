# Session log

## 2026-10-03

- **Done:** deep research on Swiss tax law and the practical tax return for private persons (state October 2026). Eight topic researchers plus a second round (per-canton deduction table, verification of flagged points against fedlex/ESTV). German synthesis report written.
- **Changed:** added `CLAUDE.md` (German-only site, SteinerDesign), `research_notes/Swiss tax law for private persons/01–10`, `reports/Swiss tax law for private persons.md`. HQ project page `projects/meinesteuer.md` added.
- **Open:** see «Offene Punkte vor der Publikation» in the report (first-time-buyer deduction from 2029 conflict, GR/VD 2025 values, several cantonal deadlines/logins unconfirmed, ESTV consent for calculator data). Stack and site structure not chosen yet. Nothing committed in this repo.

## 2026-10-03 (later)

- **Done:** checked SteinerDesign v1.0.0 (article kit in light/dark/390 px). Decided stack and content structure.
- **Changed:** ADR 0001 (Astro + Svelte, data layer, GitHub Pages public), ADR 0002 (site areas, first release = system + step by step StJ 2025 + 26 cantons + glossary + reforms). CLAUDE.md updated. `.gitignore` ignores `.playwright-mcp/`.
- **Open:** SteinerDesign issues (nav overflows by 37 px at 390 px; footer rule wider than content; no `<details>`/breadcrumb/stepper/source-citation styles; icons for family/home/calculator missing). Scaffold not started. GitHub repo not created.
- **SteinerDesign v1.1.0** (design-system repo, tagged and pushed): nav overflow fix, footer rule fix, content components (`.sd-meta`, `.sd-breadcrumb`, `.sd-toc`, `.sd-steps`, `details.sd-disclosure`, `.sd-sources`/`.sd-ref`), 30 more icons. Decided: meineSteuer is desktop-first (CLAUDE.md).

## 2026-10-03 (Astro scaffold)

- **Done:** Astro 7 + Svelte + MDX project with schema-checked content and data collections, `<Betrag>` component, layouts on SteinerDesign v1.1.0 (vendored), home, section overviews, canton overview + generated canton page, three draft pages (Bund/Kanton/Gemeinde, Steuerfuss, Säule 3a). Data: `bund/2025.yaml`, `kantone/zh-2025.yaml`. GitHub Pages workflow.
- **Verified:** build fails for a page without sources, an unknown source id in data, and an unknown `<Betrag>` key (each tested by breaking it). Pages checked in the browser at 1440 px.
- **Deployed:** https://markussteinbrecher.github.io/meineSteuer/ (noindex draft). Fixed `.gitignore` (`/dist/`) after the vendored stylesheet 404d on the first deploy.
- **Open:** Pagefind search not added yet; remaining 25 canton data files; Steuerfuss ZH 2025 marked unverified; Impressum page; content for step-by-step guide.

## 2026-10-03 (canton data, System pages)

- **Done:** canton data files for all 26 cantons (tax year 2025). 25 written by three agents from research notes 02/05/09; spot-checked BE, SG, GE, VD, TI, GL against note 09 (all matched). Child deductions for 12 cantons missing from the notes were read directly from the ESTV Steuermäppchen PDF (base amount + scale in `hinweis`). Research wording («Suchzusammenfassung») replaced by «noch nicht bestätigt» on public text.
- **Schema:** `fahrkosten_unbegrenzt` (explicit; a missing cap means unknown), federal `tarife` (2025 brackets, checked for continuity), `src/lib/tarif.ts`, components `BundTarif`, `BundSteuer`.
- **System pages (7):** Bund/Kanton/Gemeinde, Tarif und Progression, Steuerfuss, Wer wo Steuern zahlt, Ein Steuerjahr im Ablauf, Ehepaare und Familien, Veranlagung/Einsprache/Nachsteuer.
- **Layout:** tables use the full content width; canton page shows conditions under each figure, both wealth-allowance types, «unbegrenzt», tax credits labelled.
- **Open:** `steuerverwaltung` URLs are specific pages, not tax-office home pages (all cantons); several deadlines/logins «noch nicht bestätigt» (LU, SZ, OW, FR, BL, SG, NE, GE); VD 2025 values unverified (ESTV shows 2026); GR childcare/Zweiverdiener conflict; Steuerfuss not shown anywhere yet; step-by-step guide content; Pagefind; Impressum.
