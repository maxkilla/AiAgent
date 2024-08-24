// Initialize the map
var map = L.map('map').setView([36.7783, -119.4179], 7); // Centered on California

// Add tile layer
L.tileLayer.provider('CartoDB.DarkMatter').addTo(map);

// Function to fetch and parse XML data
function fetchAndDisplayCHPData() {
    const url = 'https://media.chp.ca.gov/sa_xml/sa.xml';

    fetch(url)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            // Clear existing markers
            clearMarkers();

            // Extract and plot incident data
            const incidents = data.getElementsByTagName("item");
            for (let i = 0; i < incidents.length; i++) {
                const incident = incidents[i];
                const title = incident.getElementsByTagName("title")[0].textContent;
                const description = incident.getElementsByTagName("description")[0].textContent;
                const latitude = parseFloat(incident.getElementsByTagName("latitude")[0].textContent);
                const longitude = parseFloat(incident.getElementsByTagName("longitude")[0].textContent);

                // Create marker for the incident
                L.marker([latitude, longitude], {
                    icon: L.icon({
                        iconUrl: 'https://example.com/chp-incident-icon.png', // Replace with your icon
                        iconSize: [25, 25]
                    })
                }).bindPopup(`<strong>${title}</strong><br>${description}`)
                  .addTo(map);
            }
        })
        .catch(error => console.error('Error fetching and parsing XML data:', error));
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
fetchAndDisplayCHPData();

// Fetch new data every 5 minutes
setInterval(fetchAndDisplayCHPData, 300000); // 300000 ms = 5 minutes
