import React from 'react';
import { BASEMAP_TILE, BASEMAP_ATTRIBUTION_MAPBOX, BASEMAP_ATTRIBUTION_CARTO, MAP_MIN_ZOOM, MAP_CENTER, MAP_MAX_BOUNDS } from 'constants/map';
import { createLayer } from 'helpers/map';

class SpeciesMap extends React.Component {

  componentDidMount() {
    this.map = L.map('map-base', {
      minZoom: MAP_MIN_ZOOM,
      maxBounds: MAP_MAX_BOUNDS,
      zoom: MAP_MIN_ZOOM,
      center: MAP_CENTER,
      detectRetina: true
    });

    this.map.attributionControl.addAttribution(BASEMAP_ATTRIBUTION_MAPBOX);
    this.map.zoomControl.setPosition('topright');
    this.map.scrollWheelZoom.disable();
    this.tileLayer = L.tileLayer(BASEMAP_TILE).addTo(this.map).setZIndex(0);

    if (this.props.data && this.props.data.length) {
      this.drawMarkers(this.props.data);
      this.fitBounds();
    }

    this.addLayer();
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

  addLayer() {
    const query = `SELECT f.the_geom_webmercator FROM species s
      INNER JOIN species_and_flywaygroups f on f.ssid = s.species_id
      WHERE s.slug = '${this.props.slug}'`;

    const cartoCSS = `#species_and_flywaygroups{
      polygon-fill: #ffc500;
      polygon-opacity: 0.3;
      line-width: 0;
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
  slug: React.PropTypes.string.isRequired,
  data: React.PropTypes.any.isRequired
};

export default SpeciesMap;
