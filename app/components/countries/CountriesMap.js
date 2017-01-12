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
      hide: { color: 'transparent', weight: 0, opacity: 0 },
      highlight: { color: '#ffc500', weight: 2, opacity: 0 }
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

    if (this.props.geoms) {
      this.drawGeo(this.props.geoms);
    }

    if (this.props.data && this.props.data.length) {
      this.drawMarkers(this.props.data);
      this.fitBounds();
    }
  }

  componentWillReceiveProps(newProps) {
    this.handleMapScroll(newProps.country);
    if (newProps.geoms && this.props.geoms !== newProps.geoms) {
      this.drawGeo(newProps.geoms);
    }

    if (newProps.layers.sites) {
      if (newProps.data && newProps.data.length) {
        if (this.props.data.length !== newProps.data.length) {
          this.clearMarkers();
          this.drawMarkers(newProps.data);
          this.fitBounds();
          this.addLayer();
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

  addTopoJSONLayer() {
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

  drawGeo(geo) {
    const onEachFeature = (layer) => {
      const properties = layer.feature.properties;
      layer.setStyle(this.styles.hide);

      if (properties && properties.name) {
        layer.on('mouseover', (e) => {
          if (!this.props.country) {
            this.showPopup(e.latlng, properties);
            layer.setStyle(this.styles.highlight);
            this.currentLayer = layer;
          }
        });
        layer.on('mousemove', (e) => {
          this.setPopupPosition(e.latlng);
        });
        layer.on('mouseout', () => {
          if (!this.props.country) {
            this.hidePopup();
            layer.setStyle(this.styles.hide);
          }
        });
        layer.on('click', () => {
          if (!this.props.country) {
            this.goToDetail(properties.iso3);
            layer.setStyle(this.styles.hide);
          } else {
            this.hidePopup();
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

  fitBounds() {
    if (this.markers.length) {
      const markersGroup = new L.featureGroup(this.markers); // eslint-disable-line new-cap
      this.map.fitBounds(markersGroup.getBounds(), { padding: [10, 10], maxZoom: 8 });
    }
  }

  outBounds() {
    this.layer.setOpacity(0);
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
