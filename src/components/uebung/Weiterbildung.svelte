<script lang="ts">
  import { speicher } from '../../lib/uebung/speicher.svelte';
  import { istVerheiratet, type Ergebnis } from '../../lib/uebung/zh2025';
  import Feld from './Feld.svelte';
  import Wert from './Wert.svelte';
  import Zeile from './Zeile.svelte';
  import WL from './WL.svelte';
  import Z from './Z.svelte';

  let { r }: { r: Ergebnis } = $props();
  const f = $derived(speicher.fall);
  const vh = $derived(istVerheiratet(f));
  const personen = $derived(vh ? [0, 1] : [0]);
  const codes = [['2900', '2901', '2902', '2920'], ['2903', '2904', '2905', '2921']];
</script>

<p class="uf-intro">Formular 367: Abziehbar sind die selbst getragenen Kosten der berufsorientierten Aus- und Weiterbildung, pro Person höchstens <Z k="weiterbildung_max" /> (Staatssteuer) bzw. <Z k="weiterbildung_max" e="bund" /> (Bundessteuer). Massgebend ist das Zahlungsdatum, nicht der Kursbesuch. Die Ausbildung bis zum ersten Abschluss auf der Sekundarstufe II zählt nicht. <WL s={16} /></p>

{#each personen as i}
  {@const w = f.weiterbildung[i]}
  {@const rw = r.weiterbildung.zeilen[i]}
  <h3 class="uf-h3">Person {i + 1}</h3>
  <label class="sd-field uf-feld-breit"><span class="sd-field__label">Bezeichnung (Kurs, Schule)</span><input type="text" bind:value={w.bezeichnung} /></label>
  <div class="uf-kopf" data-spalten="2"><span></span><span></span><span>Code</span><span>Staatssteuer</span><span>Bundessteuer</span></div>
  <Zeile label="Total der Kosten" code={codes[i][0]}>
    {#snippet s()}<Feld bind:wert={w.kosten} label={`Total der Kosten Person ${i + 1}`} />{/snippet}
    {#snippet b()}<Wert wert={w.kosten ?? 0} label="Total der Kosten" />{/snippet}
  </Zeile>
  <Zeile label="Beitrag Arbeitgeber oder weiterer Stellen (Bund, Branchenverbände usw.)" code={codes[i][1]}>
    {#snippet s()}<Feld bind:wert={w.beitrag} label={`Beiträge Dritter Person ${i + 1}`} />{/snippet}
    {#snippet b()}<Wert wert={w.beitrag ?? 0} minus label="Beiträge Dritter" />{/snippet}
  </Zeile>
  <Zeile label="Selbst getragene Kosten" code={codes[i][2]}>
    {#snippet s()}<Wert wert={rw.selbst} label="Selbst getragen" />{/snippet}
    {#snippet b()}<Wert wert={rw.selbst} label="Selbst getragen" />{/snippet}
  </Zeile>
  <Zeile label="Zulässiger Abzug" code={codes[i][3]} stark>
    {#snippet s()}<Wert wert={rw.s} stark label="Zulässiger Abzug Staatssteuer" />{/snippet}
    {#snippet b()}<Wert wert={rw.b} stark label="Zulässiger Abzug Bundessteuer" />{/snippet}
  </Zeile>
{/each}

<Zeile label="Total, in die Steuererklärung Ziffer 16.2" code="292" stark>
  {#snippet s()}<Wert wert={r.weiterbildung.total.s} stark label="Total Weiterbildung Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={r.weiterbildung.total.b} stark label="Total Weiterbildung Bundessteuer" />{/snippet}
</Zeile>
