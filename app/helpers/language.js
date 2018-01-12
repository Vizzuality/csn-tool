export function filterColumnsBasedOnLanguage(columns, lang) {
  return columns.filter((column) => (
    !(column === 'english_name' && lang === 'fr') &&
    !(column === 'french_name' && lang !== 'fr')
  ));
}
