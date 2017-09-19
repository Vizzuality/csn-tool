const PROTECTION_LEVELS = ['Little/none', 'Some', 'Most', 'Whole', 'Unknown'];

const formatSortItem = (item = '') => {
  switch (typeof item) {
    case 'string': {
      const protectionIndex = PROTECTION_LEVELS.map((level) => level.toLowerCase()).indexOf(item.toLowerCase());
      if (protectionIndex > -1) {
        return protectionIndex;
      }

      return item.toString().trim().toUpperCase();
    }
    default:
      return item;
  }
};

export const commonSort = (field, order) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  return (a, b) => {
    const itemA = formatSortItem(a[field]);
    const itemB = formatSortItem(b[field]);

    if (itemA < itemB) return -1 * sortOrder;
    if (itemA > itemB) return 1 * sortOrder;
    return 0;
  };
};
