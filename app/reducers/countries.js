import {
  GET_COUNTRIES_LIST,
  GET_COUNTRIES_GEOM,
  GET_COUNTRIES_SITES,
  CHANGE_COLUMN_ACTIVATION,
  GET_COUNTRIES_STATS,
  GET_COUNTRIES_CRITICAL_SITES,
  TOGGLE_COUNTRIES_LAYER,
  GET_COUNTRIES_SPECIES,
  GET_COUNTRIES_POPULATIONS,
  GET_COUNTRIES_SIMILAR_SPECIES,
  SET_COUNTRY_PARAMS,
  SET_COUNTRY_SEARCH,
  SET_COUNTRY_SORT,
  SET_COUNTRY_COLUMN_FILTER
} from 'constants/action-types';
import { commonSort } from './common.js';

const ALL_COUNTRY_COLUMNS = {
  species: ['scientific_name', 'english_name', 'iucn_category', 'country_status', 'occurrence_status'],
  populations: ['scientific_name', 'english_name', 'iucn_category', 'population',
        'a', 'b', 'c', 'caf_action_plan', 'eu_birds_directive', 'flyway_range',
        'year_start', 'year_end', 'size_min', 'size_max', 'ramsar_criterion'],
  criticalSites: ['csn_name', 'protected', 'csn_species', 'total_percentage'],
  lookAlikeSpecies: ['original_species', 'english_name', 'population', 'original_a', 'original_b',
        'original_c', 'confusion_species', 'confusion_species_as'],
  sites: ['site_name', 'protected', 'iba_species', 'iba_in_danger']
};

const DEFAULT_COUNTRY_COLUMNS = {
  species: ['scientific_name', 'iucn_category', 'country_status', 'occurrence_status'],
  populations: ['scientific_name', 'iucn_category', 'population',
        'a', 'b', 'c', 'ramsar_criterion'],
  criticalSites: ['csn_name', 'protected', 'csn_species', 'total_percentage'],
  lookAlikeSpecies: ['original_species', 'population', 'original_a', 'original_b',
        'original_c', 'confusion_species', 'confusion_species_as'],
  sites: ['site_name', 'protected', 'iba_species', 'iba_in_danger']
};

const ALL_EXPANDED_COLUMNS = ['scientific_name', 'english_name', 'population', 'a', 'b', 'c'];
const DEFAULT_EXPANDED_COLUMNS = ['scientific_name', 'population', 'a', 'b', 'c'];

const initialState = {
  columns: DEFAULT_COUNTRY_COLUMNS.sites,
  expandedColumns: DEFAULT_EXPANDED_COLUMNS,
  allColumns: ALL_COUNTRY_COLUMNS.sites,
  allExpandedColumns: ALL_EXPANDED_COLUMNS,
  selected: '',
  selectedCategory: 'sites',
  searchFilter: '',
  geoms: false,
  countries: [],
  filter: '',
  stats: {},
  sites: {},
  criticalSites: {},
  species: {},
  populations: {},
  lookAlikeSpecies: {},
  layers: {
    sites: true
  },
  sort: {
    field: '',
    order: ''
  },
  columnFilter: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_COUNTRY_PARAMS: {
      const params = {
        selected: action.payload.country,
        selectedCategory: action.payload.category,
        filter: action.payload.filter,
        columns: DEFAULT_COUNTRY_COLUMNS[action.payload.category],
        allColumns: ALL_COUNTRY_COLUMNS[action.payload.category]
      };
      return Object.assign({}, state, params);
    }
    case CHANGE_COLUMN_ACTIVATION: {
      const columns = action.expanded
        ? state.expandedColumns.slice()
        : state.columns.slice();
      let newColumns = columns.filter((col) => col !== action.payload);
      if (columns.length === newColumns.length) {
        newColumns.push(action.payload);
        const prevColumns = action.expanded
        ? state.allExpandedColumns.slice()
        : state.allColumns.slice();
        newColumns = prevColumns.reduce((previous, currentItem) => {
          const isIn = newColumns.some((newCol) => newCol === currentItem);
          if (isIn) previous.push(currentItem);
          return previous;
        }, []);
      }
      return action.expanded
       ? Object.assign({}, state, { expandedColumns: newColumns })
       : Object.assign({}, state, { columns: newColumns });
    }
    case SET_COUNTRY_SEARCH:
      return Object.assign({}, state, { searchFilter: action.payload });
    case SET_COUNTRY_COLUMN_FILTER:
      return Object.assign({}, state, { columnFilter: action.payload });
    case GET_COUNTRIES_LIST:
      return Object.assign({}, state, { countries: action.payload });
    case GET_COUNTRIES_GEOM:
      return Object.assign({}, state, { geoms: action.payload });
    case GET_COUNTRIES_STATS: {
      const stats = Object.assign({}, state.stats, {});
      stats[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { stats });
    }
    case GET_COUNTRIES_SITES: {
      const sites = Object.assign({}, state.sites, {});
      sites[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { sites });
    }
    case GET_COUNTRIES_CRITICAL_SITES: {
      const criticalSites = Object.assign({}, state.criticalSites, {});
      criticalSites[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { criticalSites });
    }
    case GET_COUNTRIES_SPECIES: {
      const species = Object.assign({}, state.species, {});
      species[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { species });
    }
    case GET_COUNTRIES_POPULATIONS: {
      const populations = Object.assign({}, state.populations, {});
      populations[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { populations });
    }
    case GET_COUNTRIES_SIMILAR_SPECIES: {
      const lookAlikeSpecies = Object.assign({}, state.lookAlikeSpecies, {});
      lookAlikeSpecies[action.payload.iso] = action.payload.data;
      return Object.assign({}, state, { lookAlikeSpecies });
    }
    case TOGGLE_COUNTRIES_LAYER: {
      const layers = Object.assign({}, state.layers);
      layers[action.payload] = !layers[action.payload];
      return Object.assign({}, state, { layers });
    }

    case SET_COUNTRY_SORT: {
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
