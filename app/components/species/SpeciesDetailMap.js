import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import SpeciesDetailLegend from 'containers/species/SpeciesDetailLegend';
import PopulationMap from 'components/maps/PopulationMap';

class SpeciesMap extends PopulationMap {
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
    super.componentWillReceiveProps(newProps);

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

SpeciesMap.propTypes = {
  router: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  sites: PropTypes.any.isRequired,
  criticalSites: PropTypes.any.isRequired,
  selectedCategory: PropTypes.string.isRequired
};

export default withRouter(SpeciesMap);
