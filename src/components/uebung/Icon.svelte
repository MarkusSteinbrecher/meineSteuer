<script lang="ts">
  import { pfad } from '../../lib/site';
  /** Lucide icon from the vendored SteinerDesign assets (same as Icon.astro). */
  let { name }: { name: string } = $props();
  const url = $derived(pfad(`vendor/steinerdesign/assets/icons/${name}.svg`).replace(/\/$/, ''));
</script>

<span class="icon sd-icon" aria-hidden="true" style={`--icon-url: url("${url}")`}></span>
