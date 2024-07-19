<template>
  <div id="map" style="height: 100%"></div>
</template>

<script>
import { onMounted } from 'vue';
import L from 'leaflet';

// Import the location icon (replace with your actual icon path)
import locationIcon from '@/assets/marker.png'; // Adjust the path based on your project structure

export default {

  setup() {
    onMounted(() => {
      // Initialize the map
      const map = L.map('map').setView([10.8505, 76.2711], 8); // Centered in Kerala, India

      // Set up the OpenStreetMap layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Sample markers with latitude and longitude
      const markers = [
        { lat: 10.8505, lng: 76.2711, name: 'Kerala, India' },
        { lat: 9.9312, lng: 76.2673, name: 'Kochi, India' },
        { lat: 8.5241, lng: 76.9366, name: 'Thiruvananthapuram, India' },
        { lat: 11.2588, lng: 75.7804, name: 'Kozhikode, India' }
      ];

      // Define custom icon options
      const customIcon = L.icon({
        iconUrl: locationIcon,
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Point of the icon which corresponds to marker's location
        popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
      });

      // Add markers to the map using custom icon
      markers.forEach(marker => {
        L.marker([marker.lat, marker.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(`<b>${marker.name}</b>`)
          .openPopup();
      });
    });
  }
};
</script>

<style>
/* Make sure to give the map container a height */
#map {
  height: 100vh;
}
</style>
