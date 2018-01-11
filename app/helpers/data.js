export function numberToThousands(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function uniqueBy(array = [], field = '') {
  return array.reduce((acc, item) => {
    if (acc.some(i => i[field] === item[field])) return acc;
    return [...acc, item];
  }, []);
}
