import React from 'react';
import L from 'leaflet'; // eslint-disable-line import/no-unresolved

class CountriesMap extends React.Component {

  constructor() {
    super();
    this.styles = {
      hide: { color: 'transparent', weight: 0, opacity: 0 },
      highlight: { color: '#ffc500', weight: 2, opacity: 0.2 }
    };
    this.markers = [];
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

    if (this.props.countryDetail.length) {
      this.drawMarkers(this.props.countryDetail);
      this.fitBounds();
    }
  }

  componentWillReceiveProps(newProps) {
    this.drawGeo(newProps.countriesGeo);
    if (newProps.countryDetail && newProps.countryDetail.length) {
      this.clearMarkers();
      this.drawMarkers(newProps.countryDetail);
      this.fitBounds();
    } else {
      this.clearMarkers();
    }
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
            if (!this.props.country) {
              layer.openPopup();
              layer.setStyle(this.styles.highlight);
              this.currentLayer = layer;
            }
          });
          layer.on('mouseout', () => {
            if (!this.props.country) {
              layer.closePopup();
              layer.setStyle(this.styles.hide);
            }
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

  drawMarkers(countryData) {
    if (!countryData.length) return;
    const sitesIcon = L.divIcon({
      className: 'map-marker',
      iconSize: null,
      html: '<span class="icon -secondary"</span>'
    });

    countryData.forEach((site) => {
      const marker = L.marker([site.lat, site.lon], { icon: sitesIcon }).addTo(this.map);
      marker.bindPopup(site.site_name);
      marker.on('mouseover', () => {
        marker.openPopup();
      });
      marker.on('mouseout', () => {
        marker.closePopup();
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
        <div id={'countries-map'} className="c-map"></div>
      </div>
    );
  }
}


CountriesMap.propTypes = {
  goCountryDetail: React.PropTypes.func.isRequired,
  getCountriesGeo: React.PropTypes.func.isRequired,
  countryDetail: React.PropTypes.array,
  countriesGeo: React.PropTypes.object,
  country: React.PropTypes.string
};

export default CountriesMap;
