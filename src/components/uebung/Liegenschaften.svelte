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

  function neu() {
    f.liegenschaften.push({ id: neueId(), ort: '', kanton: 'ZH', strasse: '', art: 'Einfamilienhaus', flaeche: '', bewertung: 'verkehrswert', steuerwert: null, wohnen: null, gewerbe: null, unterhalt: 'pauschal', unterhaltEffektiv: null, geschaeftlich: false });
  }
</script>

<p class="uf-intro">Formular 350. Vorderseite: Steuerwert jeder Liegenschaft. Rückseite: Eigenmietwert, Miet- und Pachtzinseinnahmen, Unterhalts- und Verwaltungskosten. Für jede Liegenschaft wählst du den Pauschalabzug von <Z k="liegenschaft_pauschal" p /> des Ertrags oder die effektiven Kosten. Bei vorwiegend geschäftlich genutzten Liegenschaften sind nur die effektiven Kosten zulässig. <WL s={28} /></p>
<p class="uf-text uf-leise">Für die Bundessteuer beträgt die Pauschale bei Gebäuden, die höchstens 10 Jahre alt sind, <Z k="liegenschaft_pauschal_neu" e="bund" p />. Das Zürcher Formular hat dafür keine eigene Spalte.</p>

{#each f.liegenschaften as l, i (l.id)}
  {@const z = r.lg.zeilen[i]}
  <fieldset class="uf-gruppe uf-gruppe--breit">
    <legend>Liegenschaft {i + 1}</legend>
    <div class="uf-raster uf-raster--4">
      <label class="sd-field"><span class="sd-field__label">Ort</span><input type="text" bind:value={l.ort} /></label>
      <label class="sd-field"><span class="sd-field__label">Kanton / Land</span><input type="text" bind:value={l.kanton} /></label>
      <label class="sd-field"><span class="sd-field__label">Strasse</span><input type="text" bind:value={l.strasse} /></label>
      <label class="sd-field"><span class="sd-field__label">Art</span><input type="text" bind:value={l.art} /></label>
      <label class="sd-field"><span class="sd-field__label">Fläche in m²</span><input type="text" bind:value={l.flaeche} /></label>
      <label class="sd-field"><span class="sd-field__label">Besteuert zum</span>
        <select bind:value={l.bewertung}><option value="verkehrswert">Verkehrswert (Ziffer 31.1)</option><option value="ertragswert">Ertragswert, Land- oder Forstwirtschaft (Ziffer 31.2)</option></select>
      </label>
      <div class="sd-field"><span class="sd-field__label">Steuerwert (gemäss Einschätzung)</span><Feld bind:wert={l.steuerwert} label="Steuerwert" /></div>
      <label class="sd-check uf-unten"><input type="checkbox" bind:checked={l.geschaeftlich} /><span class="sd-check__text">vorwiegend geschäftlich genutzt</span></label>
    </div>
    <div class="uf-tabelle-rahmen"><table class="uf-tabelle uf-tabelle--eng">
      <thead><tr><th data-num>Eigenmietwert / Mietzins Wohnungen, Zimmer, Garagen</th><th data-num>Gewerblich genutzte Räume</th><th data-num>Total</th><th>Unterhalt und Verwaltung</th><th data-num>Abzug</th><th data-num>Verbleibender Ertrag</th></tr></thead>
      <tbody>
        <tr>
          <td><Feld bind:wert={l.wohnen} label="Eigenmietwert, Mietzins Wohnungen" /></td>
          <td><Feld bind:wert={l.gewerbe} label="Mietzins gewerbliche Räume" /></td>
          <td data-num>{chf(z.total)}</td>
          <td>
            <div class="uf-teile">
              <label class="sd-check"><input type="radio" value="pauschal" bind:group={l.unterhalt} /><span class="sd-check__text">pauschal ({chf(z.pauschal)})</span></label>
              <label class="sd-check"><input type="radio" value="effektiv" bind:group={l.unterhalt} /><span class="sd-check__text">effektiv</span></label>
              {#if l.unterhalt === 'effektiv'}<Feld bind:wert={l.unterhaltEffektiv} label="Unterhaltskosten effektiv" klein />{/if}
            </div>
          </td>
          <td data-num>– {chf(z.unterhalt)}</td>
          <td data-num><strong>{chf(z.ertrag)}</strong></td>
        </tr>
      </tbody>
    </table></div>
    <button type="button" data-size="sm" data-variant="ghost" onclick={() => f.liegenschaften.splice(i, 1)}><Icon name="trash-2" />Liegenschaft entfernen</button>
  </fieldset>
{/each}
<div class="uf-reihe"><button type="button" data-size="sm" onclick={neu}><Icon name="plus" />Liegenschaft</button></div>

<dl class="uf-summen">
  <div><dt>Total Verkehrswert, in die Steuererklärung Ziffer 31.1</dt><dd><span class="uf-code">3951</span>{chf(r.lg.verkehrswert)}</dd></div>
  <div><dt>Total Ertragswert, in Ziffer 31.2</dt><dd><span class="uf-code">3952</span>{chf(r.lg.ertragswert)}</dd></div>
  <div><dt>Nettoertrag aus Liegenschaften, in Ziffer 6</dt><dd><span class="uf-code">3953</span>{chf(r.lg.netto)}</dd></div>
</dl>
<p class="uf-text uf-leise">Wie der Eigenmietwert berechnet wird, steht auf der <a href={`${import.meta.env.BASE_URL}kantone/zh/`}>Kantonsseite Zürich</a>. Den Wert selbst entnimmst du der Einschätzung oder dem Übungsfall.</p>
