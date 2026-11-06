<script lang="ts">
  import { speicher } from '../../lib/uebung/speicher.svelte';
  import type { Ergebnis } from '../../lib/uebung/zh2025';
  import Wert from './Wert.svelte';
  import Zeile from './Zeile.svelte';
  import Posten from './Posten.svelte';
  import WL from './WL.svelte';
  import Z from './Z.svelte';

  let { r }: { r: Ergebnis } = $props();
  const f = $derived(speicher.fall);
  const z = $derived(r.zuwendungen);
</script>

<p class="uf-intro">Aufstellung über gemeinnützige Zuwendungen an steuerbefreite Institutionen mit Sitz in der Schweiz. Abziehbar, wenn sie im Jahr mindestens <Z k="spenden_min" /> erreichen, höchstens <Z k="spenden_max_satz" p /> des Nettoeinkommens (Ziffer 21). Beiträge an politische Parteien gehören in Ziffer 16.5. <WL s={19} /></p>

<Posten liste={f.zuwendungen} titel="Empfänger" neuText="Zuwendung" />

<div class="uf-kopf" data-spalten="2"><span></span><span></span><span></span><span>Staatssteuer</span><span>Bundessteuer</span></div>
<Zeile label="Total der Zuwendungen">
  {#snippet s()}<Wert wert={z.total} label="Total Zuwendungen" />{/snippet}
  {#snippet b()}<Wert wert={z.total} label="Total Zuwendungen" />{/snippet}
</Zeile>
<Zeile label="Höchstbetrag (Anteil am Nettoeinkommen)">
  {#snippet s()}<Wert wert={z.max.s} label="Höchstbetrag Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={z.max.b} label="Höchstbetrag Bundessteuer" />{/snippet}
</Zeile>
<Zeile label="Abzug, in die Steuererklärung Ziffer 22.2" code="324" stark>
  {#snippet s()}<Wert wert={z.abzug.s} stark label="Abzug Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={z.abzug.b} stark label="Abzug Bundessteuer" />{/snippet}
</Zeile>
