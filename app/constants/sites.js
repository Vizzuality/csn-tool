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
