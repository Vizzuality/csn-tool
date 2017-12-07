import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  MAP_MIN_ZOOM,
  MAP_CENTER
} from 'constants/map';
import BasicMap from 'components/maps/BasicMap';
import CountriesLegend from 'containers/countries/CountriesLegend';

const borders = {
  dashArray: [1, 7],
  weight: 2,
  lineCap: 'round'
};
const styles = {
  map: {
    hide: { fillColor: 'white', fillOpacity: 1, color: 'transparent', opacity: 0 },
    base: { fillColor: '#efd783', fillOpacity: 0.5, color: 'white', opacity: 0 },
    highlight: { fillColor: '#ffc500', fillOpacity: 1, color: 'white', opacity: 0 }
  },
  satellite: {
    hide: { fillColor: 'white', fillOpacity: 1, color: 'transparent', opacity: 0 },
    base: { fillColor: '#efd783', fillOpacity: 0.5, color: 'white', ...borders },
    highlight: { fillColor: '#ffc500', fillOpacity: 1, color: 'white', ...borders }
  }
};

class CountriesMap extends BasicMap {

  componentWillMount() {
    this.props.getGeoms();
  }

  componentDidMount() {
    this.markers = [];
    // Map initialization
    this.initMap();
    this.initPopup();

    // Adds suppport to topojson
    this.addTopoJSONLayer();
    this.topoLayer = new L.TopoJSON();

    if (this.props.geoms) {
      this.drawGeo(this.props.geoms, this.props.countries, this.props.searchFilter);
    }

    if (this.props.data && this.props.data.length) {
      this.drawMarkers(this.props.data);
    }
  }

  componentWillReceiveProps(newProps) {
    this.setActiveLayer();
    this.drawGeo(newProps.geoms, newProps.countries, newProps.searchFilter);

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
      if (this.currentLayer) this.currentLayer.setStyle(styles[this.selectedBaseLayerId].hide);
      this.outBounds();
      this.map.invalidateSize();
    }
  }

  componentWillUnmount() {
    this.remove();
  }

  onBaseLayerChange() {
    this.drawGeo(this.props.geoms, this.props.countries, this.props.searchFilter);
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

  getLayerStyle(searchFilter, countries, iso, isoParam) {
    const SHOW_STYLE = styles[this.selectedBaseLayerId].base;
    const HIDE_STYLE = styles[this.selectedBaseLayerId].hide;

    // If selected country
    if (isoParam.length > 0) {
      return (iso === isoParam) ? SHOW_STYLE : HIDE_STYLE;
    }

    // Big map
    const hasSearchFilter = searchFilter.length > 0;

    let trueSearchFilter = false;

    // Filter in play
    if (hasSearchFilter) {
      const countryData = this.getCountryData(countries, iso);

      trueSearchFilter = !hasSearchFilter || countryData.country.toLowerCase().indexOf(searchFilter.toLowerCase()) > -1;

      return trueSearchFilter ? SHOW_STYLE : HIDE_STYLE;
    }

    return SHOW_STYLE; // Unfiltered, tastes great.
  }

  drawGeo(geo, countries, searchFilter = null) {
    const onEachFeature = (layer) => {
      const properties = layer.feature.properties;
      const iso = properties.iso3;
      const isoParam = this.props.country;
      const layerStyle = this.getLayerStyle(searchFilter, countries, iso, isoParam);
      layer.setStyle(layerStyle);

      if (properties && properties.name) {
        layer.on('mouseover', (e) => {
          if (!this.props.country) {
            this.showPopup(e.latlng, properties);
            layer.setStyle(styles[this.selectedBaseLayerId].highlight);
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
        html: `<span class='icon -${item.protected_slug}'</span>`
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
      this.map.fitBounds(layer.getBounds(), { paddingTopLeft: [80, 0], paddingBottomRight: [80, 0] });
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
  id: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
  goToSite: PropTypes.func.isRequired,
  goToDetail: PropTypes.func.isRequired,
  getGeoms: PropTypes.func.isRequired,
  data: PropTypes.array,
  geoms: PropTypes.any,
  country: PropTypes.string
};

export default withRouter(CountriesMap);
