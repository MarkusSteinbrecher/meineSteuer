<script lang="ts">
  /** Amount input in whole francs (or with decimals), shown with Swiss thousands separators. */
  let { wert = $bindable(), label, dezimal = false, klein = false }: { wert: number | null; label: string; dezimal?: boolean; klein?: boolean } = $props();
  const format = (x: number | null) =>
    x === null || x === undefined ? '' : x.toLocaleString('de-CH', { maximumFractionDigits: dezimal ? 2 : 0 });
  let fokus = $state(false);
  let text = $state('');
  $effect(() => {
    if (!fokus) text = format(wert);
  });
  function eingabe(ev: Event & { currentTarget: HTMLInputElement }) {
    text = ev.currentTarget.value;
    const roh = text.replace(/['’\s]/g, '').replace(',', '.');
    if (roh === '' || roh === '-') { wert = null; return; }
    const x = Number(roh);
    if (Number.isFinite(x)) wert = dezimal ? Math.round(x * 100) / 100 : Math.round(x);
  }
</script>

<input
  class="uf-zahl"
  class:uf-klein={klein}
  type="text"
  inputmode="decimal"
  autocomplete="off"
  aria-label={label}
  value={text}
  oninput={eingabe}
  onfocus={() => (fokus = true)}
  onblur={() => { fokus = false; text = format(wert); }}
/>
