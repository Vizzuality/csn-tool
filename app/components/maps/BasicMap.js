import React from 'react';
import L from 'leaflet'; // eslint-disable-line import/no-unresolved

class Map extends React.Component {

  componentDidMount() {
    this.map = L.map('map-basic', {
      minZoom: 2,
      zoom: 3,
      center: [52, 7],
      detectRetina: true,
      zoomControl: false
    });

    this.map.attributionControl.addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>');
    this.map.scrollWheelZoom.disable();
    this.tileLayer = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png').addTo(this.map).setZIndex(0);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div id={'map-basic'} className="c-map"></div>
    );
  }
}

export default Map;
