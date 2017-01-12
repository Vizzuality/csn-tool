import React from 'react';
import { BASEMAP_TILE, BASEMAP_ATTRIBUTION_MAPBOX, MAP_MIN_ZOOM,
  MAP_CENTER, MAP_MAX_BOUNDS, MAP_INITIAL_ZOOM } from 'constants/map';
import { render } from 'react-dom';
import Share from 'components/maps/Share';
import { replaceUrlParams } from 'helpers/router';

class Map extends React.Component {

  componentDidMount() {
    this.map = L.map('map-basic', {
      minZoom: MAP_MIN_ZOOM,
      maxBounds: MAP_MAX_BOUNDS,
      zoom: MAP_INITIAL_ZOOM,
      center: MAP_CENTER,
      detectRetina: true,
      zoomControl: false
    });

    this.map.attributionControl.addAttribution(BASEMAP_ATTRIBUTION_MAPBOX);
    this.map.scrollWheelZoom.disable();
    this.tileLayer = L.tileLayer(BASEMAP_TILE).addTo(this.map).setZIndex(0);

    if (this.props.urlSync) this.setUrlSyncListeners();
  }

  componentWillUnmount() {
    this.remove();
  }

  getMapParams() {
    const latLng = this.map.getCenter();
    return {
      zoom: this.map.getZoom(),
      lat: latLng.lat,
      lng: latLng.lng
    };
  }

  setMapParams() {
    const route = this.props.router.getCurrentLocation();
    const url = replaceUrlParams(route.pathname + route.search, this.getMapParams());
    this.props.router.push(url);
  }

  setUrlSyncListeners() {
    this.map.on('dragend', this.setMapParams.bind(this));
    this.map.on('zoomend', this.setMapParams.bind(this));
  }

  unsetUrlSyncListeners() {
    this.map.off('dragend', this.setMapParams.bind(this));
    this.map.off('zoomend', this.setMapParams.bind(this));
  }

  remove() {
    this.map.remove();
    if (this.props.urlSync) this.unsetUrlSyncListeners();
  }

  initMap() {
    const query = this.props.router.getCurrentLocation().query;
    const center = query.lat && query.lng
     ? [query.lat, query.lng]
     : MAP_CENTER;
    this.map = L.map(this.props.id, {
      minZoom: MAP_MIN_ZOOM,
      zoom: query.zoom || MAP_INITIAL_ZOOM,
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
    this.map.zoomControl.setPosition('topright');
    this.map.scrollWheelZoom.disable();
    this.tileLayer = L.tileLayer(BASEMAP_TILE).addTo(this.map).setZIndex(0);

    this.addShareControl();
    if (this.props.urlSync) this.setUrlSyncListeners();
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
      <div id={'map-basic'} className="c-map"></div>
    );
  }
}

Map.defaultProps = {
  urlSync: true
};

Map.propTypes = {
  id: React.PropTypes.string,
  router: React.PropTypes.object,
  markerCluster: React.PropTypes.bool,
  urlSync: React.PropTypes.bool
};

export default Map;
