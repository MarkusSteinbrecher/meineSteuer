/** Tax year the site currently explains. Pages and figures default to it. */
export const AKTUELLES_STEUERJAHR = 2025;

export const BEREICHE = {
  system: 'So funktioniert das System',
  steuererklaerung: 'Steuererklärung Schritt für Schritt',
  kantone: 'Kantone',
  reformen: 'Reformen',
  nachschlagen: 'Nachschlagen',
  lebenslagen: 'Lebenslagen',
} as const;

export type Bereich = keyof typeof BEREICHE;

/** Internal link with the GitHub Pages base path and a trailing slash. */
export function pfad(p = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const rest = p.replace(/^\/|\/$/g, '');
  return rest ? `${base}/${rest}/` : `${base}/`;
}

/** Until launch: keep search engines out (ADR 0002: content must be checked first). */
export const ENTWURFSPHASE = true;

export const NAVIGATION: { label: string; href: string; bereich: Bereich }[] = [
  { label: 'System', href: 'system', bereich: 'system' },
  { label: 'Steuererklärung', href: 'steuererklaerung', bereich: 'steuererklaerung' },
  { label: 'Kantone', href: 'kantone', bereich: 'kantone' },
  { label: 'Reformen', href: 'reformen', bereich: 'reformen' },
  { label: 'Nachschlagen', href: 'nachschlagen', bereich: 'nachschlagen' },
];

export const KANTONE: [code: string, name: string][] = [
  ['ZH', 'Zürich'], ['BE', 'Bern'], ['LU', 'Luzern'], ['UR', 'Uri'], ['SZ', 'Schwyz'], ['OW', 'Obwalden'],
  ['NW', 'Nidwalden'], ['GL', 'Glarus'], ['ZG', 'Zug'], ['FR', 'Freiburg'], ['SO', 'Solothurn'],
  ['BS', 'Basel-Stadt'], ['BL', 'Basel-Landschaft'], ['SH', 'Schaffhausen'], ['AR', 'Appenzell Ausserrhoden'],
  ['AI', 'Appenzell Innerrhoden'], ['SG', 'St. Gallen'], ['GR', 'Graubünden'], ['AG', 'Aargau'],
  ['TG', 'Thurgau'], ['TI', 'Tessin'], ['VD', 'Waadt'], ['VS', 'Wallis'], ['NE', 'Neuenburg'],
  ['GE', 'Genf'], ['JU', 'Jura'],
];
