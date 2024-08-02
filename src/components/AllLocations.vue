<template>
  <div id="map" style="height: 100%"></div>
</template>

<script>
import L from 'leaflet';
import axios from 'axios';
import blueIcon from '@/assets/bluemarker.png'; // Replace with the actual path for the blue icon
import redIcon from '@/assets/marker.png';   // Replace with the actual path for the red icon

export default {
  data() {
    return {
      map: null,
    };
  },
  computed: {
    locationId() {
      // Access the locationId from the query parameters
      return this.$route.query.locationId || null;
    }
  },
  methods: {
    async fetchMarkers() {
      try {
        const response = await axios.get('http://192.168.1.18:8080/GreenGuard/getAllImagesAndLocations');
        console.log(response.data, "loc", this.locationId);
        const markers = response.data;
        
        // Define custom icon options
        const defaultIcon = L.icon({
          iconUrl: blueIcon,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        const highlightIcon = L.icon({
          iconUrl: redIcon,
          iconSize: [50, 50],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        // Add markers to the map
        markers.forEach(marker => {
          const [id,imageData, lat, lng ] = marker;
          
          const icon = (id === parseInt(this.locationId)) ? highlightIcon : defaultIcon;

          L.marker([parseFloat(lat), parseFloat(lng)], { icon })
            .addTo(this.map)
            .bindPopup(`
              <b>Location</b><br>
              <img src="data:image/jpeg;base64,${imageData}" width="310.92" height="215.02" />
            `)
            .on('click', function () {
              this.openPopup();
            });
        });

      } catch (error) {
        console.error('Error fetching marker data:', error);
      }
    },
  },
  mounted() {
    this.map = L.map('map').setView([10.8505, 76.2711], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.fetchMarkers();
  },
};
</script>

<style>
#map {
  height: 100vh;
}
</style>
