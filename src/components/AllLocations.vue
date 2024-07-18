<template>
    <div>
      <input 
        type="text" 
        v-model="query" 
        @input="fetchSuggestions" 
        placeholder="Enter a location" 
      />
      <ul v-if="suggestions.length">
        <li 
          v-for="suggestion in suggestions" 
          :key="suggestion.place_id" 
          @click="selectSuggestion(suggestion)"
        >
          {{ suggestion.display_name }}
        </li>
      </ul>
      <button @click="getLocation()">Get My Location</button>
      <div ref="mapContainer" style="width: 100%; height: 500px"></div>
    </div>
  </template>
  
  <script>
  // import { onMounted, ref } from "vue";
  import L from "leaflet";
  import axios from "axios";
  
  export default {
    data() {
      return {
        query: "",
        suggestions: [],
        nearbyPlaces: [],
        selectedPlace: null,
        map: null,
        mapContainer: null,
        userMarker: null,
        nearbyRadius: 10,
        placesInKerala: [
          { name: "Thiruvananthapuram", latitude: 8.5241, longitude: 76.9366 },
          { name: "Kochi", latitude: 9.9312, longitude: 76.2673 },
          { name: "Kozhikode", latitude: 11.2588, longitude: 75.7804 },
          { name: "Thrissur", latitude: 10.5276, longitude: 76.2144 },
          { name: "Alappuzha", latitude: 9.4981, longitude: 76.3388 },
          { name: "Palakkad", latitude: 10.7867, longitude: 76.6548 },
          { name: "Kollam", latitude: 8.8932, longitude: 76.6141 },
          { name: "Kannur", latitude: 11.8745, longitude: 75.3704 },
          { name: "Kottayam", latitude: 9.5916, longitude: 76.5222 },
          { name: "Malappuram", latitude: 11.0735, longitude: 76.0745 },
          { name: "Pathanamthitta", latitude: 9.2646, longitude: 76.7870 },
          { name: "Idukki", latitude: 9.8503, longitude: 76.9747 },
          { name: "Varkala", latitude: 8.7379, longitude: 76.7163 },
          { name: "Guruvayur", latitude: 10.5943, longitude: 76.0410 },
          { name: "Munnar", latitude: 10.0892, longitude: 77.0595 },
          { name: "Kumarakom", latitude: 9.6174, longitude: 76.4294 },
          { name: "Wayanad", latitude: 11.6854, longitude: 76.1319 },
          { name: "Bekal", latitude: 12.3660, longitude: 75.0466 },
          { name: "Vagamon", latitude: 9.6855, longitude: 76.9183 },
          { name: "Sabarimala", latitude: 9.4420, longitude: 77.0694 }
        ]
      };
    },
    methods: {
      fetchSuggestions() {
        if (this.query.length > 2) {
          axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${this.query}`).then(response => {
              this.suggestions = response.data;
            })
            .catch(error => {
              console.error('Error fetching suggestions:', error);
            });
        } else {
          this.suggestions = [];
        }
      },
      selectSuggestion(suggestion) {
        if (!this.map) return;
  
        const selectedLat = parseFloat(suggestion.lat);
        const selectedLon = parseFloat(suggestion.lon);
        this.selectedPlace = {
          name: suggestion.display_name,
          latitude: selectedLat,
          longitude: selectedLon
        };
  
        this.map.setView([selectedLat, selectedLon], 10);
        this.userMarker.setLatLng([selectedLat, selectedLon]);
        this.userMarker.setTooltipContent(this.selectedPlace.name);
  
        // Find and display nearby places within the specified radius
        this.displayNearbyPlaces(selectedLat, selectedLon, this.nearbyRadius);
  
        this.suggestions = [];
      },
      getLocation() {
        if (navigator.geolocation && this.map) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              console.log('Retrieved Latitude : ${lat}, Retrieved Longitude: ${lng}');
              this.map.setView([lat, lng], 13);
    
              this.userMarker.setLatLng([lat, lng]);
              this.userMarker.setTooltipContent("Your Location");
    
              this.selectedPlace = {
                name: "Current Location",
                latitude: lat,
                longitude: lng,
              };
              this.displayNearbyPlaces(lat, lng, this.nearbyRadius);
            },
            (error) => {
              console.error('Error getting location:', error);
              alert('Unable to retrieve your location. Please check your location settings and try again.');
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
          );
        } else {
          alert('Geolocation is not supported by your browser.');
        }
      },
      displayNearbyPlaces(lat, lng, radius) {
        // Clear previous nearbyPlaces markers
        this.nearbyPlaces.forEach(place => {
          this.map.removeLayer(place.marker);
        });
        this.nearbyPlaces = [];
  
        // Find and display nearby places within the specified radius
        this.salons.forEach(place => {
          const distance = this.calculateDistance(lat, lng, place.latitude, place.longitude);
          if (distance <= radius) {
            const marker = L.marker(
              [place.latitude, place.longitude], 
              { 
                icon: L.icon({ 
                  iconUrl: require("@/assets/redmarker.png"), 
                  iconSize: [25, 41], 
                }) 
              }
            )
            .addTo(this.map)
            .bindTooltip(place.parlourName, { 
              permanent: true, 
              direction: 'top',
              offset: [0, -20]
            })
            .bindPopup(place.name);
            this.nearbyPlaces.push({ ...place, marker });
          }
        });
      },
      calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance;
      },
      deg2rad(deg) {
        return deg * (Math.PI / 180);
      }
    },
    computed:{
      salons(){
        return this.$store.getters["getSalons"];
      }
    },
    mounted() {
      this.mapContainer = this.$refs.mapContainer;
  
      if (this.mapContainer) {
        this.map = L.map(this.mapContainer).setView([10.8505, 76.2711], 7);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);
        this.userMarker = L.marker([10.8505, 76.2711], { draggable: true })
          .addTo(this.map)
          .bindTooltip("Drag to select location", {
            permanent: true,
            direction: "top",
          })
          .on("dragend", (event) => {
            const latlng = event.target.getLatLng();
            this.selectedPlace = {
              name: 'Selected Location',
              latitude: latlng.lat,
              longitude: latlng.lng,
            };
            this.map.setView(latlng, 10);
            this.userMarker.setLatLng([latlng.lat, latlng.lng]);
            this.userMarker.setTooltipContent(this.selectedPlace.name);
            this.displayNearbyPlaces(this.selectedPlace.latitude, this.selectedPlace.longitude, this.nearbyRadius);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  input {
    width: 300px;
    padding: 8px;
    margin-bottom: 10px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    max-width: 300px;
  }
  
  li {
    padding: 8px;
    cursor: pointer;
  }
  
  li:hover {
    background-color: #f0f0f0;
  }
  </style>