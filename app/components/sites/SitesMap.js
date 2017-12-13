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

    if (this.props.sites && this.props.sites.length) {
      this.drawMarkers(this.props.sites);
    }

    this.setSelectedSite(this.props);
  }

  componentWillReceiveProps(newProps) {
    const siteDataHasChanged = newProps.sites !== this.props.sites;
    const newSiteHasBeenSelected = this.props.selectedSite !== newProps.selectedSite;

    if (siteDataHasChanged) {
      if (newProps.sites && newProps.sites.length) {
        this.clearMarkers();
        this.drawMarkers(newProps.sites);
      }
    }

    if (newSiteHasBeenSelected) this.setSelectedSite(newProps);
  }

  setSelectedSite(props) {
    if (props.selectedSite) {
      if (this.selectedSiteLayer) this.map.removeLayer(this.selectedSiteLayer);
      this.clearMarkers();
      this.drawMarkers([props.selectedSite]);

      this.fetchSiteLayer(props.selectedSite);
    }
  }

  fetchSiteLayer(site) {
    const dataset = site.type === 'iba' ? 'ibas_geometries' : 'csn_sites_polygons';
    const siteIdColumn = site.type === 'iba' ? 'site_id' : 'siterecid';
    const query = `
       SELECT
         ST_AsGeoJSON(the_geom, 15, 1) as geom
       FROM ${dataset}
       WHERE ${siteIdColumn} = ${site.id} LIMIT 1
     `; // asGeoJSON with options - add bbox for fitBound

    getSqlQuery(query)
      .then(this.addSiteLayer.bind(this));
  }

  addSiteLayer(data) {
    // layer not found, just set map view on selectedSite with default zoom
    if (!data.rows.length) {
      this.map.setView([this.props.selectedSite.lat, this.props.selectedSite.lon], 8);
      return;
    }

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

  drawMarkers(sites) {
    const sitesIcon = L.divIcon({
      className: 'map-marker',
      iconSize: null,
      html: '<span class="icon -secondary"</span>'
    });

    sites.forEach((site) => {
      if (site.lat && site.lon) {
        const marker = L.marker([site.lat, site.lon], { icon: sitesIcon });
        marker.bindPopup(`<p class="text -light">${site.site_name || site.name}</p>`);
        marker.on('mouseover', function () {
          this.openPopup();
        });
        marker.on('mouseout', function () {
          this.closePopup();
        });
        marker.on('click', () => {
          if (!this.props.selectedSite) {
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
  selectedSite: PropTypes.any,
  goToDetail: PropTypes.func.isRequired,
  id: PropTypes.string,
  sites: PropTypes.any,
  type: PropTypes.string
};

export default withRouter(SitesMap);
