import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import cx from 'classnames';

import Switch from 'components/common/Switch';

function renderSubItems(subItems, onHover) {
  return subItems.map((subItem, index) => (
    <div
      className="sub-item"
      key={index}
      onMouseOver={() => onHover && onHover(subItem, true)}
      onMouseOut={() => onHover && onHover(subItem, false)}
    >
      {subItem.icon === 'dots' ? (
        <span className="dots" style={{ color: subItem.color }}>
          ...
        </span>
      ) : (
        <span
          className={cx('icon', {
            [`-${subItem.icon}`]: subItem.icon,
            [`-${subItem.status}`]: subItem.status
          })}
        />
      )}
      <p>{subItem.name}</p>
    </div>
  ));
}

function renderSubSections(subSections, onSwitchChange) {
  return subSections.map((subSection, index) => (
    <div className="sub-section" key={index}>
      <div className="sub-section-header">
        <p>{subSection.name}</p>
        <Switch checked={subSection.active} onChange={() => onSwitchChange(subSection)} />
      </div>
      <div className="sub-section-body">{subSection.items && renderSubItems(subSection.items)}</div>
    </div>
  ));
}

function Legend({ sections, onSwitchChange, onLegendItemHover }, context) {
  if (sections && !sections.length) return null;

  return (
    <div className="c-legend">
      {sections.map((section, index) => {
        const legendLine = index > 0 ? <div className="legend-line" /> : '';
        return (
          <div key={index}>
            {legendLine}
            <div className="section" key={index}>
              <div className="section-header">
                <p>{section.i18nName ? context.t(section.i18nName) : section.name}</p>
                <Switch checked={section.active} onChange={() => onSwitchChange(section)} />
              </div>
              <div className="section-body">
                {section.subSections && renderSubSections(section.subSections, onSwitchChange)}
                {section.items && renderSubItems(section.items, onLegendItemHover)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const itemPropTypes = PropTypes.shape({
  name: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  status: PropTypes.string
});

Legend.contextTypes = {
  t: PropTypes.func.isRequired
};

Legend.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      i18nName: PropTypes.string,
      active: PropTypes.bool,
      layer: PropTypes.string,
      subSections: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        layer: PropTypes.string,
        active: PropTypes.bool,
        items: PropTypes.arrayOf(itemPropTypes)
      })),
      items: PropTypes.arrayOf(itemPropTypes)
    })
  ),
  onSwitchChange: PropTypes.func.isRequired,
  onLegendItemHover: PropTypes.func
};

export default Legend;
