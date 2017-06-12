export function filterByColumns(data, activeFilters) {
  const filters = Object.keys(activeFilters);

  const filteredData = data.filter((item) => (
    filters.every((key) => ( // "Every" does AND connection, while "Some" does OR
      item[key] &&
      JSON.parse(activeFilters[key]).some((filter) => (
        item[key].toString().split(' ').some((col) => col.toUpperCase() === filter.toUpperCase())
      ))
    ))
  ));

  return filteredData;
}

export function matchSearch(searchFilter, value) {
  if (!searchFilter || !value) return false;
  const match = value.toString().match(new RegExp(searchFilter, 'gi'));
  return match && match.length > 0;
}

export function filterBySearch(data, searchFilter, columns) {
  const filteredData = data.filter((item) => {
    let match = false;

    for (let i = 0, cLength = columns.length; i < cLength; i++) {
      if (matchSearch(searchFilter, item[columns[i]])) {
        match = true;
        break;
      }
    }
    return match;
  });
  return filteredData.map((item) => {
    const modItem = Object.assign({}, item);

    for (let i = 0, cLength = columns.length; i < cLength; i++) {
      if (matchSearch(searchFilter, modItem[columns[i]])) {
        modItem[columns[i]] = modItem[columns[i]].toLowerCase().replace(searchFilter, `<span class="filtered">${searchFilter}</span>`);
      }
    }
    return modItem;
  });
}
