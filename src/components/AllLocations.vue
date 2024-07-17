<template>
    <div>
      <div class="map-container" ref="mapContainer"></div>
      <div class="marker-icon">
        <span class="mdi mdi-map-marker-outline"></span>
      </div>
    </div>
  </template>
  
  <script>
  import L from 'leaflet';
  
  export default {
    name: 'OpenStreetMap',
    data() {
      return {
        map: null,
        mapContainer: null
      };
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        // Center map at Alappuzha
        this.map = L.map(this.$refs.mapContainer).setView([9.4981, 76.3388], 13);
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
  
        // Add marker at Alappuzha
        this.addMarker(9.4981, 76.3388, 'Alappuzha', 'Beautiful city in Kerala.');
      },
      addMarker(lat, lng, title, popupText) {
        L.marker([lat, lng]).addTo(this.map)
          .bindPopup(`<b>${title}</b><br>${popupText}`)
          .openPopup();
      }
    }
  };
  </script>
  
  <style>
  .map-container {
    height: 400px; /* Adjust height as needed */
    width: 100%;
  }
  
  .marker-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000; /* Ensure the icon is above the map */
  }
  </style>
  