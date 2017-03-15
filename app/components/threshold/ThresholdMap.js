import React from 'react';
import { withRouter } from 'react-router';
import BasicMap from 'components/maps/BasicMap';
import { replaceUrlParams } from 'helpers/router';
import { createLayer, getSqlQuery } from 'helpers/map';
import { BASEMAP_ATTRIBUTION_CARTO } from 'constants/map';

class ThresholdMap extends BasicMap {
  constructor(props) {
    super(props);
    this.marker = null;
    this.drawMarker = this.drawMarker.bind(this);
    this.updateCoords = this.updateCoords.bind(this);
    if (props.coordinates) {
      setTimeout(() => {
        this.drawMarker(props.coordinates);
      }, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coordinates) {
      this.drawMarker(nextProps.coordinates);
    }

    // TODO: get species bounds and render
  }


  componentDidMount() {
    this.initMap();
    this.map.on('click', this.updateCoords);
  }

  componentWillUnmount() {
    this.remove();
    this.map.off('click', this.updateCoords);
  }

  updateCoords(e) {
    const params = {
      position: `${e.latlng.lat},${e.latlng.lng}`
    };
    const route = this.props.router.getCurrentLocation();
    const url = replaceUrlParams(route.pathname + route.search, params);
    this.props.router.replace(url);
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

  drawMarker(coordinates) {
    function getMarkerIcon() {
      return L.divIcon({
        className: 'map-marker',
        iconSize: null,
        html: '<span class="icon"></span>'
      });
    }

    if (coordinates.lat && coordinates.lng) {
      if (this.marker) this.map.removeLayer(this.marker);
      this.marker = L.marker([coordinates.lat, coordinates.lng], { icon: getMarkerIcon() }).addTo(this.map);
    }
  }


  render() {
    return (
      <div className="l-maps-container">
        <div id={this.props.id} className="c-map -full -pointer"></div>
      </div>
    );
  }
}

ThresholdMap.propTypes = {
  coordinates: React.PropTypes.object
};

export default withRouter(ThresholdMap);
