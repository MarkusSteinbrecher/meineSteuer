export type Stufe = { ab: number; steuer: number; je100: number } | { ab: number; satz_ganz: number };

/**
 * Federal income tax (DBG Art. 36) from a bracket table. Taxable income is counted in full
 * hundreds above the bracket start; amounts under CHF 25 are not levied (Art. 36 Abs. 3).
 */
export function bundessteuer(einkommen: number, stufen: Stufe[]): number {
  const stufe = [...stufen].reverse().find((s) => einkommen >= s.ab);
  if (!stufe) return 0;
  const steuer = 'satz_ganz' in stufe
    ? einkommen * (stufe.satz_ganz / 100)
    : stufe.steuer + Math.floor((einkommen - stufe.ab) / 100) * stufe.je100;
  const gerundet = Math.round(steuer * 100) / 100;
  return gerundet < 25 ? 0 : gerundet;
}
