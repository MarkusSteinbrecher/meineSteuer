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
  const v = $derived(f.versicherung);
  const vh = $derived(istVerheiratet(f));
  const rv = $derived(r.versicherung);
</script>

<p class="uf-intro">Formular 365. Teil A sind die bezahlten Prämien und Sparzinsen. Teil B ist der Höchstbetrag. Abziehbar ist der tiefere der beiden Beträge (Teil C). <WL s={15} /></p>

<h3 class="uf-h3">A. Bezahlte Versicherungsprämien und Zinsen von Sparkapitalien</h3>
<Zeile spalten={1} ziffer="1." label="Private Krankenversicherungsprämien (nach Abzug der Prämienverbilligung)" code="601">{#snippet wert()}<Feld bind:wert={v.v601} label="Krankenversicherungsprämien" />{/snippet}</Zeile>
<Zeile spalten={1} ziffer="2." label="Private Unfallversicherungsprämien" code="602">{#snippet wert()}<Feld bind:wert={v.v602} label="Unfallversicherungsprämien" />{/snippet}</Zeile>
<Zeile spalten={1} ziffer="3." label="Private Lebens- und Rentenversicherungsprämien (ohne Säule 3a)" code="603">{#snippet wert()}<Feld bind:wert={v.v603} label="Lebens- und Rentenversicherungsprämien" />{/snippet}</Zeile>
<Zeile spalten={1} ziffer="4." label="Zinsen von Sparkapitalien (gemäss Wertschriftenverzeichnis)" code="604">{#snippet wert()}<Feld bind:wert={v.v604} label="Zinsen von Sparkapitalien" />{/snippet}</Zeile>
<Zeile spalten={1} ziffer="6." label="Abzüglich erhaltene Prämienverbilligungen (soweit nicht schon unter 1. berücksichtigt)" code="605">{#snippet wert()}<Feld bind:wert={v.v605} label="Prämienverbilligung" />{/snippet}</Zeile>
<Zeile spalten={1} label="Total bezahlte Versicherungsprämien und Zinsen von Sparkapitalien (A)" code="606" stark>{#snippet wert()}<Wert wert={rv.a} stark label="Total A" />{/snippet}</Zeile>

<h3 class="uf-h3">B. Maximaler Abzug</h3>
<div class="uf-kopf" data-spalten="2"><span></span><span></span><span>Code</span><span>Staatssteuer</span><span>Bundessteuer</span></div>
<Zeile ziffer={vh ? '1.' : '2.'} label={vh ? 'Verheiratete' : 'Übrige Steuerpflichtige'} code={vh ? '611' : '612'}>
  {#snippet unter()}<span class="uf-leise">{rv.mitVorsorge ? 'mit Beiträgen an die 2. Säule oder die Säule 3a' : 'ohne Beiträge an die 2. Säule und die Säule 3a: Abzug um die Hälfte höher'} (aus den Personalien und Ziffer 14)</span>{/snippet}
  {#snippet s()}<Wert wert={rv.grund.s} label="Grundbetrag Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={rv.grund.b} label="Grundbetrag Bundessteuer" />{/snippet}
</Zeile>
<Zeile ziffer="3." label="Zusätzlicher Abzug für Kinder" code="613">
  {#snippet unter()}<span class="uf-leise">pro Kind <Z k="versicherung_pro_kind" /> bzw. <Z k="versicherung_pro_kind" e="bund" />, bei halbem Kinderabzug die Hälfte</span>{/snippet}
  {#snippet s()}<Wert wert={rv.kinder.s} label="Kinder Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={rv.kinder.b} label="Kinder Bundessteuer" />{/snippet}
</Zeile>
<Zeile label="Zusätzlicher Abzug für unterstützungsbedürftige Personen" code="614 / 615">
  {#snippet unter()}<span class="uf-leise">pro Person <Z k="versicherung_pro_unterstuetzt" /> bzw. <Z k="versicherung_pro_unterstuetzt" e="bund" /></span>{/snippet}
  {#snippet s()}<Wert wert={rv.unterst.s} label="Unterstützte Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={rv.unterst.b} label="Unterstützte Bundessteuer" />{/snippet}
</Zeile>
<Zeile label="Total der Abzüge für Versicherungsprämien und Zinsen von Sparkapitalien (B)" code="616" stark>
  {#snippet s()}<Wert wert={rv.b.s} stark label="Total B Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={rv.b.b} stark label="Total B Bundessteuer" />{/snippet}
</Zeile>

<h3 class="uf-h3">C. Abzug</h3>
<Zeile label="Der tiefere Betrag: A oder B (in die Steuererklärung Ziffer 15)" code="270" stark>
  {#snippet s()}<Wert wert={rv.c.s} stark label="Abzug Staatssteuer" />{/snippet}
  {#snippet b()}<Wert wert={rv.c.b} stark label="Abzug Bundessteuer" />{/snippet}
</Zeile>
