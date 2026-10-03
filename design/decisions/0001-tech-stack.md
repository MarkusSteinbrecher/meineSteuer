# 0001 Tech stack: Astro + Svelte, static on GitHub Pages

Status: Accepted (2026-10-03)

## Context
meineSteuer is a German-language educational site with 100+ prose pages and 26 generated canton pages. Every figure depends on level (Bund/Kanton), canton and tax year, and changes yearly. The research (reports/Swiss tax law for private persons.md) showed that keeping figures dated and sourced is the hard part, not the law itself.

## Decision
- **Astro** static site. Content as Markdown/MDX in content collections whose front matter is schema-checked (`steuerjahr`, `geprueft_am`, `quellen` required).
- **Data layer:** figures live in versioned data files (`data/bund/<jahr>.yaml`, `data/kantone/<kt>/<jahr>.yaml`) with schemas (deduction types: Abzug, Freibetrag, Nullstufe, Steuergutschrift/Rabatt; married-couple model: doppeltarif, splitting(divisor), quotient, rabatt, proportional). Prose references figures through a component (e.g. `<Betrag key="…" />`) that renders value, tax year and source; no hand-typed amounts in prose.
- **Svelte islands** for interactive tools, client-side only, no accounts, no input leaves the browser.
- **Pagefind** for static search.
- **SteinerDesign** vendored from a release tag (`vendor/steinerdesign/`), `lang="de-CH"`.
- **GitHub Pages**, public repo. Analytics cookieless or none.

## Consequences
- Build fails on content without source or check date: slower authoring, fewer stale figures.
- ESTV calculator API is not used until ESTV gives written consent; the site links to the official calculator.
- Alternatives rejected: SvelteKit static (content pipeline by hand), plain HTML (too much manual work at this page count).
