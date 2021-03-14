import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NavLink from 'containers/common/NavLink';
import LoadingSpinner from 'components/common/LoadingSpinner';
import { numberToThousands } from 'helpers/data';

const numbersAsText = ['year', 'start', 'end', 'year_end', 'year_start',
  'id', 'site_id', 'lat', 'lon', 'pop_id'];
const columnsCenterAligned = ['a', 'b', 'c', 'original_a', 'original_b',
  'original_c', 'iba', 'csn', 'iba_species', 'csn_species',
  'id', 'site_id', 'lat', 'lon', 'pop_id'];

function detailLinkFrame(label, link) {
  return (
    <div className="link">
      <div className="popup">
        <div className="popup-content">{label}</div>
        {link}
      </div>
    </div>
  );
}

function compareDetailLinkFrame(item, onClick, label, link) {
  return (
    <div className="link">
      <div className="popup">
        <div className="popup-content">Add to compare</div>
        <div className="compare-button" onClick={() => onClick(item)}>
          <svg className="icon -small">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </div>
      </div>
      <div className="popup">
        <div className="popup-content">{label}</div>
        {link}
      </div>
    </div>
  );
}

function getDetailLink(t, detailLink, item, isLookAlike, onClick) {
  if (!detailLink) return null;

  const linkText = detailLink.toLowerCase().indexOf('species') > -1 ?
    (detailLink.toLowerCase().indexOf('population') > -1 ? t('viewLookAlike') : t('viewSpeciesDetails'))
      : t('viewSiteDetails');
  const link = {
    countrySpeciesPopulation: `/countries/${item.iso3}/lookAlikeSpecies/${item.pop_id_origin}`,
    speciesPopulation: `/species/${item.species_id}/lookAlikeSpecies/${item.pop_id_origin}`
  }[detailLink] || `/${detailLink}/${item.id}`;

  if (isLookAlike && detailLink === 'species') {
    return (
      compareDetailLinkFrame(item, onClick, linkText, (
        <NavLink className="popup-link" to={link} icon="icon-table_arrow_right" parent />
      )
    ))
  } else {
    return (
      detailLinkFrame(linkText, (
        <NavLink className="popup-link" to={link} icon="icon-table_arrow_right" parent />
      ))
    )
  }
}

function renderNoDataText(t, text) {
  return (
    <div className="c-table-list">
      <div className="no-data">
        <p className="text -title">{t(text)}</p>
      </div>
    </div>
  );
}

function TableList(props, context) {
  if (!props.data) return (<div className="c-table-list blank"><LoadingSpinner inner transparent /></div>);

  const colWidth = 97.5 / props.columns.length; // still need empty category

  return !props.data.length
  ? renderNoDataText(context.t, props.noDataText)
  : <div id="table-rows" className="c-table-list">
    <ul>
      {props.data.map((item, index) => (
        <li key={index} className={classNames('table-row', 'f32', { selectable: props.selectable, selected: props.selectedItem === item })}>
          {props.columns.map((column, index2) => {
            let alignClass = '';
            if (columnsCenterAligned.indexOf(column) > -1) {
              alignClass = '-center';
            } else if (typeof item[column] === 'number') {
              alignClass = '-right';
            } else {
              alignClass = '-left';
            }

            if (typeof item[column] === 'boolean') {
              const value = item[column] ? (
                <svg className="icon -small -grey">
                  <use xlinkHref="#icon-tick"></use>
                </svg>
              ) : null;
              return (
                <div key={index2} style={{ width: `${colWidth}%` }}>
                  <div className={`text ${column} ${alignClass}`}>{value}</div>
                </div>
              );
            }

            if (['scientific_name', 'site_name'].indexOf(column) >= 0 && item.hyperlink) {
              return (<div key={index2} style={{ width: `${colWidth}%` }}><div className={`text ${column} ${alignClass}`} dangerouslySetInnerHTML={{ __html: item[column] }} ></div>
                <span className="popup">
                  <div className="popup-content">BirdLife Factsheet</div>
                  <a className="popup-link external-link" target="_blank" href={item.hyperlink}>
                    <svg className="icon -small -grey">
                      <use xlinkHref="#icon-open_in_new"></use>
                    </svg>
                  </a>
                </span>
              </div>);
            } else if (column === 'population' && item.pop_hyperlink) {
              return (<div key={index2} style={{ width: `${colWidth}%` }}><div className={`text ${column} ${alignClass}`} dangerouslySetInnerHTML={{ __html: item[column] }} ></div>
                <span className="popup">
                  <div className="popup-content">Waterbird Population Estimates Portal</div>
                  <a className="popup-link external-link" target="_blank" href={item.pop_hyperlink} title="View on Waterbird Population Estimates Portal">
                    <svg className="icon -small -grey">
                      <use xlinkHref="#icon-open_in_new"></use>
                    </svg>
                  </a>
                </span>
              </div>);
            } else if (column === 'site_name') {
              return (<div key={index2} style={{ width: `${colWidth}%` }}>
                <div className={`text ${column} ${alignClass}`} dangerouslySetInnerHTML={{ __html: item[column] }} ></div>
                <button className="map-link">
                  <svg className="icon -small -grey">
                    <use xlinkHref="#icon-map"></use>
                  </svg>
                </button>
              </div>);
            } else if (column === 'country') {
              return (<div className="country-column" key={index2} style={{ width: `${colWidth}%` }}>
                <span className={`flag ${item.iso2 && (item.iso2).toLowerCase()}`}></span>
                <div className={`text ${column} ${alignClass}`} dangerouslySetInnerHTML={{ __html: item[column] }} ></div>
              </div>);
            }
            const colVal = (typeof item[column] === 'number' && numbersAsText.indexOf(column) === -1) ? numberToThousands(item[column]) : item[column];
            return (<div key={index2} className={`text ${column} ${alignClass}`} style={{ width: `${colWidth}%` }} dangerouslySetInnerHTML={{ __html: colVal }}></div>);
          })}
          {props.detailLink &&
            getDetailLink(context.t, props.detailLink, item, props.isLookAlike, props.onItemClick) ||
            <div className="link">
              <div className="popup">
              </div>
            </div>
          }
        </li>
      ))}
      <li></li>
    </ul>
  </div>;
}

TableList.contextTypes = {
  // Define function to get the translations
  t: PropTypes.func.isRequired
};

TableList.defaultProps = {
  detailLink: null,
  noDataText: 'noDataFound',
  onItemClick: () => {}
};

TableList.propTypes = {
  detailLink: PropTypes.any,
  columns: PropTypes.array.isRequired,
  data: PropTypes.any.isRequired,
  noDataText: PropTypes.string,
  fitBounds: PropTypes.func,
  scroll: PropTypes.bool,
  selectable: PropTypes.bool,
  selectedItem: PropTypes.any,
  onItemClick: PropTypes.func
};

export default TableList;
