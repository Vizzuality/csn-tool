import React from 'react';
import PropTypes from 'prop-types';
import {
  BASEMAP_ATTRIBUTION_MAPBOX,
  BASEMAP_MAP,
  BASEMAP_SATELLITE,
  BASEMAP_HYDRO,
  BASEMAP_TILE_MAP,
  BASEMAP_TILE_SATELLITE,
  BASEMAP_TILE_HYDRO,
  MAP_CENTER,
  MAP_INITIAL_ZOOM,
  MAP_MIN_ZOOM
} from 'constants/map';
import { render } from 'react-dom';
import Share from 'components/maps/Share';
import { replaceUrlParams } from 'helpers/router';

class Map extends React.Component {

  constructor(props) {
    super(props);

    const selectedBaseLayer = props.urlSync
            ? props.router.getCurrentLocation().query.view || BASEMAP_MAP
            : BASEMAP_MAP;
    this.state = { selectedBaseLayer };

    this.onBaseLayerChange = this.onBaseLayerChange.bind(this);
    this.setMapParams = this.setMapParams.bind(this);
  }

  componentDidMount() {
    this.initMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedBaseLayer !== prevState.selectedBaseLayer) {
      const mapContainer = this.map.getContainer();
      mapContainer.classList.remove(`-${prevState.selectedBaseLayer}-view`);
      this.setMapParams();
      mapContainer.classList.add(`-${this.state.selectedBaseLayer}-view`);
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

  remove() {
    this.map.remove();
    if (this.props.urlSync) this.unsetUrlSyncListeners();
    if (this.props.baseLayerSelector) this.map.off('baselayerchange', this.onBaseLayerChange);
  }

  initMap() {
    const query = this.props.urlSync && this.props.router.getCurrentLocation().query;
    const center = query && query.lat && query.lng
     ? [query.lat, query.lng]
     : MAP_CENTER;
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
    const satelliteLayer = L.tileLayer(BASEMAP_TILE_SATELLITE, { type: BASEMAP_SATELLITE }).setZIndex(0);
    const hydroLayer = L.tileLayer(BASEMAP_TILE_HYDRO, { type: BASEMAP_HYDRO }).setZIndex(1);
    const selectedLayer = this.state.selectedBaseLayer === BASEMAP_MAP ? mapLayer : satelliteLayer;

    if (this.props.baseLayerSelector) {
      const baseLayers = {
        Map: mapLayer,
        Satellite: satelliteLayer
      };
      const overlayMaps = {
        Hydrology: hydroLayer
      };
      L.control.layers(baseLayers, overlayMaps, {
        autoZIndex: false
      }).addTo(this.map);
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
    render(
      <Share />,
      document.getElementsByClassName('share-control')[0]
    );
  }

  render() {
    return (
      <div id={this.props.id} className="c-map"></div>
    );
  }
}

Map.defaultProps = {
  urlSync: true,
  shareControl: true,
  baseLayerSelector: true,
  zoomControl: true
};

Map.propTypes = {
  id: PropTypes.string.isRequired,
  router: PropTypes.object,
  markerCluster: PropTypes.bool,
  shareControl: PropTypes.bool,
  urlSync: PropTypes.bool,
  baseLayerSelector: PropTypes.bool,
  zoomControl: PropTypes.bool
};

export default Map;
