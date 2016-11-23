import React from 'react';

class Map extends React.Component {

  componentDidMount() {
    this.map = L.map('mapid', {
      minZoom: 2,
      zoom: 3,
      center: [52, 7],
      detectRetina: true,
      zoomControl: false
    });

    this.map.attributionControl.addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>');
    this.map.scrollWheelZoom.disable();
    this.tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/csn/civtok4xx004d2kpo3acytide//tiles/256/{z}/{x}/{y}@2x?fresh=true&title=true&access_token=pk.eyJ1IjoiY3NuIiwiYSI6ImNpdnRvam1qeDAwMXgyenRlZjZiZWc1a2wifQ.Gr5pLJzG-1tucwY4h-rGdA#').addTo(this.map).setZIndex(0);
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
