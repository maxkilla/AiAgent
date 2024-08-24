// Initialize the map
var map = L.map('map').setView([36.7783, -119.4179], 7); // Centered on California

// Add tile layer
L.tileLayer.provider('CartoDB.DarkMatter').addTo(map);

// Function to fetch and parse XML data using a CORS proxy
function fetchAndDisplayCHPData() {
    const corsProxy = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy URL
    const url = 'https://media.chp.ca.gov/sa_xml/sa.xml';
    const proxyUrl = corsProxy + url;

    fetch(proxyUrl)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            // Clear existing markers and incident list
            clearMarkers();
            clearIncidentList();

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

                // Add incident to the incident list
                addIncidentToList(title, description);
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

// Function to clear the incident list
function clearIncidentList() {
    const incidentList = document.getElementById('incident-list');
    incidentList.innerHTML = '';
}

// Function to add an incident to the incident list
function addIncidentToList(title, description) {
    const incidentList = document.getElementById('incident-list');
    const incidentItem = document.createElement('div');
    incidentItem.className = 'incident';
    incidentItem.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
    incidentList.appendChild(incidentItem);
}

// Initial fetch of data
fetchAndDisplayCHPData();

// Fetch new data every 5 minutes
setInterval(fetchAndDisplayCHPData, 300000); // 300000 ms = 5 minutes
