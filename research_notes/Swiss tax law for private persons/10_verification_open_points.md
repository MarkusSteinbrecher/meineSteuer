# Verification of open and conflicting points (Swiss personal taxation, as of October 2026)

How this was checked: Fedlex pages render with JavaScript, but the Fedlex **filestore HTML** consolidated versions could be read directly. They were found through the Fedlex SPARQL endpoint (`https://fedlex.data.admin.ch/sparqlendpoint`). The versions read:
- DBG (SR 642.11), version in force from 2 Sep 2026: https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1991/1184_1184_1184/20260902/de/html/fedlex-data-admin-ch-eli-cc-1991-1184_1184_1184-20260902-de-html-1.html
- QStV (SR 642.118.2), version of 10 Jan 2025 (current). The 1 Jan 2027 version was also read; Art. 1 is the same in substance: https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2018/274/20250110/de/html/fedlex-data-admin-ch-eli-cc-2018-274-20250110-de-html-1.html
- DBA CH–AT (SR 0.672.916.31), version of 14 Nov 2012 (latest): https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1974/2085_2085_2085/20121114/de/html/fedlex-data-admin-ch-eli-cc-1974-2085_2085_2085-20121114-de-html-3.html
- Berufskostenverordnung (SR 642.118.1), version of 1 Jan 2026: https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1993/1363_1363_1363/20260101/de/html/fedlex-data-admin-ch-eli-cc-1993-1363_1363_1363-20260101-de-html.html

The ESTV Kreisschreiben (KS) were read as the original ESTV PDFs, taken from cantonal mirrors. The ESTV site itself was not fetched for these.

---

## 1. Quellensteuer tariff codes (QStV Art. 1, KS 45), especially code D

### Takeaway
**Corrected / partly unclear.** Code D is **not** "Nebenerwerb" (secondary job). Since 2021 it applies to **persons receiving AHV contributions refunded under Art. 18 Abs. 3 AHVG**, at a flat 1 % for the direct federal tax. Code F (Italian commuters) was repealed from 2024. The Italian commuter codes are R, S, T, U **and V**. "HE/ME" do not exist in federal law.

### Cited Findings
- QStV Art. 1 Abs. 1 (current text):
  - **A**: single, divorced, separated or widowed persons who do **not** live with children or persons needing support in the same household.
  - **B**: married couples (not separated) where only one spouse is gainfully employed.
  - **C**: married couples where both spouses are gainfully employed.
  - **D**: "bei Personen, die Leistungen nach Artikel 18 Absatz 3 [AHVG] erhalten", i.e. refunded AHV contributions.
  - **E**: simplified settlement procedure (Art. 21–24 QStV).
  - **F**: repealed with effect from 1 Jan 2024 (EFD-V of 31 Oct 2022, AS 2023 398).
  - **G**: replacement income (Ersatzeinkünfte, Art. 3) **not** paid out through the employer.
  - **H**: single, divorced, separated or widowed persons who live with children or persons needing support in the same household and bear most of their upkeep.
  - **L, M, N, P, Q**: German cross-border commuters under the DBA-D who meet the conditions of A, B, C, H or G respectively.
  - **R, S, T, U, V**: Italian cross-border commuters under Art. 3 Abs. 1 of the Grenzgängerabkommen CH-IT of 23 Dec 2020 who meet the conditions of A, B, C, H or G respectively. These were inserted from 1 Jan 2024.
  - Source: [QStV, Fedlex filestore](https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2018/274/20250110/de/html/fedlex-data-admin-ch-eli-cc-2018-274-20250110-de-html-1.html)
