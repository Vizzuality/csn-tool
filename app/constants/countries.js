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
