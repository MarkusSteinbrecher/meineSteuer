<script lang="ts">
  import { chf } from './kontext';
  /** Calculated amount, read-only. */
  let { wert, label = '', stark = false, minus = false }: { wert: number; label?: string; stark?: boolean; minus?: boolean } = $props();
</script>

<output class="uf-wert" class:uf-stark={stark} aria-label={label}>{minus && wert ? '– ' : ''}{chf(wert)}</output>