- QStV Art. 1 Abs. 3: for the new Italian commuters (R–V), the source tax is **80 %** of the source tax under the code whose conditions they meet. Anhang Ziff. 1: "Die Quellensteuer von Personen mit dem Tarifcode D beträgt 1 Prozent der Bruttoeinkünfte." Code G follows a progressive scale (Anhang Ziff. 2). — [QStV](https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2018/274/20250110/de/html/fedlex-data-admin-ch-eli-cc-2018-274-20250110-de-html-1.html)
- ESTV's 2026 calculation bases list the codes A0–A9/L0–L9/R0–R9, B/M/S, C/N/T and H1–H9/P1–P9/U0–U9. They state "Tarifcodes D (1 % für die DBSt) und G (progressiver Tarif für die DBSt)" are set in the QStV annex, and that E (0.5 % DBSt) is set in Art. 37a Abs. 1 DBG. — [ESTV, Grundlagen Quellensteuertarife 2026](https://www.estv.admin.ch/dam/de/sd-web/nuQbhdzXDPm0/qst-berechnungsgrundlagen-2026-de.pdf)
- From 2021, code D no longer applies to secondary employment or to replacement income paid directly by an insurer. Code G (or Q for German commuters) applies to the latter. — [Kanton Bern, QSt-Info Neuerungen 2021](https://www.sv.fin.be.ch/content/dam/sv_fin/dokumente/de/qst_info-neuerungen_2021_de.pdf) (cantonal primary source)
- KS 45 is dated 12 June 2019 ("Quellenbesteuerung des Erwerbseinkommens von Arbeitnehmern", 1-045-D-2019-d). Its original edition still covers code F in section 4.5. — [KS 45 via Kanton AI mirror](https://www.ai.ch/themen/steuern/publikationen/publikationen/kreisschreiben-nr-45.pdf/@@download/file/Kreisschreiben%20Nr.%2045.pdf)

### Inferences
- Any statement that "D = Nebenerwerb" describes the law **before 2021** and must be corrected.
- Notes that cite KS 45 for code F should say that F was repealed from 2024 after the new CH–IT commuter agreement. An updated KS 45 edition exists, but this check did not read it.

### Gaps
- **HE / ME**: these appear in neither QStV Art. 1, the original KS 45, nor ESTV's 2026 tariff bases. Status: **still unclear / probably wrong**. They may be cantonal or software-specific labels. Remove them unless a primary source turns up.
- The current consolidated edition of KS 45, as amended for the Italian agreement, was not read.

---

## 2. DBA Switzerland–Austria: cross-border commuters

### Takeaway
**Corrected.** The treaty has **no special commuter rule** any more. Art. 15 Abs. 4 (the old Grenzgängerregelung) was repealed by the protocol of 21 March 2006, in force since 2 Feb 2007. Switzerland as the state of work taxes the wage under Art. 15 Abs. 1, in practice through ordinary source tax. Austria as the state of residence may also tax it and **credits** the Swiss tax (Art. 23 Abs. 2). "Taxed only in the residence state" and "3 % Swiss source tax" are both outdated for Austria. The 4.5 % rule (codes L–Q) applies only to **German** commuters.

### Cited Findings
- DBA CH-AT Art. 15 Abs. 4: "… Aufgehoben durch Art. III des Prot. vom 21. März 2006, von der BVers genehmigt am 6. Okt. 2006 und mit Wirkung seit 2. Febr. 2007 (AS 2007 1253 1251; BBl 2006 5155)." — [DBA CH-AT, Fedlex filestore](https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1974/2085_2085_2085/20121114/de/html/fedlex-data-admin-ch-eli-cc-1974-2085_2085_2085-20121114-de-html-3.html)
- Art. 15 Abs. 1: wages "dürfen … in dem anderen Staat besteuert werden" if the work is done there. Art. 23 Abs. 2 (as amended by the 2006 protocol): Austria may tax Art. 15 Abs. 1 income of its residents from work in Switzerland "… so rechnet Österreich … den Betrag an, der der in der Schweiz gezahlten Steuer entspricht" (credit method, capped at the Austrian tax on that income). — [DBA CH-AT](https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1974/2085_2085_2085/20121114/de/html/fedlex-data-admin-ch-eli-cc-1974-2085_2085_2085-20121114-de-html-3.html)
- Kanton St. Gallen: "Grenzgänger mit Wohnsitz in Österreich, Deutschland und Arbeitsort im Kanton St. Gallen unterliegen für ihre Einkünfte aus unselbständiger Erwerbstätigkeit und Ersatzeinkünften einem Steuerabzug an der Quelle." The page gives a special 4.5 % rate **only** for German commuters. — [sg.ch Quellensteuer](https://www.sg.ch/steuern-finanzen/steuern/steuerarten/quellensteuer/)
- QStV Art. 1 has special commuter codes only for Germany (L–Q) and Italy (R–V), none for Austria. — [QStV](https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2018/274/20250110/de/html/fedlex-data-admin-ch-eli-cc-2018-274-20250110-de-html-1.html)

### Inferences
- Commuters living in Austria are therefore taxed at source under the ordinary codes (A, B, C, H and so on) of the canton where they work, and then credit the tax in their Austrian assessment.

### Gaps
- No ESTV page specific to Austria was read. The tax-year start of the 2006 change (2007 assessments) was not checked against the protocol's own application clause.

---

## 3. Unmarried parents (Konkubinat) under ESTV KS 30

### Takeaway
**Confirmed, with detail.** Cohabiting unmarried parents are always assessed separately. Who gets the child deduction and the parent tariff depends on (a) joint or sole parental custody and (b) whether child maintenance (Unterhaltsbeiträge) is claimed under Art. 33 Abs. 1 lit. c DBG. Child maintenance paid **between cohabiting parents is deductible** for the payer and taxable for the recipient, and the recipient then gets the child deduction and the parent tariff.

### Cited Findings
- DBG Art. 35 Abs. 1 lit. a: child deduction CHF 6,800 per child. When parents are taxed separately, the deduction is split in half if the child is under joint custody and no maintenance under Art. 33 Abs. 1 lit. c is claimed. — [DBG Fedlex](https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1991/1184_1184_1184/20260902/de/html/fedlex-data-admin-ch-eli-cc-1991-1184_1184_1184-20260902-de-html-1.html)
- DBG Art. 36 Abs. 2bis: the parent tariff applies to persons (married, or single/divorced and so on) who live with children in the same household and bear most of their upkeep. The tax is then reduced by CHF 263 per child. — [DBG](https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1991/1184_1184_1184/20260902/de/html/fedlex-data-admin-ch-eli-cc-1991-1184_1184_1184-20260902-de-html-1.html)
- KS 30 (ESTV, "Bern, 21. Dezember 2010", Ehepaar- und Familienbesteuerung). Scenarios for unmarried parents in a shared household with a common minor child:
  - **Sole custody, no maintenance claimed (14.6)**: the parent with custody gets the child deduction, the insurance-premium deduction for the child and the parent tariff. The other parent pays the basic tariff. "aus Billigkeitsgründen" (on equity grounds), the earning parent may get them instead if the custodial parent has no income.
  - **Sole custody, maintenance claimed (14.7)**: "Die Unterhaltsbeiträge für das Kind sind vom Empfänger zu versteuern. Der leistende Elternteil kann diese Alimentenleistungen in Abzug bringen." The recipient gets the child deduction and the parent tariff. The payer pays the basic tariff.
  - **Joint custody, no maintenance claimed (14.8)**: each parent gets **half** of the child deduction and of the insurance deduction. The parent tariff goes to the parent who bears most of the upkeep, presumed to be **the one with the higher income**.
  - **Joint custody, maintenance claimed (14.9)**: the recipient taxes the maintenance and gets the full child deduction and the parent tariff. The payer deducts the payments and pays the basic tariff.
  - Childcare costs are split per parent in 14.7–14.9.
  - Source: [KS 30 via Kanton GL mirror](https://www.gl.ch/public/upload/assets/31260/02%20Kreisschreiben%2030.pdf?fp=4)
- KS 30 section 13.4.2 restates the rule: for unmarried cohabiting parents, if maintenance is claimed, the recipient gets the parent tariff and the paying parent "kann im Gegenzug die Unterhaltsleistungen von seinem Einkommen abziehen". — [KS 30](https://www.gl.ch/public/upload/assets/31260/02%20Kreisschreiben%2030.pdf?fp=4)

### Inferences
- The publication principle stands. The CHF amounts in the mirrored KS 30 (for example the CHF 10,100 childcare cap) are **old figures**. Take current amounts from the DBG, not from KS 30.

### Gaps
- It was not checked whether ESTV has republished KS 30 with updated amounts. The mirror shows the 2010 edition with a footnote on the date. Check the ESTV page "Ehepaar- und Familienbesteuerung": https://www.estv.admin.ch/de/ehepaar-und-familienbesteuerung
- From 2032 the Individualbesteuerung (item 4) will replace this whole system.

---

## 4. Dates: Eigenmietwert abolition; Individualbesteuerung

### Takeaway
**Corrected / confirmed.**
- The Federal Council set the Eigenmietwert reform in force for 1 Jan 2029 on **1 April 2026**, not on 24 March.
- Parliament's final votes on the Individualbesteuerung law took place on **20 June 2025**, not on 23 June.
- Voters approved the law on **8 March 2026**.
- The Federal Council set it in force for 1 Jan 2032 on **19 August 2026** (confirmed).

### Cited Findings
- admin.ch press release, **1 April 2026**, "Bundesrat setzt Abschaffung des Eigenmietwerts auf 2029 in Kraft". It gives entry into force on 1 Jan 2029, so that cantons can introduce the property tax on second homes at the same time. — [admin.ch](https://www.admin.ch/de/newnsb/yGTqBPowRqyVh0zPokW-q). A secondary source with the same date: [law.ch, April 2026](https://law.ch/lawnews/2026/04/systemwechsel-eigenmietwert-faellt-per-1-januar-2029/)
- The DBG consolidations on Fedlex already include versions dated 1 Jan 2027, 1 Jan 2028 and **1 Jan 2029** (future versions loaded). — [Fedlex SPARQL listing for SR 642.11](https://fedlex.data.admin.ch/sparqlendpoint)
- National Council final vote ("Schlussabstimmung") on 24.026-2 "Bundesgesetz über die Individualbesteuerung": **20.06.2025 09:02:45**, 101 yes, 93 no, 0 abstentions. — [parlament.ch vote 52_30937](https://www.parlament.ch/poly/Abstimmung/52/out/vote_52_30937.pdf)
- The law is cited as the "Bundesgesetz vom 20. Juni 2025 über die Individualbesteuerung". Both the optional referendum (65,377 valid signatures) and the cantonal referendum (10 cantons) succeeded. — [Kanton Zug, Kantonsreferendum Individualbesteuerung](https://kr-geschaefte.zug.ch/dokumente/14064/3945-2-18311_Kantonsreferendum-Individualbesteuerung.pdf) (cantonal primary source)
- admin.ch press release, **19 August 2026**, "Individualbesteuerung tritt 2032 in Kraft". It sets entry into force on 1 Jan 2032, the latest date the law allows, and says the law was "im Frühling vom Volk angenommen". — [admin.ch](https://www.admin.ch/de/newnsb/khPH1Sn08Zr6iGZYe4tsB)
- Popular vote of **8 March 2026**: accepted with 54.23 % yes. This comes from secondary sources ([SRF](https://www.srf.ch/news/schweiz/abstimmungen-8-3-2026/abstimmungen-vom-8-maerz-kuenftig-soll-jede-und-jeder-eine-eigene-steuererklaerung-ausfuellen), [Blick](https://www.blick.ch/schweiz/jubelstimmung-vor-ort-ja-komitee-der-individualbesteuerung-feiert-sieg-id21762300.html)). The official vote page is [admin.ch 20260308](https://www.admin.ch/gov/de/start/dokumentation/abstimmungen/20260308.html), but the result figures could not be extracted from it.

### Inferences
- "24 March 2026" is unsupported. It may be a confusion with a different meeting or a news date.

### Gaps
- The exact result figure of 54.23 % still needs to be confirmed on the Federal Chancellery or BFS results page.

---

## 5. Spot-check of DBG article numbers

### Takeaway
**Mostly confirmed.** Some ranges need precision:
- Collection of tax runs from Art. 160, and tax remission (Erlass) is now **Art. 167–167g**.
- The penal provisions run to **Art. 195**, not 186. Art. 186 only begins tax fraud (Steuerbetrug, Art. 186–189).
- Art. 175 Abs. 3 (penalty-free self-disclosure) is confirmed.
- Art. 179 is repealed.
- Art. 105 deals with **cantonal jurisdiction** (örtliche Zuständigkeit), not with tax liability.
- Art. 38 is correct for capital benefits from pension schemes (Kapitalleistungen aus Vorsorge).

### Cited Findings
All findings in this section come from the [DBG, Fedlex filestore, version of 2 Sep 2026](https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1991/1184_1184_1184/20260902/de/html/fedlex-data-admin-ch-eli-cc-1991-1184_1184_1184-20260902-de-html-1.html).
- **Art. 3–9** (tax liability), correct:
  - Art. 3: personal connection (residence or stay).
  - Art. 4–5: economic connection.
  - Art. 6–7: extent of liability and rate determination.
  - Art. 8: start and end of liability.
  - Art. 9: spouses, registered partners, children.
- **Art. 16–24** (income and tax-exempt income), correct:
  - Art. 16: general clause. Abs. 3 makes private capital gains tax-free.
  - Art. 17–17d: employment, including employee share plans.
  - Art. 18–19: self-employment and restructurings.
  - Art. 20–20a: movable assets.
  - Art. 21: real estate, including the Mietwert (imputed rent).
  - Art. 22: pension benefits.
  - Art. 23: other income.
  - Art. 24: tax-exempt income.
- **Art. 26**: work-related expenses (Berufskosten). Commuting costs are capped at **CHF 3,300** (version in force since 1 Jan 2025). Lit. c covers other work-related costs.
- **Art. 33**: interest on debts and other deductions. **Art. 33a**: voluntary donations.
- **Art. 35**: social deductions (child deduction CHF 6,800).
- **Art. 36**: tax rates (Abs. 2bis parent tariff, CHF 263 per child).
- **Art. 37**: lump-sum settlements for recurring benefits. **Art. 37a**: simplified settlement procedure. **Art. 37b**: liquidation gains.
- **Art. 38**: "Kapitalleistungen aus Vorsorge". Correct.
- **Art. 105**: "Bei persönlicher Zugehörigkeit". This sits in the section on cantonal jurisdiction (which canton levies the tax), not tax liability.
- **Art. 124–135** (assessment), correct:
  - Art. 124–126a: tax return, attachments, cooperation duties.
  - Art. 127–129: certificates from third parties.
  - Art. 130–131: assessment and notification.
  - Art. 132–135: objection procedure (Einsprache).
- **Art. 147–153a** (revision and back taxes), correct:
  - Art. 147–149: revision.
  - Art. 150: correction of calculation errors.
  - Art. 151–153: back taxes (Nachsteuer).
  - Art. 153a: simplified back taxation for heirs.
- **Art. 161–167** (collection and remission):
  - Art. 160 also belongs to collection.
  - Art. 161: due date.
  - Art. 162–166: collection, payment, interest on late payment, enforcement, payment relief.
  - Art. 167–167g: remission (Erlass) under the 2016 Erlass law (Art. 167 "Voraussetzungen" to Art. 167g "Rechtsmittelverfahren").
- **Art. 174–186** (penal provisions):
  - Art. 174: breach of procedural duties.
  - Art. 175: completed tax evasion. **Abs. 3** is the penalty-free self-disclosure, available once, if (a) the evasion is unknown to the authorities, (b) the person supports the back-tax assessment without reservation and (c) makes serious efforts to pay. Abs. 4: a second self-disclosure reduces the fine to one fifth.
  - Art. 176: attempted evasion. Art. 177: incitement and aiding.
  - Art. 178: concealment of estate assets during the inventory procedure.
  - **Art. 179: repealed.**
  - Art. 180: tax evasion by spouses.
  - Art. 181–181a: legal persons (Art. 181a self-disclosure for them).
  - Art. 182–185: procedure, limitation, collection of fines.
  - **Art. 186: tax fraud (Steuerbetrug)**, followed by Art. 187–189.

### Inferences
- A label such as "174–186 Strafbestimmungen" is acceptable only if it is understood as "evasion and procedure plus the start of tax fraud". It is better to cite 174–195.

### Gaps
- None for the numbers listed.

---

## 6. ESTV KS 36 (commercial securities trading): safe-harbour criteria

### Takeaway
**Confirmed.** There are **five cumulative** criteria. If all five are met, the authorities always treat the activity as private asset management, so capital gains stay tax-free. If any one is missed, commercial trading is **not** automatically assumed: the case is judged on all its circumstances (KS 36 Ziff. 4).

### Cited Findings
All findings in this section come from the [KS 36 via Kanton BL mirror](https://kanton.baselland.ch/finanz-und-kirchendirektion/steuerverwaltung-kurzmitteilungen/2012/476/downloads-1/476_beilage.pdf) (ESTV KS 36, "Bern, 27. Juli 2012", Gewerbsmässiger Wertschriftenhandel, Ziff. 3).
1. "Die Haltedauer der veräusserten Wertschriften beträgt mindestens 6 Monate."
2. Transaction volume (the sum of all purchase prices and sale proceeds) per calendar year is no more than **5 times** the securities and cash holdings at the start of the tax period.
3. Earning capital gains is not a necessity to replace missing income for living costs. This is regularly the case if realised gains are **less than 50 % of net income** in the tax period.
4. "Die Anlagen sind nicht fremdfinanziert **oder** die steuerbaren Vermögenserträge aus den Wertschriften … sind grösser als die anteiligen Schuldzinsen."
5. "Der Kauf und Verkauf von Derivaten (insbesondere Optionen) beschränkt sich auf die Absicherung von eigenen Wertschriftenpositionen."

### Inferences
- The legal basis is DBG Art. 16 Abs. 3 (private capital gains tax-free) versus Art. 18 Abs. 2 (gains on business assets taxable), which KS 36 Ziff. 2 also cites.

### Gaps
- It was not checked whether ESTV has issued a newer edition of KS 36 after 2012. None is known.

---

## 7. Home office deduction (direct federal tax, 2025/2026)

### Takeaway
**Confirmed: there is no separate federal home-office deduction.**
- A private study (privates Arbeitszimmer) is expressly part of the flat-rate "übrige Berufskosten" in BKV Art. 7: 3 % of net wage, at least CHF 2,000 and at most CHF 4,000 (BKV annex, version of 1 Jan 2026).
- Actual study costs can be claimed only by proving all actual costs (BKV Art. 4).
- Under federal practice this requires a separate room used mainly and regularly for an essential part of the work, with no alternative such as a workplace provided by the employer.
- A 2022 reform bill to simplify work-expense deductions is still unfinished as far as found.

### Cited Findings
- BKV Art. 7 Abs. 1: "Als übrige Berufskosten können insbesondere die … Auslagen für Berufswerkzeuge (inkl. EDV-Hard- und -Software), Fachliteratur, privates Arbeitszimmer, Berufskleider … als Pauschale nach Artikel 3 abgezogen werden. Vorbehalten bleibt der Nachweis höherer Kosten (Art. 4)." Annex: "Übrige Berufskosten (Art. 7 Abs. 1) 3 % des Nettolohns, mindestens im Jahr 2000.— höchstens im Jahr 4000.—". Art. 4: if higher costs are claimed, "so sind die gesamten tatsächlichen Auslagen und deren berufliche Notwendigkeit nachzuweisen." — [Berufskostenverordnung, version of 1 Jan 2026](https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1993/1363_1363_1363/20260101/de/html/fedlex-data-admin-ch-eli-cc-1993-1363_1363_1363-20260101-de-html.html)
- DBG Art. 26 Abs. 1 lit. c and Abs. 2: flat rates for other work-related costs, with proof of higher costs allowed. — [DBG](https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1991/1184_1184_1184/20260902/de/html/fedlex-data-admin-ch-eli-cc-1991-1184_1184_1184-20260902-de-html-1.html)
- EFD explanatory report of 21 Dec 2022 on the draft "Bundesgesetz über den steuerlichen Abzug der Berufskosten von unselbstständig Erwerbstätigen":
  - Today, study costs are deductible only "wenn der Arbeitgeber keinen Arbeitsplatz zur Verfügung stellt".
  - Actual costs are allowed if the taxpayer "gezwungen ist, dieses hauptsächlich und regelmässig für die Erledigung eines wesentlichen Teils der Berufsarbeit zu benutzen, und es keine Alternative gibt".
  - Anyone who claims actual study costs must also prove **all** other work expenses as actual costs.
  - It notes that Motion 20.3844 Ryser (home-office study deduction) was rejected by the National Council in September 2020.
  - Source: [EFD Erläuternder Bericht (newsd.admin.ch)](https://www.newsd.admin.ch/newsd/message/attachments/74677.pdf)
- The consultation ran from 21 Dec 2022 to 4 April 2023. On 8 Dec 2023 the Federal Council set the key parameters (one flat rate; commuting and weekly-residence costs kept separate) and asked the EFD for a dispatch (Botschaft). — [law.ch on the Federal Council decision of Dec 2023](https://law.ch/lawnews/2023/12/steuerlicher-abzug-von-berufskosten-vernehmlassungs-ergebnis/) (secondary). Official result report: [newsd.admin.ch 85219](https://www.newsd.admin.ch/newsd/message/attachments/85219.pdf) (not read in full).

### Inferences
- For 2025/2026, the correct statement is: a home office falls under the flat rate for other work-related costs. Claiming a separate study requires proving all actual costs under strict conditions. Cantonal practice differs; for example, Lucerne uses a one-third-of-working-time test (secondary snippet, not verified).

### Gaps
- No ESTV circular or FAQ specific to home office for 2025/2026 was found.
- Whether the Botschaft on the flat-rate reform was adopted or dropped after 2024 could not be checked with a primary source.

---

## 8. ch.ch tax return page: current URL

### Takeaway
**Confirmed. The URL works, and the earlier 404 came from the fetch tool, not from the site.**
- German: https://www.ch.ch/de/steuern-und-finanzen/steuererklarung/ (page title "Steuererklärung : Ausfüllen, Einkommen deklarieren").
- English: https://www.ch.ch/en/taxes-and-finances/tax-return/
- ch.ch renders its pages client-side. Server-side fetches (curl, WebFetch) receive an "Error Page (404)" shell for **every** ch.ch content page, including working ones. In a real browser (Playwright) the German page loads with the H1 "Steuererklärung".

### Cited Findings
- Loaded in a headless browser on 3 Oct 2026: the title is "Steuererklärung : Ausfüllen, Einkommen deklarieren" and the headings are "Steuererklärung" and "Gut zu wissen". — [ch.ch Steuererklärung](https://www.ch.ch/de/steuern-und-finanzen/steuererklarung/)
- The search index lists the same URL and its English counterpart. — [ch.ch EN](https://www.ch.ch/en/taxes-and-finances/tax-return/)

### Inferences
- Note the spelling **"steuererklarung"** (no umlaut and no "ae"). Do not "correct" it to "steuererklaerung".

### Gaps
- None.

---

## 9. JUSO inheritance-tax initiative (30 Nov 2025) and Schwyz

### Takeaway
**Confirmed.**
- The initiative "Für eine soziale Klimapolitik – steuerlich gerecht finanziert (Initiative für eine Zukunft)" was rejected on 30 Nov 2025 with about **78.3 % no**, and **no** canton voted yes.
- **Schwyz levies no inheritance or gift tax.**

### Cited Findings
- Result: 21.7 % yes (520,115) against 78.3 % no (1,874,063). Cantons: 0 yes, 23 no. — [SRF](https://www.srf.ch/news/abstimmungen-vom-30-november-erbschaftssteuer-scheitert-klar) (secondary, citing BFS). Another secondary source: [swissinfo](https://www.swissinfo.ch/ger/schweizer-politik/die-initiative-zur-erbschaftssteuer-hat-die-schweiz-durchaus-bewegt/90558333). The official figures were not fetched from bk.admin.ch.
- Kanton Schwyz: "Im Kanton Schwyz werden Einkommens- und Vermögenssteuern für Kanton, Bezirke, Gemeinden und Kirchgemeinden sowie die Einkommenssteuer für den Bund (direkte Bundessteuer) erhoben, jedoch keine Erbschafts- und Schenkungssteuern." — [sz.ch, Steuern natürliche Personen](https://www.sz.ch/privatpersonen/steuern/steuern-natuerliche-personen/uebersicht.html/72-512-445-3489-3488)

### Inferences
- Schwyz (along with Obwalden, according to secondary sources) is the only canton without inheritance tax. The Obwalden part was not verified against a primary source here.

### Gaps
- The official Federal Chancellery result page for 30 Nov 2025 was not read, so the exact vote counts (and whether the canton count is 23 or 26 including half-cantons as 3 × 2) rest on SRF.
