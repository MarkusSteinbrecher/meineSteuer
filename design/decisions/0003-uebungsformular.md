# 0003 Übungsformular: Steuererklärung im Browser ausfüllen

Status: Accepted (2026-11-06)

## Context
Markus besucht einen Steuerkurs der VGS. An den letzten beiden Kurstagen (Woche vom 9.11.2026) werden Übungsfälle bearbeitet, und dafür sind die Zürcher Steuerformulare 2025 auszufüllen. Die Website soll diese Übungen tragen. ADR 0002 hat «Werkzeuge (später)» vorgesehen. Das ist das erste Werkzeug.

Die Falldaten aus dem Kurs sind Unterlagen Dritter und werden wie persönliche Daten behandelt. Das Repo ist öffentlich, die Website statisch.

## Decision
- **Umfang:** Kanton Zürich, Steuerjahr 2025, ganzjährige Steuerpflicht. Nachgebaut werden das Hauptformular 300 und die Hilfsformulare Wertschriften- und Guthabenverzeichnis (340), Berufsauslagen (360), Versicherungsprämien (365), Aus- und Weiterbildung (367) und Liegenschaftenverzeichnis (350). Dazu kommen Aufstellungen für Schulden, Krankheitskosten und gemeinnützige Zuwendungen. Ziffern und Feldcodes entsprechen dem amtlichen Formular, damit man parallel zu den Kursunterlagen arbeiten kann.
- **Rechnen:** Summen und Überträge von den Hilfsformularen ins Hauptformular, Pauschalen und Höchstbeträge, getrennte Spalten für Staats- und Bundessteuer. Jeder berechnete Übertrag lässt sich überschreiben, wenn ein Übungsfall nur das Ergebnis vorgibt. Die Bundessteuer wird geschätzt. Die Staats- und Gemeindesteuer wird nicht berechnet, weil Tarif und Steuerfüsse noch nicht erfasst sind.
- **Beträge:** Alle Beträge kommen aus `src/data/` (ADR 0001). Die Astro-Seite liest sie beim Build und gibt sie der Insel mit. Die Rechenlogik in `src/lib/uebung/zh2025.ts` enthält keine Frankenbeträge.
- **Daten der Fälle:** Sie werden nur im `localStorage` des Browsers gespeichert. Es gibt keinen Server, keinen Teilen-Link und keine Daten in der URL. Export und Import laufen über eine lokale JSON-Datei. Fälle kommen nie ins Repo, auch nicht als Beispiel. Ein Beispielfall ist frei erfunden.
- **Technik:** Eine Svelte-Insel mit `client:only`, weil der Zustand im Browser liegt. Die Anrede ist «du», wie für den aufgabenorientierten Teil der Website vorgesehen.

## Consequences
- Ein Wechsel des Steuerjahrs oder Kantons heisst ein neues Modul (`zh2026.ts`, `be2025.ts`). Die Datenstruktur pro Fall trägt deshalb eine Version.
- Wer den Browser-Speicher löscht, verliert die Fälle. Die Seite sagt das und bietet den Export an.
- Nicht nachgebaut: Hilfsblätter für Selbständigerwerbende (A, B, G), qualifizierte Beteiligungen im Detail, DA-1, unterjährige Steuerpflicht.
