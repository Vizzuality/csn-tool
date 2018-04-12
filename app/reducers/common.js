const PROTECTION_LEVELS = ['Little/none', 'Some', 'Most', 'Whole', 'Unknown'];
const IUCN_CATEGORIES = ['CR', 'EN', 'VU', 'NT', 'DD', 'LC'];

const formatSortItem = (column, item = '') => {
  switch (typeof item) {
    case 'string': {
      const arr = column === 'iucn_category' ? IUCN_CATEGORIES : PROTECTION_LEVELS;
      const protectionIndex = arr.map((level) => level.toLowerCase()).indexOf(item.toLowerCase());
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
    const itemA = formatSortItem(field, a[field]);
    const itemB = formatSortItem(field, b[field]);

    if (itemA < itemB) return -1 * sortOrder;
    if (itemA > itemB) return 1 * sortOrder;
    return 0;
  };
};

export const toggleLayer = (state, action) => {
  const layers = { ...state.layers };
  layers[action.payload] = !layers[action.payload];
  return { ...state, layers };
};
