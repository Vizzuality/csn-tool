export function filterData(data, activeFilters) {
  let filteredData = data;
  const filters = Object.keys(activeFilters);
  filters.forEach((key) => {
    filteredData = filteredData.filter((item) => (
      item[key] && item[key].toString().toUpperCase() === activeFilters[key].toUpperCase()
    ));
  });

  return filteredData;
}
