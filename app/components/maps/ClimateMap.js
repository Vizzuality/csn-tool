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

  componentWillReceiveProps(newProps) {
    super.componentWillReceiveProps(newProps);
  }

  updateClimateLayers() {
    if (!this.props.layers && this.props.layers.climate) return;
    const speciesId = this.props.id;


    ['w'].forEach((season) => {
      const layer = `${speciesId}_${season}`;
      const layerPath = `https://api.mapbox.com/v4/wetlands.${layer}/{z}/{x}/{y}.png?access_token=${MAPBOX_TOKEN}`;

      const layerObj = this.climateLayers[layer] || this.createClimateLayer(layer, layerPath);

      if (this.props.layers.climate) {
        layerObj.addTo(this.map);
      } else {
        layerObj.remove();
      }
    });
  }

  createClimateLayer(layer, layerPath) {
    //const climateLayer = L.tileLayer(layerPath).setZIndex(1);
    const filterOptions = {
      matchRGBA: [0, 0, 0, 255],
      missRGBA: [255, 255, 255, 64],
      pixelCodes: [[255,0,0]]
    };
    var climateLayer = L.tileLayerPixelFilter(layerPath, filterOptions).setZIndex(1);
    this.climateLayers[layer] = climateLayer;
    return climateLayer;
  }
}

ClimateMap.propTypes = {
  ...PopulationMap.propTypes,
  id: PropTypes.string
};

export default ClimateMap;
