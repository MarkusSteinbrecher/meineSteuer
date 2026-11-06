<script lang="ts">
  import type { Snippet } from 'svelte';
  import { umgebung } from './kontext';
  /**
   * One line of the form: Ziffer · label · field code · value cell(s).
   * `spalten` 2 = Staatssteuer and Bundessteuer, 1 = one value (income, wealth).
   */
  let {
    ziffer = '', label, code = '', wl, spalten = 2, stark = false, s, b, wert, unter,
  }: {
    ziffer?: string; label: string; code?: string; wl?: number; spalten?: 1 | 2; stark?: boolean;
    s?: Snippet; b?: Snippet; wert?: Snippet; unter?: Snippet;
  } = $props();
  const { wegleitung } = umgebung();
</script>

<div class="uf-zeile" data-spalten={spalten} class:uf-zeile--stark={stark}>
  <span class="uf-ziffer">{ziffer}</span>
  <div class="uf-label">
    <span>{label}{#if wl}<a class="uf-wl" href={`${wegleitung}#page=${wl}`} target="_blank" rel="noopener" title={`Wegleitung zur Steuererklärung 2025, Seite ${wl}`}>Wegleitung S. {wl}</a>{/if}</span>
    {#if unter}<div class="uf-unter">{@render unter()}</div>{/if}
  </div>
  <span class="uf-code">{code}</span>
  {#if spalten === 2}
    <div class="uf-zelle">{#if s}{@render s()}{/if}</div>
    <div class="uf-zelle">{#if b}{@render b()}{/if}</div>
  {:else}
    <div class="uf-zelle">{#if wert}{@render wert()}{/if}</div>
  {/if}
</div>
