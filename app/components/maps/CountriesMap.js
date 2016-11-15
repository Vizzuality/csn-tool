import React from 'react';
import L from 'leaflet'; // eslint-disable-line import/no-unresolved

class Map extends React.Component {

  constructor() {
    super();
    this.styles = {
      hide: { color: 'transparent', weight: 0, opacity: 0 },
      highlight: { color: '#ffc500', weight: 2, opacity: 0.2 }
    };
  }

  componentWillMount() {
    this.props.getCountriesGeo();
  }

  componentDidMount() {
    this.map = L.map('countries-map', {
      minZoom: 2,
      zoom: 3,
      center: [52, 7],
      detectRetina: true
    });

    this.map.attributionControl.addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>');
    this.map.zoomControl.setPosition('topright');
    this.map.scrollWheelZoom.disable();
    this.tileLayer = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png').addTo(this.map).setZIndex(0);

    this.drawGeo(this.props.countriesGeo);
  }

  componentWillReceiveProps(newProps) {
    this.drawGeo(newProps.countriesGeo);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  goCountryDetail(iso) {
    this.props.goCountryDetail(iso);
  }

  drawGeo(geo) {
    if (Object.keys(geo).length) {
      const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.name) {
          const popup = `<p>${feature.properties.name}</p><p>Click to see it page</p>`;
          layer.bindPopup(popup);
          layer.on('mouseover', () => {
            layer.openPopup();
            layer.setStyle(this.styles.highlight);
          });
          layer.on('mouseout', () => {
            layer.closePopup();
            layer.setStyle(this.styles.hide);
          });
          layer.on('click', () => {
            this.goCountryDetail(feature.id);
          });
        }
      };

      L.geoJSON(geo, {
        onEachFeature,
        style: this.styles.hide
      }).addTo(this.map);
    }
  }

  fitBounds() {
    const markersGroup = new L.featureGroup(this.markers); // eslint-disable-line new-cap
    this.map.fitBounds(markersGroup.getBounds());
  }

  render() {
    return (
      <div className="l-maps-container">
        <div id={'countries-map'} className="c-map"></div>
      </div>
    );
  }
}


Map.propTypes = {
  goCountryDetail: React.PropTypes.func.isRequired,
  getCountriesGeo: React.PropTypes.func.isRequired,
  countriesGeo: React.PropTypes.object
};

export default Map;
