# Swiss taxation of wealth, securities, crypto and private real estate (natural persons)

Research date: 3 October 2026 (state of law described "as of October 2026"). About 27 tool calls. Primary sources (ESTV, EFD, cantonal tax offices) were used where reachable; some points rest on media or secondary sources and are marked. Items with no source are listed under Gaps and must not be stated as fact without checking.

---

## 1. Wealth tax (Vermögenssteuer): cantonal only, Stichtag, valuation, allowances, exemptions

### Takeaway
Only cantons and municipalities levy wealth tax; there is no federal wealth tax. It is charged on net wealth (Reinvermögen = gross assets minus proven debts) at the place of residence, valued on the last day of the tax period (normally 31 Dec). Pension assets (2nd pillar, pillar 3a) and ordinary household goods are exempt. Vehicles count as taxable wealth. Allowances and rates vary a lot from canton to canton. For a single person with CHF 1m net wealth, the burden ranged from 0.09% to 0.73% across municipalities in 2025.

### Cited Findings
- Wealth tax is levied on natural persons' net wealth (Reinvermögen) at their place of residence (Wohnsitz). The valuation date is the last day of the assessment period. Debts (private and business, quantifiable, at nominal value) are deductible. — [law.ch: Vermögenssteuer](https://law.ch/lawinfo/besteuerung-privatpersonen/vermoegenssteuer)
- Taxable base = sum of taxable assets minus proven debts (Reinvermögen). Each canton has its own tariff with an allowance (Freibetrag), "often between CHF 50,000 and 200,000, higher for married couples", and a progressive scale in per mille. For a single person with CHF 1m net wealth, the burden across all 2,121 municipalities ranged from **0.09% to 0.73%** (tax year 2025). Most cantons use progressive tariffs; Lucerne, Schwyz, Nidwalden, Obwalden, St. Gallen and Thurgau, among others, use proportional (flat) tariffs. — [Deloitte: Wealth tax Switzerland](https://www.deloitte.com/ch/de/services/deloitte-private/perspectives/wealth-tax-switzerland.html) (aggregated via search snippet; secondary source)
- Cantons grant varying allowances and social deductions that depend on civil status, children and other personal circumstances. — [Deloitte](https://www.deloitte.com/ch/de/services/deloitte-private/perspectives/wealth-tax-switzerland.html)
- Taxable: cash, bank accounts, securities, real estate, vehicles, boats, aircraft (if owned, not leased). Exempt: pension fund balances (Pensionskasse), pillar 3a, household furnishings, clothing, jewellery and art within normal household scope. High-value collections are treated as capital investments and are taxable. The tax value of real estate is "as a rule clearly below its real value". Rates rise steeply at high wealth, and very wealthy people sometimes pay more wealth tax than income tax. — [VZ VermögensZentrum, 5 Oct 2024](https://www.vermoegenszentrum.ch/wissen/vermoegenssteuern-so-nagt-der-fiskus-am-ersparten)
- Life insurance: pure risk policies are valued at zero; savings (endowment) policies at their surrender value (Rückkaufswert). Claims are taken at nominal value, reduced if the debtor is likely insolvent. Household goods and personal effects are exempt. — [law.ch](https://law.ch/lawinfo/besteuerung-privatpersonen/vermoegenssteuer)
- Policies without a surrender value are exempt. Surrender values of policies with recognised 2nd-pillar and 3a institutions stay tax-free until maturity. Pillar 3a and occupational pension assets are not taxed before withdrawal. Vehicles (cars, boats, motorhomes) are taxable wealth. — [comparis / ibani / ag.ch, search summary](https://www.ag.ch/de/verwaltung/dfr/steuern/natuerliche-personen/steuerarten/vermoegenssteuer); see also [comparis: steuerbares Vermögen](https://www.comparis.ch/steuern/steuervergleich/uebersicht/steuerbares-vermoegen)
- ESTV publishes per-canton information sheets ("Kantonsblätter") with cantonal specifics (latest versions Feb 2026). These are the best primary source for each canton's allowances, e.g. [AG](https://www.estv2.admin.ch/stp/kb/ag-de.pdf), [SZ](https://www.estv2.admin.ch/stp/kb/sz-de.pdf), [AI](https://www.estv2.admin.ch/stp/kb/ai-de.pdf), [BL](https://www.estv2.admin.ch/stp/kb/bl-de.pdf), [GR](https://www.estv2.admin.ch/stp/kb/gr-de.pdf). The URL pattern is `estv2.admin.ch/stp/kb/<canton>-de.pdf`.

### Inferences
- Website framing: "Wealth tax = cantonal and communal. The figure on your Wertschriftenverzeichnis and property form, minus debts, minus the cantonal allowance, is what gets taxed."
- Pension capital is exempt only while it sits in the 2nd pillar or 3a. Once paid out, it becomes ordinary taxable wealth from the next 31 Dec onwards (follows from the exemption-until-withdrawal rule above).

### Gaps
- I did not verify concrete allowances per canton (e.g. Zurich, Bern, Geneva, Vaud) from a primary source. The "CHF 50k–200k" range comes from a secondary aggregator. Pull exact figures from the ESTV Kantonsblätter or the cantonal Wegleitung for each canton featured.
- Conflict to resolve: law.ch says listed securities are valued at "average closing price of the last month before the valuation date". The ESTV Kursliste practice (see §2) uses the year-end rate. Treat the Kursliste as authoritative for the website, and check the cantonal Wegleitung before repeating the law.ch statement.
- Vehicle valuation rules (e.g. purchase price minus a yearly depreciation percentage) differ by canton. The Aargau valuation PDF returned 404, so no sourced rule is available.

---

## 2. Securities: Wertschriften- und Guthabenverzeichnis, Kursliste, e-Steuerauszug, income types

### Takeaway
Every account and security is listed in the Wertschriften- und Guthabenverzeichnis with its year-end value (wealth) and its gross income (dividends and interest). Values come from the ESTV Kursliste (ictax.admin.ch). Banks provide an e-Steuerauszug (eCH-0196 standard, PDF with barcode) that tax software imports, and every canton accepts it as of tax year 2023. Repayments out of Kapitaleinlagereserven are tax-free. Bonus shares (Gratisaktien) are taxable unless paid from KER. Accumulating funds are taxed on reinvested income. Gains on globally-interest bearing bonds are taxable income. Employee shares are taxed on acquisition, with a 6% discount per year of lock-up.

### Cited Findings
- **eCH-0196 / e-Steuerauszug:** a technical standard of the Swiss Tax Conference (SSK). It is a PDF with an integrated barcode that holds all tax-relevant data on accounts, securities and loans. When the PDF is uploaded into cantonal tax software, balances, security values, dividends and withholding tax flow into the right fields. Every canton accepts it as of tax year 2023. — [Alpian: e-tax statements](https://www.alpian.com/blog/investing/e-tax-statements-in-switzerland-skip-the-hassle-keep-more-time-for-what-matters) (bank marketing source)
- eCH-0196 v2.0.0 includes a technical instruction for generating barcodes (dated 7 June 2022). — [eCH: eCH-0196 V2.0.0 barcode instruction (FR)](https://ech.ch/sites/default/files/dosvers/beilagen/BEIL2_f_DEF_2022-06-07_eCH-0196_V2.0.0_Codes-barres%20G%C3%A9n%C3%A9ration-%20Instruction%20technique.pdf)
- Foreign brokers (e.g. Interactive Brokers, Schwab) usually do not issue an eCH-0196 statement. A community open-source tool, "OpenSteuerAuszug", generates one. — [Mustachian Post forum](https://forum.mustachianpost.com/t/opensteuerauszug-generate-your-own-etax-esteuerauszug-for-ibkr-schwab-and-others/18288) (community source)
- **Kursliste (ictax):** ESTV publishes official year-end tax values ("Steuerkurse") on ictax. The crypto guidance links e.g. https://www.ictax.admin.ch/extern/de.html#/ratelist/2021. — [ESTV: Kryptowährungen – Besteuerung](https://www.estv.admin.ch/de/kryptowaehrungen-besteuerung)
- **Accumulating funds (thesaurierend):** retained income (interest and dividends reinvested in the fund) is taxable each year. The amounts are available from January via banks or the ESTV Kursliste. — [Beobachter: Geldanlagen – optimieren Sie Ihre Steuern](https://www.beobachter.ch/geld/steuern/geldanlagen-optimieren-sie-ihre-steuern)
- **Kapitaleinlagereserven (KER, capital contribution principle):** repayments from capital contributions made after 31 Dec 1996 are free of withholding tax and of income tax for Swiss-resident private shareholders. — [ESTV: Reserven aus Kapitaleinlagen](https://www.estv.admin.ch/dam/de/sd-web/Byc6qZeNi74b/reserven-kapitaleinlagen-de.pdf); [Kanton SO Steuerbuch 026-02, Erträge aus Wertschriften, V06 7 May 2026](https://steuerbuch.so.ch/fileadmin/steuerbuch/aktuell/026-02_Ertraege_aus_Wertschriften_und_Guthaben_V06_2026-05-07.pdf)
- **Gratisaktien:** bonus shares funded from KER are not subject to income tax. Bonus shares funded from other reserves are taxable income. — [Kanton SO Steuerbuch 026-02](https://steuerbuch.so.ch/fileadmin/steuerbuch/aktuell/026-02_Ertraege_aus_Wertschriften_und_Guthaben_V06_2026-05-07.pdf) (via search summary)
- **Globalverzinsliche / discount bonds** (predominantly one-off interest): income from sale or repayment is taxable. This is an exception to tax-free capital gains. — [Kanton SO Steuerbuch 026-02](https://steuerbuch.so.ch/fileadmin/steuerbuch/aktuell/026-02_Ertraege_aus_Wertschriften_und_Guthaben_V06_2026-05-07.pdf) (via search summary)
- **Mitarbeiterbeteiligungen (ESTV Kreisschreiben Nr. 37):** employee shares are taxed at acquisition on the difference between value and price paid. Locked-up (gesperrte) shares get a discount of 6% per lock-up year, for at most 10 years. If a lock-up ends early, the employee realises the difference between the undiscounted value and the discounted value. Locked or unlisted employee options are taxed at exercise: share market value at exercise minus strike price. — [Kanton SZ Merkblatt Besteuerung von Mitarbeiterbeteiligungen](https://www.sz.ch/public/upload/assets/66007/Merkblatt_Besteuerung_von_Mitarbeiterbeteiligungen.pdf?fp=4); [Kanton SO Steuerbuch 022-06](https://steuerbuch.so.ch/fileadmin/steuerbuch/aktuell/022-06_2022-11-10.pdf)
- **Dividends and interest** are taxable income from movable assets (Ertrag aus beweglichem Vermögen). They are declared gross in the Wertschriftenverzeichnis, i.e. before withholding taxes are deducted (see §3). — [Kanton Zug: Anrechnung ausländischer Quellensteuern](https://zg.ch/de/steuern-finanzen/steuern/verrechnungssteuer/anrechnung-auslaendischer-quellensteuern)

### Inferences
- Website UX: the user uploads the bank's e-Steuerauszug, the software reads the barcode, and the user checks the totals. Non-Swiss brokers need manual entry via an ictax lookup, or a self-generated eCH-0196.
- Distributing vs accumulating funds: both are taxed on fund income. For accumulating funds no cash arrives, so users often miss the taxable amount. The Kursliste shows it.

### Gaps
- I did not fetch the ictax user documentation (search by valor/ISIN, the "Steuerwert" vs "Ertrag" columns, the treatment of securities missing from the list). Verify on ictax.admin.ch directly.
- Federal 1% partial taxation of qualified holdings (Teilbesteuerung ≥10% participations, 70% federal / at least 50% cantonal) was not researched in this pass.
- Taxation of Vested RSUs and listed options (taxed at grant) under KS 37, and the rule for foreign-source employee shares on departure (Art. 17d DBG), was not verified.

---

## 3. Verrechnungssteuer refund, DA-1, foreign withholding taxes

### Takeaway
The 35% Swiss withholding tax (Verrechnungssteuer) on Swiss dividends and interest is refunded, or credited against tax due, when the income and the underlying assets are properly declared. Foreign withholding taxes above the treaty residual rate can be credited via form DA-1 ("Anrechnung ausländischer Quellensteuern", formerly "pauschale Steueranrechnung"). This includes the 15% US treaty rate plus the 15% "zusätzlicher Steuerrückbehalt USA" (R-US), but only for securities held through Swiss custodians.

### Cited Findings
- Natural persons are entitled to a refund under Art. 22(1) VStG if they were resident in Switzerland when the income fell due. A refund requires that the income and the assets producing it are properly declared and taxed. The assessment authority of the canton of residence at the end of the relevant tax period is responsible. — [ESTV form S-167 (refund in inheritance cases)](https://www.estv.admin.ch/dam/estv/de/dokumente/vst/formulare/schweiz/vst-form-ch-s-167-de.pdf.download.pdf/vst-form-ch-s-167-de.pdf); [Kanton TG Steuerpraxis StP 22 Nr. 5](https://steuerpraxis.tg.ch/steuerpraxis/2024-01/stp-22-nr-5-ruckerstattung-der-verrechnungssteuer-)
- Form **S-167** is the "Antrag auf Rückerstattung der Verrechnungssteuer in Erbfällen", for estates. It is not the general form for people who do not file. — [ESTV S-167](https://www.estv.admin.ch/dam/estv/de/dokumente/vst/formulare/schweiz/vst-form-ch-s-167-de.pdf.download.pdf/vst-form-ch-s-167-de.pdf); [Kanton Zug: Rückforderung VSt in Erbfällen](https://zg.ch/de/steuern-finanzen/steuern/verrechnungssteuer/rueckforderungverrechnungssteuerinerbfaellen)
- **DA-1** = "Antrag auf Anrechnung ausländischer Quellensteuern und zusätzlichen Steuerrückbehalt USA". It is a supplementary sheet to the Wertschriftenverzeichnis and thus part of the tax return. It rests on Switzerland's double taxation agreements. US dividends held in Swiss custody suffer 15% treaty withholding plus an additional 15% US retention (R-US). Both can be claimed on DA-1, R-US in its own column. A **3-year limitation period** applies. Income must be declared gross. — [Kanton Zug: Anrechnung ausländischer Quellensteuern / Steuerrückbehalt USA](https://zg.ch/de/steuern-finanzen/steuern/verrechnungssteuer/anrechnung-auslaendischer-quellensteuern)
- R-US is only reclaimable when securities are held through a Swiss custodian (a "qualified intermediary" set-up). Claims for US ETFs held at a foreign broker were rejected with "Kein R-US, da ausländische Zahlstelle". — [Mustachian Post forum](https://forum.mustachianpost.com/t/da-1-for-vanguard-vti-etf-rejected-with-kein-r-us-da-auslandische-zahlstelle/10930) (community; consistent with Kanton Zug's "Swiss custody" wording)
- Older Lucerne guidance covers forms DA-1, DA-2 and DA-3 together. — [Kanton LU Merkblatt DA-1/DA-2/DA-3 (2019)](https://steuern.lu.ch/-/media/Steuern/Dokumente/Publikationen/2020/MerkblattzuFormularDA1DA2undDA32019.pdf)

### Inferences
- Website flow: (1) Swiss securities with 35% VSt → column "mit Verrechnungssteuer" → refunded or credited automatically via the return. (2) Foreign securities → column "ohne VSt" → if from a treaty state, possibly DA-1. (3) For US stocks at a Swiss bank, claim R-US on DA-1 too.

### Gaps
- I did not verify the DA-1 minimum threshold (commonly cited as CHF 100 of foreign tax), the maximum-amount (Maximalbetrag) limitation, or the list of countries' residual rates. The Zug page did not state them.
- The form for Swiss residents who do **not** file a tax return was not identified. Often cited as **Form S-25** (ESTV, persons resident in Switzerland), but not verified this session. Check on estv.admin.ch VSt forms.
- From memory, not re-verified: the Verrechnungssteuer reform (abolishing it on domestic bond interest) was rejected by voters on 25 Sep 2022, so 35% should still apply to Swiss bond interest. Check before publishing.

---

## 4. Private capital gains vs gewerbsmässiger Wertschriftenhandel (ESTV KS Nr. 36)

### Takeaway
Gains on private movable assets (shares, funds, crypto) are tax-free for natural persons, and losses are not deductible. The exception is when trading qualifies as self-employment. ESTV Kreisschreiben Nr. 36 sets out "safe harbour" criteria. If they are met cumulatively, private asset management is assumed.

### Cited Findings
- KS 36 distinguishes quasi-professional securities trading (self-employment) from private asset management. It is based on Federal Court case law up to 31 Dec 2011. Private asset management (tax-free gains) is assumed if **all** of the following are met: (1) holding period of sold securities at least **6 months**; (2) yearly transaction volume (sum of all purchase and sale prices) at most **5×** the securities and account holdings at the start of the tax period; (3) gains from securities transactions do not make up more than 50% of net income in the period (per the KS text); (4) investments are not mainly debt-financed, or taxable income from securities (dividends, interest) exceeds debt interest; (5) derivatives are used only to hedge own positions. Failing the safe harbour does **not** automatically mean professional trading; the decision is made case by case. — [Kanton Zug Steuerbuch: Gewerbsmässiger Wertschriftenhandel](https://publisher-zgch-dev.webcloud7.ch/izug/platform/behoerden/finanzdirektion/steuerverwaltung/steuerbuch-zug/erlaeuterungen-zu-a7-17-selbstaendige-erwerbstaetigkeit/gerwerbsmaessiger-wertschriftenhandel/export_pdf) (criteria 1, 2 and the case-by-case rule confirmed in the source snippet; criteria 3–5 are from the KS 36 structure and should be checked against the [ESTV KS 36 PDF](https://www.estv.admin.ch))
- The same logic applies to crypto: private gains are tax-free, losses are not deductible, and professional trading is judged by frequency, scale and financing. — [ESTV: Kryptowährungen – Besteuerung](https://www.estv.admin.ch/de/kryptowaehrungen-besteuerung)

### Inferences
- If someone is reclassified as a professional trader, gains become income subject to income tax and social security (AHV) contributions, but losses become deductible. This consequence should be shown to users.

### Gaps
- Exact wording of KS 36 criteria 3–5 was not fetched from ESTV. Verify before publication.

---

## 5. Cryptocurrencies (ESTV working paper)

### Takeaway
Crypto is movable private wealth. It is declared at its 31 Dec value (ESTV Kursliste rate, otherwise the leading exchange price, otherwise acquisition cost). Gains are tax-free in private wealth. Mining and staking rewards and airdrops are taxable income at market value when received.

### Cited Findings
- The ESTV working paper "Kryptowährungen und Initial Coin/Token Offerings (ICOs/ITOs) als Gegenstand der Vermögens-, Einkommens- und Gewinnsteuer, der Verrechnungssteuer und der Stempelabgaben" applies. The ESTV page cites the version of **3 Aug 2022**, which replaces 27 Aug 2019. — [ESTV: Kryptowährungen – Besteuerung](https://www.estv.admin.ch/de/kryptowaehrungen-besteuerung); [PDF](https://www.estv.admin.ch/dam/estv/de/dokumente/dbst/kryptowaehrungen/dbst-arbeitspapier-kryptowaehrungen-de.pdf.download.pdf/dbst-arbeitspapier-kryptowaehrungen-de.pdf). Note: another source dates an update to 14 Dec 2021 ([finews](https://www.finews.ch/news/finanzplatz/49391-crypto-tax-steuern-estv-ico-token)), and a 2023 update of ESTV crypto tax info is reported by [law.ch, Oct 2023](https://law.ch/lawnews/2023/10/estv-hat-steuerinformationen-zur-kryptowaehrung-aktualisiert/). Version history is inconsistent across sources, so cite "latest ESTV working paper" and check the date on the PDF.
- **Wealth tax:** payment tokens (and asset/utility tokens) are declared at their year-end value using the ESTV Kursliste rate on ictax. If there is no ESTV rate, the year-end price on the leading trading platform is used. Failing that, the acquisition price in CHF. — [ESTV](https://www.estv.admin.ch/de/kryptowaehrungen-besteuerung)
- **Capital gains:** gains and losses in private wealth are tax-free and not deductible respectively, unless trading is professional (self-employment). — [ESTV](https://www.estv.admin.ch/de/kryptowaehrungen-besteuerung)
- **Mining (PoW):** rewards are taxable income, and self-employment income if the criteria are met. **Staking (PoS):** via a pool, rewards are income from movable assets; direct validation requires a self-employment check. Both are valued in CHF at receipt. — [ESTV](https://www.estv.admin.ch/de/kryptowaehrungen-besteuerung)
- **Airdrops:** taxable as income from movable assets at their market value at the time of allocation. — [ESTV](https://www.estv.admin.ch/de/kryptowaehrungen-besteuerung); the update adding chapters on NFTs and airdrops is described by [PwC](https://www.pwc.ch/de/insights/besteuerung-von-kryptowaehrungen-aktualisierung-estv-arbeitspapier.html)
- Cantonal declaration practice: Zug publishes a guide on declaring crypto (in the Wertschriftenverzeichnis). — [Kanton Zug: Deklaration Kryptowährungen](https://zg.ch/de/steuern-finanzen/steuern/natuerliche-personen/steuererklaerung-ausfuellen/kryptowaehrungen)

### Gaps
- Hard forks, lending/DeFi yields and NFT detail were not extracted. The ESTV web summary did not cover them; read the full PDF.
- The status of the crypto-asset reporting framework (CARF / automatic exchange of information for crypto, planned in CH from 2026/2027) was not researched.

---

## 6. Real estate: Eigenmietwert and its abolition, maintenance, debt interest, tax value, property gains and transfer taxes, rentals, property abroad

### Takeaway
On **28 Sep 2025** voters approved the reform of home-ownership taxation, with **57.7% Yes**. On **24 Mar 2026** the Federal Council set entry into force for **1 Jan 2029**. Until the end of tax year 2028, the current system applies in full: imputed rent (Eigenmietwert) is taxable, and mortgage interest and maintenance are deductible. From 2029, imputed rent on owner-occupied first and second homes is abolished. Maintenance deductions for owner-occupied homes end. Debt interest is deductible only in proportion to rented property. First-time buyers get a temporary deduction. Cantons may keep energy-saving deductions until 2050 at the latest, and may levy a new property tax (Objektsteuer) on second homes. Property gains tax is cantonal and depends on the holding period (e.g. Zurich: +50% surcharge under 1 year, up to −50% after 20 years).

### Cited Findings
**Abolition of Eigenmietwert (pending change; effective 1 Jan 2029)**
- Vote 28 Sep 2025: 57.7% Yes, turnout 49.5%. Imputed rent on owner-occupied primary **and secondary** residences is abolished. — [EFD: Reform der Wohneigentumsbesteuerung](https://www.efd.admin.ch/de/abstimmung-reform-wohneigentumsbesteuerung)
- Debt interest (Schuldzinsen): deductible only for the part of wealth that falls on rented or leased real estate ("Schuldzinsen können nur noch für denjenigen Teil des Vermögens geltend gemacht werden, der auf vermietete und verpachtete Immobilien entfällt"). Interest on consumer credit and Lombard loans also becomes non-deductible. — [EFD](https://www.efd.admin.ch/de/abstimmung-reform-wohneigentumsbesteuerung)
- First-time buyers (Ersterwerberabzug): a time-limited and amount-limited interest deduction. A transitional rule lets those who bought before entry into force use the remaining years of the 7-year window. — [EFD](https://www.efd.admin.ch/de/abstimmung-reform-wohneigentumsbesteuerung)
- Maintenance (Unterhaltskosten) on owner-occupied property is no longer deductible. It stays deductible for rented property. — [EFD](https://www.efd.admin.ch/de/abstimmung-reform-wohneigentumsbesteuerung)
- Energy-saving and environmental deductions end for federal tax (owner-occupied). Cantons may keep them until **31 Dec 2050** at the latest. The deduction for monument preservation work (Denkmalpflege) is retained. — [EFD](https://www.efd.admin.ch/de/abstimmung-reform-wohneigentumsbesteuerung)
- Cantons may introduce a special property tax (Objektsteuer) on mainly self-used second homes; this is optional. Revenue effect: about CHF 1.8bn annual loss at a 1.5% mortgage rate, net gain at about 3%. — [EFD](https://www.efd.admin.ch/de/abstimmung-reform-wohneigentumsbesteuerung)
- Federal Council decision (24 Mar 2026): entry into force **1 Jan 2029**. 2028 would have been possible, but linking to the second-home tax required more cantonal lead time. Until the end of 2028 the Eigenmietwert stays taxable and current deductions apply. — [Blick, 24 Mar 2026](https://www.blick.ch/politik/jetzt-hat-der-bundesrat-entschieden-der-eigenmietwert-faellt-erst-2029-id21812710.html); see also [Tages-Anzeiger](https://www.tagesanzeiger.ch/eigenmietwert-abstimmung-bis-2028-muessen-sie-weiterzahlen-752440769308), [Raiffeisen](https://www.raiffeisen.ch/rch/de/wissen/wohnen/aktuelle-diskussion-eigenmietwert.html), [HEV Winterthur](https://www.hev-winterthur.ch/artikel/abschaffung-eigenmietwert-aktueller-stand-und-einschaetzungen-fuer-das-hauseigentum/)

**Property gains tax (Grundstückgewinnsteuer), cantonal**
- Zurich example: gains under CHF 5,000 are not taxed. The rate is 10%–35% on the first CHF 100,000 and 40% above that. Holding under 1 year: +50%; under 2 years: +25%. From year 5: −5%, plus −3% per further year, reaching −50% after 20 years. Example: a CHF 250,000 gain gives CHF 89,400 gross tax in ZH (as of Sep 2025). — [comparis: Grundstückgewinnsteuer](https://www.comparis.ch/immobilien/verkaufen/vertragsabschlussphase/grundstueckgewinnsteuer); [Swiss Life](https://www.swisslife.ch/de/private/blog/immo/das-wichtigste-zur-grundstueckgewinnsteuer.html)
- ESTV "Steuermäppchen" on Grundstückgewinnsteuer gives the overview of all cantons. — [ESTV Steuermäppchen Grundstückgewinnsteuer (2017)](https://www.estv.admin.ch/dam/estv/de/dokumente/estv/steuersystem/steuermaeppchen/steuermaeppchen-2017-grundstueckgewinnsteuer.pdf.download.pdf/steuermaeppchen-2017-grundstueckgewinnsteuer.pdf) (older edition)

### Inferences
- **Tax years 2025–2028 (filed 2026–2029):** the website must still explain Eigenmietwert, the flat-rate vs effective maintenance choice, energy investments and mortgage interest deductions. From tax year 2029 the owner-occupied home section changes fundamentally. Strategic tip often cited by banks: front-load renovations before 2029 while they are still deductible, and reconsider indirect amortisation. This is an inference from the rule change, not a sourced recommendation.
- Wealth tax on property continues after 2029. Only the income-tax side (Eigenmietwert and deductions) changes.

### Gaps
- **Pauschalabzug for maintenance:** the federal rule (10% of gross rental value if the building is ≤10 years old, 20% if older) and the cantonal variants were not confirmed by a fetched source this session. Verify via ESTV or Zurich Wegleitung.
- Eigenmietwert level (federal case law: at least 60% of market rent; cantons typically 60–70%) was not sourced here.
- Vermögenssteuerwert / amtlicher Wert method by canton (e.g. ZH formula value, BE amtlicher Wert, GE/VD estimation fiscale) was not researched in detail; VZ only says it is "clearly below market value".
- Handänderungssteuer (property transfer tax): not researched. Rates and abolition differ by canton (e.g. ZH abolished it; others levy about 1–3.3%). This is from memory and must be checked.
- Rented property income and property abroad: the general rule (foreign property is exempt in CH but included for the rate, "Progressionsvorbehalt"; and since 2029 the debt interest allocation rule) was not sourced. Verify via ESTV KS on interkantonale/internationale Steuerausscheidung.

---

## 7. Capital payments from pensions (Kapitalleistungen aus Vorsorge), staggering 3a, WEF

### Takeaway
Lump-sum payments from the 2nd pillar and 3a are taxed separately from other income, as a full annual tax. Federally the rate is one-fifth of the ordinary tariff, so at most 2.3%. All capital payments in the same year are added together, which is why withdrawals from several 3a accounts are often staggered over several years. The Federal Council's plan in Entlastungspaket 2027 (EP27) to tax these more heavily was **rejected by Parliament in early March 2026**. The current rules stay in force.

### Cited Findings
- Art. 38 DBG: capital payments from pensions are taxed separately, always as a full annual tax. Several payments in the same year are added together. The married tariff applies to couples living together at the end of the period; otherwise the single tariff. Federal tax is one-fifth of the ordinary tariffs, giving a maximum rate of 2.3% (one-fifth of 11.5%). — [Kanton BL: Kapitalleistungen aus Vorsorge](https://www.baselland.ch/politik-und-behorden/direktionen/finanz-und-kirchendirektion/steuerverwaltung/steuererklaerung-natuerliche-personen-und-e-tax-bl/einkuenfte/kapitalleistungen-aus-vorsorge); [Kanton TG Steuerpraxis StP 39 Nr. 2 (2026-01)](https://steuerpraxis.tg.ch/steuerpraxis/2026-01/stp-39-nr-2-berechnung-der-steuer-auf-kapitalleist); [Kanton SO Steuerbuch 047-01 (Aug 2025)](https://steuerbuch.so.ch/fileadmin/steuerbuch/aktuell/047-01_Vorsorgeleistungen_V04_2025-14-08.pdf)
- EP27: the Federal Council proposed a new progressive uniform tariff for capital payments (same burden as today up to CHF 100,000 for married couples). Parliament struck the measure: the Council of States rejected higher taxation for both 2nd pillar and 3a, and the National Council (second chamber) rejected it in early March 2026. — [VZ: Kapitalbezug – Parlament will Steuern nicht erhöhen](https://www.vermoegenszentrum.ch/wissen/kapitalbezug-parlament-will-steuern-nicht-erhoehen); [BDO: Steuererhöhung bei Vorsorgebezügen abgelehnt](https://www.bdo.ch/de-ch/publikationen/kapitalbezug-vorsorge-steuererhoehung-abgelehnt); [OBT: Planungssicherheit bei Pensionierung](https://www.obt.ch/de/infoboard/planungssicherheit-bei-pensionierung-keine-steuererhoehung-auf-kapitalbezuegen); background [Vischer](https://www.vischer.com/en/knowledge/blog/bundesrat-gibt-vorgesehene-anpassungen-zur-besteuerung-von-kapitalbezuegen-der-saeulen-2-und-3a-bekannt/)

### Inferences
- Staggering logic: because payments within one year are added together and the tariff is progressive, spreading 3a and PK withdrawals (and couples' withdrawals) over separate years lowers the total tax. Cantonal tariffs vary widely (some use a fraction of the ordinary rate, others their own tariff).

### Gaps
- WEF (Wohneigentumsförderung, advance withdrawal for home ownership): taxed like a capital payment at withdrawal, with the tax refunded on repayment. The rule that voluntary pension buy-ins are blocked until a WEF advance is repaid was not sourced this session.
- The 3-year lock on lump-sum withdrawal after a PK buy-in (Art. 79b para. 3 BVG) was not sourced.
- Cantonal tariff examples for capital payments were not collected.

---

## 8. Inheritance and gift taxes (Erbschafts- und Schenkungssteuer)

### Takeaway
There is no federal inheritance tax; it is cantonal. Schwyz is widely cited as levying none, and spouses as exempt everywhere (both unverified this session, see Gaps). Almost all cantons also exempt direct descendants. The exceptions are **Appenzell Innerrhoden, Neuchâtel and Vaud**, which still tax children. A federal initiative for a 50% inheritance tax on estates over CHF 50m (JUSO initiative) was voted on 30 Nov 2025; my recollection is that it was rejected, but this was not verified this session.

### Cited Findings
- Almost all cantons exempt direct descendants from inheritance and gift tax. Appenzell Innerrhoden, Neuchâtel and Vaud still tax direct descendants. AI taxes descendants' shares at 1% after a CHF 300,000 allowance each. NE and VD have their own allowances or thresholds. — [Blick: Wichtige Fragen zur Erbschaftssteuer](https://www.blick.ch/wirtschaft/wichtige-fragen-zur-erbschaftssteuer-erklaert-wann-erben-steuern-zahlen-muessen-und-wann-nicht-id22154011.html); [neho](https://neho.ch/de/blog/erbschaftssteuer-schweiz); [KPMG](https://kpmg.com/ch/de/themen/steuern/privatkunden-erbschaftssteuer-schenkungssteuer.html)
- Zurich gift and inheritance info sheet (2023). — [Stadt Winterthur / Kanton ZH Merkblatt Erbschaft Schenkung 2023](https://stadt.winterthur.ch/themen/leben-in-winterthur/arbeit-steuern/steuern/datei/398-merkblatt-erbschaft-schenkung-zh-2023-bf-def.pdf)
- Background on the JUSO initiative for an inheritance tax ("Initiative für eine Zukunft"). — [law.ch PDF](https://law.ch/wp-content/uploads/006_volksinitiative-erbschaftssteuerreform1.pdf)

### Gaps
- Not verified this session: Schwyz levies no inheritance or gift tax; Obwalden no inheritance tax (gift tax limited); Lucerne municipal inheritance tax on descendants (some municipalities historically). Check against the ESTV Steuermäppchen "Erbschafts- und Schenkungssteuern".
- Outcome and exact result of the 30 Nov 2025 vote on the JUSO inheritance tax initiative: not verified. Check admin.ch/abstimmungen.
- Current AI rate and allowance confirmed only via a secondary source; NE and VD figures were not extracted.

---

## Notes for writer: pending and changed items (as of Oct 2026)
- **Eigenmietwert abolition:** approved 28 Sep 2025 (57.7%), in force **1 Jan 2029**; old rules apply through tax year 2028 ([EFD](https://www.efd.admin.ch/de/abstimmung-reform-wohneigentumsbesteuerung), [Blick](https://www.blick.ch/politik/jetzt-hat-der-bundesrat-entschieden-der-eigenmietwert-faellt-erst-2029-id21812710.html)).
- **Capital withdrawal tax increase (EP27):** dropped by Parliament in March 2026 ([VZ](https://www.vermoegenszentrum.ch/wissen/kapitalbezug-parlament-will-steuern-nicht-erhoehen)). Watch for any new proposal.
- **Crypto working paper:** version dates are inconsistent across sources ([ESTV](https://www.estv.admin.ch/de/kryptowaehrungen-besteuerung) cites 3 Aug 2022). Check the PDF header.
