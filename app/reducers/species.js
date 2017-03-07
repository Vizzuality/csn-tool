import { GET_SPECIES_STATS, GET_SPECIES_LIST, GET_SPECIES_SITES, GET_SPECIES_POPULATION,
  GET_SPECIES_THREATS, GET_SPECIES_HABITATS, GET_SPECIES_LOOK_ALIKE_SPECIES,
  SET_SPECIES_DETAIL_PARAMS, SET_SPECIES_SORT, SET_SPECIES_COLUMN_FILTER,
  SET_SPECIES_DETAIL_SEARCH, TOGGLE_SPECIES_LAYER } from 'constants';

const initialState = {
  list: false,
  selected: '',
  selectedCategory: 'sites',
  searchFilter: '',
  stats: {},
  sites: {},
  population: {},
  threats: {},
  habitats: {},
  lookAlikeSpecies: {},
  layers: {
    sites: true,
    population: true
  },
  sort: {
    field: '',
    order: ''
  },
  columnFilter: {
    field: '',
    value: ''
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SPECIES_DETAIL_PARAMS: {
      const params = {
        selected: action.payload.id,
        selectedCategory: action.payload.category
      };
      return Object.assign({}, state, params);
    }
    case SET_SPECIES_COLUMN_FILTER:
      return Object.assign({}, state, { columnFilter: action.payload });
    case SET_SPECIES_DETAIL_SEARCH:
      return Object.assign({}, state, { searchFilter: action.payload });
    case GET_SPECIES_STATS:
      return Object.assign({}, state, { stats: action.payload });
    case GET_SPECIES_LIST:
      return Object.assign({}, state, { list: action.payload });
    case GET_SPECIES_SITES: {
      const data = Object.assign({}, state.sites, {});
      data[action.payload.id] = action.payload.data.error
        ? []
        : action.payload.data;
      return Object.assign({}, state, { sites: data });
    }
    case GET_SPECIES_POPULATION: {
      const data = Object.assign({}, state.population, {});
      data[action.payload.id] = action.payload.data;
      return Object.assign({}, state, { population: data });
    }
    case GET_SPECIES_THREATS: {
      const data = Object.assign({}, state.threats, {});
      data[action.payload.id] = action.payload.data;
      return Object.assign({}, state, { threats: data });
    }
    case GET_SPECIES_HABITATS: {
      const data = Object.assign({}, state.habitats, {});
      data[action.payload.id] = action.payload.data;
      return Object.assign({}, state, { habitats: data });
    }
    case GET_SPECIES_LOOK_ALIKE_SPECIES: {
      const data = Object.assign({}, state.lookAlikeSpecies, {});
      data[action.payload.id] = action.payload.data;
      return Object.assign({}, state, { lookAlikeSpecies: data });
    }
    case TOGGLE_SPECIES_LAYER: {
      const layers = Object.assign({}, state.layers);
      layers[action.payload] = !layers[action.payload];
      return Object.assign({}, state, { layers });
    }
    case SET_SPECIES_SORT: {
      let list = null;
      let isResource = false;
      if (state.selected && state.selectedCategory) {
        isResource = true;
        list = [...state[state.selectedCategory][state.selected]];
      } else {
        list = [...state.list];
      }
      const sortOrder = action.payload.order === 'desc' ? -1 : 1;
      list.sort((a, b) => {
        const itemA = a[action.payload.field] ? a[action.payload.field].toString().trim().toUpperCase() : '';
        const itemB = b[action.payload.field] ? b[action.payload.field].toString().trim().toUpperCase() : '';
        if (itemA < itemB) return -1 * sortOrder;
        if (itemA > itemB) return 1 * sortOrder;
        return 0;
      });

      if (isResource) {
        const data = Object.assign({}, state[state.selectedCategory], { [state.selected]: list });
        return Object.assign({}, state, { [state.selectedCategory]: data, sort: action.payload });
      }
      return Object.assign({}, state, { list, sort: action.payload });
    }
    default:
      return state;
  }
}
