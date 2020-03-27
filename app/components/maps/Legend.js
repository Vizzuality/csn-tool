import React from 'react';
import PropTypes from 'prop-types';
import SmoothCollapse from 'react-smooth-collapse';
import cx from 'classnames';

import Switch from 'components/common/Switch';

import {
  LAYER_KEY_CLIMATE_FUTURE,
  LAYER_KEY_CLIMATE_PRESENT,
  LAYER_KEY_CLIMATE_GAINS
} from './const';

function renderScale(items) {
  const colorWidth = 100 / (items.length - 1);
  const background = `linear-gradient(to right, ${items
    .map((i, index) => `${i.color} ${colorWidth * index}%`)
    .join(', ')})`;
  const rangeStyle = { background };
  const renderScaleItem = (item, index) => <li key={`scale-item-${index}`}>{item.name}</li>;

  return (
    <div className="scale">
      <div className="range" style={rangeStyle} />
      <ul className="labels">{items.map(renderScaleItem)}</ul>
    </div>
  );
}

function renderItems(items, onHover) {
  return items.map((item, index) => (
    <div
      className="item"
      key={index}
      onMouseOver={() => onHover && onHover(item, true)}
      onMouseOut={() => onHover && onHover(item, false)}
    >
      {item.icon === 'dots' ? (
        <span className="dots" style={{ color: item.color }}>
          ...
        </span>
      ) : (
        <span
          className={cx('icon', {
            [`-${item.icon}`]: item.icon,
            [`-${item.status}`]: item.status
          })}
        />
      )}
      <p>{item.name}</p>
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
      <SmoothCollapse className="sub-section-body" expanded={subSection.active}>
        {subSection.items && renderItems(subSection.items)}
        {subSection.scale && renderScale(subSection.scale)}
      </SmoothCollapse>
    </div>
  ));
}

function CollapseIcon({ isopen }) {
  const iconClose = <svg height="15" className="icon-collapse-close"><use xlinkHref="#icon-collapse-close"></use></svg>;
  const iconOpen = <svg height="15" className="icon-collapse-open"><use xlinkHref="#icon-collapse-open"></use></svg>;
  return isopen ? iconClose : iconOpen;
}

function getClimateTableData(sections) {
  const mainLayers = [LAYER_KEY_CLIMATE_FUTURE, LAYER_KEY_CLIMATE_PRESENT, LAYER_KEY_CLIMATE_GAINS];
  const tableSections = sections.filter(s => mainLayers.indexOf(s.layer) !== -1);
  const climateFutureLayers = tableSections.filter(s => s.layer === mainLayers[0])[0];
  const climatePresentLayers = tableSections.filter(s => s.layer === mainLayers[1])[0];
  const climateGainsLayers = tableSections.filter(s => s.layer === mainLayers[2])[0];

  const sublayers = [];
  tableSections.forEach(section => {
    section.subSections.forEach(sub => {
      if (sublayers.indexOf(sub.name) === -1) {
        sublayers.push(sub.name);
      }
    });
  });

  const tableData = [];
  sublayers.forEach(sublayer => {
    const climateFuture = climateFutureLayers ? climateFutureLayers.subSections.find(s => s.name === sublayer) : {};
    const climatePresent = climatePresentLayers ? climatePresentLayers.subSections.find(s => s.name === sublayer) : {};
    const climateGains = climateGainsLayers ? climateGainsLayers.subSections.find(s => s.name === sublayer) : {};
    const row = {
      sublayer,
      climateFuture,
      climatePresent,
      climateGains
    };
    tableData.push(row);
  });
  return tableData;
}

class Legend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      isClimateCollapse: false
    };
    this.setCollapse = this.setCollapse.bind(this);
    this.setClimateCollapse = this.setClimateCollapse.bind(this);
  }

  setCollapse(value = false) {
    this.setState({ collapse: value });
  }

  setClimateCollapse(value = false) {
    this.setState({ isClimateCollapse: value });
  }

  render() {
    const { context, setCollapse, setClimateCollapse } = this;
    const { collapse, isClimateCollapse } = this.state;
    const { sections, onSwitchChange, onSwitchClimateChange, onLegendItemHover } = this.props;
    if (sections && !sections.length) return null;

    const collapseSections = sections.filter(s => s.layer !== LAYER_KEY_CLIMATE_FUTURE && s.layer !== LAYER_KEY_CLIMATE_PRESENT);
    const climateTableData = sections ? getClimateTableData(sections) : [];
    return (
      <div className="c-legend">
        <div className="collapse-btn-box">
          <h4>{context.t('legendsTitle')}</h4>
          <button
            className="collapse-btn"
            type="button"
            onClick={() => setCollapse(!collapse)}
          >
            <CollapseIcon isopen={collapse} />
          </button>
        </div>
        {collapse && (
          <div className="collapse-box">
            {collapseSections.map((section, index) => {
              const legendLine = index > 0 ? <div className="legend-line" /> : '';
              return (
                <div key={index}>
                  {legendLine}
                  <div className="section" key={index}>
                    <div className="section-header">
                      <p>{section.i18nName ? context.t(section.i18nName) : section.name}</p>
                      <Switch checked={section.active} onChange={() => onSwitchChange(section)} />
                    </div>
                    <SmoothCollapse className="section-body" expanded={section.active}>
                      {section.subSections && renderSubSections(section.subSections, onSwitchChange)}
                      {section.items && renderItems(section.items, onLegendItemHover)}
                    </SmoothCollapse>
                  </div>
                </div>
              );
            })}
            {climateTableData.length > 0 && (
              <div>
                <div className="legend-line" />
                <div className="section">
                  <div className="section-header">
                    <p>Climate Change</p>
                    <Switch checked={isClimateCollapse} onChange={() => setClimateCollapse(!isClimateCollapse)} />
                  </div>
                  <SmoothCollapse className="section-body" expanded={isClimateCollapse}>
                    <table className="climate-table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Present Suitability</th>
                          <th>Future Suitability</th>
                          <th>Gains/Losses</th>
                        </tr>
                      </thead>
                      {climateTableData.map((section, index) => {

                        const layers = [section.climatePresent, section.climateFuture, section.climateGains];

                        return (
                          <tr key={index}>
                            <td><p>{section.sublayer}</p></td>
                            <td>
                              {section.climatePresent && (
                                <Switch checked={section.climatePresent.active} onChange={() => onSwitchClimateChange(layers, section.climatePresent)} />
                              )}
                            </td>
                            <td>
                              {section.climateFuture && (
                                <Switch checked={section.climateFuture.active} onChange={() => onSwitchClimateChange(layers, section.climateFuture)} />
                              )}
                            </td>
                            <td>
                              {section.climateGains && (
                                <Switch checked={section.climateGains.active} onChange={() => onSwitchClimateChange(layers, section.climateGains)} />
                              )}
                            </td>
                          </tr>
                        )})}
                    </table>
                  </SmoothCollapse>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const itemPropTypes = PropTypes.shape({
  name: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  status: PropTypes.string
});
const sectionPropTypes = {
  name: PropTypes.string,
  i18nName: PropTypes.string,
  layer: PropTypes.string,
  active: PropTypes.bool,
  items: PropTypes.arrayOf(itemPropTypes)
};

Legend.contextTypes = {
  t: PropTypes.func.isRequired
};

Legend.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      ...sectionPropTypes,
      subSections: PropTypes.arrayOf(PropTypes.shape(sectionPropTypes))
    })
  ),
  onSwitchChange: PropTypes.func.isRequired,
  onSwitchClimateChange: PropTypes.func.isRequired,
  onLegendItemHover: PropTypes.func
};

export default Legend;
