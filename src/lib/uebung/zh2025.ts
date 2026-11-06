/**
 * Übungsformular Kanton Zürich, Steuerjahr 2025 (ADR 0003).
 *
 * Model of one exercise case and the calculation of every derived line of form 300 and its
 * supplementary forms. No CHF amounts live here: limits and flat rates come in as `Z`, built
 * from src/data/ at build time (ADR 0001). Field names follow the official field codes
 * (e.g. `e100` = code 100 on form 300).
 */

import { bundessteuer, type Stufe } from '../tarif';

export const STEUERJAHR = 2025;
export const FALL_VERSION = 1;

/** Figures the calculation needs, per level. `w` = value, `t` = tooltip (level, year, source). */
export type Zahl = { w: number; t: string };
export type Zahlen = {
  zh: Record<string, Zahl>;
  bund: Record<string, Zahl>;
  tarif: { ledig: Stufe[]; verheiratet: Stufe[] };
};

export type Betrag = number | null;
export type Zivilstand = 'ledig' | 'verheiratet' | 'getrennt' | 'geschieden' | 'verwitwet';
export type Anteil = 'ganz' | 'halb' | 'kein';

export type Person = { vorname: string; name: string; geburtsdatum: string; konfession: string; beruf: string; pk: boolean | null };
export type Kind = {
  id: string; name: string; geburtsdatum: string; imHaushalt: boolean; ausbildung: string; bis: string;
  anteil: Anteil; alimente: boolean | null; betreuungskosten: Betrag;
};
export type Unterstuetzt = { id: string; name: string; geburtsjahr: string; imHaushalt: boolean; adresse: string; betrag: Betrag };
export type Fahrt = { id: string; arbeitsort: string; tage: Betrag; km: Betrag; fahrten: Betrag; fahrzeug: 'auto' | 'motorrad' };
export type Berufsauslagen = {
  arbeitgeber: string; arbeitsort: string;
  abo: Betrag; velo: boolean; fahrten: Fahrt[];
  begruendung: { fehlt: boolean; zeit: boolean; arbeitgeber: boolean; krankheit: boolean };
  verpflegung: 'keine' | 'verbilligt' | 'voll'; verpflegungTage: Betrag; schichtTage: Betrag;
  uebrige: 'pauschal' | 'effektiv'; uebrigeEffektiv: Betrag;
  wochenaufenthalt: Betrag;
  nebenerwerb: 'pauschal' | 'effektiv'; nebenerwerbEffektiv: Betrag;
};
export type Rente = { betrag: Betrag; prozent: Betrag };
export type WvCode = '' | 'G' | 'N' | 'E' | 'S' | 'Q';
export type WvZeile = {
  id: string; code: WvCode; waehrung: string; nennwert: string; valor: string; bezeichnung: string;
  zugang: string; abgang: string; steuerwert: Betrag; ertragA: Betrag; ertragB: Betrag;
};
export type Liegenschaft = {
  id: string; ort: string; kanton: string; strasse: string; art: string; flaeche: string;
  bewertung: 'verkehrswert' | 'ertragswert'; steuerwert: Betrag;
  wohnen: Betrag; gewerbe: Betrag; unterhalt: 'pauschal' | 'effektiv'; unterhaltEffektiv: Betrag; geschaeftlich: boolean;
};
export type Schuld = { id: string; glaeubiger: string; art: string; geschaeft: boolean; betrag: Betrag; zinsen: Betrag };
export type Posten = { id: string; bezeichnung: string; betrag: Betrag };
export type Police = { id: string; gesellschaft: string; abschluss: string; ablauf: string; steuerwert: Betrag };

