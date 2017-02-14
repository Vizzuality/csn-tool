import React from 'react';
import { withRouter } from 'react-router';
import { BASEMAP_ATTRIBUTION_CARTO, MAP_MIN_ZOOM, MAP_CENTER } from 'constants/map';
import BasicMap from 'components/maps/BasicMap';
import { createLayer } from 'helpers/map';
import CountriesLegend from 'containers/countries/CountriesLegend';

class CountriesMap extends BasicMap {
  constructor() {
    super();
    this.styles = {
      hide: { color: 'transparent', opacity: 0 },
      base: { fillColor: '#ffc500', fillOpacity: 0.5, color: 'transparent', opacity: 0 },
      highlight: { fillColor: '#ffc500', fillOpacity: 1, color: 'transparent', opacity: 0 }
    };
    this.markers = [];
  }

  componentWillMount() {
    this.props.getGeoms();
  }

  componentDidMount() {
    // Map initialization
    this.initMap();
    this.initPopup();
    this.handleMapScroll(this.props.country);

    // Adds suppport to topojson
    this.addTopoJSONLayer();
    this.topoLayer = new L.TopoJSON();

    if (this.props.geoms) {
      this.drawGeo(this.props.geoms, this.props.countries);
    }

    if (this.props.data && this.props.data.length) {
      this.drawMarkers(this.props.data);
    }
  }

