<script lang="ts">
  import { speicher } from '../../lib/uebung/speicher.svelte';
  import { istVerheiratet, type Ergebnis } from '../../lib/uebung/zh2025';
  import Feld from './Feld.svelte';
  import Wert from './Wert.svelte';
  import Zeile from './Zeile.svelte';
  import Uebertrag from './Uebertrag.svelte';
  import Verweis from './Verweis.svelte';
  import WL from './WL.svelte';

  let { r }: { r: Ergebnis } = $props();
  const f = $derived(speicher.fall);
  const e = $derived(f.einkuenfte);
  const vh = $derived(istVerheiratet(f));
  const rentenZeilen = $derived(vh ? [0, 1, 2, 3] : [0, 1]);
  const rentenCodes = ['134', '135', '136', '137'];
</script>

<p class="uf-intro">Seite 2 des Formulars 300: Einkünfte im In- und Ausland, in Franken ohne Rappen. Die Einkünfte gelten für Staats- und Bundessteuer gleich, deshalb gibt es hier nur eine Spalte.</p>

<div class="uf-kopf" data-spalten="1"><span></span><span>Einkünfte 2025</span><span>Code</span><span>CHF</span></div>

<h3 class="uf-h3">1. Einkünfte aus unselbständiger Erwerbstätigkeit<WL s={10} /></h3>
<Zeile spalten={1} ziffer="1.1" label="Haupterwerb Person 1 (Nettolohn, Lohnausweis Ziffer 11)" code="100">{#snippet wert()}<Feld bind:wert={e.e100} label="1.1 Haupterwerb Person 1" />{/snippet}</Zeile>
{#if vh}<Zeile spalten={1} ziffer="" label="Haupterwerb Person 2" code="101">{#snippet wert()}<Feld bind:wert={e.e101} label="1.1 Haupterwerb Person 2" />{/snippet}</Zeile>{/if}
<Zeile spalten={1} ziffer="1.2" label="Nebenerwerb Person 1" code="102">{#snippet wert()}<Feld bind:wert={e.e102} label="1.2 Nebenerwerb Person 1" />{/snippet}</Zeile>
{#if vh}<Zeile spalten={1} label="Nebenerwerb Person 2" code="103">{#snippet wert()}<Feld bind:wert={e.e103} label="1.2 Nebenerwerb Person 2" />{/snippet}</Zeile>{/if}

<h3 class="uf-h3">2. Einkünfte aus selbständiger Erwerbstätigkeit</h3>
<Zeile spalten={1} ziffer="2.1" label="Haupterwerb Person 1 (Hilfsblatt A, B oder G)" code="120" wl={10}>{#snippet wert()}<Feld bind:wert={e.e120} label="2.1 Haupterwerb Person 1" />{/snippet}</Zeile>
{#if vh}<Zeile spalten={1} label="Haupterwerb Person 2" code="121">{#snippet wert()}<Feld bind:wert={e.e121} label="2.1 Haupterwerb Person 2" />{/snippet}</Zeile>{/if}
<Zeile spalten={1} ziffer="2.2" label="Nebenerwerb Person 1" code="122">{#snippet wert()}<Feld bind:wert={e.e122} label="2.2 Nebenerwerb Person 1" />{/snippet}</Zeile>
{#if vh}<Zeile spalten={1} label="Nebenerwerb Person 2" code="123">{#snippet wert()}<Feld bind:wert={e.e123} label="2.2 Nebenerwerb Person 2" />{/snippet}</Zeile>{/if}

<h3 class="uf-h3">3. Einkünfte aus Sozial- und anderen Versicherungen, Leibrenten</h3>
<Zeile spalten={1} ziffer="3.1" label="AHV- / IV-Renten (100 %) Person 1" code="130" wl={11}>
  {#snippet unter()}<label class="sd-check"><input type="radio" value="ahv" bind:group={e.ahv1} /><span class="sd-check__text">AHV</span></label><label class="sd-check"><input type="radio" value="iv" bind:group={e.ahv1} /><span class="sd-check__text">IV</span></label>{/snippet}
  {#snippet wert()}<Feld bind:wert={e.e130} label="3.1 AHV/IV-Rente Person 1" />{/snippet}
</Zeile>
{#if vh}
  <Zeile spalten={1} label="AHV- / IV-Renten (100 %) Person 2" code="131">
    {#snippet unter()}<label class="sd-check"><input type="radio" value="ahv" bind:group={e.ahv2} /><span class="sd-check__text">AHV</span></label><label class="sd-check"><input type="radio" value="iv" bind:group={e.ahv2} /><span class="sd-check__text">IV</span></label>{/snippet}
    {#snippet wert()}<Feld bind:wert={e.e131} label="3.1 AHV/IV-Rente Person 2" />{/snippet}
  </Zeile>
{/if}
{#each rentenZeilen as i}
  <Zeile spalten={1} ziffer={i === 0 ? '3.2' : ''} label={`Renten / Pensionen Person ${i < 2 ? 1 : 2}: Betrag × steuerbarer Anteil`} code={rentenCodes[i]} wl={i === 0 ? 11 : undefined}>
    {#snippet unter()}
      <span class="uf-rechnung">
        <Feld bind:wert={e.renten[i].betrag} label="Rentenbetrag" klein /> CHF ×
        <Feld bind:wert={e.renten[i].prozent} label="Prozent" klein /> %
      </span>
    {/snippet}
    {#snippet wert()}<Wert wert={r.einkuenfte.renten[i]} label="steuerbarer Rentenbetrag" />{/snippet}
  </Zeile>
{/each}
<Zeile spalten={1} ziffer="3.3" label="Erwerbsausfallentschädigungen aus Arbeitslosenversicherung, Person 1" code="140">{#snippet wert()}<Feld bind:wert={e.e140} label="3.3 Person 1" />{/snippet}</Zeile>
{#if vh}<Zeile spalten={1} label="Erwerbsausfallentschädigungen, Person 2" code="141">{#snippet wert()}<Feld bind:wert={e.e141} label="3.3 Person 2" />{/snippet}</Zeile>{/if}
<Zeile spalten={1} ziffer="3.4" label="Kinder- und Familienzulagen, Mutterschaftsentschädigungen, Taggelder (direkt ausbezahlt), Person 1" code="142" wl={12}>{#snippet wert()}<Feld bind:wert={e.e142} label="3.4 Person 1" />{/snippet}</Zeile>
{#if vh}<Zeile spalten={1} label="Zulagen und Taggelder, Person 2" code="143">{#snippet wert()}<Feld bind:wert={e.e143} label="3.4 Person 2" />{/snippet}</Zeile>{/if}

<h3 class="uf-h3">4. Wertschriftenertrag</h3>
<Zeile spalten={1} ziffer="4.1" label="Ertrag aus Wertschriften, Guthaben und Lotterien" code="150" wl={12}>
  {#snippet unter()}<Verweis ziel="wertschriften">aus dem Wertschriftenverzeichnis</Verweis>{/snippet}
  {#snippet wert()}<Uebertrag code="150" ber={r.wv.total} label="4.1 Wertschriftenertrag" />{/snippet}
</Zeile>
<Zeile spalten={1} ziffer="4.2" label="Davon aus qualifizierten Beteiligungen (Code Q)" code="151">
  {#snippet wert()}<Uebertrag code="151" ber={r.wv.qualifiziert} label="4.2 davon qualifizierte Beteiligungen" />{/snippet}
</Zeile>

<h3 class="uf-h3">5. Übrige Einkünfte und Gewinne</h3>
<Zeile spalten={1} ziffer="5.1" label="Unterhaltsbeiträge vom geschiedenen / getrennten Ehegatten" code="160" wl={12}>{#snippet wert()}<Feld bind:wert={e.e160} label="5.1" />{/snippet}</Zeile>
<Zeile spalten={1} ziffer="5.2" label="Unterhaltsbeiträge für minderjährige Kinder (bis zum Monat der Volljährigkeit)" code="161">{#snippet wert()}<Feld bind:wert={e.e161} label="5.2" />{/snippet}</Zeile>
<Zeile spalten={1} ziffer="5.3" label="Ertrag aus Geschäfts- und Korporationsanteilen" code="162">{#snippet wert()}<Feld bind:wert={e.e162} label="5.3" />{/snippet}</Zeile>
<Zeile spalten={1} ziffer="5.4" label="Weitere Einkünfte" code="163">
  {#snippet unter()}<input type="text" class="uf-text-klein" placeholder="nähere Bezeichnung" aria-label="Bezeichnung weitere Einkünfte" bind:value={e.e163Text} />{/snippet}
  {#snippet wert()}<Feld bind:wert={e.e163} label="5.4" />{/snippet}
</Zeile>
<Zeile spalten={1} ziffer="5.5" label="Kapitalabfindungen für wiederkehrende Leistungen" code="164">
  {#snippet unter()}<span class="uf-rechnung">für <Feld bind:wert={e.e164Monate} label="Monate" klein /> Monate</span>{/snippet}
  {#snippet wert()}<Feld bind:wert={e.e164} label="5.5" />{/snippet}
</Zeile>

<Zeile spalten={1} ziffer="6." label="Nettoertrag aus Liegenschaften" code="188" wl={28}>
  {#snippet unter()}<Verweis ziel="liegenschaften">aus dem Liegenschaftenverzeichnis</Verweis>{/snippet}
  {#snippet wert()}<Uebertrag code="188" ber={r.lg.netto} label="6. Nettoertrag aus Liegenschaften" />{/snippet}
</Zeile>
<Zeile spalten={1} ziffer="7." label="Total der Einkünfte (auf Seite 3, Ziffer 19)" code="199" stark>
  {#snippet wert()}<Wert wert={r.einkuenfte.e199} label="7. Total der Einkünfte" stark />{/snippet}
</Zeile>
