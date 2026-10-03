import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/*
 * Schemas are the quality gate (ADR 0001): a page without sources or check date,
 * or a figure whose source id is unknown, fails the build.
 */

const quelle = z.object({
  titel: z.string().min(1),
  url: z.url(),
  artikel: z.string().optional(),
});

const bereich = z.enum(['system', 'steuererklaerung', 'kantone', 'reformen', 'nachschlagen', 'lebenslagen']);

/** How a deduction works: deducted from income, tax-free allowance, zero-rate bracket, credit off the tax bill, or a percentage rebate. */
const abzugTyp = z.enum(['abzug', 'freibetrag', 'nullstufe', 'steuergutschrift', 'rabatt']);

/** One figure, always with its source. `wert` is CHF unless `einheit` says otherwise. */
const wert = z.object({
  wert: z.number(),
  einheit: z.enum(['CHF', 'prozent', 'CHF/km', 'CHF/Tag']).default('CHF'),
  typ: abzugTyp.optional(),
  quelle: z.string(),
  artikel: z.string().optional(),
  hinweis: z.string().optional(),
  ungeprueft: z.boolean().default(false),
});

/** One bracket of a progressive tariff. The last bracket may instead apply one rate to the whole income. */
const tarifStufe = z.union([
  z.object({ ab: z.number(), steuer: z.number(), je100: z.number() }),
  z.object({ ab: z.number(), satz_ganz: z.number() }),
]);

/** Every `quelle` reference inside a data file must point to an entry in its `quellen` map. */
function quellenPruefen<T extends { quellen: Record<string, unknown> }>(daten: T, ctx: z.RefinementCtx) {
  const bekannt = new Set(Object.keys(daten.quellen));
  const pruefen = (wert: unknown, pfad: (string | number)[]) => {
    if (wert && typeof wert === 'object') {
      for (const [k, v] of Object.entries(wert)) {
        if (k === 'quellen' && pfad.length === 0) continue;
        if (k === 'quelle' && typeof v === 'string' && !bekannt.has(v)) {
          ctx.addIssue({ code: 'custom', message: `Unbekannte Quelle «${v}»`, path: [...pfad, k] });
        }
        pruefen(v, [...pfad, k]);
      }
    }
  };
  pruefen(daten, []);
}

const seiten = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/seiten' }),
  schema: z.object({
    titel: z.string(),
    beschreibung: z.string(),
    bereich,
    reihenfolge: z.number().default(100),
    steuerjahr: z.number().int(),
    geprueft_am: z.coerce.date(),
    quellen: z.array(quelle).min(1, 'Jede Seite braucht mindestens eine Quelle.'),
    entwurf: z.boolean().default(false),
  }),
});

const bund = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/data/bund' }),
  schema: z
    .object({
      steuerjahr: z.number().int(),
      geprueft_am: z.coerce.date(),
      quellen: z.record(z.string(), quelle),
      werte: z.record(z.string(), wert),
      tarife: z
        .object({
          quelle: z.string(),
          ledig: z.array(tarifStufe).min(2),
          verheiratet: z.array(tarifStufe).min(2),
        })
        .optional(),
    })
    .superRefine(quellenPruefen),
});

const kantone = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/data/kantone' }),
  schema: z
    .object({
      kanton: z.string().length(2),
      name: z.string(),
      steuerjahr: z.number().int(),
      geprueft_am: z.coerce.date(),
      quellen: z.record(z.string(), quelle),
      steuerverwaltung: z.url(),
      frist: z.object({
        datum: z.coerce.date().optional(),
        text: z.string(),
        verlaengerung: z.string(),
        quelle: z.string(),
      }),
      software: z.object({
        name: z.string(),
        url: z.url().optional(),
        unterschriftsfrei: z.boolean().optional(),
        login: z.string().optional(),
        quelle: z.string(),
      }),
      ehepaare: z.object({
        modell: z.enum(['doppeltarif', 'splitting', 'familienquotient', 'rabatt', 'pauschal']),
        divisor: z.number().optional(),
        beschreibung: z.string(),
        quelle: z.string(),
      }),
      /** Commuting costs deductible without cap. Set explicitly: a missing fahrkosten_max alone means «unknown». */
      fahrkosten_unbegrenzt: z.object({ quelle: z.string() }).optional(),
      werte: z.record(z.string(), wert),
    })
    .superRefine(quellenPruefen),
});

export const collections = { seiten, bund, kantone };
