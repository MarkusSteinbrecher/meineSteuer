<script lang="ts">
  import { umgebung } from './kontext';
  /** Link to a page of the official Wegleitung zur Steuererklärung 2025 (PDF). */
  let { s }: { s: number } = $props();
  const { wegleitung } = umgebung();
</script>

<a class="uf-wl" href={`${wegleitung}#page=${s}`} target="_blank" rel="noopener" title={`Wegleitung zur Steuererklärung 2025, Seite ${s} (PDF)`}>Wegleitung S. {s}</a>
