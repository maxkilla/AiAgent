// Initialize the map
var map = L.map('map').setView([39.0429, -122.9158], 12); // Centered on Lakeport, CA

// Add tile layer from OpenStreetMap or a dark-themed map provider
L.tileLayer.provider('CartoDB.DarkMatter').addTo(map);

// Function to load and parse KML using leaflet-omnivore
function loadKML(url) {
    omnivore.kml(url).on('ready', function() {
        map.fitBounds(this.getBounds());
    }).addTo(map);
}

// Hardcoded KML URL with a CORS proxy
var kmlUrl = 'https://cors-anywhere.herokuapp.com/http://quickmap.dot.ca.gov/data/lcs2way.kml';

// Load KML data
loadKML(kmlUrl);

