import PropTypes from 'prop-types';

import { MAPBOX_TOKEN } from 'constants/map';
import PopulationMap from './PopulationMap';

import { tileLayerPixelFilter } from 'helpers/filterPixel';

class ClimateMap extends PopulationMap {
  constructor(props) {
    super(props);
    this.climateLayers = {};
  }

  componentDidMount() {
    super.componentDidMount();
    this.updateClimateLayers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.layers !== prevProps.layers) {
      this.updateClimateLayers();
    }
  }

  componentWillReceiveProps(newProps) {
    super.componentWillReceiveProps(newProps);
  }

  updateClimateLayers() {
    if (!this.props.layers && this.props.layers.climate) return;
    const speciesId = this.props.id;

    ['gains', 'losses', 'present', 'future'].forEach((time) => {
      ['b', 'w', 'p', 'S'].forEach((season) => {
        const layerId = `${time}_${speciesId}_${season}`;
        const layerName = `${speciesId}_${season}`;
        const layerPath = `https://api.mapbox.com/v4/wetlands.${layerName}/{z}/{x}/{y}.png?access_token=${MAPBOX_TOKEN}`;

        const layerObj = this.climateLayers[layerId] || this.createClimateLayer(layerId, layerPath, time);

        const varName = ['climate', time, season].join('_');
        if (this.props.layers.climate && this.props.layers[varName]) {
          layerObj.addTo(this.map);
        } else {
          layerObj.remove();
        }
      });
    });
  }

  createClimateLayer(layerId, layerPath, time) {
    //const climateLayer = L.tileLayer(layerPath).setZIndex(1);
    const filterOptions = {
      present: time
    };
    const climateLayer = L.tileLayerPixelFilter(layerPath, filterOptions).setZIndex(1);
    this.climateLayers[layerId] = climateLayer;
    return climateLayer;
  }
}

ClimateMap.propTypes = {
  ...PopulationMap.propTypes,
  id: PropTypes.string
};

export default ClimateMap;
