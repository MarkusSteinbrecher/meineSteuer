<script lang="ts">
  import { speicher } from '../../lib/uebung/speicher.svelte';
  import { istVerheiratet, type Ergebnis } from '../../lib/uebung/zh2025';
  import { chf } from './kontext';
  import Feld from './Feld.svelte';
  import Wert from './Wert.svelte';
  import Zeile from './Zeile.svelte';
  import Uebertrag from './Uebertrag.svelte';
  import Verweis from './Verweis.svelte';
  import Z from './Z.svelte';

  let { r }: { r: Ergebnis } = $props();
  const f = $derived(speicher.fall);
  const a = $derived(f.abzuege);
  const vh = $derived(istVerheiratet(f));
  const ab = $derived(r.abzuege);
</script>

<p class="uf-intro">Seite 3 des Formulars 300, oberer Teil: Abzüge, getrennt nach Staatssteuer und Bundessteuer. Werte mit Stift-Symbol kommen aus einem Hilfsformular. Mit dem Stift trägst du sie von Hand ein, mit dem Kreuz gilt wieder der berechnete Wert.</p>

<div class="uf-kopf" data-spalten="2"><span></span><span>Abzüge 2025</span><span>Code</span><span>Staatssteuer</span><span>Bundessteuer</span></div>

