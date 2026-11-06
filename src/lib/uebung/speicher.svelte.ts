/**
 * Exercise cases live only in this browser's localStorage (ADR 0003): no server, no URL, no repo.
 * Every access is wrapped in try/catch; without storage the page still works for the session.
 */
import { fallErgaenzen, leererFall, neueId, type Fall } from './zh2025';

const SCHLUESSEL = 'meinesteuer.uebung.zh-2025.v1';

export type Eintrag = { id: string; name: string; geaendert: string; fall: Fall };

function jetzt() {
  return new Date().toISOString();
}

class Speicher {
  faelle = $state<Eintrag[]>([]);
  aktivId = $state('');
  verfuegbar = $state(true);
  zuletztGespeichert = $state<string | null>(null);

  get aktiv(): Eintrag {
    return this.faelle.find((e) => e.id === this.aktivId) ?? this.faelle[0];
  }

  get fall(): Fall {
    return this.aktiv.fall;
  }

  laden() {
    let daten: { aktivId?: string; faelle?: Eintrag[] } | null = null;
    try {
      const roh = localStorage.getItem(SCHLUESSEL);
      daten = roh ? JSON.parse(roh) : null;
    } catch {
      this.verfuegbar = false;
    }
    const faelle = (daten?.faelle ?? [])
      .filter((e) => e && typeof e.id === 'string')
      .map((e) => ({ id: e.id, name: e.name || 'Fall', geaendert: e.geaendert || jetzt(), fall: fallErgaenzen(e.fall) }));
    if (!faelle.length) faelle.push({ id: neueId(), name: 'Fall 1', geaendert: jetzt(), fall: leererFall() });
    this.faelle = faelle;
    this.aktivId = faelle.some((e) => e.id === daten?.aktivId) ? daten!.aktivId! : faelle[0].id;
  }

  speichern() {
    if (!this.verfuegbar) return;
    try {
      localStorage.setItem(SCHLUESSEL, JSON.stringify({ aktivId: this.aktivId, faelle: this.faelle }));
      this.zuletztGespeichert = jetzt();
    } catch {
      this.verfuegbar = false;
    }
  }

  beruehrt() {
    if (this.aktiv) this.aktiv.geaendert = jetzt();
  }

  neu(name?: string, fall: Fall = leererFall()) {
    const e: Eintrag = { id: neueId(), name: name || `Fall ${this.faelle.length + 1}`, geaendert: jetzt(), fall };
    this.faelle.push(e);
    this.aktivId = e.id;
  }

  duplizieren() {
    const kopie = JSON.parse(JSON.stringify(this.aktiv.fall));
    this.neu(`${this.aktiv.name} (Kopie)`, fallErgaenzen(kopie));
  }

  umbenennen(name: string) {
    if (name.trim()) this.aktiv.name = name.trim();
  }

  loeschen() {
    const i = this.faelle.findIndex((e) => e.id === this.aktivId);
    this.faelle.splice(i, 1);
    if (!this.faelle.length) this.faelle.push({ id: neueId(), name: 'Fall 1', geaendert: jetzt(), fall: leererFall() });
    this.aktivId = this.faelle[Math.max(0, i - 1)].id;
  }

  /** The active case as a JSON file the person saves on their own computer. */
  exportieren() {
    const daten = JSON.stringify({ art: 'meineSteuer-Uebung', formular: 'ZH 2025', name: this.aktiv.name, fall: this.aktiv.fall }, null, 2);
    const url = URL.createObjectURL(new Blob([daten], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.aktiv.name.replace(/[^\p{L}\p{N} _-]/gu, '').trim() || 'fall'} – ZH 2025.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async importieren(datei: File): Promise<string | null> {
    try {
      const daten = JSON.parse(await datei.text());
      if (!daten || typeof daten !== 'object' || !daten.fall) return 'Die Datei enthält keinen Übungsfall.';
      this.neu(String(daten.name || datei.name.replace(/\.json$/, '')), fallErgaenzen(daten.fall));
      return null;
    } catch {
      return 'Die Datei konnte nicht gelesen werden.';
    }
  }
}

export const speicher = new Speicher();
