<script lang="ts">
  import { speicher } from '../../lib/uebung/speicher.svelte';
  import { neueId, type Ergebnis } from '../../lib/uebung/zh2025';
  import { chf, chf2 } from './kontext';
  import Feld from './Feld.svelte';
  import Icon from './Icon.svelte';
  import WL from './WL.svelte';
  import Z from './Z.svelte';

  let { r }: { r: Ergebnis } = $props();
  const f = $derived(speicher.fall);

  function neu() {
    f.wertschriften.push({ id: neueId(), code: '', waehrung: 'CHF', nennwert: '', valor: '', bezeichnung: '', zugang: '', abgang: '', steuerwert: null, ertragA: null, ertragB: null });
  }
</script>

<p class="uf-intro">Formular 340: alle Konten, Wertschriften und Guthaben mit Steuerwert am 31.12.2025 und Bruttoertrag 2025. Erträge, auf denen <Z k="verrechnungssteuer_satz" e="bund" p /> Verrechnungssteuer abgezogen wurden, gehören in Kolonne A. Alle anderen gehören in Kolonne B, zum Beispiel ausländische Wertschriften oder Kundenguthaben mit höchstens <Z k="vst_frei_kundenguthaben" e="bund" /> Bruttozins. <WL s={24} /></p>

<div class="uf-tabelle-rahmen">
  <table class="uf-tabelle uf-wv">
    <thead>
      <tr>
        <th>Code</th><th>Währung</th><th>Nennwert / Stück</th><th>Valoren-Nr.</th><th>Bezeichnung (bei Konto mit Nummer)</th>
        <th>Zugang</th><th>Abgang</th><th data-num>Steuerwert 31.12.</th><th data-num>A mit VSt</th><th data-num>B ohne VSt</th><th></th>
      </tr>
    </thead>
    <tbody>
      {#each f.wertschriften as z, i (z.id)}
        <tr>
          <td>
            <select aria-label="Code" bind:value={z.code}>
              <option value="">–</option><option value="G">G</option><option value="N">N</option><option value="E">E</option><option value="S">S</option><option value="Q">Q</option>
            </select>
          </td>
          <td><input type="text" class="uf-schmal" aria-label="Währung" bind:value={z.waehrung} /></td>
          <td><input type="text" class="uf-schmal" aria-label="Nennwert oder Stückzahl" bind:value={z.nennwert} /></td>
          <td><input type="text" class="uf-schmal" aria-label="Valorennummer" bind:value={z.valor} /></td>
          <td><input type="text" aria-label="Bezeichnung" bind:value={z.bezeichnung} /></td>
          <td><input type="text" class="uf-datum" placeholder="TT.MM" aria-label="Zugang (Kauf, Eröffnung)" bind:value={z.zugang} /></td>
          <td><input type="text" class="uf-datum" placeholder="TT.MM" aria-label="Abgang (Verkauf, Saldierung)" bind:value={z.abgang} /></td>
          <td><Feld bind:wert={z.steuerwert} label="Steuerwert am 31.12.2025" /></td>
          <td><Feld bind:wert={z.ertragA} label="Bruttoertrag mit Verrechnungssteuer" /></td>
          <td><Feld bind:wert={z.ertragB} label="Bruttoertrag ohne Verrechnungssteuer" /></td>
          <td><button type="button" class="uf-knopf" aria-label="Zeile entfernen" onclick={() => f.wertschriften.splice(i, 1)}><Icon name="trash-2" /></button></td>
        </tr>
      {/each}
    </tbody>
    <tfoot>
      <tr><td colspan="7">Total Steuerwert (Code 400) und Zwischentotal Bruttoerträge (539 / 542)</td><td data-num>{chf(r.wv.steuerwert)}</td><td data-num>{chf(r.wv.ertragA)}</td><td data-num>{chf(r.wv.ertragB)}</td><td></td></tr>
    </tfoot>
  </table>
</div>
<div class="uf-reihe"><button type="button" data-size="sm" onclick={neu}><Icon name="plus" />Position</button></div>

<dl class="uf-summen">
  <div><dt>Total Steuerwert, in die Steuererklärung Ziffer 30.1</dt><dd><span class="uf-code">400</span>{chf(r.wv.steuerwert)}</dd></div>
  <div><dt>Total Bruttoertrag A + B, in die Steuererklärung Ziffer 4.1</dt><dd><span class="uf-code">150</span>{chf(r.wv.total)}</dd></div>
  <div><dt>Ertrag aus qualifizierten Beteiligungen (Code Q), in Ziffer 4.2</dt><dd><span class="uf-code">151</span>{chf(r.wv.qualifiziert)}</dd></div>
  <div><dt>Verrechnungssteueranspruch: <Z k="verrechnungssteuer_satz" e="bund" p /> von Bruttoertrag A</dt><dd><span class="uf-code">540</span>{chf2(r.wv.vst)}</dd></div>
</dl>

<p class="uf-text uf-leise">Codes: G Geschäftsvermögen · N Nutzniessungsvermögen · E Wertschriften aus Erbschaften · S Schenkung · Q qualifizierte Beteiligung (mindestens <Z k="qualifizierte_beteiligung_min" e="bund" p /> am Kapital). Die Verrechnungssteuer bekommst du über die Steuererklärung zurück. Die Erträge sind trotzdem brutto zu deklarieren.</p>
