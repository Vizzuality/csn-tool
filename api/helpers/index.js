function normalizeSiteStatus(string) {
  if (string && string !== undefined) {
    const uString = string.toUpperCase();
    if (uString.indexOf('WHOLE') >= 0) return 'whole';
    if (uString.indexOf('MOST') >= 0) return 'most';
    if (uString.indexOf('SOME') >= 0) return 'some';
    if (uString.indexOf('LITTLE') >= 0) return 'little';
  }
  return 'unknown';
}

function mergeNames(data, params) {
  return data.map((item) => {
    const newItem = item;
    params.forEach((param) => {
      newItem[param.columnName] = `${item[param.field1]} (${item[param.field2]})`;
    });
    return newItem;
  });
}

module.exports = {
  normalizeSiteStatus,
  mergeNames
};
