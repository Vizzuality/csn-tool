import React from 'react';
import PropTypes from 'prop-types';
import { StickyContainer } from 'react-sticky';
import ThresholdMap from 'containers/threshold/ThresholdMap';
import ThresholdTable from 'containers/threshold/ThresholdTable';
import GoBackLink from 'containers/common/GoBackLink';

class ThresholdLookupPage extends React.Component {
  componentWillMount() {
    const coordinates = this.props;
    if (coordinates && coordinates.lat && coordinates.lng) {
      this.props.getThreshold(coordinates);
    }
  }

  render() {
    const { data, country, coordinates } = this.props;
    return (
      <div className="l-page">
        <div className={`l-navigation ${data ? '-dark' : ''}`}>
          <div className="row">
            <div className="column c-navigation">
              {data
                ? <div className="content">
                  <div className="title">
                    <GoBackLink className="breadcrumb" i18nText="selectAnotherPoint" endPoint="threshold-lookup" />
                    <div className="name">
                      <h2 className="scientific-name">{country || 'Country'}</h2>
                    </div>
                  </div>
                  <div className="stats">
                    <div className="list">
                      <div className="item">
                        <div className="label">
                          {this.context.t('coordinates')}
                        </div>
                        <div className="value">
                          {coordinates &&
                            `${coordinates.lat}, ${coordinates.lng}`
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                : <div className="content">
                  <div className="title">
                    <div className="name"><h2 className="ramsar-criterion">{this.context.t('ramsarCriterionToolTitle')}</h2></div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className={`l-map -header ${this.props.data ? '-short' : ''}`}>
          <ThresholdMap id="threshold-map" />
        </div>
        <StickyContainer>
          <div className={`row l-content ${data ? '-short' : ''}`}>
            <div className="column">
              {data && <ThresholdTable id="threshold-map" />}
            </div>
          </div>
        </StickyContainer>
      </div>
    );
  }
}

ThresholdLookupPage.contextTypes = {
  t: PropTypes.func.isRequired
};

ThresholdLookupPage.propTypes = {
  data: PropTypes.bool,
  country: PropTypes.string,
  coordinates: PropTypes.object,
  getThreshold: PropTypes.func
};

export default ThresholdLookupPage;
