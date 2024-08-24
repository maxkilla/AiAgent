// Initialize the map
var map = L.map('map').setView([34.0522, -118.2437], 10); // Centered on Los Angeles

// Add tile layer from OpenStreetMap or a dark-themed map provider
L.tileLayer.provider('CartoDB.DarkMatter').addTo(map);

// Function to load and parse KML using leaflet-omnivore
function loadKML(url) {
    omnivore.kml(url).on('ready', function() {
        map.fitBounds(this.getBounds());
    }).addTo(map);
}

// Load KML data
loadKML('kml/lcs2way.kml');
