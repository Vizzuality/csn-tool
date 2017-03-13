export function filterData(data, activeFilters) {
  let filteredData = data;
  for (var key in activeFilters) {
    filteredData = filteredData.filter((item) => (
      item[key] && item[key].toString().toUpperCase() === activeFilters[key].toUpperCase()
    ));
  }

  return filteredData;
}
