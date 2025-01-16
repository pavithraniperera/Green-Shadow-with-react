import { useEffect } from 'react';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet styles

function MapComponent({ onLocationSelect }: { onLocationSelect: (location: string) => void }) {
    useEffect(() => {
        // Initialize the map
        const map = L.map('map').setView([6.7114, 79.9072], 13); // Default center (latitude, longitude) and zoom level

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add a marker
        const marker = L.marker([6.7114, 79.9072]).addTo(map);

        // Handle map click to update marker position and input field
        map.on('click', (e) => {
            const { lat, lng } = e.latlng;
            marker.setLatLng([lat, lng]); // Update marker position

            const locationString = `${lat.toFixed(5)},${lng.toFixed(5)}`;
            onLocationSelect(locationString); // Call the callback with the new location
        });

        return () => {
            // Cleanup map instance on component unmount
            map.remove();
        };
    }, []);

    return (


            <div id="map" className="h-64 rounded-lg bg-gray-200"></div>


    );
}

export default MapComponent;
