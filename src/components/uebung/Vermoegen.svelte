<script lang="ts">
  import { speicher } from '../../lib/uebung/speicher.svelte';
  import { neueId, istVerheiratet, type Ergebnis } from '../../lib/uebung/zh2025';
  import Feld from './Feld.svelte';
  import Wert from './Wert.svelte';
  import Zeile from './Zeile.svelte';
  import Uebertrag from './Uebertrag.svelte';
  import Verweis from './Verweis.svelte';
  import Icon from './Icon.svelte';
  import WL from './WL.svelte';
  import Z from './Z.svelte';

  let { r }: { r: Ergebnis } = $props();
  const f = $derived(speicher.fall);
  const v = $derived(f.vermoegen);
  const vm = $derived(r.vermoegen);
  const vh = $derived(istVerheiratet(f));
</script>

<p class="uf-intro">Seite 4 des Formulars 300: Vermögen im In- und Ausland, Steuerwert am 31. Dezember 2025. Der Hausrat ist steuerfrei. Die steuerfreien Beträge von <Z k={vh ? 'vermoegen_minimum_verheiratet' : 'vermoegen_minimum_alleinstehend'} /> zieht das Steueramt bei der Steuerberechnung ab. Sie stehen nicht im Formular.</p>

<div class="uf-kopf" data-spalten="1"><span></span><span>Vermögen</span><span>Code</span><span>CHF</span></div>

