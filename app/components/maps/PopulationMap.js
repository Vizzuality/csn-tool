import PropTypes from 'prop-types';

import { getSqlQuery } from 'helpers/map';
import { BOUNDARY_COLORS } from 'constants/map';
import BasicMap from './BasicMap';

class PopulationMap extends BasicMap {
  constructor(props) {
    super(props);
    this.populationLayers = [];
    this.setPopulationColors(props.populations);
  }

  componentWillReceiveProps(newProps) {
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
}

PopulationMap.defaultProps = {};

PopulationMap.propTypes = {
  populations: PropTypes.any,
  selectedPopulationId: PropTypes.number,
  fitToPopulationBoudaries: PropTypes.bool,
  fitToPopulationId: PropTypes.number
};

export default PopulationMap;