export type Fall = {
  version: number;
  personalien: { zivilstand: Zivilstand; gemeinde: string; p1: Person; p2: Person };
  kinder: Kind[];
  unterstuetzte: Unterstuetzt[];
  einkuenfte: {
    e100: Betrag; e101: Betrag; e102: Betrag; e103: Betrag;
    e120: Betrag; e121: Betrag; e122: Betrag; e123: Betrag;
    e130: Betrag; e131: Betrag; ahv1: 'ahv' | 'iv'; ahv2: 'ahv' | 'iv';
    renten: [Rente, Rente, Rente, Rente];
    e140: Betrag; e141: Betrag; e142: Betrag; e143: Betrag;
    e160: Betrag; e161: Betrag; e162: Betrag; e163: Betrag; e163Text: string; e164: Betrag; e164Monate: Betrag;
  };
  abzuege: {
    s3a1: Betrag; s3a2: Betrag;
    a254: Betrag; a255: Betrag; rente2561: Betrag; renteProzent: Betrag;
    a280s: Betrag; a280b: Betrag; a283: Betrag; a3160: Betrag;
    parteien: Betrag; weitere: Betrag; weitereText: string;
    a394s: Betrag; a396s: Betrag; a396b: Betrag;
  };
  vermoegen: {
    v404: Betrag; policen: Police[]; v412: Betrag; fahrzeugKaufpreis: Betrag; fahrzeugKaufjahr: string;
    v414: Betrag; v416: Betrag; v416Text: string; v430: Betrag; v494: Betrag; v496: Betrag;
    kapital: Betrag; kapitalDatum: string; kapitalArt: string;
    schenkungErhalten: Betrag; schenkungErhaltenText: string; schenkungAusgerichtet: Betrag; schenkungAusgerichtetText: string;
  };
  berufsauslagen: [Berufsauslagen, Berufsauslagen];
  versicherung: { v601: Betrag; v602: Betrag; v603: Betrag; v604: Betrag; v605: Betrag };
  weiterbildung: [{ bezeichnung: string; kosten: Betrag; beitrag: Betrag }, { bezeichnung: string; kosten: Betrag; beitrag: Betrag }];
  wertschriften: WvZeile[];
  liegenschaften: Liegenschaft[];
  schulden: Schuld[];
  krankheit: Posten[];
  zuwendungen: Posten[];
  /** Manually entered values that replace a calculated transfer, by field code. */
  ueberschrieben: Record<string, { s: Betrag; b: Betrag }>;
};

export function neueId(): string {
  return Math.random().toString(36).slice(2, 10);
}

const person = (): Person => ({ vorname: '', name: '', geburtsdatum: '', konfession: '', beruf: '', pk: null });
const berufsauslagen = (): Berufsauslagen => ({
  arbeitgeber: '', arbeitsort: '', abo: null, velo: false, fahrten: [],
  begruendung: { fehlt: false, zeit: false, arbeitgeber: false, krankheit: false },
  verpflegung: 'keine', verpflegungTage: null, schichtTage: null,
  uebrige: 'pauschal', uebrigeEffektiv: null, wochenaufenthalt: null,
  nebenerwerb: 'pauschal', nebenerwerbEffektiv: null,
});

export function leererFall(): Fall {
  return {
    version: FALL_VERSION,
    personalien: { zivilstand: 'ledig', gemeinde: '', p1: person(), p2: person() },
    kinder: [],
    unterstuetzte: [],
    einkuenfte: {
      e100: null, e101: null, e102: null, e103: null, e120: null, e121: null, e122: null, e123: null,
      e130: null, e131: null, ahv1: 'ahv', ahv2: 'ahv',
      renten: [{ betrag: null, prozent: 100 }, { betrag: null, prozent: 100 }, { betrag: null, prozent: 100 }, { betrag: null, prozent: 100 }],
      e140: null, e141: null, e142: null, e143: null,
      e160: null, e161: null, e162: null, e163: null, e163Text: '', e164: null, e164Monate: null,
    },
    abzuege: {
      s3a1: null, s3a2: null, a254: null, a255: null, rente2561: null, renteProzent: null,
      a280s: null, a280b: null, a283: null, a3160: null, parteien: null, weitere: null, weitereText: '',
      a394s: null, a396s: null, a396b: null,
    },
    vermoegen: {
      v404: null, policen: [], v412: null, fahrzeugKaufpreis: null, fahrzeugKaufjahr: '', v414: null, v416: null, v416Text: '',
      v430: null, v494: null, v496: null, kapital: null, kapitalDatum: '', kapitalArt: '',
      schenkungErhalten: null, schenkungErhaltenText: '', schenkungAusgerichtet: null, schenkungAusgerichtetText: '',
    },
    berufsauslagen: [berufsauslagen(), berufsauslagen()],
    versicherung: { v601: null, v602: null, v603: null, v604: null, v605: null },
    weiterbildung: [{ bezeichnung: '', kosten: null, beitrag: null }, { bezeichnung: '', kosten: null, beitrag: null }],
    wertschriften: [],
    liegenschaften: [],
    schulden: [],
    krankheit: [],
    zuwendungen: [],
    ueberschrieben: {},
  };
}

