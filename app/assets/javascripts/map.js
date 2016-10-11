function initializeMap() {
  var mymap = L.map('map', {scrollWheelZoom: false}).setView([41.1731626, -8.6641788], 13);

  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
    maxZoom: 18
  }).addTo(mymap);
};

$(document).on('turbolinks:load', initializeMap);

