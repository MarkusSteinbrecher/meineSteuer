<script lang="ts">
  import { speicher } from '../../lib/uebung/speicher.svelte';
  import { neueId, istVerheiratet, type Person } from '../../lib/uebung/zh2025';
  import Feld from './Feld.svelte';
  import Icon from './Icon.svelte';
  import Z from './Z.svelte';
  import WL from './WL.svelte';
  const f = $derived(speicher.fall);
  const vh = $derived(istVerheiratet(f));

  function kindNeu(imHaushalt: boolean) {
    f.kinder.push({ id: neueId(), name: '', geburtsdatum: '', imHaushalt, ausbildung: '', bis: '', anteil: 'ganz', alimente: null, betreuungskosten: null });
  }
  function unterstNeu(imHaushalt: boolean) {
    f.unterstuetzte.push({ id: neueId(), name: '', geburtsjahr: '', imHaushalt, adresse: '', betrag: null });
  }
  const personen = $derived<[string, Person][]>(vh ? [['Person 1', f.personalien.p1], ['Person 2', f.personalien.p2]] : [['Person 1', f.personalien.p1]]);
</script>

<p class="uf-intro">Seite 1 des Formulars 300: Personalien, Berufs- und Familienverhältnisse am 31. Dezember 2025. Diese Angaben steuern die Sozialabzüge, die Höchstbeträge für Versicherungsprämien und Säule 3a und den Tarif der Bundessteuer.</p>

<div class="uf-raster">
  <label class="sd-field">
    <span class="sd-field__label">Zivilstand</span>
    <select bind:value={f.personalien.zivilstand}>
      <option value="ledig">ledig</option>
      <option value="verheiratet">verheiratet / eingetragene Partnerschaft</option>
      <option value="getrennt">getrennt</option>
      <option value="geschieden">geschieden</option>
      <option value="verwitwet">verwitwet</option>
    </select>
    <span class="sd-field__help">Massgebend sind die Verhältnisse am 31. Dezember 2025.</span>
  </label>
  <label class="sd-field">
    <span class="sd-field__label">Wohngemeinde</span>
    <input type="text" bind:value={f.personalien.gemeinde} />
  </label>
</div>

