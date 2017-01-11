import React from 'react';
import { withRouter } from 'react-router';
import { BASEMAP_TILE, BASEMAP_ATTRIBUTION_MAPBOX, MAP_CENTER,
         MAP_INITIAL_ZOOM, MAP_MIN_ZOOM } from 'constants/map';
import { replaceUrlParams } from 'helpers/router';

class SitesMap extends React.Component {

  componentDidMount() {
    const query = this.props.router.getCurrentLocation().query;
    const center = query.lat && query.lng
     ? [query.lat, query.lng]
     : MAP_CENTER;
    this.map = L.map('map-base', {
      minZoom: MAP_MIN_ZOOM,
      zoom: query.zoom || MAP_INITIAL_ZOOM,
      center,
      detectRetina: true,
      zoomAnimation: false
    });
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
    this.markerList = [];

    this.map.attributionControl.addAttribution(BASEMAP_ATTRIBUTION_MAPBOX);
    this.map.zoomControl.setPosition('topright');
    this.map.scrollWheelZoom.disable();
    this.tileLayer = L.tileLayer(BASEMAP_TILE).addTo(this.map).setZIndex(0);

    if (this.props.data && this.props.data.length) {
      this.drawMarkers(this.props.data);
    }
    this.setListeners();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data && newProps.data.length) {
      if (this.props.data.length !== newProps.data.length) {
        this.clearMarkers();
        this.drawMarkers(newProps.data);
      }
    } else {
      this.clearMarkers();
    }
  }

  componentWillUnmount() {
    this.map.remove();
    this.unsetListeners();
  }

  setListeners() {
    this.map.on('dragend', this.setMapParams.bind(this));
    this.map.on('zoomend', this.setMapParams.bind(this));
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

  unsetListeners() {
    this.map.off('dragend', this.setMapParams.bind(this));
    this.map.off('zoomend', this.setMapParams.bind(this));
  }

  drawMarkers(data) {
    const sitesIcon = L.divIcon({
      className: 'map-marker',
      iconSize: null,
      html: '<span class="icon -secondary"</span>'
    });

    data.forEach((site) => {
      if (site.lat && site.lon) {
        const marker = L.marker([site.lat, site.lon], { icon: sitesIcon });
        marker.bindPopup(`<p class="text -light">${site.site_name}</p>`);
        marker.on('mouseover', function () {
          this.openPopup();
        });
        marker.on('mouseout', function () {
          this.closePopup();
        });
        marker.on('click', () => {
          if (!this.props.selected) {
            this.props.goToDetail(site.id);
          } else {
            marker.closePopup();
          }
        });
        this.markerList.push(marker);
      }
    });
    if (this.markerList.length) {
      this.markers.addLayers(this.markerList);
      this.map.addLayer(this.markers);
    }
  }

  clearMarkers() {
    this.markers.clearLayers();
    this.markerList = [];
  }

  render() {
    return (
      <div className="l-maps-container">
        <div id={'map-base'} className="c-map -full"></div>
      </div>
    );
  }
}

SitesMap.propTypes = {
  router: React.PropTypes.object.isRequired,
  selected: React.PropTypes.string,
  goToDetail: React.PropTypes.func.isRequired,
  id: React.PropTypes.string,
  data: React.PropTypes.any
};

export default withRouter(SitesMap);
