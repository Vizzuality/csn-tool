import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import BasicMap from 'components/maps/BasicMap';
import { getSqlQuery } from 'helpers/map';
import SpeciesDetailLegend from 'containers/species/SpeciesDetailLegend';
import { BOUNDARY_COLORS } from 'constants/map';

class SpeciesMap extends BasicMap {

  constructor(props, context) {
    super(props, context);
    this.populationLayers = [];
    this.setPopulationColors(props.populations);
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

    this.setPopulationColors(newProps.populations);

    if (newProps.populations !== this.props.populations) {
      this.removePopulationLayers();
    }

    if (!newProps.layers.population) {
      this.hidePopulations();
    } else {
      if (this.populationLayers.length === 0 && this.props.populations !== newProps.populations) {
        if (newProps.fitToPopulationBoudaries) {
          this.fetchPopulationBoundaries(this.props.id);
        }
        this.fetchPopulationLayers(newProps);
      }

      if (this.populationLayers.length &&
          (this.props.selectedPopulationId !== newProps.selectedPopulationId ||
           this.props.layers.population !== newProps.layers.population ||
           this.props.populations !== newProps.populations)) {
        this.populationLayers.forEach((layer) => {
          const id = layer.options.populationId;
          const isActive = id === newProps.selectedPopulationId;

          layer.setStyle({
            fill: isActive,
            opacity: 1
          });
        });
      }
    }
  }

  hidePopulations() {
    this.populationLayers.forEach((layer) => {
      layer.setStyle({
        fill: false,
        opacity: 0
      });
    });
  }

  setPopulationColors(populations) {
    this.populationColors = (populations || []).reduce((all, pop, index) => ({
      ...all,
      [pop.wpepopid]: BOUNDARY_COLORS[index]
    }), {});
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
  }

  fetchPopulationLayers({ populations }) {
    if (populations) {
      populations.forEach((pop) => {
        this.fetchPopulationLayer(pop.wpepopid);
      });
    }
  }

  fetchPopulationLayer(populationId) {
    const query = `
      SELECT the_geom
      FROM species_and_flywaygroups
      WHERE wpepopid = ${populationId} LIMIT 1
    `;

    getSqlQuery(`${query}&format=geojson`)
      .then(this.addPopulationLayer.bind(this, populationId));
  }

  addPopulationLayer(populationId, layerGeoJSON) {
    // do not add layer if is already there
    if (this.populationLayers.length > 0 &&
        this.populationLayers.some((l) => l.options.populationId === populationId)) {
      return;
    }
    const color = this.populationColors[populationId];
    const isActive = this.props.selectedPopulationId === populationId;

    const layer = L.geoJSON(layerGeoJSON, {
      populationId,
      noWrap: true,
      style: {
        opacity: 1,
        weight: 3,
        dashArray: [1, 7],
        lineCap: 'round',
        color,
        fill: isActive,
        fillOpacity: 0.5,
        fillColor: color
      }
    });
    layer.setZIndex(2);
    layer.addTo(this.map);
    layer.getPane().classList.add('-layer-blending');
    this.populationLayers.push(layer);
    if (this.props.fitToPopulationId === populationId) {
      this.map.fitBounds(layer.getBounds());
    }
  }

  removePopulationLayers() {
    if (this.populationLayers && this.populationLayers.length) {
      this.populationLayers.forEach((l) => {
        this.map.removeLayer(l);
      });

      this.populationLayers = [];
    }
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
          <SpeciesDetailLegend
            populations={this.props.populations}
            populationColors={this.populationColors}
          />
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
  populations: PropTypes.any.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  selectedPopulationId: PropTypes.number,
  fitToPopulationBoudaries: PropTypes.bool,
  fitToPopulationId: PropTypes.number
};

export default withRouter(SpeciesMap);