<div class="uf-personen" data-anzahl={personen.length}>
  {#each personen as [titel, p]}
    <fieldset class="uf-gruppe">
      <legend>{titel}</legend>
      <label class="sd-field"><span class="sd-field__label">Vorname</span><input type="text" bind:value={p.vorname} /></label>
      <label class="sd-field"><span class="sd-field__label">Name</span><input type="text" bind:value={p.name} /></label>
      <label class="sd-field"><span class="sd-field__label">Geburtsdatum</span><input type="text" placeholder="TT.MM.JJJJ" bind:value={p.geburtsdatum} /></label>
      <label class="sd-field"><span class="sd-field__label">Konfession</span><input type="text" bind:value={p.konfession} /></label>
      <label class="sd-field"><span class="sd-field__label">Beruf</span><input type="text" bind:value={p.beruf} /></label>
      <div class="sd-field" role="radiogroup" aria-label={`${titel}: Ordentliche Beiträge an die Pensionskasse`}>
        <span class="sd-field__label">Ordentliche Beiträge an die Pensionskasse (2. Säule)?</span>
        <div class="uf-reihe">
          <label class="sd-check"><input type="radio" value={true} bind:group={p.pk} /><span class="sd-check__text">ja</span></label>
          <label class="sd-check"><input type="radio" value={false} bind:group={p.pk} /><span class="sd-check__text">nein</span></label>
        </div>
      </div>
    </fieldset>
  {/each}
</div>

<h3 class="uf-h3">Kinder<WL s={20} /></h3>
<p class="uf-text">Kinder der Jahrgänge 2008–2025 oder Kinder in beruflicher Erstausbildung, deren Unterhalt du bestreitest. Abzug pro Kind: Staatssteuer <Z k="kinderabzug" />, Bundessteuer <Z k="kinderabzug" e="bund" />. Kosten der Drittbetreuung (Ziffer 16.6) gelten für Kinder im Haushalt, Jahrgänge 2011–2025, höchstens <Z k="kinderdrittbetreuung_max" /> bzw. <Z k="kinderdrittbetreuung_max" e="bund" /> pro Kind.</p>

{#if f.kinder.length}
  <div class="uf-tabelle-rahmen">
    <table class="uf-tabelle">
      <thead>
        <tr><th>Vorname, Name</th><th>Geburtsdatum</th><th>Wo</th><th>Schule oder Lehrfirma</th><th>bis</th><th>Kinderabzug</th><th>Anderer Elternteil zahlt Unterhalt?</th><th data-num>Drittbetreuung CHF</th><th></th></tr>
      </thead>
      <tbody>
        {#each f.kinder as k, i (k.id)}
          <tr>
            <td><input type="text" aria-label="Vorname, Name" bind:value={k.name} /></td>
            <td><input type="text" aria-label="Geburtsdatum" placeholder="TT.MM.JJJJ" bind:value={k.geburtsdatum} /></td>
            <td>
              <select aria-label="Wohnt im Haushalt" bind:value={k.imHaushalt}>
                <option value={true}>im Haushalt</option>
                <option value={false}>ausserhalb</option>
              </select>
            </td>
            <td><input type="text" aria-label="Schule oder Lehrfirma" bind:value={k.ausbildung} /></td>
            <td><input type="text" aria-label="Voraussichtlich bis" bind:value={k.bis} /></td>
            <td>
              <select aria-label="Kinderabzug" bind:value={k.anteil}>
                <option value="ganz">ganz</option>
                <option value="halb">halb</option>
                <option value="kein">kein Abzug</option>
              </select>
            </td>
            <td>
              <select aria-label="Leistet der andere Elternteil Unterhaltsbeiträge?" bind:value={k.alimente}>
                <option value={null}>–</option>
                <option value={true}>ja</option>
                <option value={false}>nein</option>
              </select>
            </td>
            <td>{#if k.imHaushalt}<Feld bind:wert={k.betreuungskosten} label="Kosten der Drittbetreuung" />{/if}</td>
            <td><button type="button" class="uf-knopf" aria-label="Kind entfernen" onclick={() => f.kinder.splice(i, 1)}><Icon name="trash-2" /></button></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
<div class="uf-reihe">
  <button type="button" data-size="sm" onclick={() => kindNeu(true)}><Icon name="plus" />Kind im Haushalt</button>
  <button type="button" data-size="sm" onclick={() => kindNeu(false)}><Icon name="plus" />Kind ausserhalb</button>
</div>
<p class="uf-text uf-leise">«Halb» gilt zum Beispiel für Eltern im Konkubinat mit gemeinsamer elterlicher Sorge. «Kein Abzug» gilt zum Beispiel, wenn du für das Kind Unterhaltsbeiträge zahlst und abziehst.</p>

<h3 class="uf-h3">Unterstützte Personen<WL s={21} /></h3>
<p class="uf-text">Erwerbsunfähige oder beschränkt erwerbsfähige Personen, ohne Ehegatten und ohne die oben aufgeführten Kinder. Der Abzug setzt eine Unterstützung von mindestens <Z k="unterstuetzungsabzug" /> (Staatssteuer) bzw. <Z k="unterstuetzungsabzug" e="bund" /> (Bundessteuer) voraus.</p>
{#if f.unterstuetzte.length}
  <div class="uf-tabelle-rahmen">
    <table class="uf-tabelle">
      <thead><tr><th>Vorname, Name</th><th>Geburtsjahr</th><th>Wo</th><th>Adresse</th><th data-num>Unterstützung pro Jahr CHF</th><th></th></tr></thead>
      <tbody>
        {#each f.unterstuetzte as u, i (u.id)}
          <tr>
            <td><input type="text" aria-label="Vorname, Name" bind:value={u.name} /></td>
            <td><input type="text" aria-label="Geburtsjahr" bind:value={u.geburtsjahr} /></td>
            <td>
              <select aria-label="Wohnt im Haushalt" bind:value={u.imHaushalt}>
                <option value={true}>im Haushalt</option>
                <option value={false}>ausserhalb</option>
              </select>
            </td>
            <td><input type="text" aria-label="Adresse" bind:value={u.adresse} /></td>
            <td><Feld bind:wert={u.betrag} label="Unterstützungsbetrag pro Jahr" /></td>
            <td><button type="button" class="uf-knopf" aria-label="Person entfernen" onclick={() => f.unterstuetzte.splice(i, 1)}><Icon name="trash-2" /></button></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
<div class="uf-reihe">
  <button type="button" data-size="sm" onclick={() => unterstNeu(true)}><Icon name="plus" />Unterstützte Person</button>
</div>
