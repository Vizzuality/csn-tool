export function filterByColumns(data, activeFilters) {
  const filters = Object.keys(activeFilters);

  const filteredData = data.filter((item) => (
    filters.some((key) => ( // "Every" does AND connection, while "Some" does OR
      item[key] &&
        (activeFilters[key] === 'any' ||
         JSON.parse(activeFilters[key]).some((filter) => (
           item[key].toString().split(' ').some((col) => col.toUpperCase() === filter.toUpperCase())
         )))
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

export function filterData({ data, columns, filter, columnFilter } = {}) {
  if (!data) return [];

  const searchFilter = (typeof filter === 'string') && filter.toLowerCase();

  let filteredData = data.slice();
  if (searchFilter) {
    filteredData = filterBySearch(filteredData, searchFilter, columns);
  }

  if (columnFilter && Object.keys(columnFilter).length !== 0) {
    filteredData = filterByColumns(filteredData, columnFilter);
  }

  return filteredData;
}
