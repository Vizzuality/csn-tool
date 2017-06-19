import React from 'react';
import { withRouter } from 'react-router';
import BasicMap from 'components/maps/BasicMap';
import { BASEMAP_ATTRIBUTION_CARTO } from 'constants/map';
import { createLayer, getSqlQuery } from 'helpers/map';
import SpeciesDetailLegend from 'containers/species/SpeciesDetailLegend';
import { BOUNDARY_COLORS } from 'constants';

class SpeciesMap extends BasicMap {

  constructor(props) {
    super(props);
    this.layers = [];
    this.boundaryColorsToPop = [];
    this.activeBoundary = false;
    this.activeLayers = [];
  }

  componentDidMount() {
    this.initMap();

    this.markers = [];
    if (this.props.sites && this.props.sites.length) {
      this.drawMarkers(this.props.sites);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.layers.sites) {
      if (!this.markers.length && newProps.sites && newProps.sites.length) {
        this.drawMarkers(newProps.sites);
        this.fitMarkersBounds();
      }
    } else {
      this.clearMarkers();
    }

    if (this.boundaryColorsToPop.length === 0) {
      if (this.props.population) {
        let i = 0;
        this.boundaryColorsToPop = this.props.population.reduce((all, pop) => {
          const newAll = Object.assign({}, all);
          newAll[pop.wpepopid] = BOUNDARY_COLORS[i];
          i++;
          return newAll;
        }, []);
      }
    }

    if (!newProps.layers.population) {
      this.layers.concat(this.activeLayers).forEach((layer) => {
        layer.setOpacity(0);
      });
    } else {
      if (this.layers.length === 0) {
        this.getBounds(this.props.id);
      } else {
        this.layers.forEach((layer) => {
          layer.setOpacity(1);
        });
      }

      const differences = newProps.activeBounds.filter((newBound) => {
        const oldBound = this.props.activeBounds.filter((bound) => bound.id === newBound.id)[0];
        return !oldBound || oldBound.active !== newBound.active;
      });

      differences.forEach((difference) => {
        this.changeLayerActivication(difference.id, difference.active);
      });
    }
  }

  componentWillUnmount() {
    this.remove();
  }

  changeLayerActivication(layerId, active) {
    this.activeLayers.forEach((layer) => {
      if (layer.options.id === layerId) {
        if (active) {
          layer.setOpacity(1);
        } else {
          layer.setOpacity(0);
        }
      }
    });
    this.layers.forEach((layer) => {
      if (layer.options.id === layerId) {
        if (!active) {
          layer.setOpacity(1);
        } else {
          layer.setOpacity(0);
        }
      }
    });
  }

  getBounds(id) {
    const query = `SELECT ST_AsGeoJSON(ST_Envelope(st_union(f.the_geom)))
      as bbox FROM species_main s
      INNER JOIN species_and_flywaygroups f on f.ssid = s.species_id
      WHERE s.species_id = ${id}`;

    getSqlQuery(query, this.setBounds.bind(this));
  }

  setBounds(res) {
    const bounds = JSON.parse(res[0].bbox);

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
        this.addLayer(this.props.id, pop.wpepopid);
      });
    }
  }

  addLayer(id, popId) {
    const color = this.boundaryColorsToPop[popId];

    const query = `SELECT f.the_geom_webmercator,
      f.colour_index
      FROM species_and_flywaygroups f WHERE f.wpepopid = ${popId} LIMIT 1`;

    [{
      opacity: '0',
      active: false,
      layerGroup: this.layers
    }, {
      opacity: '0.5',
      active: true,
      layerGroup: this.activeLayers
    }].forEach(({ opacity, active }) => {
      const cartoCSS = `#species_and_flywaygroups{
        line-opacity: 1;
        line-width: 3;
        line-dasharray: 1, 7;
        line-cap: round;
        line-color: ${color};
        polygon-fill: ${color};
        polygon-opacity: ${opacity}
      }`;

      createLayer({
        sql: query,
        cartocss: cartoCSS
      }, this.addTile.bind(this, popId, active));
    });
  }

  addTile(id, active, url) {
    let layers = this.layers;

    if (active) {
      layers = this.activeLayers;
    }
    if (layers.length > 0 && layers.some((layer) => layer.options.id === id)) {
      /* layers = layers.map((layer) => {
        if (layer.options.id === id) {
          layer.setUrl(url);
        }
        return layer;
      }); */
    } else {
      const layer = L.tileLayer(url, {
        id,
        noWrap: true,
        attribution: BASEMAP_ATTRIBUTION_CARTO
      }).setZIndex(2);

      if (active) {
        layer.setOpacity(0);
      }
      layer.addTo(this.map);
      layer.getContainer().classList.add('-layer-blending');

      layers.push(layer);
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
          <SpeciesDetailLegend boundaryColorsToPop={this.boundaryColorsToPop} />
        </div>
      </div>
    );
  }
}

SpeciesMap.contextTypes = {
  // Define function to get the translations
  t: React.PropTypes.func.isRequired
};


SpeciesMap.propTypes = {
  router: React.PropTypes.object.isRequired,
  id: React.PropTypes.string.isRequired,
  sites: React.PropTypes.any.isRequired,
  population: React.PropTypes.any.isRequired
};

export default withRouter(SpeciesMap);
