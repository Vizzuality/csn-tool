import React from 'react';

class SpeciesMap extends React.Component {

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

    if (this.props.data && this.props.data.length) {
      this.drawMarkers(this.props.data);
      this.fitBounds();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data && newProps.data.length) {
      this.drawMarkers(newProps.data);
      this.fitBounds();
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  drawMarkers(speciesData) {
    this.markers = [];
    const speciesIcon = L.divIcon({
      className: 'map-marker',
      iconSize: null,
      html: '<span class="icon"</span>'
    });
    speciesData.forEach((item) => {
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

  clearMarkers() {
    if (this.markers.length) {
      this.markers.forEach((item) => {
        this.map.removeLayer(item);
      });
      this.markers = [];
    }
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

SpeciesMap.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};


SpeciesMap.propTypes = {
  data: React.PropTypes.any.isRequired
};

export default SpeciesMap;
