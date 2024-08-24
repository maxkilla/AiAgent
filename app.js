// Initialize the map
var map = L.map('map').setView([38.765, -120.716], 9); // Centered between the lat/lon range

// Add tile layer from OpenStreetMap or a dark-themed map provider
L.tileLayer.provider('CartoDB.DarkMatter').addTo(map);

// Function to fetch and plot data
function fetchData() {
    // Get the current bounds of the map
    const bounds = map.getBounds();
    const lat1 = bounds.getSouthWest().lat;
    const lon1 = bounds.getSouthWest().lng;
    const lat2 = bounds.getNorthEast().lat;
    const lon2 = bounds.getNorthEast().lng;

    // API endpoints with dynamic lat/lon bounds
    const roadClosuresUrl = `https://api.alpha.ca.gov/RoadClosures?lat1=${lat1}&lat2=${lat2}&lon1=${lon1}&lon2=${lon2}`;
    const chpIncidentsUrl = `https://api.alpha.ca.gov/CHPIncidents?lat1=${lat1}&lat2=${lat2}&lon1=${lon1}&lon2=${lon2}`;

    // Clear existing markers
    clearMarkers();

    // Fetch and plot Road Closures data
    fetch(roadClosuresUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(closure => {
                L.marker([closure.latitude, closure.longitude], {
                    icon: L.icon({
                        iconUrl: 'https://example.com/road-closure-icon.png', // Replace with your icon
                        iconSize: [25, 25]
                    })
                }).bindPopup(`<strong>${closure.roadName}</strong><br>${closure.details}`)
                  .addTo(map);
            });
        })
        .catch(error => console.error('Error fetching Road Closures data:', error));

    // Fetch and plot CHP Incidents data
    fetch(chpIncidentsUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(incident => {
                L.marker([incident.latitude, incident.longitude], {
                    icon: L.icon({
                        iconUrl: 'https://example.com/chp-incident-icon.png', // Replace with your icon
                        iconSize: [25, 25]
                    })
                }).bindPopup(`<strong>${incident.type}</strong><br>${incident.description}`)
                  .addTo(map);
            });
        })
        .catch(error => console.error('Error fetching CHP Incidents data:', error));
}

// Function to clear existing markers
function clearMarkers() {
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
}

// Initial fetch of data
fetchData();

// Fetch new data whenever the map stops moving
map.on('moveend', fetchData);
