import { GET_SPECIES_STATS, GET_SPECIES_LIST, GET_SPECIES_SITES, GET_SPECIES_POPULATION,
  GET_SPECIES_CRITICAL_SITES, GET_SPECIES_LOOK_ALIKE_SPECIES, SET_SPECIES_PARAMS,
  TOGGLE_LEGEND_ITEM, SET_SPECIES_DETAIL_PARAMS, SET_SPECIES_SORT,
  SET_SPECIES_COLUMN_FILTER, SET_SPECIES_DETAIL_SEARCH, TOGGLE_SPECIES_LAYER,
  CHANGE_COLUMN_ACTIVATION } from 'constants/index.js';
import { commonSort } from './common.js';

const ALL_SPECIES_COLUMNS = {
  over: ['scientific_name', 'english_name', 'genus', 'family', 'iucn_category',
    'aewa_annex_2'],
  population: ['population', 'iucn_category', 'a', 'b', 'c',
    'caf_action_plan', 'eu_birds_directive', 'flyway_range', 'year_start',
    'year_end', 'size_min', 'size_max', 'ramsar_criterion'],
  lookAlikeSpecies: ['population', 'original_a', 'original_b', 'original_c', 'confusion_species', 'confusion_species_as'],
  criticalSites: ['country', 'csn_site_name', 'protected', 'population',
    'season', 'start', 'end', 'minimum', 'maximum', 'geometric_mean',
    'units', 'percentfly', 'csn1', 'csn2'],
  sites: ['country', 'csn_site_name', 'protected', 'season', 'start', 'end', 'minimum',
    'maximum', 'geometric_mean', 'units', 'iba_criteria']
};

const DEFAULT_SPECIES_COLUMNS = {
  over: ['scientific_name', 'genus', 'family', 'iucn_category', 'aewa_annex_2'],
  population: ['population', 'iucn_category', 'a', 'b', 'c', 'ramsar_criterion'],
  lookAlikeSpecies: ['population', 'original_a', 'original_b', 'original_c', 'confusion_species', 'confusion_species_as'],
  criticalSites: ['country', 'csn_site_name', 'population', 'season',
    'geometric_mean', 'units', 'percentfly'],
  sites: ['country', 'site_name', 'season', 'geometric_mean', 'units', 'iba_criteria']
};

const initialState = {
  allColumns: ALL_SPECIES_COLUMNS.over,
  columns: DEFAULT_SPECIES_COLUMNS.over,
  list: false,
  selected: '',
  selectedCategory: 'sites',
  searchFilter: '',
  stats: {},
  sites: {},
  criticalSites: {},
  population: {},
  lookAlikeSpecies: {},
  activeBounds: [],
  layers: {
    sites: true,
    population: true
  },
  sort: {
    field: '',
    order: ''
  },
  columnFilter: {}
};

export default function (state = initialState, action) {
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
        allColumns: ALL_SPECIES_COLUMNS[action.payload.category]
      };
      return Object.assign({}, state, params);
    }
    case CHANGE_COLUMN_ACTIVATION: {
      const columns = state.columns.slice();
      let newColumns = columns.filter((col) => col !== action.payload);
      if (columns.length === newColumns.length) {
        newColumns.push(action.payload);
        const prevColumns = state.allColumns.slice();
        newColumns = prevColumns.reduce((previous, currentItem) => {
          const isIn = newColumns.some((newCol) => newCol === currentItem);
          if (isIn) previous.push(currentItem);
          return previous;
        }, []);
      }
      return Object.assign({}, state, { columns: newColumns });
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
    case TOGGLE_SPECIES_LAYER: {
      const layers = Object.assign({}, state.layers);
      layers[action.payload] = !layers[action.payload];
      return Object.assign({}, state, { layers });
    }
    case TOGGLE_LEGEND_ITEM: {
      const activeBounds = state.activeBounds.slice(0);
      const id = action.payload.id;
      const active = action.payload.active;

      const foundBound = activeBounds.filter((bound) => bound.id === id)[0];
      if (!foundBound) {
        activeBounds.push({ id, active });
      }

      const newState = Object.assign({}, state, {
        activeBounds: activeBounds.map((bound) =>
          Object.assign({}, bound, {
            active: (bound.id === id) && active
          })
      ) });

      return newState;
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
}
