export const TABLES = {
  THRESHOLDS: 'THRESHOLDS',
  SITES: 'CITES',
  COUNTRIES: 'COUNTRIES',
  SPECIES: 'SPECIES',
  SEARCH: 'SEARCH'
};

export const ALL_COUNTRY_COLUMNS = {
  species: ['scientific_name', 'english_name', 'iucn_category', 'country_status', 'occurrence_status'],
  populations: ['scientific_name', 'english_name', 'iucn_category', 'population',
                'a', 'b', 'c', 'caf_action_plan', 'eu_birds_directive', 'flyway_range',
                'year_start', 'year_end', 'size_min', 'size_max', 'ramsar_criterion'],
  criticalSites: ['csn_name', 'protected', 'csn_species', 'total_percentage'],
  lookAlikeSpecies: ['original_species', 'english_name', 'population', 'original_a', 'original_b',
                     'original_c', 'confusion_species', 'confusion_species_as'],
  lookAlikeSpeciesPopulation: ['scientific_name', 'english_name', 'population', 'a', 'b', 'c'],
  sites: ['site_name', 'protected', 'iba_species', 'iba_in_danger']
};

export const DEFAULT_COUNTRY_COLUMNS = {
  species: ['scientific_name', 'iucn_category', 'country_status', 'occurrence_status'],
  populations: ['scientific_name', 'iucn_category', 'population', 'a', 'b', 'c', 'ramsar_criterion'],
  criticalSites: ['csn_name', 'protected', 'csn_species', 'total_percentage'],
  lookAlikeSpecies: ['original_species', 'population', 'original_a', 'original_b',
                     'original_c', 'confusion_species', 'confusion_species_as'],
  lookAlikeSpeciesPopulation: ['scientific_name', 'population', 'a', 'b', 'c'],
  sites: ['site_name', 'protected', 'iba_species', 'iba_in_danger']
};

export const ALL_SITES_COLUMNS = {
  csn: ['country', 'csn_name', 'protected', 'csn', 'total_percentage'],
  iba: ['country', 'site_name', 'protected', 'iba_species', 'iba_in_danger'],
  ibaSpecies: ['scientific_name', 'english_name', 'iucn_category', 'season', 'start',
               'end', 'minimum', 'maximum', 'geometric_mean', 'units', 'iba_criteria'],
  csnSpecies: ['scientific_name', 'english_name', 'iucn_category', 'population',
               'season', 'start', 'end', 'minimum', 'maximum', 'geometric_mean', 'units',
               'percentfly', 'csn1', 'csn2']
};

export const DEFAULT_SITES_COLUMNS = {
  csn: ['country', 'csn_name', 'protected', 'csn', 'total_percentage'],
  iba: ['country', 'site_name', 'protected', 'iba_species', 'iba_in_danger'],
  ibaSpecies: ['scientific_name', 'season', 'geometric_mean', 'units', 'iba_criteria'],
  csnSpecies: ['scientific_name', 'population', 'season', 'geometric_mean', 'units',
               'percentfly']
};

export const ALL_SPECIES_COLUMNS = {
  over: ['scientific_name', 'english_name', 'genus', 'family', 'iucn_category',
    'aewa_annex_2'],
  population: ['population', 'iucn_category', 'a', 'b', 'c',
    'caf_action_plan', 'eu_birds_directive', 'flyway_range', 'year_start',
    'year_end', 'size_min', 'size_max', 'ramsar_criterion'],
  lookAlikeSpecies: ['population', 'original_a', 'original_b', 'original_c', 'confusion_species', 'confusion_species_as'],
  lookAlikeSpeciesPopulation: ['scientific_name', 'english_name', 'population', 'a', 'b', 'c'],
  criticalSites: ['country', 'csn_site_name', 'protected', 'population',
    'season', 'start', 'end', 'minimum', 'maximum', 'geometric_mean',
    'units', 'percentfly', 'csn1', 'csn2'],
  sites: ['country', 'site_name', 'protected', 'season', 'start', 'end', 'minimum',
    'maximum', 'geometric_mean', 'units', 'iba_criteria']
};

export const DEFAULT_SPECIES_COLUMNS = {
  over: ['scientific_name', 'genus', 'family', 'iucn_category', 'aewa_annex_2'],
  population: ['population', 'iucn_category', 'a', 'b', 'c', 'ramsar_criterion'],
  lookAlikeSpecies: ['population', 'original_a', 'original_b', 'original_c', 'confusion_species', 'confusion_species_as'],
  lookAlikeSpeciesPopulation: ['scientific_name', 'population', 'a', 'b', 'c'],
  criticalSites: ['country', 'csn_site_name', 'population', 'season',
    'geometric_mean', 'units', 'percentfly'],
  sites: ['country', 'site_name', 'season', 'geometric_mean', 'units', 'iba_criteria']
};

export const ALL_THRESHOLD_COLUMNS = [
  'scientific_name', 'english_name', 'iucn_category',
  'population', 'a', 'b', 'c', 'caf_action_plan', 'eu_birds_directive',
  'flyway_range', 'year_start', 'year_end', 'size_min', 'size_max',
  'ramsar_criterion'
];

export const DEFAULT_THRESHOLD_COLUMNS = ['scientific_name', 'iucn_category', 'population', 'a', 'b', 'c', 'ramsar_criterion'];
