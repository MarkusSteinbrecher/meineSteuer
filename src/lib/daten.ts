import { getCollection, getEntry } from 'astro:content';
import { AKTUELLES_STEUERJAHR } from './site';

export type Ebene = 'bund' | string; // 'bund' or a lower-case canton code, e.g. 'zh'

/**
 * Look up one figure. Throws when the year file or the key is missing,
 * so a typo in a page breaks the build instead of showing a wrong number.
 */
export async function wertHolen(ebene: Ebene, key: string, jahr = AKTUELLES_STEUERJAHR) {
  const id = ebene === 'bund' ? String(jahr) : `${ebene.toLowerCase()}-${jahr}`;
  const eintrag = ebene === 'bund' ? await getEntry('bund', id) : await getEntry('kantone', id);
  if (!eintrag) throw new Error(`Keine Daten für ${ebene} im Steuerjahr ${jahr} (erwartet: ${id}.yaml)`);
  const w = eintrag.data.werte[key];
  if (!w) throw new Error(`Unbekannter Wert «${key}» für ${ebene} ${jahr}`);
  return { ...w, steuerjahr: jahr, quelleDaten: eintrag.data.quellen[w.quelle], geprueft_am: eintrag.data.geprueft_am };
}

/** All cantons that have data for a year, sorted by canton code. */
export async function kantoneImJahr(jahr = AKTUELLES_STEUERJAHR) {
  const alle = await getCollection('kantone', (k) => k.data.steuerjahr === jahr);
  return alle.sort((a, b) => a.data.kanton.localeCompare(b.data.kanton));
}
