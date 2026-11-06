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
  const k = $derived(r.krankheit);
</script>

<p class="uf-intro">Aufstellung über Krankheits- und Unfallkosten: Abziehbar sind die selbst getragenen Kosten, zum Beispiel die Franchise und der Selbstbehalt laut Krankenkasse, Zahnarzt oder Brillen. Abgezogen wird nur, was über dem Selbstbehalt von <Z k="krankheitskosten_selbstbehalt" p /> des Nettoeinkommens (Ziffer 21) liegt. Prämien gehören nicht hierher, sondern zu den Versicherungsprämien. <WL s={19} /></p>

<Posten liste={f.krankheit} titel="Art der Kosten (nach Abzug der Versicherungsleistungen)" neuText="Kosten" />

<div class="uf-kopf" data-spalten="2"><span></span><span></span><span></span><span>Staatssteuer</span><span>Bundessteuer</span></div>
<Zeile label="Total selbst getragene Kosten">
  {#snippet s()}<Wert wert={k.total} label="Total Kosten" />{/snippet}
  {#snippet b()}<Wert wert={k.total} label="Total Kosten" />{/snippet}
</Zeile>
<Zeile label="Selbstbehalt vom Nettoeinkommen (Ziffer 21)">
  {#snippet s()}<Wert wert={k.selbstbehalt.s} minus label="Selbstbehalt Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={k.selbstbehalt.b} minus label="Selbstbehalt Bundessteuer" />{/snippet}
</Zeile>
<Zeile label="Abzug, in die Steuererklärung Ziffer 22.1" code="320" stark>
  {#snippet s()}<Wert wert={k.abzug.s} stark label="Abzug Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={k.abzug.b} stark label="Abzug Bundessteuer" />{/snippet}
</Zeile>
