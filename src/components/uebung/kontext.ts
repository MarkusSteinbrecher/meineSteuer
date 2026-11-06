import { getContext, setContext } from 'svelte';
import type { Zahlen } from '../../lib/uebung/zh2025';

export type Umgebung = { zahlen: Zahlen; wegleitung: string; links: Record<string, string> };

const SCHLUESSEL = Symbol('uebung');

export function umgebungSetzen(u: Umgebung) {
  setContext(SCHLUESSEL, u);
}

export function umgebung(): Umgebung {
  return getContext<Umgebung>(SCHLUESSEL);
}

const zahl = new Intl.NumberFormat('de-CH', { maximumFractionDigits: 0 });
const zahl2 = new Intl.NumberFormat('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** 12’345 (whole francs, as on the form). */
export function chf(x: number): string {
  return zahl.format(Math.round(x));
}

/** 1’234.50 */
export function chf2(x: number): string {
  return zahl2.format(x);
}
