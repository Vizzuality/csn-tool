import React from 'react';
import { BASEMAP_TILE, BASEMAP_ATTRIBUTION_MAPBOX, BASEMAP_ATTRIBUTION_CARTO,
  MAP_MIN_ZOOM, MAP_CENTER, MAP_MAX_BOUNDS } from 'constants/map';
import SpeciesDetailLegend from 'containers/species/SpeciesDetailLegend';

class SpeciesMap extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
    // Adds suppport to topojson
    this.includeTopoJSONLayer();
  }

  componentWillMount() {
    this.props.getLayers(this.props.id);
  }

  componentDidMount() {
    this.map = L.map('map-base', {
      minZoom: MAP_MIN_ZOOM,
      maxBounds: MAP_MAX_BOUNDS,
      zoom: MAP_MIN_ZOOM,
      center: MAP_CENTER,
      detectRetina: true
    });

    this.map.attributionControl.addAttribution(BASEMAP_ATTRIBUTION_MAPBOX);
    this.map.zoomControl.setPosition('topright');
    this.map.scrollWheelZoom.disable();
    this.tileLayer = L.tileLayer(BASEMAP_TILE).addTo(this.map).setZIndex(0);


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
    this.map.remove();
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
        <div id={'map-base'} className="c-map -full"></div>
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
  id: React.PropTypes.string.isRequired,
  getLayers: React.PropTypes.func.isRequired,
  layers: React.PropTypes.any.isRequired
};

export default SpeciesMap;
