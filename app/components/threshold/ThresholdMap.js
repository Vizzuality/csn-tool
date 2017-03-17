import React from 'react';
import { withRouter } from 'react-router';
import BasicMap from 'components/maps/BasicMap';
import { replaceUrlParams } from 'helpers/router';
import { BASEMAP_ATTRIBUTION_CARTO } from 'constants/map';

class ThresholdMap extends BasicMap {
  constructor(props) {
    super(props);
    this.marker = null;
    this.drawMarker = this.drawMarker.bind(this);
    this.updateCoords = this.updateCoords.bind(this);
    if (props.coordinates) {
      setTimeout(() => {
        this.drawMarker(props.coordinates);
      }, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coordinates) {
      this.drawMarker(nextProps.coordinates);
    }
    // if (nextProps.data && nextProps.data.length > 0 && nextProps.data.length !== this.props.data.length) {
    //   this.drawBounds(nextProps.data);
    // }
    // if (nextProps.data && !nextProps.data.length) {
    //   this.clearBounds();
    // }
  }


  componentDidMount() {
    this.initMap();
    this.map.on('click', this.updateCoords);
    this.boundsLayer = new L.geoJson();
  }

  componentWillUnmount() {
    this.remove();
    this.map.off('click', this.updateCoords);
  }

  updateCoords(e) {
    const params = {
      position: `${e.latlng.lat},${e.latlng.lng}`
    };
    const route = this.props.router.getCurrentLocation();
    const url = replaceUrlParams(route.pathname + route.search, params);
    this.props.router.replace(url);
  }


  drawBounds(data) {
    this.clearBounds();
    this.boundsLayer.addTo(this.map);
    data.forEach((item) => {
      const geom = JSON.parse(item.the_geom) || null;
      if (geom) {
        this.boundsLayer.addData(geom);
      }
    });
  }

  clearBounds() {
    if (this.boundsLayer) {
      this.boundsLayer.clearLayers();
    }
  }

  drawMarker(coordinates) {
    function getMarkerIcon() {
      return L.divIcon({
        className: 'map-marker',
        iconSize: null,
        html: '<span class="icon"></span>'
      });
    }

    if (coordinates.lat && coordinates.lng) {
      if (this.marker) this.map.removeLayer(this.marker);
      this.marker = L.marker([coordinates.lat, coordinates.lng], { icon: getMarkerIcon() }).addTo(this.map);
    }
  }


  render() {
    return (
      <div className="l-maps-container">
        <div id={this.props.id} className="c-map -full -pointer -threshold"></div>
      </div>
    );
  }
}

ThresholdMap.propTypes = {
  coordinates: React.PropTypes.object
};

export default withRouter(ThresholdMap);
