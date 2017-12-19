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

export const ALL_EXPANDED_SPECIES_COLUMNS = ['scientific_name', 'english_name', 'population', 'a', 'b', 'c'];
export const DEFAULT_EXPANDED_SPECIES_COLUMNS = ['scientific_name', 'population', 'a', 'b', 'c'];
