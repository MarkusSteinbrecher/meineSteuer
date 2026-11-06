<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { speicher } from '../../lib/uebung/speicher.svelte';
  import { berechnen, istVerheiratet, type Abschnitt, type Zahlen } from '../../lib/uebung/zh2025';
  import { beispielFall } from '../../lib/uebung/beispiel';
  import { umgebungSetzen } from './kontext';
  import Icon from './Icon.svelte';
  import Personalien from './Personalien.svelte';
  import Einkuenfte from './Einkuenfte.svelte';
  import Abzuege from './Abzuege.svelte';
  import Einkommen from './Einkommen.svelte';
  import Vermoegen from './Vermoegen.svelte';
  import Wertschriften from './Wertschriften.svelte';
  import Berufsauslagen from './Berufsauslagen.svelte';
  import Versicherung from './Versicherung.svelte';
  import Weiterbildung from './Weiterbildung.svelte';
  import Liegenschaften from './Liegenschaften.svelte';
  import Schulden from './Schulden.svelte';
  import Krankheit from './Krankheit.svelte';
  import Zuwendungen from './Zuwendungen.svelte';
  import Ergebnis from './Ergebnis.svelte';
  import { chf } from './kontext';

  let { zahlen, wegleitung, links }: { zahlen: Zahlen; wegleitung: string; links: Record<string, string> } = $props();
  umgebungSetzen({ zahlen, wegleitung, links });

  type Ziel = Abschnitt | 'berufsauslagen-2';
  const TITEL: Record<Abschnitt, string> = {
    personalien: 'Personalien', einkuenfte: 'Einkünfte', abzuege: 'Abzüge', einkommen: 'Einkommensberechnung', vermoegen: 'Vermögen',
    wertschriften: 'Wertschriften und Guthaben', berufsauslagen: 'Berufsauslagen', versicherung: 'Versicherungsprämien',
    weiterbildung: 'Aus- und Weiterbildung', liegenschaften: 'Liegenschaften', schulden: 'Schulden', krankheit: 'Krankheitskosten',
    zuwendungen: 'Gemeinnützige Zuwendungen', ergebnis: 'Ergebnis und Prüfliste',
  };
  const GRUPPEN: { titel: string; teile: { id: Ziel; label: string; zusatz?: string }[] }[] = [
    { titel: 'Steuererklärung (Formular 300)', teile: [
      { id: 'personalien', label: 'Personalien', zusatz: 'S. 1' },
      { id: 'einkuenfte', label: 'Einkünfte', zusatz: 'S. 2' },
      { id: 'abzuege', label: 'Abzüge', zusatz: 'S. 3' },
      { id: 'einkommen', label: 'Einkommensberechnung', zusatz: 'S. 3' },
      { id: 'vermoegen', label: 'Vermögen', zusatz: 'S. 4' },
    ] },
    { titel: 'Hilfsformulare', teile: [
      { id: 'wertschriften', label: 'Wertschriften', zusatz: '340' },
      { id: 'berufsauslagen', label: 'Berufsauslagen P1', zusatz: '360' },
      { id: 'berufsauslagen-2', label: 'Berufsauslagen P2', zusatz: '360' },
      { id: 'versicherung', label: 'Versicherungsprämien', zusatz: '365' },
      { id: 'weiterbildung', label: 'Aus- und Weiterbildung', zusatz: '367' },
      { id: 'liegenschaften', label: 'Liegenschaften', zusatz: '350' },
      { id: 'schulden', label: 'Schulden' },
      { id: 'krankheit', label: 'Krankheitskosten' },
      { id: 'zuwendungen', label: 'Zuwendungen' },
    ] },
    { titel: 'Auswertung', teile: [{ id: 'ergebnis', label: 'Ergebnis und Prüfliste' }] },
  ];
  const ZIELE = GRUPPEN.flatMap((g) => g.teile.map((t) => t.id));

  let bereit = $state(false);
  let ziel = $state<Ziel>('personalien');
  let druck = $state(false);
  let loeschenFragen = $state(false);
  let umbenennen = $state(false);
  let neuerName = $state('');
  let meldung = $state<string | null>(null);
  let dateiInput: HTMLInputElement;
  let inhalt: HTMLElement;

  const r = $derived(bereit ? berechnen(speicher.fall, zahlen) : null);
  const vh = $derived(bereit && istVerheiratet(speicher.fall));
  const anzahl = $derived.by(() => {
    const m = new Map<string, number>();
    for (const h of r?.hinweise ?? []) if (h.ton === 'warn') m.set(h.ort, (m.get(h.ort) ?? 0) + 1);
    return m;
  });

  function hashLesen() {
    const h = decodeURIComponent(location.hash.slice(1)) as Ziel;
    if (ZIELE.includes(h)) {
      ziel = h;
      inhalt?.scrollIntoView({ block: 'start' });
    }
  }

  onMount(() => {
    speicher.laden();
    bereit = true;
    hashLesen();
    window.addEventListener('hashchange', hashLesen);
    const nachDruck = () => (druck = false);
    window.addEventListener('afterprint', nachDruck);
    return () => {
      window.removeEventListener('hashchange', hashLesen);
      window.removeEventListener('afterprint', nachDruck);
    };
  });

  // Save shortly after every change (reads the whole state, so any edit triggers it).
  let timer: ReturnType<typeof setTimeout> | undefined;
  let letzterStand = '';
  $effect(() => {
    if (!bereit) return;
    const stand = JSON.stringify(speicher.faelle) + speicher.aktivId;
    if (stand === letzterStand) return;
    const erstes = letzterStand === '';
    letzterStand = stand;
    if (!erstes) speicher.beruehrt();
    clearTimeout(timer);
    timer = setTimeout(() => speicher.speichern(), 300);
  });

  function hinweiseFuer(id: Ziel) {
    if (!r || id === 'ergebnis') return [];
    const ort = id === 'berufsauslagen-2' ? 'berufsauslagen' : id;
    return r.hinweise.filter((h) => h.ort === ort);
  }

  function gehe(id: Ziel) {
    history.replaceState(null, '', `#${id}`);
    ziel = id;
    inhalt?.scrollIntoView({ block: 'start' });
  }

  async function drucken() {
    druck = true;
    await tick();
    window.print();
  }

  async function importieren(ev: Event & { currentTarget: HTMLInputElement }) {
    const datei = ev.currentTarget.files?.[0];
    ev.currentTarget.value = '';
    if (!datei) return;
    meldung = await speicher.importieren(datei);
    if (!meldung) gehe('personalien');
  }

  function beispiel() {
    speicher.neu('Beispielfall (erfunden)', beispielFall());
    gehe('ergebnis');
  }

  const datum = new Intl.DateTimeFormat('de-CH', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
</script>

{#if !bereit || !r}
  <p class="uf-intro">Formular wird geladen …</p>
{:else}
  <div class="uf-leiste" role="toolbar" aria-label="Übungsfälle">
    <label class="uf-fallwahl">
      <span class="sd-visually-hidden">Übungsfall</span>
      <select bind:value={speicher.aktivId} onchange={() => { loeschenFragen = false; umbenennen = false; }}>
        {#each speicher.faelle as e (e.id)}<option value={e.id}>{e.name}</option>{/each}
      </select>
    </label>
    {#if umbenennen}
      <form class="uf-reihe" onsubmit={(ev) => { ev.preventDefault(); speicher.umbenennen(neuerName); umbenennen = false; }}>
        <input type="text" aria-label="Neuer Name" bind:value={neuerName} />
        <button type="submit" data-size="sm" data-variant="primary">Speichern</button>
        <button type="button" data-size="sm" data-variant="ghost" onclick={() => (umbenennen = false)}>Abbrechen</button>
      </form>
    {:else}
      <button type="button" data-size="sm" onclick={() => { speicher.neu(); gehe('personalien'); }}><Icon name="plus" />Neuer Fall</button>
      <button type="button" data-size="sm" data-variant="ghost" onclick={() => { neuerName = speicher.aktiv.name; umbenennen = true; }}><Icon name="pencil" />Umbenennen</button>
      <button type="button" data-size="sm" data-variant="ghost" onclick={() => speicher.duplizieren()}><Icon name="copy" />Duplizieren</button>
      {#if loeschenFragen}
        <button type="button" data-size="sm" data-variant="danger" onclick={() => { speicher.loeschen(); loeschenFragen = false; }}>Wirklich löschen</button>
        <button type="button" data-size="sm" data-variant="ghost" onclick={() => (loeschenFragen = false)}>Abbrechen</button>
      {:else}
        <button type="button" data-size="sm" data-variant="ghost" onclick={() => (loeschenFragen = true)}><Icon name="trash-2" />Löschen</button>
      {/if}
    {/if}
    <span class="uf-leiste__ende">
      <button type="button" data-size="sm" data-variant="ghost" onclick={() => speicher.exportieren()} title="Fall als Datei auf deinem Computer speichern"><Icon name="download" />Exportieren</button>
      <button type="button" data-size="sm" data-variant="ghost" onclick={() => dateiInput.click()} title="Fall aus einer Datei laden"><Icon name="file-text" />Importieren</button>
      <input bind:this={dateiInput} type="file" accept="application/json,.json" hidden onchange={importieren} />
      <button type="button" data-size="sm" data-variant="ghost" onclick={drucken}><Icon name="printer" />Drucken</button>
    </span>
  </div>

  {#if !speicher.verfuegbar}
    <div class="sd-notice" data-tone="warn" role="alert"><Icon name="triangle-alert" /><div class="sd-notice__body"><span class="sd-notice__title">Speichern im Browser nicht möglich</span><span>Dein Browser lässt hier kein Speichern zu, zum Beispiel im privaten Fenster. Was du eingibst, ist beim Schliessen weg. Exportiere den Fall, bevor du die Seite verlässt.</span></div></div>
  {/if}
  {#if meldung}
    <div class="sd-notice" data-tone="bad" role="alert"><Icon name="circle-alert" /><div class="sd-notice__body"><span>{meldung}</span></div><button type="button" class="uf-knopf" aria-label="Meldung schliessen" onclick={() => (meldung = null)}><Icon name="x" /></button></div>
  {/if}

  <div class="uf-rahmen" class:uf-druck={druck}>
    <nav class="uf-nav" aria-label="Formularteile">
      {#each GRUPPEN as g}
        <span class="sd-sidenav__heading">{g.titel}</span>
        <ul class="sd-sidenav" role="list">
          {#each g.teile as t}
            {#if t.id !== 'berufsauslagen-2' || vh}
              <li><a class="sd-sidenav__link" href={`#${t.id}`} aria-current={ziel === t.id ? 'page' : undefined} onclick={(ev) => { ev.preventDefault(); gehe(t.id); }}>
                {t.label}
                {#if anzahl.get(t.id)}<span class="uf-zaehler" title="Hinweise">{anzahl.get(t.id)}</span>{:else if t.zusatz}<span class="sd-sidenav__count">{t.zusatz}</span>{/if}
              </a></li>
            {/if}
          {/each}
        </ul>
      {/each}
      <div class="uf-kurz">
        <span class="sd-sidenav__heading">Steuerbares Einkommen</span>
        <dl>
          <div><dt>Staatssteuer</dt><dd>{chf(r.einkommen.e390.s)}</dd></div>
          <div><dt>Bundessteuer</dt><dd>{chf(r.einkommen.e390.b)}</dd></div>
          <div><dt>Vermögen</dt><dd>{chf(r.vermoegen.v490)}</dd></div>
        </dl>
        <span class="uf-gespeichert">{speicher.verfuegbar ? (speicher.zuletztGespeichert ? `Im Browser gespeichert, ${datum.format(new Date(speicher.zuletztGespeichert))}` : 'Wird im Browser gespeichert') : 'Nicht gespeichert'}</span>
      </div>
    </nav>

    <div class="uf-inhalt" bind:this={inhalt}>
      {#if druck}
        <h2 class="uf-h2">{speicher.aktiv.name}</h2>
      {/if}
      {#each ZIELE as id}
        {#if druck ? (id !== 'berufsauslagen-2' || vh) : ziel === id}
          <section class="uf-teil" aria-labelledby={`t-${id}`}>
            <h2 class="uf-h2" id={`t-${id}`}>{id === 'berufsauslagen-2' ? 'Berufsauslagen Person 2' : id === 'berufsauslagen' ? 'Berufsauslagen Person 1' : TITEL[id]}</h2>
            {#if hinweiseFuer(id).length && !druck}
              <ul class="uf-hinweise uf-hinweise--oben">
                {#each hinweiseFuer(id) as h}<li data-ton={h.ton}><Icon name={h.ton === 'warn' ? 'triangle-alert' : 'info'} /><span>{h.text}</span></li>{/each}
              </ul>
            {/if}
            {#if id === 'personalien'}<Personalien />
            {:else if id === 'einkuenfte'}<Einkuenfte {r} />
            {:else if id === 'abzuege'}<Abzuege {r} />
            {:else if id === 'einkommen'}<Einkommen {r} />
            {:else if id === 'vermoegen'}<Vermoegen {r} />
            {:else if id === 'wertschriften'}<Wertschriften {r} />
            {:else if id === 'berufsauslagen'}<Berufsauslagen {r} person={0} />
            {:else if id === 'berufsauslagen-2'}<Berufsauslagen {r} person={1} />
            {:else if id === 'versicherung'}<Versicherung {r} />
            {:else if id === 'weiterbildung'}<Weiterbildung {r} />
            {:else if id === 'liegenschaften'}<Liegenschaften {r} />
            {:else if id === 'schulden'}<Schulden {r} />
            {:else if id === 'krankheit'}<Krankheit {r} />
            {:else if id === 'zuwendungen'}<Zuwendungen {r} />
            {:else if id === 'ergebnis'}<Ergebnis {r} titel={TITEL} />
            {/if}
          </section>
        {/if}
      {/each}

      {#if !druck}
        {@const i = ZIELE.filter((z) => z !== 'berufsauslagen-2' || vh).indexOf(ziel)}
        {@const liste = ZIELE.filter((z) => z !== 'berufsauslagen-2' || vh)}
        <div class="uf-blaettern">
          {#if i > 0}<button type="button" data-variant="ghost" onclick={() => gehe(liste[i - 1])}><Icon name="arrow-left" />Zurück</button>{:else}<span></span>{/if}
          {#if i < liste.length - 1}<button type="button" onclick={() => gehe(liste[i + 1])}>Weiter<Icon name="arrow-right" /></button>{/if}
        </div>
        {#if speicher.faelle.length === 1 && ziel === 'personalien'}
          <p class="uf-text uf-leise">Zum Ausprobieren: <button type="button" data-size="sm" data-variant="ghost" onclick={beispiel}>Erfundenen Beispielfall laden</button></p>
        {/if}
      {/if}
    </div>
  </div>
{/if}
