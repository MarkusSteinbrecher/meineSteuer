<script lang="ts">
  import { speicher } from '../../lib/uebung/speicher.svelte';
  import { neueId, istVerheiratet, type Ergebnis } from '../../lib/uebung/zh2025';
  import { chf } from './kontext';
  import Feld from './Feld.svelte';
  import Wert from './Wert.svelte';
  import Zeile from './Zeile.svelte';
  import Icon from './Icon.svelte';
  import WL from './WL.svelte';
  import Z from './Z.svelte';

  let { r, person = 0 }: { r: Ergebnis; person?: 0 | 1 } = $props();
  const f = $derived(speicher.fall);
  const vh = $derived(istVerheiratet(f));
  const ba = $derived(f.berufsauslagen[person]);
  const rb = $derived(r.ba[person]);
  // Field codes of form 360: person 1 = 2xx, person 2 = 22x/23x/24x.
  const c = $derived(person === 0
    ? { abo: '201', velo: '202', auto: '204', zw: '205', vv: '206', vl: '208', sch: '210', up: '212', ue: '213', wo: '2860', np: '216', ne: '217', tot: '220' }
    : { abo: '221', velo: '222', auto: '224', zw: '225', vv: '226', vl: '228', sch: '230', up: '232', ue: '233', wo: '2861', np: '236', ne: '237', tot: '240' });
  const nettolohn = $derived(person === 0 ? f.einkuenfte.e100 : f.einkuenfte.e101);
  const nebenerwerb = $derived(person === 0 ? f.einkuenfte.e102 : f.einkuenfte.e103);
</script>

