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

## 2026-10-05 (research: Eigenmietwert)

- **Done:** deep research on how the Eigenmietwert is calculated (federal and all 26 cantons) and on the abolition. All 13 research subagents stalled at the 600 s watchdog, so the research was done in the main thread from ESTV primary sources: Dossier «Besteuerung der Eigenmietwerte» (Feb. 2026), Steuermäppchen StP 2025 (26.11.2025), Rundschreiben 172 (2019), EFD FAQ on the vote, ZH Weisung 2009 and the Übergangsregelung of 12.11.2025, Bundesrat 1.4.2026, GR consultation of 27.8.2026.
- **Changed:** `research_notes/Eigenmietwert Berechnung nach Kanton/` (estv_kantonsuebersicht, abschaffung_systemwechsel, bund_geltendes_recht [partial]); `reports/Eigenmietwert Berechnung nach Kanton.md`.
- **Findings worth knowing:** in force 1.1.2029, so StJ 2025–2028 run on current law. ZH is not raising Eigenmietwerte for existing buildings despite the Weisung 2026 (Übergangsregelung). The ESTV dossier's canton table is partly out of date; prefer the Steuermäppchen and cantonal Wegleitungen. The first-time-buyer «7-year» point from the 2026-10-03 report is resolved: it is the transition rule (bought 3 years before → 7 years left).
- **Open:** cantonal Wegleitungen not read except ZH; RS 172 factors for 2025 (BS, BE); GE flat-rate deduction (10/20 vs 15/25 in the earlier report); wording of the Ersterwerberabzug transition rule in BBl 2025 23; list of cantons that voted no; second-home tax plans in VS/TI/BE. Nothing committed.
- **Later the same day (second pass):** read all 26 ESTV Kantonsblätter (Feb. 2026, StP 2025) and the law text BBl 2025 23. Corrections now in the report: OW has a new tiered system (4.25–2.25 % of the Steuerwert, EMW = 60 %), NW deducts 40 % (not 30 %), AG 62 %, BS = reference rate + 1.75 % (3.5 % in 2025; dBSt 4 %, max 82 400), GE flat rate 15/25 % (the ESTV dossier is wrong), full BL and SO tables. First-time-buyer transition = purchases up to 10 years before entry into force (Art. 205g DBG / 78h StHG). The No cantons were GE, VD, NE, JU, VS, FR and BS. New notes file `kantonsblaetter_2025.md`. Still open: dBSt values for OW/NW, BS rate for 2026, bk.admin.ch confirmation, second-home tax plans in BE/TI/VS.

## 2026-10-05 (wrap-up)

- **Done:** closed the Eigenmietwert research session. Report `reports/Eigenmietwert Berechnung nach Kanton.md` is final for now (ESTV Kantonsblätter, Steuermäppchen 2025, BBl 2025 23, ZH Weisung). HQ: three lessons added (`agentic-workflow`: research subagents stalled on PDF-heavy work; `verification-and-debugging`: Fedlex BBl PDF URL pattern, macOS has no `timeout`), commit 3c0348d, pushed.
- **Changed:** nothing in `src/`; no data files touched. New research notes and report, session-log entries. All uncommitted.
- **Open:** commit the report, notes and this log; decide whether the Eigenmietwert figures go into `src/data/` (needs a schema for tiered rates: OW, NE, BL, SO); open questions listed at the end of the report (dBSt values OW/NW, BS 2026 rate, OW top bracket, vote results at bk.admin.ch, second-home tax BE/TI/VS, ZH Bundesgericht case).
