import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import BasicMap from 'components/maps/BasicMap';
import { getSqlQuery } from 'helpers/map';
import SpeciesDetailLegend from 'containers/species/SpeciesDetailLegend';
import { BOUNDARY_COLORS } from 'constants';

class SpeciesMap extends BasicMap {

  constructor(props, context) {
    super(props, context);
    this.popBoundaryLayers = [];
    this.boundaryColorsToPop = [];
    this.setPopulationBoundaryColors(props.population);
  }

  componentDidMount() {
    this.initMap();

    this.markers = [];
    const sitesToDraw = this.props.selectedCategory === 'sites'
      ? this.props.sites
      : this.props.criticalSites;
    if (sitesToDraw && sitesToDraw.length) {
      this.drawMarkers(sitesToDraw);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.layers.sites) {
      if (this.props.selectedCategory !== newProps.selectedCategory) {
        this.clearMarkers();
      }
      if (['sites', 'criticalSites'].indexOf(newProps.selectedCategory) > -1) {
        const sitesToDraw = newProps.selectedCategory === 'sites'
          ? newProps.sites
          : newProps.criticalSites;
        if (!this.markers.length && sitesToDraw && sitesToDraw.length) {
          this.drawMarkers(sitesToDraw);
          this.fitMarkersBounds();
        }
      }
    } else {
      this.clearMarkers();
    }

    this.setPopulationBoundaryColors(newProps.population);

    if (!newProps.layers.population) {
      this.hidePopulationBoundaries();
    } else {
      if (this.popBoundaryLayers.length === 0 && this.props.population !== newProps.population) {
        this.fetchPopulationBoundaries(this.props.id);
      }

      if (this.popBoundaryLayers.length &&
          (this.props.activeBounds !== newProps.activeBounds || newProps.population)) {
        this.popBoundaryLayers.forEach((pbLayerGroup) => {
          const isActive = newProps.activeBounds.some(
            (bound) => bound.id === pbLayerGroup.options.id && bound.active
          );
          pbLayerGroup.setStyle({
            fill: isActive,
            opacity: 1
          });
        });
      }
    }
  }

  hidePopulationBoundaries() {
    this.popBoundaryLayers.forEach((pbLayerGroup) => {
      pbLayerGroup.setStyle({
        fill: false,
        opacity: 0
      });
    });
  }

  setPopulationBoundaryColors(population) {
    if (this.boundaryColorsToPop.length === 0 && population) {
      this.boundaryColorsToPop = population.reduce((all, pop, index) => ({
        ...all,
        [pop.wpepopid]: BOUNDARY_COLORS[index]
      }), []);
    }
  }

  fetchPopulationBoundaries(speciesId) {
    const query = `
      SELECT ST_AsGeoJSON(ST_Envelope(st_union(f.the_geom))) as bbox
      FROM species_main s
      INNER JOIN species_and_flywaygroups f on f.ssid = s.species_id
      WHERE s.species_id = ${speciesId}
    `;

    getSqlQuery(query).then(this.setPopulationBoundaries.bind(this));
  }

  setPopulationBoundaries(res) {
    const bounds = JSON.parse(res.rows[0].bbox);

    if (bounds) {
      const coords = bounds.coordinates[0];

      if (coords) {
        this.map.fitBounds([
          [coords[2][1], coords[2][0]],
          [coords[4][1], coords[4][0]]
        ]);
      }
    }

    if (this.props.population) {
      this.props.population.forEach((pop) => {
        this.getPopulationBoundaryLayer(this.props.id, pop.wpepopid);
      });
    }
  }

  getPopulationBoundaryLayer(id, popId) {
    const query = `
      SELECT the_geom
      FROM species_and_flywaygroups
      WHERE wpepopid = ${popId} LIMIT 1
    `;

    getSqlQuery(`${query}&format=geojson`)
      .then(this.addPopulationBoundaryLayer.bind(this, popId));
  }

  addPopulationBoundaryLayer(popId, layerGeoJSON) {
    const color = this.boundaryColorsToPop[popId];
    // do not add layer if is already there
    if (this.popBoundaryLayers.length > 0 &&
        this.popBoundaryLayers.some((l) => l.options.id === popId)) {
      return;
    }

    const layer = L.geoJSON(layerGeoJSON, {
      id: popId,
      noWrap: true,
      style: {
        opacity: 1,
        weight: 3,
        dashArray: [1, 7],
        lineCap: 'round',
        color,
        fill: false,
        fillOpacity: 0.5,
        fillColor: color
      }
    });
    layer.setZIndex(2);
    layer.addTo(this.map);
    layer.getPane().classList.add('-layer-blending');
    this.popBoundaryLayers.push(layer);
  }

  drawMarkers(speciesSites) {
    function getMarkerIcon(item) {
      return L.divIcon({
        className: 'map-marker',
        iconSize: null,
        html: `<span class='icon -${item.protected_slug}'</span>`
      });
    }
    speciesSites.forEach((item) => {
      if (item.lat && item.lon) {
        const marker = L.marker([item.lat, item.lon], { icon: getMarkerIcon(item) }).addTo(this.map);
        marker.
          bindPopup(`<p class="text -light" >Season: ${item.season}</p> <p class="text -light">Site: ${item.site_name}</p>`);
        marker.on('mouseover', function () {
          this.openPopup();
        });
        marker.on('mouseout', function () {
          this.closePopup();
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

  fitMarkersBounds() {
    if (this.markers.length) {
      const markersGroup = new L.featureGroup(this.markers); // eslint-disable-line new-cap
      this.map.fitBounds(markersGroup.getBounds(this.props.id), { maxZoom: 6 });
    }
  }

  render() {
    return (
      <div className="l-maps-container">
        <div id={this.props.id} className="c-map -full"></div>
        <div className="l-legend">
          <SpeciesDetailLegend boundaryColorsToPop={this.boundaryColorsToPop} />
        </div>
      </div>
    );
  }
}

SpeciesMap.contextTypes = {
  // Define function to get the translations
  t: PropTypes.func.isRequired
};


SpeciesMap.propTypes = {
  router: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  sites: PropTypes.any.isRequired,
  criticalSites: PropTypes.any.isRequired,
  population: PropTypes.any.isRequired,
  selectedCategory: PropTypes.string.isRequired
};

export default withRouter(SpeciesMap);
