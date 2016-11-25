import React from 'react';
import { BASEMAP_TILE, BASEMAP_ATTRIBUTION_MAPBOX, MAP_MIN_ZOOM, MAP_CENTER, MAP_MAX_BOUNDS } from 'constants/map';

class Map extends React.Component {

  componentDidMount() {
    this.map = L.map('map-basic', {
      minZoom: MAP_MIN_ZOOM,
      maxBounds: MAP_MAX_BOUNDS,
      zoom: MAP_MIN_ZOOM,
      center: MAP_CENTER,
      detectRetina: true,
      zoomControl: false
    });

    this.map.attributionControl.addAttribution(BASEMAP_ATTRIBUTION_MAPBOX);
    this.map.scrollWheelZoom.disable();
    this.tileLayer = L.tileLayer(BASEMAP_TILE).addTo(this.map).setZIndex(0);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div id={'map-basic'} className="c-map"></div>
    );
  }
}

export default Map;