/** Fill gaps in a stored case with defaults (older saves, hand-edited imports). */
export function fallErgaenzen(roh: unknown): Fall {
  const basis = leererFall();
  const mischen = (a: any, b: any): any => {
    if (Array.isArray(a)) return Array.isArray(b) ? (a.length && !b.length ? a : b) : a;
    if (a && typeof a === 'object') {
      const out: any = { ...a };
      if (b && typeof b === 'object') for (const k of Object.keys(b)) out[k] = k in a ? mischen(a[k], b[k]) : b[k];
      return out;
    }
    return b === undefined ? a : b;
  };
  const f = mischen(basis, roh) as Fall;
  // Fixed-length tuples must keep their length.
  if (f.einkuenfte.renten.length !== 4) f.einkuenfte.renten = basis.einkuenfte.renten;
  if (f.berufsauslagen.length !== 2) f.berufsauslagen = basis.berufsauslagen;
  f.berufsauslagen = f.berufsauslagen.map((b) => mischen(berufsauslagen(), b)) as Fall['berufsauslagen'];
  if (f.weiterbildung.length !== 2) f.weiterbildung = basis.weiterbildung;
  f.version = FALL_VERSION;
  return f;
}

// ---------------------------------------------------------------- calculation

export type Spalten = { s: number; b: number };
export type Hinweis = { ort: Abschnitt; text: string; ton: 'warn' | 'info' };
export type Abschnitt =
  | 'personalien' | 'einkuenfte' | 'abzuege' | 'einkommen' | 'vermoegen'
  | 'wertschriften' | 'berufsauslagen' | 'versicherung' | 'weiterbildung'
  | 'liegenschaften' | 'schulden' | 'krankheit' | 'zuwendungen' | 'ergebnis';

const n = (x: Betrag | undefined): number => (typeof x === 'number' && Number.isFinite(x) ? x : 0);
const rund = (x: number): number => Math.round(x);
const klemmen = (x: number, min: number, max: number) => Math.min(Math.max(x, min), max);
const summe = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const beide = (x: number): Spalten => ({ s: x, b: x });
const jahrVon = (datum: string): number | null => {
  const m = datum.match(/(\d{4})/);
  return m ? Number(m[1]) : null;
};

export function istVerheiratet(f: Fall): boolean {
  return f.personalien.zivilstand === 'verheiratet';
}

function kindFaktor(k: Kind): number {
  return k.anteil === 'ganz' ? 1 : k.anteil === 'halb' ? 0.5 : 0;
}

export type BaErgebnis = {
  fahrten: { kmJahr: number; satz: number; abzug: number }[];
  velo: number; auto: number; fahrTotal: number; fahrt: Spalten; verpflegung: number; schicht: number;
  uebrigePauschal: number; uebrige: number; wochenaufenthalt: number;
  nebenPauschal: number; neben: number; total: Spalten;
};

function berufsauslagenRechnen(ba: Berufsauslagen, nettolohn: number, nebenerwerb: number, z: Zahlen, hinweise: Hinweis[], wer: string): BaErgebnis {
  const zh = z.zh, bund = z.bund;
  const fahrten = ba.fahrten.map((f) => {
    const kmJahr = n(f.tage) * n(f.km) * n(f.fahrten);
    const satz = f.fahrzeug === 'auto' ? zh.auto_km.w : zh.motorrad_km.w;
    if (n(f.tage) > 240) hinweise.push({ ort: 'berufsauslagen', ton: 'warn', text: `${wer}: Für das Auto oder Motorrad gelten in der Regel höchstens 240 Arbeitstage (Fahrt nach ${f.arbeitsort || 'Arbeitsort'}).` });
    return { kmJahr, satz, abzug: rund(kmJahr * satz) };
  });
  const velo = ba.velo ? zh.velo_pauschal.w : 0;
  const auto = summe(fahrten.map((f) => f.abzug));
  const fahrTotal = n(ba.abo) + velo + auto;
  const fahrt = { s: Math.min(fahrTotal, zh.fahrkosten_max.w), b: Math.min(fahrTotal, bund.fahrkosten_max.w) };
  const b = ba.begruendung;
  if (ba.fahrten.length && !(b.fehlt || b.zeit || b.arbeitgeber || b.krankheit))
    hinweise.push({ ort: 'berufsauslagen', ton: 'warn', text: `${wer}: Für das private Fahrzeug fehlt die Begründung (Ziffer 7). Ohne Begründung lässt das Steueramt nur die Kosten des öffentlichen Verkehrs zu.` });

  const tage = n(ba.verpflegungTage);
  const verpflegung = ba.verpflegung === 'voll'
    ? Math.min(rund(tage * zh.verpflegung_tag.w), zh.verpflegung_jahr.w)
    : ba.verpflegung === 'verbilligt'
      ? Math.min(rund(tage * zh.verpflegung_verbilligt_tag.w), zh.verpflegung_verbilligt_jahr.w)
      : 0;
  const schicht = Math.min(rund(n(ba.schichtTage) * zh.verpflegung_tag.w), zh.verpflegung_jahr.w);
  if (verpflegung > 0 && schicht > 0)
    hinweise.push({ ort: 'berufsauslagen', ton: 'warn', text: `${wer}: Verpflegung (2.1) und Schicht- oder Nachtarbeit (2.2) dürfen nicht kumuliert werden.` });

  const uebrigePauschal = nettolohn > 0
    ? klemmen(rund(nettolohn * zh.uebrige_berufskosten_satz.w / 100), zh.uebrige_berufskosten_min.w, zh.uebrige_berufskosten_max.w)
    : 0;
  const uebrige = ba.uebrige === 'pauschal' ? uebrigePauschal : n(ba.uebrigeEffektiv);
  const nebenPauschal = nebenerwerb > 0
    ? Math.min(nebenerwerb, klemmen(rund(nebenerwerb * zh.nebenerwerb_satz.w / 100), zh.nebenerwerb_min.w, zh.nebenerwerb_max.w))
    : 0;
  const neben = ba.nebenerwerb === 'pauschal' ? nebenPauschal : n(ba.nebenerwerbEffektiv);
  const rest = verpflegung + schicht + uebrige + n(ba.wochenaufenthalt) + neben;
  return {
    fahrten, velo, auto, fahrTotal, fahrt, verpflegung, schicht, uebrigePauschal, uebrige,
    wochenaufenthalt: n(ba.wochenaufenthalt), nebenPauschal, neben,
    total: { s: fahrt.s + rest, b: fahrt.b + rest },
  };
}

