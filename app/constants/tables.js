export const TABLES = {
  THRESHOLDS: 'THRESHOLDS',
  SITES: 'CITES',
  COUNTRIES: 'COUNTRIES',
  SPECIES: 'SPECIES',
  SEARCH: 'SEARCH'
};

export const ALL_COUNTRY_COLUMNS = {
  species: ['id', 'scientific_name', 'english_name', 'french_name', 'iucn_category', 'country_status', 'occurrence_status'],
  populations: ['id', 'pop_id', 'scientific_name', 'english_name', 'french_name', 'iucn_category', 'population',
                'a', 'b', 'c', 'caf_action_plan', 'eu_birds_directive', 'flyway_range',
                'year_start', 'year_end', 'size_min', 'size_max', 'ramsar_criterion'],
  criticalSites: ['site_id', 'lat', 'lon', 'csn_name', 'protected', 'csn_species', 'total_percentage'],
  triggerSuitability: ['population_name', 'species', 'current_suitability',
    'future_suitability', 'change_suitability', 'threshold', 'season_ev'],
  lookAlikeSpecies: ['id', 'original_species', 'english_name', 'french_name', 'population', 'original_a', 'original_b',
                     'original_c', 'confusion_species', 'confusion_species_as'],
  lookAlikeSpeciesPopulation: ['id', 'pop_id', 'scientific_name', 'english_name', 'french_name', 'population', 'a', 'b', 'c'],
  sites: ['site_id', 'lat', 'lon', 'site_name', 'protected', 'iba_species', 'iba_in_danger']
};

export const DEFAULT_COUNTRY_COLUMNS = {
  species: ['scientific_name', 'english_name', 'iucn_category', 'country_status', 'occurrence_status'],
  populations: ['scientific_name', 'english_name', 'iucn_category', 'population', 'a', 'b', 'c', 'ramsar_criterion'],
  criticalSites: ['csn_name', 'protected', 'csn_species', 'total_percentage'],
  lookAlikeSpecies: ['original_species', 'english_name', 'population', 'original_a', 'original_b',
                     'original_c', 'confusion_species', 'confusion_species_as'],
  lookAlikeSpeciesPopulation: ['scientific_name', 'english_name', 'population', 'a', 'b', 'c'],
  triggerSuitability: ['population_name', 'species', 'current_suitability',
    'future_suitability', 'change_suitability', 'threshold', 'season_ev'],
  sites: ['site_name', 'protected', 'iba_species', 'iba_in_danger']
};

export const ALL_SITES_COLUMNS = {
  csn: ['site_id', 'lat', 'lon', 'country', 'csn_name', 'protected', 'csn', 'total_percentage'],
  iba: ['site_id', 'lat', 'lon', 'country', 'site_name', 'protected', 'iba_species', 'iba_in_danger'],
  ibaSpecies: ['id', 'scientific_name', 'english_name', 'french_name', 'iucn_category', 'season', 'start',
               'end', 'minimum', 'maximum', 'geometric_mean', 'units', 'iba_criteria'],
  csnSpecies: ['id', 'scientific_name', 'english_name', 'french_name', 'iucn_category', 'population',
               'season', 'start', 'end', 'minimum', 'maximum', 'geometric_mean', 'units',
               'percentfly', 'csn1', 'csn2'],
  csnVulnerability: ['id', 'scientific_name', 'english_name', 'season', 'current_suitability',
    'future_suitability', 'change_suitability', 'threshold', 'season_ev']
};

export const DEFAULT_SITES_COLUMNS = {
  csn: ['country', 'csn_name', 'protected', 'csn', 'total_percentage'],
  iba: ['country', 'site_name', 'protected', 'iba_species', 'iba_in_danger'],
  ibaSpecies: ['scientific_name', 'english_name', 'season', 'geometric_mean', 'units', 'iba_criteria'],
  csnSpecies: ['scientific_name', 'english_name', 'population', 'season', 'geometric_mean', 'units',
               'percentfly'],
  csnVulnerability: ['scientific_name', 'english_name', 'season', 'current_suitability',
    'future_suitability', 'change_suitability', 'threshold', 'season_ev']
};