  componentWillReceiveProps(newProps) {
    this.setActiveLayer();
    this.handleMapScroll(newProps.country);
    this.drawGeo(newProps.geoms, newProps.countries);

    if (newProps.country && newProps.router.location.search === '') {
      this.fitBounds(this.activeLayer);
    }

    if (newProps.layers.sites) {
      if (newProps.data && newProps.data.length) {
        if (this.props.data.length !== newProps.data.length) {
          this.clearMarkers();
          this.drawMarkers(newProps.data);
        }
      } else {
        this.clearMarkers();
      }
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
    this.remove();
  }

  setActiveLayer() {
    const onEachFeature = (layer) => {
      const properties = layer.feature.properties;
      const iso = properties.iso3;
      const isoParam = this.props.country;
      if (iso === isoParam) {
        this.activeLayer = layer;
      }
    };
    this.topoLayer.eachLayer(onEachFeature);
  }

  setPopupPosition(latLng) {
    this.popup.setLatLng(latLng);
  }

  showPopup(latlng, properties) {
    const html = `<h3 class="header -map-title -highlighted">${properties.name}</h3><p class="text -light">Click to see its page</p>`;

    this.popup.setLatLng(latlng)
      .setContent(html)
      .openOn(this.map);
  }

  hidePopup() {
    this.map.closePopup();
  }

  initPopup() {
    this.popup = L.popup({
      closeButton: false,
      offset: L.point(0, -6)
    }).setContent('');
  }

  handleMapScroll(country) {
    if (country) {
      this.map.scrollWheelZoom.disable();
    } else {
      this.map.scrollWheelZoom.enable();
    }
  }

  addLayer() {
    const query = 'SELECT * FROM mask';

    const cartoCSS = `#mask{
      polygon-fill: #000000;
      polygon-opacity: 1;
      line-color: #000000;
      line-width: 1;
      line-opacity: 1;
    }

    #mask[iso_a3='${this.props.country}']{
      polygon-fill: #000000;
      polygon-opacity: 0;
      line-color: #000000;
      line-width: 0;
      line-opacity: 0;
    }`;

    createLayer({
      sql: query,
      cartocss: cartoCSS
    }, this.addTile.bind(this));
  }

  addTile(url) {
    if (this.layer) {
      this.layer.setUrl(url);
    } else {
      this.layer = L.tileLayer(url, {
        noWrap: true,
        attribution: BASEMAP_ATTRIBUTION_CARTO
      }).setZIndex(2);
      this.layer.addTo(this.map);
      this.layer.getContainer().classList.add('-layer-blending');
    }

    this.layer.setOpacity(0.7);
  }

  goToDetail(iso) {
    this.props.goToDetail(iso);
  }

  getCountryData(countries, iso) {
    let i = 0;
    let countryData = {
      iso3: '',
      ramsar_member: false,
      aewa_member: false
    };
    const length = countries.length;
    for (i = 0; i < length; i++) {
      if (countries[i].iso3 === iso) {
        countryData = countries[i];
        return countryData;
      }
    }
    return countryData;
  }

  getLayerStyle(filter, countries, iso, isoParam) {
    if (this.props.country === '') {
      if (filter === 'aewa' || filter === 'ramsar') {
        const countryData = this.getCountryData(countries, iso);
        if (filter === 'aewa' && countryData.aewa_member) {
          return this.styles.base;
        } else if (filter === 'ramsar' && countryData.ramsar_member) {
          return this.styles.base;
        }
        return this.styles.hide;
      }
      return this.styles.base;
    }
    if (iso === isoParam) {
      return this.styles.base;
    }
    return this.styles.hide;
  }

  drawGeo(geo, countries) {
    const onEachFeature = (layer) => {
      const properties = layer.feature.properties;
      const filter = this.props.filter;
      const iso = properties.iso3;
      const isoParam = this.props.country;
      const layerStyle = this.getLayerStyle(filter, countries, iso, isoParam);
      layer.setStyle(layerStyle);

      if (properties && properties.name) {
        layer.on('mouseover', (e) => {
          if (!this.props.country) {
            this.showPopup(e.latlng, properties);
            layer.setStyle(this.styles.highlight);
          }
        });
        layer.on('mousemove', (e) => {
          this.setPopupPosition(e.latlng);
        });
        layer.on('mouseout', () => {
          if (!this.props.country) {
            this.hidePopup();
            layer.setStyle(layerStyle);
          }
        });
        layer.on('click', () => {
          if (!this.props.country) {
            this.goToDetail(properties.iso3);
          } else {
            this.hidePopup();
          }
          this.fitBounds(this.activeLayer);
        });
      }
    };

    this.topoLayer.clearLayers();
    this.topoLayer.addData(geo);
    this.topoLayer.addTo(this.map);
    this.topoLayer.eachLayer(onEachFeature);
  }

  drawMarkers(countryData) {
    if (!countryData.length) return;
    function getMarkerIcon(item) {
      return L.divIcon({
        className: 'map-marker',
        iconSize: null,
        html: `<span class='icon -${item.protection_status_slug}'</span>`
      });
    }

    countryData.forEach((site) => {
      if (site.lat && site.lon) {
        const marker = L.marker([site.lat, site.lon], { icon: getMarkerIcon(site) }).addTo(this.map);
        marker.bindPopup(`<p class="text -light">${site.site_name}</p>`);
        marker.on('mouseover', () => {
          marker.openPopup();
        });
        marker.on('mouseout', () => {
          marker.closePopup();
        });
        marker.on('click', () => {
          this.props.goToSite(site.id);
        });
        this.markers.push(marker);
      }
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

  fitBounds(layer) {
    if (layer) {
      this.map.fitBounds(layer.getBounds().pad(0.5));
    }
  }

  outBounds() {
    this.map.setView(MAP_CENTER, MAP_MIN_ZOOM);
  }

  render() {
    return (
      <div className="l-maps-container">
        <div id={this.props.id} className="c-map"></div>
        {this.props.country &&
          <div className="l-legend">
            <CountriesLegend />
          </div>
        }
      </div>
    );
  }
}


CountriesMap.propTypes = {
  id: React.PropTypes.string.isRequired,
  router: React.PropTypes.object.isRequired,
  goToSite: React.PropTypes.func.isRequired,
  goToDetail: React.PropTypes.func.isRequired,
  getGeoms: React.PropTypes.func.isRequired,
  data: React.PropTypes.array,
  geoms: React.PropTypes.any,
  country: React.PropTypes.string
};

export default withRouter(CountriesMap);