export type Ergebnis = ReturnType<typeof berechnen>;

export function berechnen(f: Fall, z: Zahlen) {
  const hinweise: Hinweis[] = [];
  const zh = z.zh, bund = z.bund;
  const vh = istVerheiratet(f);
  const e = f.einkuenfte, a = f.abzuege, v = f.vermoegen;
  const ue = f.ueberschrieben;
  /** Calculated value or its manual replacement. */
  const wert = (code: string, ber: Spalten): Spalten => {
    const o = ue[code];
    return o ? { s: o.s ?? ber.s, b: o.b ?? ber.b } : ber;
  };
  const wert1 = (code: string, ber: number): number => {
    const o = ue[code];
    return o && o.s !== null ? o.s : ber;
  };

  // --- Wertschriften- und Guthabenverzeichnis (form 340)
  const wvSteuerwert = summe(f.wertschriften.map((r) => n(r.steuerwert)));
  const wvA = summe(f.wertschriften.map((r) => n(r.ertragA)));
  const wvB = summe(f.wertschriften.map((r) => n(r.ertragB)));
  const wvQ = summe(f.wertschriften.filter((r) => r.code === 'Q').map((r) => n(r.ertragA) + n(r.ertragB)));
  const wv = {
    steuerwert: wvSteuerwert, ertragA: wvA, ertragB: wvB, total: wvA + wvB, qualifiziert: wvQ,
    vst: Math.round(wvA * bund.verrechnungssteuer_satz.w) / 100,
  };
  for (const r of f.wertschriften) {
    if (n(r.ertragA) && n(r.ertragB)) hinweise.push({ ort: 'wertschriften', ton: 'warn', text: `«${r.bezeichnung || 'Position'}»: Ein Ertrag gehört entweder in Kolonne A (mit Verrechnungssteuer) oder in Kolonne B, nicht in beide.` });
  }

  // --- Liegenschaftenverzeichnis (form 350)
  const lgZeilen = f.liegenschaften.map((l) => {
    const total = n(l.wohnen) + n(l.gewerbe);
    const pauschal = rund(total * zh.liegenschaft_pauschal.w / 100);
    const unterhalt = l.unterhalt === 'pauschal' ? pauschal : n(l.unterhaltEffektiv);
    if (l.unterhalt === 'pauschal' && l.geschaeftlich)
      hinweise.push({ ort: 'liegenschaften', ton: 'warn', text: `${l.ort || 'Liegenschaft'}: Bei vorwiegend geschäftlich genutzten Liegenschaften ist der Pauschalabzug nicht zulässig.` });
    return { total, pauschal, unterhalt, ertrag: total - unterhalt };
  });
  const lg = {
    zeilen: lgZeilen,
    verkehrswert: summe(f.liegenschaften.filter((l) => l.bewertung === 'verkehrswert').map((l) => n(l.steuerwert))),
    ertragswert: summe(f.liegenschaften.filter((l) => l.bewertung === 'ertragswert').map((l) => n(l.steuerwert))),
    brutto: summe(lgZeilen.map((r) => r.total)),
    netto: summe(lgZeilen.map((r) => r.ertrag)),
  };

  // --- Einkünfte (page 2)
  const renten = e.renten.map((r) => rund(n(r.betrag) * n(r.prozent) / 100));
  const e150 = wert1('150', wv.total);
  const e151 = wert1('151', wv.qualifiziert);
  const e188 = wert1('188', lg.netto);
  const einkuenfte = {
    renten, e150, e151, e188,
    e199: n(e.e100) + n(e.e101) + n(e.e102) + n(e.e103) + n(e.e120) + n(e.e121) + n(e.e122) + n(e.e123)
      + n(e.e130) + n(e.e131) + summe(renten) + n(e.e140) + n(e.e141) + n(e.e142) + n(e.e143)
      + e150 + n(e.e160) + n(e.e161) + n(e.e162) + n(e.e163) + n(e.e164) + e188,
  };
  if (!vh && (n(e.e101) || n(e.e103) || n(e.e121) || n(e.e123) || n(e.e131) || n(e.e141) || n(e.e143)))
    hinweise.push({ ort: 'einkuenfte', ton: 'warn', text: 'Es sind Einkünfte für Person 2 erfasst, der Zivilstand ist aber nicht «verheiratet».' });

  // --- Berufsauslagen (form 360)
  const ba = [
    berufsauslagenRechnen(f.berufsauslagen[0], n(e.e100), n(e.e102), z, hinweise, 'Person 1'),
    vh ? berufsauslagenRechnen(f.berufsauslagen[1], n(e.e101), n(e.e103), z, hinweise, 'Person 2') : null,
  ] as const;
  const a220 = wert('220', ba[0].total);
  const a240 = vh && ba[1] ? wert('240', ba[1].total) : { s: 0, b: 0 };

  // --- Schulden
  const schuldenPrivat = f.schulden.filter((s) => !s.geschaeft);
  const schulden = {
    total: summe(schuldenPrivat.map((s) => n(s.betrag))),
    zinsen: summe(schuldenPrivat.map((s) => n(s.zinsen))),
    grenze: { s: e150 + lg.brutto + zh.schuldzins_zusatz.w, b: e150 + lg.brutto + bund.schuldzins_zusatz.w },
  };
  const zinsAbzug = { s: Math.min(schulden.zinsen, schulden.grenze.s), b: Math.min(schulden.zinsen, schulden.grenze.b) };
  if (schulden.zinsen > zinsAbzug.s)
    hinweise.push({ ort: 'schulden', ton: 'info', text: 'Die Schuldzinsen übersteigen den Vermögensertrag plus den Zusatzbetrag. Abgezogen wird nur der Teil bis zu dieser Grenze.' });
  const a250 = wert('250', zinsAbzug);

  // --- Rentenleistungen 13.3
  const a256 = rund(n(a.rente2561) * n(a.renteProzent) / 100);

  // --- Säule 3a (14)
  const erwerb = [
    n(e.e100) + n(e.e102) + n(e.e120) + n(e.e122),
    n(e.e101) + n(e.e103) + n(e.e121) + n(e.e123),
  ];
  const pers = [f.personalien.p1, f.personalien.p2];
  const max3a = (i: number) => pers[i].pk === false
    ? Math.min(bund.saeule3a_ohne_pk.w, rund(erwerb[i] * bund.saeule3a_ohne_pk_satz.w / 100))
    : bund.saeule3a_mit_pk.w;
  const eff3a = [n(a.s3a1), vh ? n(a.s3a2) : 0];
  const abz3a = eff3a.map((x, i) => Math.min(x, max3a(i)));
  [0, 1].forEach((i) => {
    if (eff3a[i] > abz3a[i]) hinweise.push({ ort: 'abzuege', ton: 'warn', text: `Person ${i + 1}: Die Säule-3a-Einzahlung übersteigt den Höchstbetrag. Abziehbar sind höchstens ${abz3a[i].toLocaleString('de-CH')} Franken.` });
    if (eff3a[i] > 0 && pers[i].pk === null) hinweise.push({ ort: 'personalien', ton: 'warn', text: `Person ${i + 1}: Ohne Angabe zur Pensionskasse rechnet das Formular mit dem kleinen 3a-Höchstbetrag.` });
  });
  const a260 = wert('260', beide(abz3a[0]));
  const a261 = vh ? wert('261', beide(abz3a[1])) : { s: 0, b: 0 };

  // --- Kinder und unterstützte Personen
  const kinderIm = f.kinder.filter((k) => k.imHaushalt);
  const kinderAus = f.kinder.filter((k) => !k.imHaushalt);
  const kinderFaktor = summe(f.kinder.map(kindFaktor));
  const unterstS = f.unterstuetzte.filter((u) => n(u.betrag) >= zh.unterstuetzungsabzug.w).length;
  const unterstB = f.unterstuetzte.filter((u) => n(u.betrag) >= bund.unterstuetzungsabzug.w).length;
  for (const u of f.unterstuetzte) {
    if (n(u.betrag) < zh.unterstuetzungsabzug.w) hinweise.push({ ort: 'personalien', ton: 'info', text: `${u.name || 'Unterstützte Person'}: Die Unterstützung liegt unter dem Mindestbetrag für die Staatssteuer. Es gibt keinen Abzug.` });
    else if (n(u.betrag) < bund.unterstuetzungsabzug.w) hinweise.push({ ort: 'personalien', ton: 'info', text: `${u.name || 'Unterstützte Person'}: Abzug nur bei der Staatssteuer. Für die Bundessteuer ist die Unterstützung zu klein.` });
  }
  const jahrgangMin = STEUERJAHR - 17; // Form 300: Kinder der Jahrgänge 2008–2025 oder in Erstausbildung
  const betreuungAb = STEUERJAHR - 14; // Ziffer 16.6: Jahrgänge 2011–2025
  for (const k of f.kinder) {
    const j = jahrVon(k.geburtsdatum);
    if (j !== null && j < jahrgangMin && !k.ausbildung && k.anteil !== 'kein')
      hinweise.push({ ort: 'personalien', ton: 'warn', text: `${k.name || 'Kind'}: Ein Kinderabzug für ein volljähriges Kind setzt eine berufliche Erstausbildung voraus. Schule oder Lehrfirma fehlt.` });
    if (n(k.betreuungskosten) && (!k.imHaushalt || (j !== null && j < betreuungAb)))
      hinweise.push({ ort: 'personalien', ton: 'warn', text: `${k.name || 'Kind'}: Die Kosten der Drittbetreuung sind nur für Kinder im eigenen Haushalt und der Jahrgänge ${betreuungAb}–${STEUERJAHR} abziehbar.` });
  }

  // --- Versicherungsprämien (form 365)
  const vers = f.versicherung;
  const vA = Math.max(0, n(vers.v601) + n(vers.v602) + n(vers.v603) + n(vers.v604) - n(vers.v605));
  const mitVorsorge = pers.slice(0, vh ? 2 : 1).some((p) => p.pk === true) || eff3a.some((x) => x > 0);
  const vGrund = {
    s: vh ? (mitVorsorge ? zh.versicherung_verheiratet.w : zh.versicherung_verheiratet_ohne_vorsorge.w)
      : (mitVorsorge ? zh.versicherung_alleinstehend.w : zh.versicherung_alleinstehend_ohne_vorsorge.w),
    b: vh ? (mitVorsorge ? bund.versicherung_verheiratet.w : bund.versicherung_verheiratet_ohne_vorsorge.w)
      : (mitVorsorge ? bund.versicherung_alleinstehend.w : bund.versicherung_alleinstehend_ohne_vorsorge.w),
  };
  const vKinder = { s: rund(kinderFaktor * zh.versicherung_pro_kind.w), b: rund(kinderFaktor * bund.versicherung_pro_kind.w) };
  const vUnterst = { s: unterstS * zh.versicherung_pro_unterstuetzt.w, b: unterstB * bund.versicherung_pro_unterstuetzt.w };
  const vB = { s: vGrund.s + vKinder.s + vUnterst.s, b: vGrund.b + vKinder.b + vUnterst.b };
  const versicherung = { a: vA, mitVorsorge, grund: vGrund, kinder: vKinder, unterst: vUnterst, b: vB, c: { s: Math.min(vA, vB.s), b: Math.min(vA, vB.b) } };
  const a270 = wert('270', versicherung.c);

  // --- Aus- und Weiterbildung (form 367)
  const wbZeilen = f.weiterbildung.map((w, i) => {
    if (i === 1 && !vh) return { selbst: 0, s: 0, b: 0 };
    const selbst = Math.max(0, n(w.kosten) - n(w.beitrag));
    return { selbst, s: Math.min(selbst, zh.weiterbildung_max.w), b: Math.min(selbst, bund.weiterbildung_max.w) };
  });
  const weiterbildung = { zeilen: wbZeilen, total: { s: summe(wbZeilen.map((w) => w.s)), b: summe(wbZeilen.map((w) => w.b)) } };
  const a292 = wert('292', weiterbildung.total);

  // --- 16.5 weitere Abzüge: Parteien, Teilbesteuerung, übrige
  const parteienMax = { s: vh ? zh.parteispenden_max_verheiratet.w : zh.parteispenden_max.w, b: bund.parteispenden_max.w };
  const parteien = { s: Math.min(n(a.parteien), parteienMax.s), b: Math.min(n(a.parteien), parteienMax.b) };
  const teilbesteuerung = { s: rund(e151 * zh.teilbesteuerung_abzug.w / 100), b: rund(e151 * bund.teilbesteuerung_abzug.w / 100) };
  const a284 = wert('284', { s: parteien.s + teilbesteuerung.s + n(a.weitere), b: parteien.b + teilbesteuerung.b + n(a.weitere) });

  // --- 16.6 Drittbetreuung
  const betreuung = kinderIm.map((k) => {
    const j = jahrVon(k.geburtsdatum);
    const ok = j === null || j >= betreuungAb;
    const kosten = ok ? n(k.betreuungskosten) : 0;
    return { s: Math.min(kosten, zh.kinderdrittbetreuung_max.w), b: Math.min(kosten, bund.kinderdrittbetreuung_max.w) };
  });
  const a376 = wert('376', { s: summe(betreuung.map((x) => x.s)), b: summe(betreuung.map((x) => x.b)) });

  // --- 17 Sonderabzug bei Erwerbstätigkeit beider Ehegatten
  let sonder = { s: 0, b: 0 };
  let verbleibend: [Spalten, Spalten] | null = null;
  if (vh) {
    const ber = [ba[0].total, ba[1]?.total ?? { s: 0, b: 0 }];
    verbleibend = [0, 1].map((i) => ({
      s: Math.max(0, erwerb[i] - ber[i].s - abz3a[i]),
      b: Math.max(0, erwerb[i] - ber[i].b - abz3a[i]),
    })) as [Spalten, Spalten];
    if (erwerb[0] > 0 && erwerb[1] > 0) {
      const tiefS = Math.min(verbleibend[0].s, verbleibend[1].s);
      const tiefB = Math.min(verbleibend[0].b, verbleibend[1].b);
      sonder = {
        s: Math.min(tiefS, zh.zweiverdiener.w),
        b: tiefB < bund.zweiverdiener_min.w ? tiefB : klemmen(rund(tiefB * bund.zweiverdiener_satz.w / 100), bund.zweiverdiener_min.w, bund.zweiverdiener_max.w),
      };
    }
  }
  const a290 = wert('290', sonder);

  const a254 = n(a.a254), a255 = n(a.a255);
  const abzuege = {
    a220, a240, a250, a254, a255, a256, a260, a261, a270,
    a280: { s: n(a.a280s), b: n(a.a280b) }, a292, a283: n(a.a283), a3160: n(a.a3160),
    parteien, parteienMax, teilbesteuerung, a284, a376, a290, verbleibend,
    a299: { s: 0, b: 0 },
  };
  for (const k of ['s', 'b'] as const) {
    abzuege.a299[k] = a220[k] + a240[k] + a250[k] + a254 + a255 + a256 + a260[k] + a261[k] + a270[k]
      + abzuege.a280[k] + a292[k] + abzuege.a283 + abzuege.a3160 + a284[k] + a376[k] + a290[k];
  }

  // --- Einkommensberechnung (page 3)
  const e199 = einkuenfte.e199;
  const e310 = { s: e199 - abzuege.a299.s, b: e199 - abzuege.a299.b };
  const krankTotal = summe(f.krankheit.map((p) => n(p.betrag)));
  const krankSb = { s: rund(Math.max(0, e310.s) * zh.krankheitskosten_selbstbehalt.w / 100), b: rund(Math.max(0, e310.b) * bund.krankheitskosten_selbstbehalt.w / 100) };
  const krankheit = { total: krankTotal, selbstbehalt: krankSb, abzug: { s: Math.max(0, krankTotal - krankSb.s), b: Math.max(0, krankTotal - krankSb.b) } };
  const e320 = wert('320', krankheit.abzug);
  const spTotal = summe(f.zuwendungen.map((p) => n(p.betrag)));
  const spMax = { s: rund(Math.max(0, e310.s) * zh.spenden_max_satz.w / 100), b: rund(Math.max(0, e310.b) * bund.spenden_max_satz.w / 100) };
  const zuwendungen = {
    total: spTotal, max: spMax,
    abzug: { s: spTotal >= zh.spenden_min.w ? Math.min(spTotal, spMax.s) : 0, b: spTotal >= bund.spenden_min.w ? Math.min(spTotal, spMax.b) : 0 },
  };
  if (spTotal > 0 && spTotal < zh.spenden_min.w) hinweise.push({ ort: 'zuwendungen', ton: 'info', text: 'Zuwendungen sind erst ab dem Mindestbetrag pro Jahr abziehbar.' });
  if (spTotal > spMax.s) hinweise.push({ ort: 'zuwendungen', ton: 'info', text: 'Die Zuwendungen übersteigen den Höchstanteil am Nettoeinkommen. Abgezogen wird nur der Höchstanteil.' });
  const e324 = wert('324', zuwendungen.abzug);
  const e350 = { s: e310.s - e320.s - e324.s, b: e310.b - e320.b - e324.b };

  const faktorIm = summe(kinderIm.map(kindFaktor));
  const faktorAus = summe(kinderAus.map(kindFaktor));
  const e370 = wert('370', { s: rund(faktorIm * zh.kinderabzug.w), b: rund(faktorIm * bund.kinderabzug.w) });
  const e372 = wert('372', { s: rund(faktorAus * zh.kinderabzug.w), b: rund(faktorAus * bund.kinderabzug.w) });
  const e374 = wert('374', { s: unterstS * zh.unterstuetzungsabzug.w, b: unterstB * bund.unterstuetzungsabzug.w });
  const e365 = vh ? bund.verheiratetenabzug.w : 0;
  const e390 = {
    s: Math.max(0, e350.s - e370.s - e372.s - e374.s),
    b: Math.max(0, e350.b - e370.b - e372.b - e374.b - e365),
  };
  const e398 = { s: Math.max(0, e390.s - n(a.a394s) - n(a.a396s)), b: Math.max(0, e390.b - n(a.a396b)) };
  const einkommen = { e199, a299: abzuege.a299, e310, e320, e324, e350, e370, e372, e374, e365, e390, e398 };

  // --- Vermögen (page 4)
  const v400 = wert1('400', wv.steuerwert);
  const v406 = summe(v.policen.map((p) => n(p.steuerwert)));
  const v421 = wert1('421', lg.verkehrswert);
  const v422 = wert1('422', lg.ertragswert);
  const v460 = v400 + n(v.v404) + v406 + n(v.v412) + n(v.v414) + n(v.v416) + v421 + v422 + n(v.v430);
  const v470 = wert1('470', schulden.total);
  const v490 = Math.max(0, v460 - v470);
  const v498 = Math.max(0, v490 - n(v.v494) - n(v.v496));
  const vermoegen = { v400, v406, v421, v422, v460, v470, v490, v498 };

  // --- Bundessteuer (estimate). Married tariff also for single parents living with children (DBG Art. 36 Abs. 2).
  const elternteil = !vh && kinderIm.some((k) => k.anteil !== 'kein');
  const tarifName = vh || elternteil ? 'verheiratet' : 'ledig';
  const satzbestimmend = e390.b;
  const steuerVoll = bundessteuer(Math.floor(satzbestimmend / 100) * 100, z.tarif[tarifName]);
  const steuerAnteilig = satzbestimmend > 0 ? steuerVoll * (e398.b / satzbestimmend) : 0;
  const elternAnzahl = tarifName === 'verheiratet' ? faktorIm + faktorAus + unterstB : 0;
  const elternAbzug = elternAnzahl * bund.elterntarif_pro_kind.w;
  const bundSteuer = Math.max(0, Math.round((steuerAnteilig - elternAbzug) * 20) / 20);
  const steuer = { tarifName, satzbestimmend, steuerVoll, steuerAnteilig, elternAnzahl, elternAbzug, bund: bundSteuer };

  if (vh && !f.personalien.p2.vorname) hinweise.push({ ort: 'personalien', ton: 'info', text: 'Zivilstand «verheiratet»: Angaben zu Person 2 fehlen noch.' });

  return { wv, lg, einkuenfte, ba, schulden, versicherung, weiterbildung, krankheit, zuwendungen, abzuege, einkommen, vermoegen, steuer, hinweise };
}