<h3 class="uf-h3">30. Bewegliches Vermögen<WL s={22} /></h3>
<Zeile spalten={1} ziffer="30.1" label="Wertschriften und Guthaben" code="400">
  {#snippet unter()}<Verweis ziel="wertschriften">aus dem Wertschriftenverzeichnis</Verweis>{/snippet}
  {#snippet wert()}<Uebertrag code="400" ber={r.wv.steuerwert} label="30.1 Wertschriften und Guthaben" />{/snippet}
</Zeile>
<Zeile spalten={1} ziffer="30.2" label="Bargeld, Gold und andere Edelmetalle" code="404">{#snippet wert()}<Feld bind:wert={v.v404} label="30.2 Bargeld" />{/snippet}</Zeile>
<Zeile spalten={1} ziffer="30.3" label="Lebens- und Rentenversicherungen (Steuerwert gemäss Bescheinigung der Versicherung)" code="406">
  {#snippet unter()}
    {#if v.policen.length}
      <div class="uf-tabelle-rahmen"><table class="uf-tabelle uf-tabelle--eng">
        <thead><tr><th>Versicherungsgesellschaft</th><th>Abschlussjahr</th><th>Ablaufsjahr</th><th data-num>Steuerwert</th><th></th></tr></thead>
        <tbody>
          {#each v.policen as p, i (p.id)}
            <tr>
              <td><input type="text" aria-label="Versicherungsgesellschaft" bind:value={p.gesellschaft} /></td>
              <td><input type="text" aria-label="Abschlussjahr" bind:value={p.abschluss} /></td>
              <td><input type="text" aria-label="Ablaufsjahr" bind:value={p.ablauf} /></td>
              <td><Feld bind:wert={p.steuerwert} label="Steuerwert" /></td>
              <td><button type="button" class="uf-knopf" aria-label="Police entfernen" onclick={() => v.policen.splice(i, 1)}><Icon name="trash-2" /></button></td>
            </tr>
          {/each}
        </tbody>
      </table></div>
    {/if}
    <button type="button" data-size="sm" onclick={() => v.policen.push({ id: neueId(), gesellschaft: '', abschluss: '', ablauf: '', steuerwert: null })}><Icon name="plus" />Police</button>
    <span class="uf-leise">Policen der Säule 3a sind bis zur Fälligkeit steuerfrei.</span>
  {/snippet}
  {#snippet wert()}<Wert wert={vm.v406} label="30.3 Total Lebensversicherungen" />{/snippet}
</Zeile>
<Zeile spalten={1} ziffer="30.4" label="Motorfahrzeuge" code="412">
  {#snippet unter()}<span class="uf-rechnung">Kaufpreis <Feld bind:wert={v.fahrzeugKaufpreis} label="Kaufpreis" klein /> Kaufjahr <input type="text" class="uf-text-klein" aria-label="Kaufjahr" bind:value={v.fahrzeugKaufjahr} /></span><span class="uf-leise">Verkehrswert: in der Regel pro Jahr minus <Z k="fahrzeug_abschreibung" p /> des Restwerts.</span>{/snippet}
  {#snippet wert()}<Feld bind:wert={v.v412} label="30.4 Motorfahrzeuge" />{/snippet}
</Zeile>
<Zeile spalten={1} ziffer="30.5" label="Geschäfts- und Korporationsanteile" code="414">{#snippet wert()}<Feld bind:wert={v.v414} label="30.5" />{/snippet}</Zeile>
<Zeile spalten={1} ziffer="30.6" label="Übrige Vermögenswerte" code="416">
  {#snippet unter()}<input type="text" class="uf-text-klein" placeholder="nähere Bezeichnung" aria-label="Bezeichnung übrige Vermögenswerte" bind:value={v.v416Text} />{/snippet}
  {#snippet wert()}<Feld bind:wert={v.v416} label="30.6" />{/snippet}
</Zeile>

<h3 class="uf-h3">31. Liegenschaften<WL s={30} /></h3>
<Zeile spalten={1} ziffer="31.1" label="Zum Verkehrswert besteuert" code="421">
  {#snippet unter()}<Verweis ziel="liegenschaften">aus dem Liegenschaftenverzeichnis</Verweis>{/snippet}
  {#snippet wert()}<Uebertrag code="421" ber={r.lg.verkehrswert} label="31.1 Liegenschaften Verkehrswert" />{/snippet}
</Zeile>
<Zeile spalten={1} ziffer="31.2" label="Zum Ertragswert besteuert (Land- oder Forstwirtschaft)" code="422">
  {#snippet wert()}<Uebertrag code="422" ber={r.lg.ertragswert} label="31.2 Liegenschaften Ertragswert" />{/snippet}
</Zeile>
<Zeile spalten={1} ziffer="32." label="Eigenkapital Selbständigerwerbender ohne Geschäftswertschriften (Hilfsblatt A)" code="430">{#snippet wert()}<Feld bind:wert={v.v430} label="32. Eigenkapital" />{/snippet}</Zeile>
<Zeile spalten={1} ziffer="33." label="Total der Vermögenswerte" code="460" stark>{#snippet wert()}<Wert wert={vm.v460} stark label="33. Total der Vermögenswerte" />{/snippet}</Zeile>
<Zeile spalten={1} ziffer="34." label="Schulden" code="470">
  {#snippet unter()}<Verweis ziel="schulden">Schuldenverzeichnis</Verweis>{/snippet}
  {#snippet wert()}<Uebertrag code="470" ber={r.schulden.total} minus label="34. Schulden" />{/snippet}
</Zeile>
<Zeile spalten={1} ziffer="35." label="Steuerbares Vermögen gesamt" code="490" stark>{#snippet wert()}<Wert wert={vm.v490} stark label="35. Steuerbares Vermögen gesamt" />{/snippet}</Zeile>
<Zeile spalten={1} ziffer="36.1" label="davon in anderen Kantonen" code="494">{#snippet wert()}<Feld bind:wert={v.v494} label="36.1" />{/snippet}</Zeile>
<Zeile spalten={1} ziffer="36.2" label="davon im Ausland" code="496">{#snippet wert()}<Feld bind:wert={v.v496} label="36.2" />{/snippet}</Zeile>
<Zeile spalten={1} ziffer="37." label="Steuerbares Vermögen im Kanton Zürich" code="498" stark>{#snippet wert()}<Wert wert={vm.v498} stark label="37. Steuerbares Vermögen im Kanton Zürich" />{/snippet}</Zeile>

<h3 class="uf-h3">40. Kapitalleistungen<WL s={22} /></h3>
<p class="uf-text uf-leise">Kapitalleistungen aus Vorsorge (AHV/IV, 2. Säule, Freizügigkeit, Säule 3a) werden gesondert vom übrigen Einkommen besteuert. Sie zählen deshalb nicht zum Einkommen auf Seite 2.</p>
<Zeile spalten={1} ziffer="40." label="Kapitalleistung" code="510">
  {#snippet unter()}<span class="uf-rechnung"><input type="text" class="uf-text-klein" placeholder="Art (z.B. 2. Säule)" aria-label="Art der Kapitalleistung" bind:value={v.kapitalArt} /> ausbezahlt am <input type="text" class="uf-text-klein" placeholder="TT.MM.JJ" aria-label="Auszahlungsdatum" bind:value={v.kapitalDatum} /></span>{/snippet}
  {#snippet wert()}<Feld bind:wert={v.kapital} label="40. Kapitalleistung" />{/snippet}
</Zeile>

<h3 class="uf-h3">50. Schenkungen, Erbvorbezug, Erbschaften<WL s={23} /></h3>
<Zeile spalten={1} ziffer="50.1" label="2025 erhalten von" code="516">
  {#snippet unter()}<input type="text" class="uf-text-breit" placeholder="Datum, Name, Adresse, Verwandtschaftsgrad" aria-label="Schenkung erhalten von" bind:value={v.schenkungErhaltenText} />{/snippet}
  {#snippet wert()}<Feld bind:wert={v.schenkungErhalten} label="50.1 Wert" />{/snippet}
</Zeile>
<Zeile spalten={1} ziffer="50.2" label="2025 ausgerichtet an" code="519">
  {#snippet unter()}<input type="text" class="uf-text-breit" placeholder="Datum, Name, Adresse, Verwandtschaftsgrad" aria-label="Schenkung ausgerichtet an" bind:value={v.schenkungAusgerichtetText} />{/snippet}
  {#snippet wert()}<Feld bind:wert={v.schenkungAusgerichtet} label="50.2 Wert" />{/snippet}
</Zeile>
