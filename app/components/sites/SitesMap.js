import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getSqlQuery } from 'helpers/map';
import BasicMap from 'components/maps/BasicMap';

class SitesMap extends BasicMap {
  constructor(props) {
    super(props);
    this.markerList = [];
  }

  componentDidMount() {
    this.initMap();

    if (this.props.data && this.props.data.length) {
      this.drawMarkers(this.props.data);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data && newProps.data.length) {
      if (this.props.data.length !== newProps.data.length) {
        this.clearMarkers();
        this.drawMarkers(newProps.data);
      }
    } else {
      this.clearMarkers();
    }

    if (newProps.selected && newProps.data && newProps.data.length > 0) {
      this.map.setView([newProps.data[0].lat, newProps.data[0].lon], 8);
      this.fetchSiteLayer(newProps.selected);
    }
  }

  fetchSiteLayer(siteId) {
    const query = `
      SELECT the_geom
      FROM csn_sites_polygons
      WHERE siterecid = ${siteId} LIMIT 1
    `;

    getSqlQuery(`${query}&format=geojson`)
      .then(this.addSiteLayer.bind(this));
  }

  addSiteLayer(layerGeoJSON) {
    const color = 'red';
    const layer = L.geoJSON(layerGeoJSON, {
      noWrap: true,
      style: {
        opacity: 1,
        weight: 3,
        dashArray: [1, 7],
        lineCap: 'round',
        color,
        fill: true,
        fillOpacity: 0.5,
        fillColor: color
      }
    });
    layer.setZIndex(2);
    layer.addTo(this.map);
    layer.getPane().classList.add('-layer-blending');
  }

  drawMarkers(data) {
    const sitesIcon = L.divIcon({
      className: 'map-marker',
      iconSize: null,
      html: '<span class="icon -secondary"</span>'
    });

    data.forEach((site) => {
      if (site.lat && site.lon) {
        const marker = L.marker([site.lat, site.lon], { icon: sitesIcon });
        marker.bindPopup(`<p class="text -light">${site.site_name}</p>`);
        marker.on('mouseover', function () {
          this.openPopup();
        });
        marker.on('mouseout', function () {
          this.closePopup();
        });
        marker.on('click', () => {
          if (!this.props.selected) {
            this.props.goToDetail(site.id, site.site_type);
          } else {
            marker.closePopup();
          }
        });
        this.markerList.push(marker);
      }
    });
    if (this.markerList.length) {
      this.markers.addLayers(this.markerList);
      this.map.addLayer(this.markers);
    }
  }

  clearMarkers() {
    if (this.markers) this.markers.clearLayers();
    this.markerList = [];
  }

  render() {
    return (
      <div className="l-maps-container">
        <div id={this.props.id} className="c-map -full"></div>
      </div>
    );
  }
}

SitesMap.propTypes = {
  router: PropTypes.object.isRequired,
  selected: PropTypes.string,
  goToDetail: PropTypes.func.isRequired,
  id: PropTypes.string,
  data: PropTypes.any
};

export default withRouter(SitesMap);
