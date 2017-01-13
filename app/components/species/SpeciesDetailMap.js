import React from 'react';
import { withRouter } from 'react-router';
import BasicMap from 'components/maps/BasicMap';
import { BASEMAP_ATTRIBUTION_CARTO } from 'constants/map';
import { createLayer, getSqlQuery } from 'helpers/map';
import SpeciesDetailLegend from 'containers/species/SpeciesDetailLegend';

class SpeciesMap extends BasicMap {
  componentDidMount() {
    this.initMap();

    this.markers = [];
    if (this.props.sites && this.props.sites.length) {
      this.drawMarkers(this.props.sites);
    }

    this.getBounds(this.props.id);
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
  }

  componentWillUnmount() {
    this.remove();
  }

  getBounds(id) {
    const query = `SELECT ST_AsGeoJSON(ST_Envelope(st_union(f.the_geom)))
      as bbox FROM species s
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

    this.addLayer(this.props.id);
  }

  addLayer(id) {
    const query = `SELECT f.the_geom_webmercator, f.colour_index FROM species s
      INNER JOIN species_and_flywaygroups f on f.ssid = s.species_id
      WHERE s.species_id = ${id}`;

    const cartoCSS = `#species_and_flywaygroups{
      polygon-opacity: 0;
      line-opacity: 1;
      line-width: 3;
      line-dasharray: 1, 7;
      line-cap: round;
    }
    #species_and_flywaygroups[colour_index=1]{ line-color: #a6cee3;}
    #species_and_flywaygroups[colour_index=2]{ line-color: #1f78b4;}
    #species_and_flywaygroups[colour_index=3]{ line-color: #b2df8a;}
    #species_and_flywaygroups[colour_index=4]{ line-color: #33a02c;}
    #species_and_flywaygroups[colour_index=5]{ line-color: #fb9a99;}
    #species_and_flywaygroups[colour_index=6]{ line-color: #e31a1c;}
    #species_and_flywaygroups[colour_index=7]{ line-color: #fdbf6f;}
    #species_and_flywaygroups[colour_index=8]{ line-color: #ff7f00;}
    #species_and_flywaygroups[colour_index=9]{ line-color: #cab2d6;}
    #species_and_flywaygroups[colour_index=10]{ line-color: #6a3d9a;}
    #species_and_flywaygroups[colour_index=11]{ line-color: #ffff99;}`;


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

  drawMarkers(speciesSites) {
    function getMarkerIcon(item) {
      return L.divIcon({
        className: 'map-marker',
        iconSize: null,
        html: `<span class='icon -${item.protection_status_slug}'</span>`
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
          <SpeciesDetailLegend />
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
