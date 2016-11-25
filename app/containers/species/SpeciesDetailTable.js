import { connect } from 'react-redux';
import SpeciesDetailTable from 'components/species/SpeciesDetailTable';

function getSpeciesDetailColums(category) {
  switch (category) {
    case 'habitats':
      return ['scientific_name', 'english_name', 'populations', 'genus', 'family'];
    case 'populations':
      return ['scientific_name', 'english_name', 'populations', 'genus', 'family'];
    case 'threats':
      return ['scientific_name', 'english_name', 'populations', 'genus', 'family'];
    default:
      return ['site_name', 'protection_status', 'iba', 'csn'];
  }
}

function getSpeciesDetailData(species, columns) {
  const data = species[species.selectedCategory] && species[species.selectedCategory][species.selected]
    ? species[species.selectedCategory][species.selected]
    : false;

  console.log("It's here!!!", species);
  console.log("It's here!!!", data);

  if (!data || !species.searchFilter) return data;

  const newData = data.map((a) => Object.assign({}, a));

  const filteredData = newData.filter((item) => {
    let match = false;
    const modItem = item;
    const searchFilter = species.searchFilter.toLowerCase();

    for (let i = 0, cLength = columns.length; i < cLength; i++) {
      if (typeof modItem[columns[i]] === 'string' && modItem[columns[i]].toLowerCase().indexOf(searchFilter) >= 0) {
        modItem[columns[i]] = modItem[columns[i]].toLowerCase().replace(searchFilter, `<span>${searchFilter}</span>`);
        match = true;
        break;
      }
    }
    return match;
  });

  return filteredData;
}

const mapStateToProps = (state) => {
  const columns = getSpeciesDetailColums(state.species.selectedCategory);
  return {
    species: state.species.selected,
    category: state.species.selectedCategory,
    data: getSpeciesDetailData(state.species, columns),
    columns
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetailTable);
