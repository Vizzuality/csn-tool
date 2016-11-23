import React from 'react';

class SitesMap extends React.Component {

  componentDidMount() {
    this.map = L.map('map-base', {
      minZoom: 2,
      zoom: 3,
      center: [52, 7],
      detectRetina: true
    });
    this.markers = [];

    this.map.attributionControl.addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>');
    this.map.zoomControl.setPosition('topright');
    this.map.scrollWheelZoom.disable();
    this.tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/csn/civtok4xx004d2kpo3acytide/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY3NuIiwiYSI6ImNpdnRvam1qeDAwMXgyenRlZjZiZWc1a2wifQ.Gr5pLJzG-1tucwY4h-rGdA').addTo(this.map).setZIndex(0);

    if (this.props.data && this.props.data.length) {
      this.drawMarkers(this.props.data);
      this.fitBounds();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data && newProps.data.length) {
      this.clearMarkers();
      this.drawMarkers(newProps.data);
      this.fitBounds();
    } else {
      this.clearMarkers();
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  drawMarkers(data) {
    const sitesIcon = L.divIcon({
      className: 'map-marker',
      iconSize: null,
      html: '<span class="icon -secondary"</span>'
    });
    data.forEach((site) => {
      const marker = L.marker([site.lat, site.lon], { icon: sitesIcon }).addTo(this.map);
      marker.bindPopup(site.site_name);
      marker.on('mouseover', function () {
        this.openPopup();
      });
      marker.on('mouseout', function () {
        this.closePopup();
      });
      marker.on('click', () => {
        if (!this.props.selected) {
          this.props.goToDetail(site.slug);
        } else {
          marker.closePopup();
        }
      });
      this.markers.push(marker);
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

  fitBounds() {
    const markersGroup = new L.featureGroup(this.markers); // eslint-disable-line new-cap
    this.map.fitBounds(markersGroup.getBounds(), { maxZoom: 8 });
  }

  render() {
    return (
      <div className="l-maps-container">
        <div id={'map-base'} className="c-map -full"></div>
      </div>
    );
  }
}

SitesMap.propTypes = {
  selected: React.PropTypes.string,
  goToDetail: React.PropTypes.func.isRequired,
  data: React.PropTypes.any
};

export default SitesMap;
