import {
  CHANGE_COLUMN_ACTIVATION,
  GET_SPECIES_CRITICAL_SITES,
  GET_SPECIES_LIST,
  GET_SPECIES_LOOK_ALIKE_SPECIES,
  GET_SPECIES_POPULATION,
  GET_SPECIES_SITES,
  GET_SPECIES_STATS,
  SELECT_LA_SPECIES_POPULATION,
  SELECT_LA_SPECIES_POPULATION_SPECIES,
  SET_SPECIES_COLUMN_FILTER,
  SET_SPECIES_DETAIL_PARAMS,
  SET_SPECIES_DETAIL_SEARCH,
  SET_SPECIES_PARAMS,
  SET_SPECIES_SORT,
  TOGGLE_LEGEND_ITEM,
  TOGGLE_SPECIES_LAYER
} from 'constants/action-types';
import {
  ALL_EXPANDED_SPECIES_COLUMNS,
  ALL_SPECIES_COLUMNS,
  DEFAULT_EXPANDED_SPECIES_COLUMNS,
  DEFAULT_SPECIES_COLUMNS
} from 'constants/species';
import { commonSort } from './common';
import withTable from './withTable';

const initialState = {
  columns: DEFAULT_SPECIES_COLUMNS.over,
  allColumns: ALL_SPECIES_COLUMNS.over,
  list: false,
  selected: '',
  selectedCategory: 'sites',
  searchFilter: '',
  stats: {},
  sites: {},
  criticalSites: {},
  population: {},
  lookAlikeSpecies: {},
  layers: {
    sites: true,
    population: true
  },
  sort: {
    field: '',
    order: ''
  },
  selectedLASpeciesPopulation: null,
  highlightedPopulationId: null,
  columnFilter: {}
};

const speciesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPECIES_PARAMS: {
      const params = {
        selected: action.payload.id,
        selectedCategory: action.payload.category,
        columns: DEFAULT_SPECIES_COLUMNS[action.payload.category],
        allColumns: ALL_SPECIES_COLUMNS[action.payload.category]
      };
      return Object.assign({}, state, params);
    }
    case SET_SPECIES_DETAIL_PARAMS: {
      const params = {
        selected: action.payload.id,
        selectedCategory: action.payload.category,
        columns: DEFAULT_SPECIES_COLUMNS[action.payload.category],
        allColumns: ALL_SPECIES_COLUMNS[action.payload.category],
        selectedLASpeciesPopulation: action.payload.category === 'lookAlikeSpecies' ? state.selectLASpeciesPopulation : null
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
    case GET_SPECIES_CRITICAL_SITES: {
      const data = Object.assign({}, state.criticalSites, {});
      data[action.payload.id] = action.payload.data.error
        ? []
        : action.payload.data;
      return Object.assign({}, state, { criticalSites: data });
    }
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
    case GET_SPECIES_LOOK_ALIKE_SPECIES: {
      const data = Object.assign({}, state.lookAlikeSpecies, {});
      data[action.payload.id] = action.payload.data;
      return Object.assign({}, state, { lookAlikeSpecies: data });
    }
    case SELECT_LA_SPECIES_POPULATION: {
      const selectedLASpeciesPopulation = action.payload;

      return {
        ...state,
        columns: selectedLASpeciesPopulation ? DEFAULT_EXPANDED_SPECIES_COLUMNS : DEFAULT_SPECIES_COLUMNS.lookAlikeSpecies,
        allColumns: selectedLASpeciesPopulation ? ALL_EXPANDED_SPECIES_COLUMNS : ALL_SPECIES_COLUMNS.lookAlikeSpecies,
        selectedLASpeciesPopulation: action.payload
      };
    }
    case SELECT_LA_SPECIES_POPULATION_SPECIES: {
      return {
        ...state,
        selectedLASpeciesPopulation: {
          ...state.selectedLASpeciesPopulation,
          selectedALikeSpecies: action.payload
        }
      };
    }
    case TOGGLE_SPECIES_LAYER: {
      const layers = Object.assign({}, state.layers);
      layers[action.payload] = !layers[action.payload];
      return Object.assign({}, state, { layers });
    }
    case TOGGLE_LEGEND_ITEM: {
      return {
        ...state,
        highlightedPopulationId: action.payload.active ? action.payload.id : null
      };
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
      list.sort(commonSort(action.payload.field, action.payload.order));

      if (isResource) {
        const data = Object.assign({}, state[state.selectedCategory], { [state.selected]: list });
        return Object.assign({}, state, { [state.selectedCategory]: data, sort: action.payload });
      }
      return Object.assign({}, state, { list, sort: action.payload });
    }
    default:
      return state;
  }
};

export default withTable('species', speciesReducer);
