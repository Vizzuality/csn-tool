export const commonSort = (field, order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  return (a, b) => {
    let itemA = a[field] || '';
    itemA = (typeof itemA === 'string') ? itemA.toString().trim().toUpperCase() : itemA;

    let itemB = b[field] || '';
    itemB = (typeof itemB === 'string') ? itemB.toString().trim().toUpperCase() : itemB;

    if (itemA < itemB) return -1 * sortOrder;
    if (itemA > itemB) return 1 * sortOrder;
    return 0;
  };
};
