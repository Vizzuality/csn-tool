function normalizeSiteStatus(string) {
  const uString = string.toUpperCase();
  if (uString.indexOf('WHOLE') >= 0) return 'whole';
  if (uString.indexOf('MOST') >= 0) return 'most';
  if (uString.indexOf('SOME') >= 0) return 'some';
  if (uString.indexOf('LITTLE') >= 0) return 'little';
  return 'unknown';
}

module.exports = {
  normalizeSiteStatus
};
