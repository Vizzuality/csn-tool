import React from 'react';
import { withRouter } from 'react-router';
import BasicMap from 'components/maps/BasicMap';
import { replaceUrlParams } from 'helpers/router';

class ThresholdMap extends BasicMap {
  constructor(props) {
    super(props);
    this.marker = null;
    this.popupVisible = false;
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
    this.initPopup();
    this.map.on('click', this.updateCoords);
    this.map.on('mouseover', this.showPopup.bind(this));
    this.map.on('mousemove', this.setPopupPosition.bind(this));
    this.map.on('mouseout', this.hidePopup.bind(this));
    // this.boundsLayer = new L.geoJson();
  }

  componentWillUnmount() {
    this.remove();
    this.map.off('click', this.updateCoords);
    this.map.off('mouseover', this.showPopup.bind(this));
    this.map.off('mousemove', this.setPopupPosition.bind(this));
    this.map.off('mouseout', this.hidePopup.bind(this));
  }

  updateCoords(e) {
    const params = {
      position: `${e.latlng.lat},${e.latlng.lng}`
    };
    const route = this.props.router.getCurrentLocation();
    const url = replaceUrlParams(route.pathname + route.search, params);
    this.props.router.replace(url);
    this.popupVisible = false;
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

  initPopup() {
    this.popup = L.popup({
      closeButton: false,
      offset: L.point(0, -3),
      autoPan: false
    }).setContent('');
  }

  showPopup(e) {
    const html = '<p style={{ float: "left"}} class="text -light">Click on the map to reveal relevant species</p>';

    this.popup.setLatLng(e.latlng)
      .setContent(html)
      .openOn(this.map);

    this.popupVisible = true;
  }

  setPopupPosition(e) {
    const bounds = this.map.getBounds();
    const totalWidth = (bounds.getEast() - bounds.getWest());
    const noFlyWidth = totalWidth / 10;
    if (e.latlng.lng > (bounds.getEast() - noFlyWidth) || e.latlng.lng < (bounds.getWest() + noFlyWidth)) {
      if (this.popupVisible) this.hidePopup();
    } else {
      if (this.popupVisible) {
        this.popup.setLatLng(e.latlng);
      } else {
        this.showPopup(e);
      }
    }
  }

  hidePopup() {
    this.map.closePopup();
    this.popupVisible = false;
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
