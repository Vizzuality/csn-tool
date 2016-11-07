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
    const sitesIcon = L.divIcon({
      className: 'map-marker',
      iconSize: null,
      html: '<span class="icon -secondary"</span>'
    });
    this.props.sites.forEach((site) => {
      const marker = L.marker([site.lat, site.lon], { icon: sitesIcon }).addTo(this.map);
      marker.bindPopup(site.site_name);
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

Map.propTypes = {
  sites: React.PropTypes.array.isRequired
};

export default Map;
