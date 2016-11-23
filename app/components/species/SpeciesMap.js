import React from 'react';

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
    this.tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/csn/civtok4xx004d2kpo3acytide/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY3NuIiwiYSI6ImNpdnRvam1qeDAwMXgyenRlZjZiZWc1a2wifQ.Gr5pLJzG-1tucwY4h-rGdA').addTo(this.map).setZIndex(0);

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
    const markersGroup = new L.featureGroup(this.markers); // eslint-disable-line new-cap
    this.map.fitBounds(markersGroup.getBounds());
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
