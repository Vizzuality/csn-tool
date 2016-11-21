import React from 'react';
import TableList from 'components/tables/TableList';
import LoadingSpinner from 'components/common/LoadingSpinner';
import NavLink from 'containers/common/NavLink';

function CountriesTable(props) {
  if (!props.data || !props.data.length) return <div className="blank"><LoadingSpinner inner transparent /></div>;
  let columns = [];
  switch (props.category) {
    case 'species':
      columns = ['scientific_name', 'english_name', 'family', 'genus', 'populations'];
      break;
    case 'populations':
      columns = ['populations', 'scientific_name', 'english_name', 'family', 'genus'];
      break;
    default:
      columns = ['site_name', 'iso3', 'protection_status', 'iba', 'csn'];
  }
  return (
    <div className="row">
      <div className="row">
        <div className="column small-12 medium-5">
          <NavLink to={`/countries/${props.country}/sites`} i18nText="sites" />
          <NavLink to={`/countries/${props.country}/species`} i18nText="species" />
          <NavLink to={`/countries/${props.country}/populations`} i18nText="population" />
        </div>
        <div className="column small-12 offset-medium-1 medium-2">
          <div>
            filters
          </div>
        </div>
        <div className="column small-12 medium-4">
          <div>
            search
          </div>
        </div>
      </div>
      <TableList
        data={props.data}
        columns={columns}
      />
    </div>
  );
}

CountriesTable.propTypes = {
  country: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  data: React.PropTypes.any
};

export default CountriesTable;
