import React from 'react';

class CountriesMap extends React.Component {

  constructor() {
    super();
    this.styles = {
      hide: { color: 'transparent', weight: 0, opacity: 0 },
      highlight: { color: '#ffc500', weight: 2, opacity: 0.5 }
    };
    this.markers = [];
    this.initialMap = {
      zoom: 3,
      center: [52, 7]
    };
  }

  componentWillMount() {
    this.props.getGeoms();
  }

  componentDidMount() {
    this.map = L.map('countries-map', {
      minZoom: 2,
      zoom: this.initialMap.zoom,
      center: this.initialMap.center,
      detectRetina: true
    });

    this.map.attributionControl.addAttribution('Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>');
    this.map.zoomControl.setPosition('topright');
    this.map.scrollWheelZoom.disable();
    this.tileLayer = L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}').addTo(this.map).setZIndex(0);

    // Adds suppport to topojson
    L.TopoJSON = L.GeoJSON.extend({
      addData(jsonData) {
        if (jsonData.type === 'Topology') {
          Object.keys(jsonData.objects).forEach((key) => {
            const geojson = topojson.feature(jsonData, jsonData.objects[key]);
            L.GeoJSON.prototype.addData.call(this, geojson);
          });
        } else {
          L.GeoJSON.prototype.addData.call(this, jsonData);
        }
      }
    });

    if (this.props.geoms) {
      this.drawGeo(this.props.geoms);
    }

    if (this.props.data && this.props.data.length) {
      this.drawMarkers(this.props.data);
      this.fitBounds();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.geoms && this.props.geoms !== newProps.geoms) {
      this.drawGeo(newProps.geoms);
    }

    if (newProps.data && newProps.data.length) {
      this.clearMarkers();
      this.drawMarkers(newProps.data);
      this.fitBounds();
    } else {
      this.clearMarkers();
    }

    if (!newProps.country && this.props.country !== newProps.country) {
      if (this.currentLayer) this.currentLayer.setStyle(this.styles.hide);
      this.outBounds();
      this.map.invalidateSize();
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  goToDetail(iso) {
    this.props.goToDetail(iso);
  }

  drawGeo(geo) {
    const onEachFeature = (layer) => {
      const properties = layer.feature.properties;
      layer.setStyle(this.styles.hide);
      if (properties && properties.name) {
        const popup = `<p>${properties.name}</p><p>Click to see it page</p>`;
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
          if (!this.props.country) {
            this.goToDetail(properties.iso3);
          } else {
            layer.closePopup();
          }
        });
      }
    };

    const topoLayer = new L.TopoJSON();
    topoLayer.addData(geo);
    topoLayer.addTo(this.map);
    topoLayer.eachLayer(onEachFeature);
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
    this.map.fitBounds(markersGroup.getBounds(), { padding: [10, 10], maxZoom: 8 });
  }

  outBounds() {
    this.map.setView(this.initialMap.center, this.initialMap.zoom);
  }

  render() {
    return (
      <div id={'countries-map'} className="c-map"></div>
    );
  }
}


CountriesMap.propTypes = {
  goToDetail: React.PropTypes.func.isRequired,
  getGeoms: React.PropTypes.func.isRequired,
  data: React.PropTypes.array,
  geoms: React.PropTypes.any,
  country: React.PropTypes.string
};

export default CountriesMap;
