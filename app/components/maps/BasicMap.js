import React from 'react';
import { BASEMAP_TILE, BASEMAP_ATTRIBUTION_MAPBOX, MAP_MIN_ZOOM,
  MAP_CENTER, MAP_INITIAL_ZOOM } from 'constants/map';
import { render } from 'react-dom';
import Share from 'components/maps/Share';
import { replaceUrlParams } from 'helpers/router';

class Map extends React.Component {

  componentDidMount() {
    this.initMap();
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
    this.props.router.replace(url);
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
    let query = {};
    if (this.props.urlSync) {
      query = this.props.router.getCurrentLocation().query;
    }
    const center = query && query.lat && query.lng
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

    if (this.props.shareControl) this.addShareControl();
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

  addTopoJSONLayer() {
    L.TopoJSON = L.GeoJSON.extend({
      addData(jsonData) {
        if (jsonData.type === 'Topology') {
          Object.keys(jsonData.objects).forEach((key) => {
            const geojson = topojson.feature(jsonData, jsonData.objects[key]);
            L.GeoJSON.prototype.addData.call(this, geojson);
          });
        } else {
          L.GeoJSON.prototype.addData.call(this, jsonData);
        }
      }
    });
  }

  render() {
    return (
      <div id={this.props.id} className="c-map"></div>
    );
  }
}

Map.defaultProps = {
  urlSync: true,
  shareControl: true
};

Map.propTypes = {
  id: React.PropTypes.string.isRequired,
  router: React.PropTypes.object,
  markerCluster: React.PropTypes.bool,
  shareControl: React.PropTypes.bool,
  urlSync: React.PropTypes.bool
};

export default Map;
