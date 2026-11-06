<script lang="ts">
  import { speicher } from '../../lib/uebung/speicher.svelte';
  import { neueId, type Ergebnis } from '../../lib/uebung/zh2025';
  import { chf } from './kontext';
  import Feld from './Feld.svelte';
  import Icon from './Icon.svelte';
  import WL from './WL.svelte';
  import Z from './Z.svelte';

  let { r }: { r: Ergebnis } = $props();
  const f = $derived(speicher.fall);
</script>

<p class="uf-intro">Schuldenverzeichnis: jede Schuld mit Gläubiger (Name und Adresse), Stand am 31.12.2025 und den 2025 bezahlten Zinsen. Amortisationen und Leasingraten sind keine Schuldzinsen. Private Schuldzinsen sind abziehbar bis zum Ertrag aus dem Vermögen (Wertschriften und Liegenschaften, inklusive Eigenmietwert) plus <Z k="schuldzins_zusatz" />. Baurechtszinsen gehören zu den Liegenschaftskosten. <WL s={14} /></p>

{#if f.schulden.length}
  <div class="uf-tabelle-rahmen">
    <table class="uf-tabelle">
      <thead><tr><th>Gläubiger (Name, Adresse)</th><th>Art (z.B. Hypothek)</th><th>Geschäft</th><th data-num>Schuld 31.12.2025</th><th data-num>Zinsen 2025</th><th></th></tr></thead>
      <tbody>
        {#each f.schulden as s, i (s.id)}
          <tr>
            <td><input type="text" aria-label="Gläubiger" bind:value={s.glaeubiger} /></td>
            <td><input type="text" aria-label="Art der Schuld" bind:value={s.art} /></td>
            <td><input type="checkbox" aria-label="Geschäftsschuld (Code G)" bind:checked={s.geschaeft} /></td>
            <td><Feld bind:wert={s.betrag} label="Schuld am 31.12.2025" /></td>
            <td><Feld bind:wert={s.zinsen} label="Schuldzinsen 2025" /></td>
            <td><button type="button" class="uf-knopf" aria-label="Schuld entfernen" onclick={() => f.schulden.splice(i, 1)}><Icon name="trash-2" /></button></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
<div class="uf-reihe"><button type="button" data-size="sm" onclick={() => f.schulden.push({ id: neueId(), glaeubiger: '', art: '', geschaeft: false, betrag: null, zinsen: null })}><Icon name="plus" />Schuld</button></div>

<dl class="uf-summen">
  <div><dt>Private Schulden, in die Steuererklärung Ziffer 34</dt><dd><span class="uf-code">470</span>{chf(r.schulden.total)}</dd></div>
  <div><dt>Private Schuldzinsen bezahlt</dt><dd>{chf(r.schulden.zinsen)}</dd></div>
  <div><dt>Grenze: Vermögensertrag {chf(r.einkuenfte.e150 + r.lg.brutto)} plus Zusatzbetrag</dt><dd>{chf(r.schulden.grenze.s)}</dd></div>
  <div><dt>Abziehbare Schuldzinsen, in Ziffer 12</dt><dd><span class="uf-code">250</span>{chf(r.abzuege.a250.s)}</dd></div>
</dl>
<p class="uf-text uf-leise">Geschäftsschulden Selbständigerwerbender (Häkchen «Geschäft») gehören in die Buchhaltung und zählen hier nicht mit.</p>
