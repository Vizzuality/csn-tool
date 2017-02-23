import { connect } from 'react-redux';
import SpeciesTable from 'components/species/SpeciesTable';

function getSpeciesData(species, columns) {
  const data = species.list || false;

  if (!data || !species.searchFilter) return data;

  const newData = data.map((a) => Object.assign({}, a));

  const filteredData = newData.filter((item) => {
    let match = false;
    const modItem = item;
    const searchFilter = species.searchFilter.toLowerCase();

    for (let i = 0, cLength = columns.length; i < cLength; i++) {
      if (typeof modItem[columns[i]] === 'string' && modItem[columns[i]].toLowerCase().indexOf(searchFilter) >= 0) {
        modItem[columns[i]] = modItem[columns[i]].toLowerCase().replace(searchFilter, `<span class="filtered">${searchFilter}</span>`);
        match = true;
        break;
      }
    }
    return match;
  });

  return filteredData;
}

const mapStateToProps = (state) => {
  const columns = ['scientific_name', 'english_name', 'population', 'genus', 'family'];
  return {
    species: state.species.selected,
    category: state.species.selectedCategory,
    data: getSpeciesData(state.species, columns),
    columns
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesTable);
