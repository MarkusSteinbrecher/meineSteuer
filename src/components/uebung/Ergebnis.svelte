<script lang="ts">
  import type { Ergebnis, Abschnitt } from '../../lib/uebung/zh2025';
  import { chf, chf2, umgebung } from './kontext';
  import Icon from './Icon.svelte';
  import Z from './Z.svelte';

  let { r, titel }: { r: Ergebnis; titel: Record<Abschnitt, string> } = $props();
  const { links } = umgebung();
  const ek = $derived(r.einkommen);
  const st = $derived(r.steuer);
</script>

<p class="uf-intro">Die wichtigsten Zahlen des Falls und eine Prüfliste. Die Bundessteuer ist eine Schätzung nach dem Tarif 2025. Die Staats- und Gemeindesteuer rechnet das Formular nicht, weil Tarif und Steuerfüsse noch nicht erfasst sind.</p>

<div class="uf-tabelle-rahmen"><table class="uf-tabelle uf-ergebnis">
  <thead><tr><th></th><th>Code</th><th data-num>Staatssteuer</th><th data-num>Bundessteuer</th></tr></thead>
  <tbody>
    <tr><td>Total der Einkünfte (Ziffer 7)</td><td>199</td><td data-num>{chf(ek.e199)}</td><td data-num>{chf(ek.e199)}</td></tr>
    <tr><td>Total der Abzüge (Ziffer 18)</td><td>299</td><td data-num>{chf(ek.a299.s)}</td><td data-num>{chf(ek.a299.b)}</td></tr>
    <tr><td>Nettoeinkommen (Ziffer 21)</td><td>310</td><td data-num>{chf(ek.e310.s)}</td><td data-num>{chf(ek.e310.b)}</td></tr>
    <tr><td>Reineinkommen (Ziffer 23)</td><td>350</td><td data-num>{chf(ek.e350.s)}</td><td data-num>{chf(ek.e350.b)}</td></tr>
    <tr class="uf-stark-zeile"><td>Steuerbares Einkommen (Ziffer 25)</td><td>390</td><td data-num>{chf(ek.e390.s)}</td><td data-num>{chf(ek.e390.b)}</td></tr>
    <tr><td>Steuerbares Einkommen im Kanton bzw. in der Schweiz (Ziffer 27)</td><td>398</td><td data-num>{chf(ek.e398.s)}</td><td data-num>{chf(ek.e398.b)}</td></tr>
    <tr class="uf-stark-zeile"><td>Steuerbares Vermögen im Kanton Zürich (Ziffer 37)</td><td>498</td><td data-num>{chf(r.vermoegen.v498)}</td><td data-num>–</td></tr>
    <tr><td>Verrechnungssteueranspruch (Wertschriftenverzeichnis)</td><td>540</td><td colspan="2" data-num>{chf2(r.wv.vst)}</td></tr>
  </tbody>
</table></div>

<h3 class="uf-h3">Direkte Bundessteuer 2025 (Schätzung)</h3>
<dl class="uf-summen">
  <div><dt>Tarif</dt><dd>{st.tarifName === 'verheiratet' ? 'Verheiratete und Alleinerziehende (Art. 36 Abs. 2 DBG)' : 'Alleinstehende (Art. 36 Abs. 1 DBG)'}</dd></div>
  <div><dt>Steuer auf {chf(Math.floor(st.satzbestimmend / 100) * 100)} (auf volle 100 Franken abgerundet)</dt><dd>{chf2(st.steuerVoll)}</dd></div>
  {#if st.steuerAnteilig !== st.steuerVoll}<div><dt>Anteil Schweiz (Ziffer 27 im Verhältnis zu Ziffer 25)</dt><dd>{chf2(st.steuerAnteilig)}</dd></div>{/if}
  {#if st.elternAbzug}<div><dt>Abzug vom Steuerbetrag: {st.elternAnzahl.toLocaleString('de-CH')} × <Z k="elterntarif_pro_kind" e="bund" /> (Elterntarif)</dt><dd>– {chf2(st.elternAbzug)}</dd></div>{/if}
  <div class="uf-summe-stark"><dt>Direkte Bundessteuer</dt><dd>CHF {chf2(st.bund)}</dd></div>
</dl>
<p class="uf-text uf-leise">Vereinfachungen: Kapitalleistungen (Ziffer 40) werden gesondert besteuert und fehlen hier. Bei halbem Kinderabzug rechnet die Schätzung den halben Elterntarif. Die Staats- und Gemeindesteuer findest du mit dem <a href={links.steuerrechner} target="_blank" rel="noopener">Steuerrechner des Kantons Zürich</a>.</p>

<h3 class="uf-h3">Prüfliste</h3>
{#if r.hinweise.length}
  <ul class="uf-hinweise">
    {#each r.hinweise as h}
      <li data-ton={h.ton}>
        <Icon name={h.ton === 'warn' ? 'triangle-alert' : 'info'} />
        <span><a href={`#${h.ort}`}>{titel[h.ort]}</a>: {h.text}</span>
      </li>
    {/each}
  </ul>
{:else}
  <p class="uf-text">Keine Hinweise. Das heisst nur, dass die eingebauten Prüfungen nichts gefunden haben, nicht dass der Fall richtig gelöst ist.</p>
{/if}
