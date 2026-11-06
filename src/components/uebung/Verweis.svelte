<script lang="ts">
  import type { Snippet } from 'svelte';
  /** Link to another part of the form (hash navigation). */
  let { ziel, children }: { ziel: string; children: Snippet } = $props();
</script>

<a class="uf-verweis" href={`#${ziel}`}>{@render children()}</a>
