import {
  GET_SPECIES_CRITICAL_SITES,
  GET_SPECIES_LIST,
  GET_SPECIES_LOOK_ALIKE_SPECIES,
  GET_SPECIES_LOOK_ALIKE_SPECIES_POPULATION,
  GET_SPECIES_POPULATION,
  GET_SPECIES_SITES,
  GET_SPECIES_STATS,
  SET_SPECIES_DETAIL_PARAMS,
  SET_SPECIES_PARAMS,
  TOGGLE_SPECIES_LAYER,
  TOGGLE_SPECIES_LEGEND_ITEM
} from 'constants/action-types';
import {
  ALL_SPECIES_COLUMNS,
  DEFAULT_SPECIES_COLUMNS,
  TABLES
} from 'constants/tables';
import withTable from 'reducers/withTable';
import { toggleLayer } from 'reducers/common';

const initialState = {
  columns: DEFAULT_SPECIES_COLUMNS.over,
  allColumns: ALL_SPECIES_COLUMNS.over,
  list: false,
  selected: '',
  selectedCategory: 'sites',
  selectedLASpeciesPopulation: null,
  selectedTableItem: null,
  searchFilter: '',
  stats: {},
  sites: {},
  criticalSites: {},
  population: {},
  lookAlikeSpecies: {},
  lookAlikeSpeciesPopulation: {},
  layers: {
    sites: true,
    population: true,
    freshwaterFlowPresent: false,
    freshwaterFlow2050: false,
    inundationPresent: false,
    inundation2050: false
  },
  sort: {
    field: '',
    order: ''
  },
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
      const category = action.payload.category;
      const params = {
        selected: action.payload.id,
        selectedCategory: category,
        columns: DEFAULT_SPECIES_COLUMNS[category],
        allColumns: ALL_SPECIES_COLUMNS[category],
        selectedLASpeciesPopulation: category === 'lookAlikeSpeciesPopulation' ? action.payload.population : null,
        selectedTableItem: null
      };
      return Object.assign({}, state, params);
    }
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
    case GET_SPECIES_LOOK_ALIKE_SPECIES_POPULATION: {
      const data = Object.assign({}, state.lookAlikeSpeciesPopulation, {});
      data[action.payload.populationId] = action.payload.data;
      return Object.assign({}, state, { lookAlikeSpeciesPopulation: data });
    }
    case TOGGLE_SPECIES_LAYER: return toggleLayer(state, action);
    case TOGGLE_SPECIES_LEGEND_ITEM: {
      return {
        ...state,
        highlightedPopulationId: action.payload.active ? action.payload.id : null
      };
    }
    default:
      return state;
  }
};

export default withTable(TABLES.SPECIES, speciesReducer);
