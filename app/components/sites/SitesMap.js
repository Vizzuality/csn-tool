import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getSqlQuery } from 'helpers/map';
import BasicMap from 'components/maps/BasicMap';

const SELECTED_SITE_STYLE = {
  opacity: 1,
  weight: 2,
  dashArray: [1, 7],
  lineCap: 'round',
  color: 'white',
  fill: true,
  fillOpacity: 0.5,
  fillColor: '#efd783'
};

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

    this.setSelectedSite(this.props);
  }

  componentWillReceiveProps(newProps) {
    const siteDataHasChanged = newProps.data !== this.props.data && newProps.data.length;
    const newSiteHasBeenSelected = this.props.selected !== newProps.selected ||
            (siteDataHasChanged && !this.selectedSiteLayer);

    if (siteDataHasChanged) {
      this.clearMarkers();
      this.drawMarkers(newProps.data);
    }

    if (newSiteHasBeenSelected) this.setSelectedSite(newProps);
  }

  setSelectedSite(props) {
    if (props.selected && props.data && props.data.length > 0) {
      this.map.setView([props.data[0].lat, props.data[0].lon], 8);
      this.fetchSiteLayer(props.selected);
    }
  }

  fetchSiteLayer(siteId) {
    const query = `
      SELECT
        ST_AsGeoJSON(the_geom, 15, 1) as geom
      FROM csn_sites_polygons
      WHERE siterecid = ${siteId} LIMIT 1
    `; // asGeoJSON with options - add bbox for fitBound

    getSqlQuery(query)
      .then(this.addSiteLayer.bind(this));
  }

  addSiteLayer(data) {
    const geom = JSON.parse(data.rows[0].geom);
    const bbox = geom.bbox;
    const layer = L.geoJSON(geom, {
      noWrap: true,
      style: SELECTED_SITE_STYLE
    });
    layer.addTo(this.map);
    layer.getPane().classList.add('-layer-blending');
    this.selectedSiteLayer = layer;

    if (bbox) {
      this.map.fitBounds([
        [bbox[1], bbox[0]],
        [bbox[3], bbox[2]]
      ]);
    }
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
        <div id={this.props.id} className="c-map -full -sites"></div>
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
