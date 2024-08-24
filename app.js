// Initialize the map
var map = L.map('map').setView([38.5, -122.5], 9); // Center the map around Sonoma County

// Add tile layer
L.tileLayer.provider('CartoDB.DarkMatter').addTo(map);

// FeatureServer URL
const featureServerUrl = 'https://socogis.sonomacounty.ca.gov/map/rest/services/CAPublic/CalTrans_QuickMap_Data/FeatureServer';

// Function to fetch and display all layers
function fetchAndDisplayAllLayers() {
    // Fetch the list of layers
    fetch(`${featureServerUrl}/layers?f=json`)
        .then(response => response.json())
        .then(layersInfo => {
            // Iterate over each layer and query it
            layersInfo.layers.forEach(layer => {
                const layerId = layer.id;
                const layerName = layer.name;

                // Construct the query URL for the current layer with dynamic bounding box
                const bounds = map.getBounds();
                const lat1 = bounds.getSouthWest().lat;
                const lon1 = bounds.getSouthWest().lng;
                const lat2 = bounds.getNorthEast().lat;
                const lon2 = bounds.getNorthEast().lng;

                const queryUrl = `${featureServerUrl}/${layerId}/query?where=1=1&geometry=${lon1},${lat1},${lon2},${lat2}&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=true&f=geojson`;

                // Fetch data for the current layer
                fetch(queryUrl)
                    .then(response => response.json())
                    .then(data => {
                        // Add data to the map
                        L.geoJSON(data, {
                            onEachFeature: function (feature, layer) {
                                if (feature.properties) {
                                    const popupContent = `<strong>${layerName}</strong><br>` +
                                        Object.entries(feature.properties)
                                              .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
                                              .join('<br>');
                                    layer.bindPopup(popupContent);
                                }
                            }
                        }).addTo(map);
                    })
                    .catch(error => console.error(`Error fetching data for layer ${layerName}:`, error));
            });
        })
        .catch(error => console.error('Error fetching layers:', error));
}

// Function to clear existing layers
function clearLayers() {
    map.eachLayer(layer => {
        if (layer instanceof L.GeoJSON) {
            map.removeLayer(layer);
        }
    });
}

// Initial fetch and display of all layers
fetchAndDisplayAllLayers();

// Fetch new data whenever the map stops moving
map.on('moveend', () => {
    clearLayers();
    fetchAndDisplayAllLayers();
});
