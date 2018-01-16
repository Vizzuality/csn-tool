import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  MAP_MIN_ZOOM,
  MAP_CENTER
} from 'constants/map';
import CountriesLegend from 'containers/countries/CountriesLegend';
import PopulationMap from 'components/maps/PopulationMap';
import { TopoJSON } from 'helpers/map';

const borders = {
  color: 'white',
  dashArray: [1, 7],
  weight: 2,
  lineCap: 'round'
};
// country layer style based on selected base layer (map or satellite)
const styles = {
  map: {
    hide: { fillColor: 'white', fillOpacity: 1, color: 'transparent', opacity: 0 },
    base: { fillColor: '#efd783', fillOpacity: 0.5, color: 'white', opacity: 0 },
    highlight: { fillColor: '#ffc500', fillOpacity: 1, color: 'white', opacity: 0 }
  },
  satellite: {
    hide: { fillColor: 'transparent', fillOpacity: 1, color: 'transparent', opacity: 0 },
    base: { fillColor: 'transparent', fillOpacity: 0.5, ...borders },
    highlight: { fillColor: '#ffc500', fillOpacity: 1, ...borders, weight: 3 }
  }
};

class CountriesMap extends PopulationMap {
  componentWillMount() {
    this.props.getGeoms();
  }

  componentDidMount() {
    super.componentDidMount();
    this.markers = [];
    this.initPopup();
    this.topoLayer = new TopoJSON();

    if (this.props.geoms) {
      this.drawGeo(this.props.geoms, this.props.countries, this.props.searchFilter);
    }

    if (this.props.sites && this.props.sites.length) {
      this.drawMarkers(this.props.sites);
    }
  }

  componentWillReceiveProps(newProps) {
    super.componentWillReceiveProps(newProps);

    this.setActiveLayer();
    this.drawGeo(newProps.geoms, newProps.countries, newProps.searchFilter);

    if (newProps.country && newProps.router.location.search === '') {
      this.fitBounds(this.activeLayer);
    }

    if (newProps.layers.sites) {
      if (newProps.sites !== this.props.sites) {
        this.clearMarkers();
      }

      if (!this.markers.length && newProps.sites && newProps.sites.length) {
        this.drawMarkers(newProps.sites);
      }
    } else {
      this.clearMarkers();
    }

    if (!newProps.country && this.props.country !== newProps.country) {
      if (this.currentLayer) this.currentLayer.setStyle(styles[this.state.selectedBaseLayer].hide);
      this.outBounds();
      this.map.invalidateSize();
    }

    if (newProps.zoomOnCountry && newProps.zoomOnCountry !== this.props.zoomOnCountry) {
      this.fitBounds(this.getCountryLayerByIso(newProps.zoomOnCountry));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState);
    if (this.state.selectedBaseLayer !== prevState.selectedBaseLayer) {
      this.drawGeo(this.props.geoms, this.props.countries, this.props.searchFilter);
    }
  }

  getCountryLayerByIso(iso) {
    return this.topoLayer
      .getLayers()
      .find((l) => l.feature.properties.iso3 === iso);
  }

  setActiveLayer() {
    this.activeLayer = this.getCountryLayerByIso(this.props.country);
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

  getLayerStyle(searchFilter, countries, iso, isoParam) {
    const SHOW_STYLE = styles[this.state.selectedBaseLayer].base;
    const HIDE_STYLE = styles[this.state.selectedBaseLayer].hide;

    // If selected country
    if (isoParam.length > 0) return (iso === isoParam) ? SHOW_STYLE : HIDE_STYLE;

    // Filter in play
    if (searchFilter && searchFilter.length > 0) {
      const { country } = countries.find((c) => c.iso3 === iso) || {};

      return country.toLowerCase().includes(searchFilter.toLowerCase()) ? SHOW_STYLE : HIDE_STYLE;
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
            layer.setStyle(styles[this.state.selectedBaseLayer].highlight);
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
      const type = site.hasOwnProperty('csn_name') ? 'csn' : 'iba';

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
          this.props.goToSite(site.id, type);
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
            <CountriesLegend
              populations={this.props.populations}
              populationColors={this.populationColors}
            />
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
  sites: PropTypes.any,
  geoms: PropTypes.any,
  country: PropTypes.string,
  layers: PropTypes.object,
  zoomOnCountry: PropTypes.string
};

export default withRouter(CountriesMap);
