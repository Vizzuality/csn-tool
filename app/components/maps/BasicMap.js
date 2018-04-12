import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  BASEMAP_ATTRIBUTION_MAPBOX,
  BASEMAP_MAP,
  BASEMAP_SATELLITE,
  BASEMAP_TILE_MAP,
  BASEMAP_TILE_SATELLITE,
  HYDROLOGY_LAYERS,
  MAP_CENTER,
  MAP_INITIAL_ZOOM,
  MAP_MIN_ZOOM
} from 'constants/map';
import Share from 'components/maps/Share';
import { replaceUrlParams } from 'helpers/router';

class Map extends React.Component {
  constructor(props) {
    super(props);

    const selectedBaseLayer = props.urlSync
      ? props.router.getCurrentLocation().query.view || BASEMAP_MAP
      : BASEMAP_MAP;
    this.state = {
      selectedBaseLayer
    };
    this.overlayLayers = {};

    this.onBaseLayerChange = this.onBaseLayerChange.bind(this);
    this.setMapParams = this.setMapParams.bind(this);
  }

  componentDidMount() {
    this.initMap();
    this.updateHydrologyLayers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedBaseLayer !== prevState.selectedBaseLayer) {
      const mapContainer = this.map.getContainer();
      mapContainer.classList.remove(`-${prevState.selectedBaseLayer}-view`);
      this.setMapParams();
      mapContainer.classList.add(`-${this.state.selectedBaseLayer}-view`);
    }

    // update hydrolayers
    if (this.props.layers !== prevProps.layers) {
      this.updateHydrologyLayers();
    }
  }

  componentWillUnmount() {
    this.remove();
  }

  onBaseLayerChange(e) {
    const selectedBaseLayer = e.layer.options.type;
    this.setState({ selectedBaseLayer });
  }

  getMapParams() {
    const { lat, lng } = this.map.getCenter();
    const view = this.state.selectedBaseLayer;
    return {
      zoom: this.map.getZoom(),
      lat,
      lng,
      view
    };
  }

  setMapParams() {
    const route = this.props.router.getCurrentLocation();
    const url = replaceUrlParams(route.pathname + route.search, this.getMapParams());
    this.props.router.replace(url);
  }

  setUrlSyncListeners() {
    this.map.on('dragend', this.setMapParams);
    this.map.on('zoomend', this.setMapParams);
  }

  unsetUrlSyncListeners() {
    this.map.off('dragend', this.setMapParams);
    this.map.off('zoomend', this.setMapParams);
  }

  updateHydrologyLayers() {
    Object.keys(HYDROLOGY_LAYERS).forEach((layer) => {
      if (!this.props.layers.hasOwnProperty(layer)) return;

      const layerObj = this.overlayLayers[layer] || this.createHydroLayer(layer);

      if (this.props.layers[layer]) {
        layerObj.addTo(this.map);
      } else {
        layerObj.remove();
      }
    });
  }

  createHydroLayer(layer) {
    const hydroLayer = L.tileLayer(HYDROLOGY_LAYERS[layer]).setZIndex(1);
    this.overlayLayers[layer] = hydroLayer;
    return hydroLayer;
  }

  remove() {
    this.map.remove();
    if (this.props.urlSync) this.unsetUrlSyncListeners();
    if (this.props.baseLayerSelector) this.map.off('baselayerchange', this.onBaseLayerChange);
  }

  initMap() {
    const query = this.props.urlSync && this.props.router.getCurrentLocation().query;
    const center = query && query.lat && query.lng ? [query.lat, query.lng] : MAP_CENTER;
    this.map = L.map(this.props.id, {
      minZoom: MAP_MIN_ZOOM,
      zoom: (query && query.zoom) || MAP_INITIAL_ZOOM,
      zoomControl: this.props.zoomControl,
      center,
      detectRetina: true,
      zoomAnimation: false
    });

    if (this.props.markerCluster) {
      this.markers = L.markerClusterGroup({
        showCoverageOnHover: false,
        removeOutsideVisibleBounds: true,
        animate: false,
        animateAddingMarkers: false,
        chunkedLoading: true,
        iconCreateFunction(cluster) {
          return L.divIcon({
            html: `<span>${cluster.getAllChildMarkers().length}</span>`,
            className: 'marker-cluster',
            iconSize: L.point(28, 28)
          });
        }
      });
    }

    this.map.attributionControl.addAttribution(BASEMAP_ATTRIBUTION_MAPBOX);
    if (this.props.zoomControl) this.map.zoomControl.setPosition('topright');
    this.map.scrollWheelZoom.disable();

    this.addBaseLayers();
    if (this.props.shareControl) this.addShareControl();
    if (this.props.urlSync) this.setUrlSyncListeners();
  }

  addBaseLayers() {
    const mapLayer = L.tileLayer(BASEMAP_TILE_MAP, { type: BASEMAP_MAP }).setZIndex(0);
    const satelliteLayer = L.tileLayer(BASEMAP_TILE_SATELLITE, {
      type: BASEMAP_SATELLITE
    }).setZIndex(0);
    const selectedLayer = this.state.selectedBaseLayer === BASEMAP_MAP ? mapLayer : satelliteLayer;

    if (this.props.baseLayerSelector) {
      const baseLayers = {
        Map: mapLayer,
        Satellite: satelliteLayer
      };
      L.control
        .layers(baseLayers, null, {
          autoZIndex: false
        })
        .addTo(this.map);
      this.map.on('baselayerchange', this.onBaseLayerChange);
    }

    this.map.addLayer(selectedLayer);
    this.map.getContainer().classList.add(`-${selectedLayer.options.type}-view`);
  }

  addShareControl() {
    const LeafletShare = L.Control.extend({
      options: {
        position: 'topright'
      },
      onAdd() {
        return L.DomUtil.create('div', 'leaflet-custom-control share-control');
      }
    });

    this.map.addControl(new LeafletShare());
    render(<Share />, document.getElementsByClassName('share-control')[0]);
  }

  render() {
    return (
      <div className="l-maps-container">
        <div id={this.props.id} className={cx('c-map', this.mapClassName)} />
        {this.props.legend && (
          <div className="l-legend">{this.renderLegend && this.renderLegend()}</div>
        )}
      </div>
    );
  }
}

Map.defaultProps = {
  baseLayerSelector: true,
  legend: true,
  shareControl: true,
  urlSync: true,
  zoomControl: true
};

Map.propTypes = {
  baseLayerSelector: PropTypes.bool,
  layers: PropTypes.object,
  id: PropTypes.string.isRequired,
  legend: PropTypes.bool,
  markerCluster: PropTypes.bool,
  router: PropTypes.object,
  shareControl: PropTypes.bool,
  urlSync: PropTypes.bool,
  zoomControl: PropTypes.bool
};

export default Map;
