import React from 'react';
import { withRouter } from 'react-router';
import BasicMap from 'components/maps/BasicMap';
import { BASEMAP_ATTRIBUTION_CARTO } from 'constants/map';
import SpeciesDetailLegend from 'containers/species/SpeciesDetailLegend';

class SpeciesMap extends BasicMap {
  componentDidMount() {
    this.initMap();
    this.props.getLayers(this.props.id);

    this.mapLayers = {};
    if (this.props.layers && this.props.layers.length) {
      this.updateLayers(this.props.layers);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.layers && newProps.layers.length) {
      this.updateLayers(newProps.layers);
    }
  }

  componentWillUnmount() {
    this.remove();
  }

  includeTopoJSONLayer() {
    L.TopoJSON = L.GeoJSON.extend({
      addData(jsonData) {
        if (jsonData.type === 'Topology') {
          Object.keys(jsonData.objects).forEach((key) => {
            const geojson = topojson.feature(jsonData, jsonData.objects[key]);
            L.GeoJSON.prototype.addData.call(this, geojson);
          });
        } else {
          L.GeoJSON.prototype.addData.call(this, jsonData);
        }
      }
    });
  }

  layerAlreadyAdded(layer) {
    return this.mapLayers[layer.slug] !== undefined;
  }

  updateLayers(layers) {
    if (layers && layers.length) {
      layers.forEach((layer) => {
        if (layer.active) {
          if (!this.layerAlreadyAdded(layer)) {
            this.addMapLayer(layer);
          }
        } else if (this.mapLayers[layer.slug]) {
          this.removeMapLayer(layer.slug);
        }
      });
    }
  }

  addMapLayer(layer) {
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
    }
    switch (layer.type) {
      case 'topojson':
        this.addTopoJSONLayer(layer);
        break;
      case 'markers':
        this.addMarkersLayer(layer);
        break;
      case 'tiles':
        this.addTileLayer(layer);
        break;
      default:
        break;
    }
  }

  removeMapLayer(layerSlug) {
    this.map.removeLayer(this.mapLayers[layerSlug]);
    delete this.mapLayers[layerSlug];
  }

  addTopoJSONLayer(layer) {
    const onEachFeature = (geom) => {
      geom.setStyle({
        color: layer.buckets[geom.feature.properties.key],
        weight: 3,
        opacity: 1,
        fillOpacity: 0,
        dashArray: '1, 7'
      });
    };

    const topoLayer = new L.TopoJSON();
    topoLayer.addData(layer.data);
    topoLayer.addTo(this.map);
    topoLayer.eachLayer(onEachFeature);
    this.mapLayers[layer.slug] = topoLayer;
  }

  addMarkersLayer(markers) {
    function getMarkerIcon(item) {
      return L.divIcon({
        className: 'map-marker',
        iconSize: null,
        html: `<span class='icon -${item.protection_status_slug}'</span>`
      });
    }

    markers.forEach((item) => {
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

  addTileLayer(url) {
    this.layer = L.tileLayer(url, {
      noWrap: true,
      attribution: BASEMAP_ATTRIBUTION_CARTO
    }).setZIndex(2);
    this.layer.addTo(this.map);
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
  getLayers: React.PropTypes.func.isRequired,
  layers: React.PropTypes.any.isRequired
};

export default withRouter(SpeciesMap);