{#if person === 1 && !vh}
  <p class="uf-intro">Das Formular für Person 2 gilt nur für Verheiratete. Stelle den Zivilstand unter «Personalien» auf «verheiratet».</p>
{:else if rb}
  <p class="uf-intro">Formular 360, Person {person + 1}. Die Pauschalen rechnet das Formular selbst. Die Begrenzung der Fahrkosten unterscheidet sich zwischen Staats- und Bundessteuer. <WL s={13} /></p>

  <div class="uf-raster">
    <label class="sd-field"><span class="sd-field__label">Arbeitgeber</span><input type="text" bind:value={ba.arbeitgeber} /></label>
    <label class="sd-field"><span class="sd-field__label">Arbeitsort / Strasse</span><input type="text" bind:value={ba.arbeitsort} /></label>
  </div>

  <div class="uf-kopf" data-spalten="2"><span></span><span>Berufsauslagen 2025</span><span>Code</span><span>Staatssteuer</span><span>Bundessteuer</span></div>

  <h3 class="uf-h3">1. Fahrkosten zwischen Wohn- und Arbeitsstätte</h3>
  <Zeile ziffer="1.1" label="Abonnementskosten für öffentliche Verkehrsmittel" code={c.abo}>
    {#snippet s()}<Feld bind:wert={ba.abo} label="1.1 Abonnementskosten" />{/snippet}
    {#snippet b()}<Wert wert={ba.abo ?? 0} label="1.1 Bundessteuer" />{/snippet}
  </Zeile>
  <Zeile ziffer="1.2" label="Fahrrad, Kleinmotorrad (gelbes Kontrollschild), pauschal" code={c.velo}>
    {#snippet unter()}<label class="sd-check"><input type="checkbox" bind:checked={ba.velo} /><span class="sd-check__text">Pauschale <Z k="velo_pauschal" /> beanspruchen</span></label>{/snippet}
    {#snippet s()}<Wert wert={rb.velo} label="1.2 Velo" />{/snippet}
    {#snippet b()}<Wert wert={rb.velo} label="1.2 Velo Bundessteuer" />{/snippet}
  </Zeile>
  <Zeile ziffer="1.3" label="Auto, Motorrad (weisses Kontrollschild), in der Regel höchstens 240 Arbeitstage" code={c.auto}>
    {#snippet unter()}
      <span class="uf-leise">Auto <Z k="auto_km" /> pro km, Motorrad <Z k="motorrad_km" /> pro km. Anzahl km = einfacher Arbeitsweg, Fahrten pro Tag in der Regel 2.</span>
      {#if ba.fahrten.length}
        <div class="uf-tabelle-rahmen"><table class="uf-tabelle uf-tabelle--eng">
          <thead><tr><th>Arbeitsort</th><th>Fahrzeug</th><th data-num>Arbeitstage</th><th data-num>km</th><th data-num>Fahrten/Tag</th><th data-num>km/Jahr</th><th data-num>Abzug</th><th></th></tr></thead>
          <tbody>
            {#each ba.fahrten as fa, i (fa.id)}
              <tr>
                <td><input type="text" class="uf-ort" aria-label="Arbeitsort" bind:value={fa.arbeitsort} /></td>
                <td><select class="uf-fahrzeug" aria-label="Fahrzeug" bind:value={fa.fahrzeug}><option value="auto">Auto</option><option value="motorrad">Motorrad</option></select></td>
                <td><Feld bind:wert={fa.tage} label="Arbeitstage" klein /></td>
                <td><Feld bind:wert={fa.km} label="Kilometer einfacher Weg" klein dezimal /></td>
                <td><Feld bind:wert={fa.fahrten} label="Fahrten pro Tag" klein /></td>
                <td data-num>{chf(rb.fahrten[i]?.kmJahr ?? 0)}</td>
                <td data-num>{chf(rb.fahrten[i]?.abzug ?? 0)}</td>
                <td><button type="button" class="uf-knopf" aria-label="Fahrt entfernen" onclick={() => ba.fahrten.splice(i, 1)}><Icon name="trash-2" /></button></td>
              </tr>
            {/each}
          </tbody>
        </table></div>
      {/if}
      <button type="button" data-size="sm" onclick={() => ba.fahrten.push({ id: neueId(), arbeitsort: '', tage: 220, km: null, fahrten: 2, fahrzeug: 'auto' })}><Icon name="plus" />Fahrt mit Auto oder Motorrad</button>
    {/snippet}
    {#snippet s()}<Wert wert={rb.auto} label="1.3 Auto/Motorrad" />{/snippet}
    {#snippet b()}<Wert wert={rb.auto} label="1.3 Bundessteuer" />{/snippet}
  </Zeile>
  <Zeile label="Zwischentotal Fahrkosten, begrenzt" code={c.zw} stark>
    {#snippet unter()}<span class="uf-leise">Staatssteuer höchstens <Z k="fahrkosten_max" />, Bundessteuer höchstens <Z k="fahrkosten_max" e="bund" /> (ungekürzt {chf(rb.fahrTotal)})</span>{/snippet}
    {#snippet s()}<Wert wert={rb.fahrt.s} stark label="Zwischentotal Fahrkosten Staatssteuer" />{/snippet}
    {#snippet b()}<Wert wert={rb.fahrt.b} stark label="Zwischentotal Fahrkosten Bundessteuer" />{/snippet}
  </Zeile>

  <h3 class="uf-h3">2. Mehrkosten der Verpflegung</h3>
  <Zeile ziffer="2.1" label="Auswärtige Verpflegung, wenn die Arbeitspause die Heimkehr nicht ermöglicht" code={ba.verpflegung === 'verbilligt' ? c.vv : c.vl}>
    {#snippet unter()}
      <div class="uf-teile">
        <label class="sd-check"><input type="radio" value="keine" bind:group={ba.verpflegung} /><span class="sd-check__text">kein Abzug</span></label>
        <label class="sd-check"><input type="radio" value="verbilligt" bind:group={ba.verpflegung} /><span class="sd-check__text">vom Arbeitgeber verbilligt: <Z k="verpflegung_verbilligt_tag" /> pro Tag, höchstens <Z k="verpflegung_verbilligt_jahr" /></span></label>
        <label class="sd-check"><input type="radio" value="voll" bind:group={ba.verpflegung} /><span class="sd-check__text">voll selbst bezahlt: <Z k="verpflegung_tag" /> pro Tag, höchstens <Z k="verpflegung_jahr" /></span></label>
        {#if ba.verpflegung !== 'keine'}<span class="uf-rechnung">Arbeitstage <Feld bind:wert={ba.verpflegungTage} label="Arbeitstage mit auswärtiger Verpflegung" klein /></span>{/if}
      </div>
    {/snippet}
    {#snippet s()}<Wert wert={rb.verpflegung} label="2.1 Verpflegung" />{/snippet}
    {#snippet b()}<Wert wert={rb.verpflegung} label="2.1 Bundessteuer" />{/snippet}
  </Zeile>
  <Zeile ziffer="2.2" label="Durchgehende, mindestens achtstündige Schicht- oder Nachtarbeit" code={c.sch}>
    {#snippet unter()}<span class="uf-rechnung">Schichttage <Feld bind:wert={ba.schichtTage} label="Anzahl Schichttage" klein /> × <Z k="verpflegung_tag" />, höchstens <Z k="verpflegung_jahr" /></span>{/snippet}
    {#snippet s()}<Wert wert={rb.schicht} label="2.2 Schichtarbeit" />{/snippet}
    {#snippet b()}<Wert wert={rb.schicht} label="2.2 Bundessteuer" />{/snippet}
  </Zeile>

  <h3 class="uf-h3">3. Übrige für die Ausübung des Berufes erforderliche Kosten</h3>
  <Zeile ziffer="3." label="Berufskleider, Werkzeuge, Fachliteratur, Arbeitszimmer usw." code={ba.uebrige === 'pauschal' ? c.up : c.ue}>
    {#snippet unter()}
      <div class="uf-teile">
        <label class="sd-check"><input type="radio" value="pauschal" bind:group={ba.uebrige} /><span class="sd-check__text">pauschal <Z k="uebrige_berufskosten_satz" p /> des Nettolohns ({chf(nettolohn ?? 0)} aus Ziffer 1.1), mindestens <Z k="uebrige_berufskosten_min" />, höchstens <Z k="uebrige_berufskosten_max" /></span></label>
        <label class="sd-check"><input type="radio" value="effektiv" bind:group={ba.uebrige} /><span class="sd-check__text">effektiv gemäss Aufstellung</span></label>
        {#if ba.uebrige === 'effektiv'}<span class="uf-rechnung">effektive Kosten <Feld bind:wert={ba.uebrigeEffektiv} label="Übrige Berufskosten effektiv" klein /></span>{/if}
      </div>
    {/snippet}
    {#snippet s()}<Wert wert={rb.uebrige} label="3. Übrige Berufskosten" />{/snippet}
    {#snippet b()}<Wert wert={rb.uebrige} label="3. Bundessteuer" />{/snippet}
  </Zeile>

  <Zeile ziffer="4." label="Mehrkosten bei auswärtigem Wochenaufenthalt (gemäss Aufstellung)" code={c.wo} wl={14}>
    {#snippet s()}<Feld bind:wert={ba.wochenaufenthalt} label="4. Wochenaufenthalt" />{/snippet}
    {#snippet b()}<Wert wert={rb.wochenaufenthalt} label="4. Bundessteuer" />{/snippet}
  </Zeile>

  <Zeile ziffer="5." label="Auslagen bei Nebenerwerb" code={ba.nebenerwerb === 'pauschal' ? c.np : c.ne}>
    {#snippet unter()}
      <div class="uf-teile">
        <label class="sd-check"><input type="radio" value="pauschal" bind:group={ba.nebenerwerb} /><span class="sd-check__text">pauschal <Z k="nebenerwerb_satz" p /> der Einkünfte aus Nebenerwerb ({chf(nebenerwerb ?? 0)} aus Ziffer 1.2), mindestens <Z k="nebenerwerb_min" />, höchstens <Z k="nebenerwerb_max" /></span></label>
        <label class="sd-check"><input type="radio" value="effektiv" bind:group={ba.nebenerwerb} /><span class="sd-check__text">effektiv gemäss Aufstellung</span></label>
        {#if ba.nebenerwerb === 'effektiv'}<span class="uf-rechnung">effektive Auslagen <Feld bind:wert={ba.nebenerwerbEffektiv} label="Auslagen Nebenerwerb effektiv" klein /></span>{/if}
      </div>
    {/snippet}
    {#snippet s()}<Wert wert={rb.neben} label="5. Nebenerwerb" />{/snippet}
    {#snippet b()}<Wert wert={rb.neben} label="5. Bundessteuer" />{/snippet}
  </Zeile>

  <Zeile ziffer="6." label={`Total der Berufsauslagen (in die Steuererklärung Ziffer 11.${person + 1})`} code={c.tot} stark>
    {#snippet s()}<Wert wert={rb.total.s} stark label="6. Total Staatssteuer" />{/snippet}
    {#snippet b()}<Wert wert={rb.total.b} stark label="6. Total Bundessteuer" />{/snippet}
  </Zeile>

  <h3 class="uf-h3">7. Begründung für das private Motorfahrzeug</h3>
  <div class="uf-teile">
    <label class="sd-check"><input type="checkbox" bind:checked={ba.begruendung.fehlt} /><span class="sd-check__text">Fehlen eines öffentlichen Verkehrsmittels</span></label>
    <label class="sd-check"><input type="checkbox" bind:checked={ba.begruendung.zeit} /><span class="sd-check__text">Zeitersparnis von über einer Stunde pro Tag</span></label>
    <label class="sd-check"><input type="checkbox" bind:checked={ba.begruendung.arbeitgeber} /><span class="sd-check__text">Ständige Benützung während der Arbeitszeit auf Verlangen und gegen Entschädigung des Arbeitgebers</span></label>
    <label class="sd-check"><input type="checkbox" bind:checked={ba.begruendung.krankheit} /><span class="sd-check__text">Öffentliches Verkehrsmittel wegen Krankheit oder Gebrechlichkeit nicht benutzbar (Arztzeugnis)</span></label>
  </div>
  <p class="uf-text uf-leise">Wer ein Geschäftsfahrzeug hat, kann keine Fahrkosten abziehen.</p>
{/if}
