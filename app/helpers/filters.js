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
  return new RegExp(searchFilter, 'gi').test(value.toString());
}

export function filterBySearch(data, searchFilter, columns) {
  return data.reduce((results, item) => {
    const itemCopy = { ...item };
    let match = false;

    columns.forEach((column) => {
      if (matchSearch(searchFilter, itemCopy[column])) {
        itemCopy[column] = itemCopy[column].toLowerCase().replace(searchFilter, `<span class="filtered">${searchFilter}</span>`);
        match = true;
      }
    });

    if (match) results.push(itemCopy);

    return results;
  }, []);
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
