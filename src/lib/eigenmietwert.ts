import { formatWert, formatZahl } from './format';

/** Labels for the single Eigenmietwert figures (`emw_*` in a canton's `werte`), in display order. */
export const EMW_WERTE: Record<string, string> = {
  emw_anteil: 'Anteil, der als Eigenmietwert gilt',
  emw_marktmiete_satz: 'Marktmiete in Prozent des Verkehrswerts',
  emw_satz_efh: 'Satz für Einfamilienhäuser',
  emw_satz_stwe: 'Satz für Stockwerkeigentum',
  emw_satz: 'Eigenmietwertsatz',
  emw_satz_zuschlag: 'Zuschlag auf den Referenzzinssatz',
  emw_satz_max: 'Eigenmietwertsatz, höchstens',
  emw_max: 'Eigenmietwert, höchstens',
  emw_satz_dbst: 'Eigenmietwertsatz für die Bundessteuer',
  emw_max_dbst: 'Eigenmietwert für die Bundessteuer, höchstens',
  emw_abzug_wohnsitz: 'Abzug für die Wohnung am Wohnsitz',
  emw_abzug_wohnsitz_max: 'Abzug am Wohnsitz, höchstens',
};

/** The canton's `emw_*` figures with labels. Throws on a key without label, so new figures cannot silently disappear. */
export function emwWerte<W>(werte: Record<string, W>): { key: string; label: string; w: W }[] {
  const keys = Object.keys(werte).filter((k) => k.startsWith('emw_'));
  const ohneLabel = keys.filter((k) => !(k in EMW_WERTE));
  if (ohneLabel.length) throw new Error(`Eigenmietwert-Wert ohne Bezeichnung in src/lib/eigenmietwert.ts: ${ohneLabel.join(', ')}`);
  return Object.keys(EMW_WERTE).filter((k) => k in werte).map((k) => ({ key: k, label: EMW_WERTE[k], w: werte[k] }));
}

type Tabelle =
  | { art: 'staffel'; stufen: { ab: number; satz: number | null }[] }
  | { art: 'degressiv'; start: { bis: number; satz: number }; stufen: { bis: number; je100: number; auf: number }[]; darueber_betrag: number }
  | { art: 'gruppen'; gruppen: { gruppe: string; satz: number }[] };

const chf = (x: number) => formatWert(x, 'CHF');

/** Rows [range or group, rate] for a rate table, worded for the page. */
export function tabellenZeilen(t: Tabelle): [string, string][] {
  switch (t.art) {
    case 'staffel':
      return t.stufen.map((s, i) => {
        const bis = t.stufen[i + 1]?.ab;
        const bereich = bis === undefined ? `über ${chf(s.ab)}` : s.ab === 0 ? `bis ${chf(bis)}` : `${chf(s.ab + 1)} bis ${formatZahl(bis)}`;
        return [bereich, s.satz === null ? 'nicht veröffentlicht' : formatWert(s.satz, 'prozent')];
      });
    case 'degressiv': {
      const zeilen: [string, string][] = [[`bis ${chf(t.start.bis)}`, formatWert(t.start.satz, 'prozent')]];
      let ab = t.start.bis;
      for (const s of t.stufen) {
        zeilen.push([`${chf(ab + 1)} bis ${formatZahl(s.bis)}`, `sinkt je CHF 100 um ${formatZahl(s.je100, 6)} Prozentpunkte auf ${formatWert(s.auf, 'prozent')}`]);
        ab = s.bis;
      }
      zeilen.push([`über ${chf(ab)}`, `fester Eigenmietwert von ${chf(t.darueber_betrag)}`]);
      return zeilen;
    }
    case 'gruppen':
      return t.gruppen.map((g) => [`Gemeindegruppe ${g.gruppe}`, formatWert(g.satz, 'prozent')]);
  }
}
