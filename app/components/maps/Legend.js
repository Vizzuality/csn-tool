import React from 'react';
import PropTypes from 'prop-types';
import SmoothCollapse from 'react-smooth-collapse';
import cx from 'classnames';

import Switch from 'components/common/Switch';

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

function renderSubSections(subSections, onChangeAction) {
  return subSections.map((subSection, index) => (
    <div className="sub-section" key={index}>
      <div className="sub-section-header">
        <p>{subSection.name}</p>
        <Switch checked={subSection.active} onChange={() => onChangeAction(subSection)} />
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

class Legend extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: true
    };
    this.setCollapse = this.setCollapse.bind(this);
  }

  setCollapse(value = false) {
    this.setState({ collapse: value });
  }

  render() {
    const { context, setCollapse } = this;
    const { collapse } = this.state;
    const { sections, onSwitchChange, onLegendItemHover, onClimateLayerToggle} = this.props;
    if (sections && !sections.length) return null;

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
            {sections.map((section, index) => {
              const onChangeAction = section.climateSection ? onClimateLayerToggle : onSwitchChange;
              const legendLine = index > 0 ? <div className="legend-line" /> : '';
              return (
                <div key={index}>
                  {legendLine}
                  <div className="section" key={index}>
                    <div className="section-header">
                      <p>{section.i18nName ? context.t(section.i18nName) : section.name}</p>
                      <Switch checked={section.active} onChange={() => onChangeAction(section)} />
                    </div>
                    <SmoothCollapse className="section-body" expanded={section.active}>
                      {section.subSections && renderSubSections(section.subSections, onChangeAction)}
                      {section.items && renderItems(section.items, onLegendItemHover)}
                    </SmoothCollapse>
                  </div>
                </div>
              );
            })}
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
  onLegendItemHover: PropTypes.func,
  onClimateLayerToggle: PropTypes.func.isRequired
};

export default Legend;
