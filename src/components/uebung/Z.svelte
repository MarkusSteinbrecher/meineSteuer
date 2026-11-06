<script lang="ts">
  import { umgebung, chf, chf2 } from './kontext';
  /** One figure from the data files, with level, year and source as tooltip. */
  let { k, e = 'zh', p = false }: { k: string; e?: 'zh' | 'bund'; p?: boolean } = $props();
  const { zahlen } = umgebung();
  const z = $derived(zahlen[e][k]);
</script>

{#if z}<span class="betrag" title={z.t}>{p ? `${z.w.toLocaleString('de-CH')} %` : Number.isInteger(z.w) ? `CHF ${chf(z.w)}` : `CHF ${chf2(z.w)}`}</span>{:else}<span class="betrag">?</span>{/if}
