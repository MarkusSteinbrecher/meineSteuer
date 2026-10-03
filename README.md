# meineSteuer

Das Schweizer Steuerrecht für Privatpersonen verständlich erklärt: wie das System funktioniert, was in welche Zeile der Steuererklärung gehört und was in Ihrem Kanton anders ist. Neutral, werbefrei, jede Zahl mit Steuerjahr und Quelle.

**Status:** Entwurf, noch nicht für die Öffentlichkeit freigegeben (Suchmaschinen sind ausgeschlossen).
**Website:** https://markussteinbrecher.github.io/meineSteuer/

> meineSteuer ist allgemeine Information, keine Steuerberatung. Massgebend sind das Gesetz, die Wegleitung Ihres Kantons und Ihre Veranlagung.

## Fehler melden

Haben Sie eine falsche oder veraltete Zahl gefunden? Bitte ein [Issue](https://github.com/MarkusSteinbrecher/meineSteuer/issues) eröffnen, mit Seite, Steuerjahr und Quelle.

## Entwicklung

```sh
npm install
npm run dev     # http://localhost:4321/meineSteuer/
npm run build   # prüft Inhalte und Daten, schreibt dist/
```

- Texte: `src/content/seiten/<bereich>/*.mdx`
- Zahlen: `src/data/bund/<jahr>.yaml`, `src/data/kantone/<kt>-<jahr>.yaml`
- Recherche: `reports/` und `research_notes/`
