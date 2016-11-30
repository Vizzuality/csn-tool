import React from 'react';

class SitesMap extends React.Component {

  componentDidMount() {
    this.map = L.map('map-base', {
      minZoom: 2,
      zoom: 3,
      center: [52, 7],
      detectRetina: true,
      zoomAnimation: false
    });
    this.markers = L.markerClusterGroup({
      showCoverageOnHover: false,
      removeOutsideVisibleBounds: true,
      animate: false,
      animateAddingMarkers: false,
      chunkedLoading: true,
      iconCreateFunction(cluster) {
        return L.divIcon({
          html: `<span>${cluster.getAllChildMarkers().length}</span>`,
          className: 'marker-cluster',
          iconSize: L.point(28, 28)
        });
      }
    });
    this.markerList = [];

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
      if (site.lat && site.lon) {
        const marker = L.marker([site.lat, site.lon], { icon: sitesIcon });
        marker.bindPopup(`<p class="text -light">${this.props.slug ? site.scientific_name : site.site_name}</p>`);
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
        this.markerList.push(marker);
      }
    });
    if (this.markerList.length) {
      this.markers.addLayers(this.markerList);
      this.map.addLayer(this.markers);
    }
  }

  clearMarkers() {
    this.markers.clearLayers();
    this.markerList = [];
  }

  fitBounds() {
    // const markersGroup = new L.featureGroup(this.markersList); // eslint-disable-line new-cap
    // this.map.fitBounds(markersGroup.getBounds(), { maxZoom: 8 });
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
  slug: React.PropTypes.string,
  data: React.PropTypes.any
};

export default SitesMap;
