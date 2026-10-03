/** Rows of the canton-vs-federal deduction table. `bund: null` = no federal equivalent. */
export const ABZUG_ZEILEN: { label: string; kanton: string; bund: string | null }[] = [
  { label: 'Fahrkosten, höchstens', kanton: 'fahrkosten_max', bund: 'fahrkosten_max' },
  { label: 'Kinderabzug pro Kind', kanton: 'kinderabzug', bund: 'kinderabzug' },
  { label: 'Kinderbetreuung durch Dritte, höchstens pro Kind', kanton: 'kinderdrittbetreuung_max', bund: 'kinderdrittbetreuung_max' },
  { label: 'Versicherungsprämien, alleinstehend', kanton: 'versicherung_alleinstehend', bund: 'versicherung_alleinstehend' },
  { label: 'Versicherungsprämien, verheiratet', kanton: 'versicherung_verheiratet', bund: 'versicherung_verheiratet' },
  { label: 'Versicherungsprämien, pro Kind', kanton: 'versicherung_pro_kind', bund: 'versicherung_pro_kind' },
  { label: 'Zweiverdienerabzug', kanton: 'zweiverdiener', bund: 'zweiverdiener_max' },
  { label: 'Pauschalabzug Liegenschaftsunterhalt', kanton: 'liegenschaft_pauschal', bund: 'liegenschaft_pauschal_alt' },
];
