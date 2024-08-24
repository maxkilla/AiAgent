// Initialize the map
var map = L.map('map').setView([38.5, -122.5], 9); // Center the map around Sonoma County

// Add tile layer
L.tileLayer.provider('CartoDB.DarkMatter').addTo(map);

// Function to fetch and plot data from FeatureServer
function fetchAndPlotData() {
    // Get the current bounds of the map
    const bounds = map.getBounds();
    const lat1 = bounds.getSouthWest().lat;
    const lon1 = bounds.getSouthWest().lng;
    const lat2 = bounds.getNorthEast().lat;
    const lon2 = bounds.getNorthEast().lng;

    // Construct the query URL for the FeatureServer with dynamic bounding box
    const featureServerUrl = `https://socogis.sonomacounty.ca.gov/map/rest/services/CAPublic/CalTrans_QuickMap_Data/FeatureServer/0/query?where=1=1&geometry=${lon1},${lat1},${lon2},${lat2}&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=true&f=geojson`;

    // Fetch data from the FeatureServer
    fetch(featureServerUrl)
        .then(response => response.json())
        .then(data => {
            // Clear existing data
            clearMarkers();

            // Add new data to the map
            L.geoJSON(data, {
                onEachFeature: function (feature, layer) {
                    if (feature.properties && feature.properties.Name) {
                        layer.bindPopup(`<strong>${feature.properties.Name}</strong><br>${feature.properties.Description}`);
                    }
                }
            }).addTo(map);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to clear existing markers and layers
function clearMarkers() {
    map.eachLayer(layer => {
        if (layer instanceof L.GeoJSON) {
            map.removeLayer(layer);
        }
    });
}

// Initial fetch of data
fetchAndPlotData();

// Fetch new data whenever the map stops moving
map.on('moveend', fetchAndPlotData);
