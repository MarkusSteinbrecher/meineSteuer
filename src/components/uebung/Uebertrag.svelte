<script lang="ts">
  import { speicher } from '../../lib/uebung/speicher.svelte';
  import type { Spalten } from '../../lib/uebung/zh2025';
  import Feld from './Feld.svelte';
  import Wert from './Wert.svelte';
  import Icon from './Icon.svelte';
  /**
   * A value transferred from a supplementary form. It can be replaced by hand (exercise gives
   * only the result); the replacement is stored per field code and can be reset.
   * Renders the cell for one column: `spalte` 's' or 'b'. Column 's' carries the edit button.
   */
  let { code, ber, spalte = 's', label, minus = false }: { code: string; ber: Spalten | number; spalte?: 's' | 'b'; label: string; minus?: boolean } = $props();
  const ue = $derived(speicher.fall.ueberschrieben[code]);
  const berechnet = $derived(typeof ber === 'number' ? ber : ber[spalte]);
  const einspaltig = $derived(typeof ber === 'number');
  function ueberschreiben() {
    const b = typeof ber === 'number' ? { s: ber, b: ber } : ber;
    speicher.fall.ueberschrieben[code] = { s: b.s, b: einspaltig ? null : b.b };
  }
  function zuruecksetzen() {
    delete speicher.fall.ueberschrieben[code];
  }
</script>

{#if ue}
  <span class="uf-ueber">
    {#if spalte === 's'}
      <button type="button" class="uf-knopf" title="Berechneten Wert wieder verwenden" aria-label={`${label}: berechneten Wert wieder verwenden`} onclick={zuruecksetzen}><Icon name="x" /></button>
    {/if}
    <Feld bind:wert={ue[spalte]} label={`${label}, von Hand`} />
  </span>
{:else}
  <span class="uf-ueber">
    {#if spalte === 's'}
      <button type="button" class="uf-knopf" title="Wert von Hand eintragen" aria-label={`${label}: Wert von Hand eintragen`} onclick={ueberschreiben}><Icon name="pencil" /></button>
    {/if}
    <Wert wert={berechnet} {label} {minus} />
  </span>
{/if}
