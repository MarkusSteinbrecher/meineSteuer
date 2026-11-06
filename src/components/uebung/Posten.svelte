<script lang="ts">
  import { neueId, type Posten } from '../../lib/uebung/zh2025';
  import Feld from './Feld.svelte';
  import Icon from './Icon.svelte';
  /** Simple list of entries (description, amount) for an «Aufstellung». */
  let { liste, titel, neuText }: { liste: Posten[]; titel: string; neuText: string } = $props();
</script>

{#if liste.length}
  <div class="uf-tabelle-rahmen">
    <table class="uf-tabelle">
      <thead><tr><th>{titel}</th><th data-num>CHF</th><th></th></tr></thead>
      <tbody>
        {#each liste as p, i (p.id)}
          <tr>
            <td><input type="text" aria-label={titel} bind:value={p.bezeichnung} /></td>
            <td class="uf-zahl-zelle"><Feld bind:wert={p.betrag} label="Betrag" /></td>
            <td><button type="button" class="uf-knopf" aria-label="Zeile entfernen" onclick={() => liste.splice(i, 1)}><Icon name="trash-2" /></button></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
<div class="uf-reihe"><button type="button" data-size="sm" onclick={() => liste.push({ id: neueId(), bezeichnung: '', betrag: null })}><Icon name="plus" />{neuText}</button></div>
