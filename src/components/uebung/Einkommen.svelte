<script lang="ts">
  import { speicher } from '../../lib/uebung/speicher.svelte';
  import { istVerheiratet, type Ergebnis } from '../../lib/uebung/zh2025';
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
  const ek = $derived(r.einkommen);
</script>

<p class="uf-intro">Seite 3 des Formulars 300, unterer Teil: vom Total der Einkünfte zum steuerbaren Einkommen. Krankheitskosten und Zuwendungen hängen vom Nettoeinkommen (Ziffer 21) ab, deshalb kommen sie erst hier.</p>

<div class="uf-kopf" data-spalten="2"><span></span><span>Einkommensberechnung</span><span>Code</span><span>Staatssteuer</span><span>Bundessteuer</span></div>

<Zeile ziffer="19." label="Total der Einkünfte (Übertrag von Seite 2, Ziffer 7)" code="199">
  {#snippet s()}<Wert wert={ek.e199} label="19. Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={ek.e199} label="19. Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="20." label="Total der Abzüge (Übertrag von Ziffer 18)" code="299">
  {#snippet s()}<Wert wert={ek.a299.s} minus label="20. Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={ek.a299.b} minus label="20. Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="21." label="Nettoeinkommen" code="310" stark>
  {#snippet s()}<Wert wert={ek.e310.s} stark label="21. Nettoeinkommen, Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={ek.e310.b} stark label="21. Nettoeinkommen, Bundessteuer" />{/snippet}
</Zeile>

<h3 class="uf-h3">22. Zusätzliche Abzüge</h3>
<Zeile ziffer="22.1" label="Krankheits- und Unfallkosten" code="320" wl={19}>
  {#snippet unter()}<Verweis ziel="krankheit">Aufstellung Krankheitskosten</Verweis>{/snippet}
  {#snippet s()}<Uebertrag code="320" ber={ek.e320} minus label="22.1 Krankheitskosten, Staatssteuer" />{/snippet}
  {#snippet b()}<Uebertrag code="320" ber={ek.e320} spalte="b" minus label="22.1 Krankheitskosten, Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="22.2" label="Gemeinnützige Zuwendungen" code="324" wl={19}>
  {#snippet unter()}<Verweis ziel="zuwendungen">Aufstellung Zuwendungen</Verweis>{/snippet}
  {#snippet s()}<Uebertrag code="324" ber={ek.e324} minus label="22.2 Zuwendungen, Staatssteuer" />{/snippet}
  {#snippet b()}<Uebertrag code="324" ber={ek.e324} spalte="b" minus label="22.2 Zuwendungen, Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="23." label="Reineinkommen (Ziffer 21 abzüglich Ziffern 22.1 und 22.2)" code="350" stark>
  {#snippet s()}<Wert wert={ek.e350.s} stark label="23. Reineinkommen, Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={ek.e350.b} stark label="23. Reineinkommen, Bundessteuer" />{/snippet}
</Zeile>

<h3 class="uf-h3">24. Steuerfreie Beträge (Sozialabzüge)</h3>
<Zeile ziffer="24.1" label="Abzug für Kinder in deinem Haushalt" code="370" wl={20}>
  {#snippet unter()}<span class="uf-leise">pro Kind <Z k="kinderabzug" /> bzw. <Z k="kinderabzug" e="bund" />, aus den Angaben auf Seite 1</span>{/snippet}
  {#snippet s()}<Uebertrag code="370" ber={ek.e370} minus label="24.1 Kinder im Haushalt, Staatssteuer" />{/snippet}
  {#snippet b()}<Uebertrag code="370" ber={ek.e370} spalte="b" minus label="24.1 Kinder im Haushalt, Bundessteuer" />{/snippet}
</Zeile>
<Zeile label="Abzug für Kinder ausserhalb deines Haushaltes" code="372">
  {#snippet s()}<Uebertrag code="372" ber={ek.e372} minus label="24.1 Kinder ausserhalb, Staatssteuer" />{/snippet}
  {#snippet b()}<Uebertrag code="372" ber={ek.e372} spalte="b" minus label="24.1 Kinder ausserhalb, Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="24.2" label="Abzug für unterstützte Personen" code="374" wl={21}>
  {#snippet unter()}<span class="uf-leise">pro Person <Z k="unterstuetzungsabzug" /> bzw. <Z k="unterstuetzungsabzug" e="bund" /></span>{/snippet}
  {#snippet s()}<Uebertrag code="374" ber={ek.e374} minus label="24.2 Unterstützte Personen, Staatssteuer" />{/snippet}
  {#snippet b()}<Uebertrag code="374" ber={ek.e374} spalte="b" minus label="24.2 Unterstützte Personen, Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="24.3" label="Abzug für Ehegatten (nur Bundessteuer)" code="365" wl={21}>
  {#snippet s()}<span class="uf-strich">—</span>{/snippet}
  {#snippet b()}<Wert wert={ek.e365} minus label="24.3 Verheiratetenabzug" />{/snippet}
</Zeile>
<Zeile ziffer="25." label="Steuerbares Einkommen gesamt" code="390" stark>
  {#snippet s()}<Wert wert={ek.e390.s} stark label="25. Steuerbares Einkommen, Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={ek.e390.b} stark label="25. Steuerbares Einkommen, Bundessteuer" />{/snippet}
</Zeile>

<h3 class="uf-h3">26. Vom steuerbaren Einkommen gemäss Ziffer 25 entfallen</h3>
<Zeile ziffer="26.1" label="auf steuerbare Einkünfte in anderen Kantonen" code="394">
  {#snippet s()}<Feld bind:wert={a.a394s} label="26.1 andere Kantone" />{/snippet}
</Zeile>
<Zeile ziffer="26.2" label="auf steuerbare Einkünfte im Ausland" code="396">
  {#snippet s()}<Feld bind:wert={a.a396s} label="26.2 Ausland, Staatssteuer" />{/snippet}
  {#snippet b()}<Feld bind:wert={a.a396b} label="26.2 Ausland, Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="27." label="Steuerbares Einkommen im Kanton Zürich bzw. in der Schweiz" code="398" stark>
  {#snippet s()}<Wert wert={ek.e398.s} stark label="27. Steuerbares Einkommen im Kanton, Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={ek.e398.b} stark label="27. Steuerbares Einkommen in der Schweiz, Bundessteuer" />{/snippet}
</Zeile>
{#if !vh}<p class="uf-text uf-leise">Der Abzug für Ehegatten (24.3) gilt nur für Verheiratete in ungetrennter Ehe.</p>{/if}
