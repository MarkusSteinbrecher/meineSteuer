const zahl = new Intl.NumberFormat('de-CH', { maximumFractionDigits: 2 });
const datum = new Intl.DateTimeFormat('de-CH', { day: 'numeric', month: 'long', year: 'numeric' });

/** Swiss formatting: CHF 7’258, 3 %, CHF 0.70/km. */
export function formatWert(wert: number, einheit: string): string {
  switch (einheit) {
    case 'prozent': return `${zahl.format(wert)} %`;
    case 'CHF/km': return `CHF ${wert.toFixed(2)}/km`;
    case 'CHF/Tag': return `CHF ${zahl.format(wert)} pro Tag`;
    case 'Jahre': return `${zahl.format(wert)} Jahre`;
    default: return `CHF ${zahl.format(wert)}`;
  }
}

/** Plain Swiss number: 250’000, 0,192963. */
export function formatZahl(wert: number, stellen = 2): string {
  return new Intl.NumberFormat('de-CH', { maximumFractionDigits: stellen }).format(wert);
}

export function formatDatum(d: Date): string {
  return datum.format(d);
}