export const ALL_SPECIES_COLUMNS = {
  over: ['id', 'scientific_name', 'english_name', 'french_name', 'genus', 'family', 'iucn_category',
    'aewa_annex_2'],
  population: ['pop_id', 'population', 'iucn_category', 'a', 'b', 'c',
    'caf_action_plan', 'eu_birds_directive', 'flyway_range', 'year_start',
    'year_end', 'size_min', 'size_max', 'size_method', 'trend_method', 'ramsar_criterion'],
  lookAlikeSpecies: ['id', 'pop_id', 'population', 'original_a', 'original_b',
    'original_c', 'confusion_species', 'confusion_species_as'],
  lookAlikeSpeciesPopulation: ['id', 'scientific_name', 'english_name', 'french_name', 'population', 'a', 'b', 'c'],
  criticalSites: ['site_id', 'lat', 'lon', 'country', 'csn_site_name', 'protected', 'pop_id', 'population',
    'season', 'start', 'end', 'minimum', 'maximum', 'geometric_mean',
    'units', 'percentfly', 'csn1', 'csn2'],
  sites: ['site_id', 'lat', 'lon', 'country', 'site_name', 'protected', 'season', 'start', 'end', 'minimum',
    'maximum', 'geometric_mean', 'units', 'iba_criteria'],
  populationVulnerability: ['pop_id', 'population_name', 'season', 'change_in_suitability_of_all_sites',
    'change_in_number_of_suitable_sites', 'change_in_suitability_of_critical_sites',
    'change_in_proportion_supported', 'range_change', 'range_overlap'],
  triggerCriticalSuitability: ['country', 'site_id', 'lat', 'lon', 'csn_site_name', 'pop_id', 'population_name',
    'season', 'percentfly', 'current_suitability', 'future_suitability',
    'change_suitability', 'threshold', 'season_ev']
};

export const DEFAULT_SPECIES_COLUMNS = {
  over: ['scientific_name', 'english_name', 'genus', 'family', 'iucn_category', 'aewa_annex_2'],
  population: ['population', 'iucn_category', 'a', 'b', 'c', 'ramsar_criterion'],
  lookAlikeSpecies: ['population', 'original_a', 'original_b', 'original_c', 'confusion_species', 'confusion_species_as'],
  lookAlikeSpeciesPopulation: ['scientific_name', 'english_name', 'population', 'a', 'b', 'c'],
  criticalSites: ['country', 'csn_site_name', 'population', 'season',
    'geometric_mean', 'units', 'percentfly'],
  sites: ['country', 'site_name', 'season', 'geometric_mean', 'units', 'iba_criteria'],
  populationVulnerability: ['population_name', 'season', 'change_in_suitability_of_all_sites',
    'change_in_number_of_suitable_sites', 'change_in_suitability_of_critical_sites',
    'change_in_proportion_supported', 'range_change', 'range_overlap'],
  triggerCriticalSuitability: ['country', 'csn_site_name', 'population_name',
    'season', 'percentfly', 'current_suitability', 'future_suitability',
    'change_suitability', 'threshold', 'season_ev']
};

export const ALL_THRESHOLD_COLUMNS = [
  'scientific_name', 'english_name', 'french_name', 'iucn_category',
  'population', 'a', 'b', 'c', 'caf_action_plan', 'eu_birds_directive',
  'flyway_range', 'year_start', 'year_end', 'size_min', 'size_max',
  'ramsar_criterion'
];

export const DEFAULT_THRESHOLD_COLUMNS = ['scientific_name', 'english_name',
  'iucn_category', 'population', 'a', 'b', 'c', 'ramsar_criterion'];

export const SEARCH_COLUMNS = {
  species: {
    columns: DEFAULT_SPECIES_COLUMNS.over,
    allColumns: ALL_SPECIES_COLUMNS.over
  },
  ibas: {
    columns: DEFAULT_SITES_COLUMNS.iba,
    allColumns: ALL_SITES_COLUMNS.iba
  },
  criticalSites: {
    columns: DEFAULT_SITES_COLUMNS.csn,
    allColumns: ALL_SITES_COLUMNS.csn
  },
  populations: {
    columns: ['scientific_name', ...DEFAULT_SPECIES_COLUMNS.population],
    allColumns: ['scientific_name', 'english_name', 'french_name', ...ALL_SPECIES_COLUMNS.population]
  }
};
