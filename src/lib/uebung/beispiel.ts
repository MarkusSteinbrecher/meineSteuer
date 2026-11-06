/** A made-up case to try the form. Every name and figure is invented (ADR 0003: no course data in the repo). */
import { leererFall, neueId, type Fall } from './zh2025';

export function beispielFall(): Fall {
  const f = leererFall();
  f.personalien.zivilstand = 'verheiratet';
  f.personalien.gemeinde = 'Winterthur';
  f.personalien.p1 = { vorname: 'Daniel', name: 'Beispiel', geburtsdatum: '12.03.1985', konfession: '', beruf: 'Informatiker', pk: true };
  f.personalien.p2 = { vorname: 'Laura', name: 'Beispiel', geburtsdatum: '05.09.1987', konfession: '', beruf: 'Pflegefachfrau', pk: true };
  f.kinder = [
    { id: neueId(), name: 'Mia Beispiel', geburtsdatum: '18.06.2016', imHaushalt: true, ausbildung: 'Primarschule', bis: '', anteil: 'ganz', alimente: null, betreuungskosten: 6000 },
    { id: neueId(), name: 'Noah Beispiel', geburtsdatum: '02.11.2020', imHaushalt: true, ausbildung: '', bis: '', anteil: 'ganz', alimente: null, betreuungskosten: 12000 },
  ];
  Object.assign(f.einkuenfte, { e100: 98500, e101: 52300, e102: 4000 });
  f.wertschriften = [
    { id: neueId(), code: '', waehrung: 'CHF', nennwert: '', valor: '', bezeichnung: 'Privatkonto 1234-5, Beispielbank', zugang: '', abgang: '', steuerwert: 8250, ertragA: null, ertragB: 12 },
    { id: neueId(), code: '', waehrung: 'CHF', nennwert: '', valor: '', bezeichnung: 'Sparkonto 6789-0, Beispielbank', zugang: '', abgang: '', steuerwert: 25400, ertragA: 254, ertragB: null },
    { id: neueId(), code: '', waehrung: 'CHF', nennwert: '40', valor: '111111', bezeichnung: 'Namenaktien Muster AG', zugang: '', abgang: '', steuerwert: 3480, ertragA: 122, ertragB: null },
    { id: neueId(), code: '', waehrung: 'USD', nennwert: '60', valor: '222222', bezeichnung: 'Anteile Welt-Indexfonds (Ausland)', zugang: '', abgang: '', steuerwert: 15200, ertragA: null, ertragB: 210 },
  ];
  f.liegenschaften = [
    { id: neueId(), ort: 'Winterthur', kanton: 'ZH', strasse: 'Musterweg 7', art: 'Einfamilienhaus', flaeche: '420', bewertung: 'verkehrswert', steuerwert: 640000, wohnen: 21600, gewerbe: null, unterhalt: 'pauschal', unterhaltEffektiv: null, geschaeftlich: false },
  ];
  f.schulden = [{ id: neueId(), glaeubiger: 'Beispielbank, Zürich', art: 'Hypothek', geschaeft: false, betrag: 480000, zinsen: 6720 }];
  const [ba1, ba2] = f.berufsauslagen;
  Object.assign(ba1, { arbeitgeber: 'Beispiel Informatik AG', arbeitsort: 'Zürich', abo: 1200, verpflegung: 'voll', verpflegungTage: 220 });
  Object.assign(ba2, { arbeitgeber: 'Kantonsspital (Beispiel)', arbeitsort: 'Winterthur', verpflegung: 'verbilligt', verpflegungTage: 180 });
  ba2.fahrten = [{ id: neueId(), arbeitsort: 'Winterthur', tage: 180, km: 12, fahrten: 2, fahrzeug: 'auto' }];
  ba2.begruendung.fehlt = true;
  Object.assign(f.abzuege, { s3a1: 7258, s3a2: 5000 });
  Object.assign(f.versicherung, { v601: 9840, v604: 266 });
  f.weiterbildung[1] = { bezeichnung: 'Nachdiplomkurs Intensivpflege', kosten: 4800, beitrag: 1500 };
  f.krankheit = [
    { id: neueId(), bezeichnung: 'Franchise und Selbstbehalt laut Krankenkasse', betrag: 1850 },
    { id: neueId(), bezeichnung: 'Zahnarzt', betrag: 2400 },
  ];
  f.zuwendungen = [
    { id: neueId(), bezeichnung: 'Hilfswerk A (steuerbefreit)', betrag: 300 },
    { id: neueId(), bezeichnung: 'Stiftung B (steuerbefreit)', betrag: 200 },
  ];
  f.vermoegen.v412 = 18000;
  f.vermoegen.fahrzeugKaufpreis = 32000;
  f.vermoegen.fahrzeugKaufjahr = '2023';
  return f;
}
