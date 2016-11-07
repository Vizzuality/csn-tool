import React from 'react';
import L from 'leaflet'; // eslint-disable-line import/no-unresolved

class Map extends React.Component {

  componentDidMount() {
    this.map = L.map('map-base', {
      minZoom: 2,
      zoom: 3,
      center: [52, 7],
      detectRetina: true
    });

    this.map.attributionControl.addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>');
    this.map.zoomControl.setPosition('topright');
    this.map.scrollWheelZoom.disable();
    this.tileLayer = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png').addTo(this.map).setZIndex(0);

    this.setMarkers();
    this.fitBounds();
  }

  componentWillUnmount() {
    this.map.remove();
  }

  setMarkers() {
    this.markers = [];
    const speciesIcon = L.divIcon({
      className: 'map-marker',
      iconSize: null,
      html: '<span class="icon"</span>'
    });
    this.props.species.forEach((item) => {
      const marker = L.marker([item.lat, item.lon], { icon: speciesIcon }).addTo(this.map);
      marker.bindPopup(`<p> Season:${item.season}</p> <p>Site:${item.site_name}</p>`);
      marker.on('mouseover', function () {
        this.openPopup();
      });
      marker.on('mouseout', function () {
        this.closePopup();
      });
      this.markers.push(marker);
    });
  }

  fitBounds() {
    const MarkersGroup = new L.featureGroup(this.markers);
    this.map.fitBounds(MarkersGroup.getBounds());
  }

  render() {
    return (
      <div className="l-maps-container">
        <div id={'map-base'} className="c-map -full"></div>
      </div>
    );
  }
}

Map.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};


Map.propTypes = {
  species: React.PropTypes.array.isRequired
};

export default Map;