<Zeile ziffer="11.1" label="Berufsauslagen Person 1" code="220" wl={13}>
  {#snippet unter()}<Verweis ziel="berufsauslagen">Formular Berufsauslagen</Verweis>{/snippet}
  {#snippet s()}<Uebertrag code="220" ber={ab.a220} label="11.1 Berufsauslagen Person 1, Staatssteuer" />{/snippet}
  {#snippet b()}<Uebertrag code="220" ber={ab.a220} spalte="b" label="11.1 Berufsauslagen Person 1, Bundessteuer" />{/snippet}
</Zeile>
{#if vh}
  <Zeile ziffer="11.2" label="Berufsauslagen Person 2" code="240">
    {#snippet unter()}<Verweis ziel="berufsauslagen-2">Formular Berufsauslagen Person 2</Verweis>{/snippet}
    {#snippet s()}<Uebertrag code="240" ber={ab.a240} label="11.2 Berufsauslagen Person 2, Staatssteuer" />{/snippet}
    {#snippet b()}<Uebertrag code="240" ber={ab.a240} spalte="b" label="11.2 Berufsauslagen Person 2, Bundessteuer" />{/snippet}
  </Zeile>
{/if}
<Zeile ziffer="12." label="Schuldzinsen (soweit nicht schon unter Ziffer 2 abgezogen)" code="250" wl={14}>
  {#snippet unter()}<Verweis ziel="schulden">Schuldenverzeichnis</Verweis>{/snippet}
  {#snippet s()}<Uebertrag code="250" ber={ab.a250} label="12. Schuldzinsen, Staatssteuer" />{/snippet}
  {#snippet b()}<Uebertrag code="250" ber={ab.a250} spalte="b" label="12. Schuldzinsen, Bundessteuer" />{/snippet}
</Zeile>

<h3 class="uf-h3">13. Unterhaltsbeiträge und Rentenleistungen</h3>
<Zeile ziffer="13.1" label="Unterhaltsbeiträge an den geschiedenen oder getrennt lebenden Ehegatten" code="254" wl={15}>
  {#snippet s()}<Feld bind:wert={a.a254} label="13.1 Unterhaltsbeiträge Ehegatte" />{/snippet}
  {#snippet b()}<Wert wert={ab.a254} label="13.1 Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="13.2" label="Unterhaltsbeiträge für minderjährige Kinder (bis zum Monat der Volljährigkeit)" code="255">
  {#snippet s()}<Feld bind:wert={a.a255} label="13.2 Unterhaltsbeiträge Kinder" />{/snippet}
  {#snippet b()}<Wert wert={ab.a255} label="13.2 Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="13.3" label="Rentenleistungen: abzugsfähig ist der Ertragsanteil" code="256">
  {#snippet unter()}<span class="uf-rechnung">bezahlt <Feld bind:wert={a.rente2561} label="Bezahlte Rentenleistungen (Code 2561)" klein /> CHF × Ertragsanteil <Feld bind:wert={a.renteProzent} label="Ertragsanteil in Prozent" klein /> %</span>{/snippet}
  {#snippet s()}<Wert wert={ab.a256} label="13.3 Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={ab.a256} label="13.3 Bundessteuer" />{/snippet}
</Zeile>

<h3 class="uf-h3">14. Beiträge an die gebundene Selbstvorsorge (Säule 3a)</h3>
<Zeile ziffer="14.1" label="Person 1: effektiv einbezahlt (Code 262)" code="260" wl={15}>
  {#snippet unter()}<span class="uf-rechnung">effektiv <Feld bind:wert={a.s3a1} label="Säule 3a effektiv Person 1" klein /> CHF · Höchstbetrag mit Pensionskasse <Z k="saeule3a_mit_pk" e="bund" />, ohne <Z k="saeule3a_ohne_pk_satz" e="bund" p /> des Erwerbseinkommens, höchstens <Z k="saeule3a_ohne_pk" e="bund" /></span>{/snippet}
  {#snippet s()}<Uebertrag code="260" ber={ab.a260} label="14.1 Säule 3a Person 1, Staatssteuer" />{/snippet}
  {#snippet b()}<Uebertrag code="260" ber={ab.a260} spalte="b" label="14.1 Säule 3a Person 1, Bundessteuer" />{/snippet}
</Zeile>
{#if vh}
  <Zeile ziffer="14.2" label="Person 2: effektiv einbezahlt (Code 263)" code="261">
    {#snippet unter()}<span class="uf-rechnung">effektiv <Feld bind:wert={a.s3a2} label="Säule 3a effektiv Person 2" klein /> CHF</span>{/snippet}
    {#snippet s()}<Uebertrag code="261" ber={ab.a261} label="14.2 Säule 3a Person 2, Staatssteuer" />{/snippet}
    {#snippet b()}<Uebertrag code="261" ber={ab.a261} spalte="b" label="14.2 Säule 3a Person 2, Bundessteuer" />{/snippet}
  </Zeile>
{/if}

<Zeile ziffer="15." label="Versicherungsprämien, Zinsen von Sparkapitalien" code="270" wl={15}>
  {#snippet unter()}<Verweis ziel="versicherung">Formular Versicherungsprämien</Verweis>{/snippet}
  {#snippet s()}<Uebertrag code="270" ber={ab.a270} label="15. Versicherungsprämien, Staatssteuer" />{/snippet}
  {#snippet b()}<Uebertrag code="270" ber={ab.a270} spalte="b" label="15. Versicherungsprämien, Bundessteuer" />{/snippet}
</Zeile>

<h3 class="uf-h3">16. Weitere Abzüge</h3>
<Zeile ziffer="16.1" label="Beiträge an AHV, IV und 2. Säule, sofern nicht unter Ziffer 1 und 2 abgezogen (z.B. Einkauf Pensionskasse)" code="280" wl={16}>
  {#snippet s()}<Feld bind:wert={a.a280s} label="16.1 Staatssteuer" />{/snippet}
  {#snippet b()}<Feld bind:wert={a.a280b} label="16.1 Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="16.2" label="Berufsorientierte Aus- und Weiterbildungskosten" code="292" wl={16}>
  {#snippet unter()}<Verweis ziel="weiterbildung">Formular Aus- und Weiterbildung</Verweis>{/snippet}
  {#snippet s()}<Uebertrag code="292" ber={ab.a292} label="16.2 Weiterbildung, Staatssteuer" />{/snippet}
  {#snippet b()}<Uebertrag code="292" ber={ab.a292} spalte="b" label="16.2 Weiterbildung, Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="16.3" label="Kosten für die Verwaltung des beweglichen Privatvermögens" code="283" wl={16}>
  {#snippet unter()}<span class="uf-leise">Pauschal <Z k="wertschriftenverwaltung_satz" p /> des Steuerwerts der von Dritten verwalteten Wertschriften, höchstens <Z k="wertschriftenverwaltung_max" />.</span>{/snippet}
  {#snippet s()}<Feld bind:wert={a.a283} label="16.3 Vermögensverwaltung" />{/snippet}
  {#snippet b()}<Wert wert={ab.a283} label="16.3 Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="16.4" label="Behinderungsbedingte Kosten" code="3160" wl={17}>
  {#snippet s()}<Feld bind:wert={a.a3160} label="16.4 Behinderungsbedingte Kosten" />{/snippet}
  {#snippet b()}<Wert wert={ab.a3160} label="16.4 Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="16.5" label="Weitere Abzüge" code="284" wl={17}>
  {#snippet unter()}
    <div class="uf-teile">
      <span class="uf-rechnung">Beiträge an politische Parteien <Feld bind:wert={a.parteien} label="Beiträge an politische Parteien" klein /> CHF, höchstens <Z k={vh ? 'parteispenden_max_verheiratet' : 'parteispenden_max'} /> bzw. <Z k="parteispenden_max" e="bund" /></span>
      {#if r.einkuenfte.e151}<span class="uf-leise">Nicht steuerbarer Teil der Erträge aus qualifizierten Beteiligungen: <Z k="teilbesteuerung_abzug" p /> von {chf(r.einkuenfte.e151)} = {chf(ab.teilbesteuerung.s)} bzw. <Z k="teilbesteuerung_abzug" e="bund" p /> = {chf(ab.teilbesteuerung.b)}</span>{/if}
      <span class="uf-rechnung">Übrige <Feld bind:wert={a.weitere} label="Übrige weitere Abzüge" klein /> CHF <input type="text" class="uf-text-klein" placeholder="Bezeichnung" aria-label="Bezeichnung übrige Abzüge" bind:value={a.weitereText} /></span>
    </div>
  {/snippet}
  {#snippet s()}<Uebertrag code="284" ber={ab.a284} label="16.5 Weitere Abzüge, Staatssteuer" />{/snippet}
  {#snippet b()}<Uebertrag code="284" ber={ab.a284} spalte="b" label="16.5 Weitere Abzüge, Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="16.6" label="Abzug für fremdbetreute Kinder (Jahrgänge 2011–2025)" code="376" wl={18}>
  {#snippet unter()}<Verweis ziel="personalien">Kosten bei den Kindern eintragen</Verweis>{/snippet}
  {#snippet s()}<Uebertrag code="376" ber={ab.a376} label="16.6 Drittbetreuung, Staatssteuer" />{/snippet}
  {#snippet b()}<Uebertrag code="376" ber={ab.a376} spalte="b" label="16.6 Drittbetreuung, Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="17." label="Sonderabzug bei Erwerbstätigkeit beider Ehegatten" code="290" wl={18}>
  {#snippet unter()}
    {#if vh && ab.verbleibend}
      <span class="uf-leise">Verbleibendes Erwerbseinkommen (Erwerb minus Berufsauslagen und Säule 3a): Person 1 {chf(ab.verbleibend[0].s)}, Person 2 {chf(ab.verbleibend[1].s)}. Staatssteuer: das tiefere, höchstens <Z k="zweiverdiener" />. Bundessteuer: <Z k="zweiverdiener_satz" e="bund" p /> des tieferen, mindestens <Z k="zweiverdiener_min" e="bund" />, höchstens <Z k="zweiverdiener_max" e="bund" />.</span>
    {:else}
      <span class="uf-leise">Nur für Verheiratete, die beide erwerbstätig sind.</span>
    {/if}
  {/snippet}
  {#snippet s()}<Uebertrag code="290" ber={ab.a290} label="17. Sonderabzug, Staatssteuer" />{/snippet}
  {#snippet b()}<Uebertrag code="290" ber={ab.a290} spalte="b" label="17. Sonderabzug, Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="18." label="Total der Abzüge (in Ziffer 20)" code="299" stark>
  {#snippet s()}<Wert wert={ab.a299.s} label="18. Total der Abzüge, Staatssteuer" stark />{/snippet}
  {#snippet b()}<Wert wert={ab.a299.b} label="18. Total der Abzüge, Bundessteuer" stark />{/snippet}
</Zeile>
