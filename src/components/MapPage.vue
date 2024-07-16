<!-- <template>
  <div>
    <h1>Map Page</h1>
    <div id="map" style="width: 100%; height: 400px;"></div>
    <v-btn @click="confirmLocation">Yes</v-btn>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { eventBus } from '@/eventBus';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const latitude = ref(0);
const longitude = ref(0);

onMounted(() => {
  const map = L.map('map').setView([51.505, -0.09], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const marker = L.marker([51.505, -0.09], {
    draggable: true
  }).addTo(map);

  marker.on('dragend', function (e) {
    const latLng = e.target.getLatLng();
    latitude.value = latLng.lat;
    longitude.value = latLng.lng;
  });
});

function confirmLocation() {
  eventBus.emit('locationConfirmed', {
    latitude: latitude.value,
    longitude: longitude.value
  });
}
</script> -->


<!-- <template>
  <div class="search-bar me-4">
      <input v-model="searchQuery"
             @keyup.enter="searchLocation"
             placeholder="Search for a place"
             @input="fetchSuggestions"
             ref="searchInput"
      />
      <ul v-if="suggestions.length" class="autocomplete-list">
        <li v-for="(suggestion, index) in suggestions"
            :key="index"
            @click="selectSuggestion(suggestion)"
        >
          {{ suggestion.display_name }}
        </li>
      </ul>
      <button class="search-button" @click="searchLocation">Search</button>
    </div>
  <div id="map-container">
    
    <LMap :zoom="zoom" :center="center" style="height: 100vh; width: 100vw;" @click="handleMapClick">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LMarker :lat-lng="markerPosition" v-if="markerPosition !== null">
        <LPopup>
          <div class="info-window">
            <p>{{ infoWindowText }}</p>
            <div v-if="!locationConfirmed">
              <button class="yes-button me-2" @click="confirmLocation">Yes</button>
              <button class="no-button ms-2" @click="cancelLocation">No</button>
            </div>
          </div>
        </LPopup>
      </LMarker>
      <LMarker :lat-lng="center">
        <LPopup>
          <div>
            <p>Default Center</p>
          </div>
        </LPopup>
      </LMarker>
    </LMap>
    <button class="upload-button" :disabled="!locationConfirmed" @click="uploadResource"> + Upload</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue3-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  emits: ['location-confirmed'],
  setup() {
    const store = useStore();
    const router = useRouter();
    const zoom = ref(20);
    const center = ref([9.4981, 76.3388]);
    const searchQuery = ref('');
    const markerPosition = ref(null);
    const locationConfirmed = ref(false);
    const infoWindowText = ref('');
    const suggestions = ref([]);

    const searchLocation = async () => {
      const provider = new OpenStreetMapProvider();
      const results = await provider.search({ query: searchQuery.value });

      if (results && results.length > 0) {
        center.value = [results[0].y, results[0].x];
        zoom.value = 17;
        markerPosition.value = null; // Clear previous marker position
      } else {
        alert('Location not found');
      }
    };

    const fetchSuggestions = async () => {
      const provider = new OpenStreetMapProvider();
      const results = await provider.search({ query: searchQuery.value });

      suggestions.value = results.slice(0, 5); // Limit to first 5 suggestions
    };

    const selectSuggestion = (suggestion) => {
      center.value = [suggestion.y, suggestion.x];
      zoom.value = 17;
      searchQuery.value = suggestion.display_name;
      suggestions.value = []; // Clear suggestions
      markerPosition.value = null; // Clear previous marker position
    };

    const handleMapClick = (event) => {
      if (!locationConfirmed.value) {
        markerPosition.value = event.latlng;
        infoWindowText.value = 'Is this your location?';
      }
    };

    const confirmLocation = () => {
      infoWindowText.value = `Your location: Latitude ${markerPosition.value.lat}, Longitude ${markerPosition.value.lng}`;
      locationConfirmed.value = true;
      sessionStorage.setItem("location", JSON.stringify({ "lat": markerPosition.value.lat, "long": markerPosition.value.lng }));
      store.commit('setLatitude', markerPosition.value.lat);
      store.commit('setLongitude', markerPosition.value.lng);
    };

    const cancelLocation = () => {
      markerPosition.value = null;
      infoWindowText.value = '';
    };

    const uploadResource = () => {
      console.log('Upload resource clicked');
      router.push('/upload-new');
    };

    return {
      zoom,
      center,
      searchQuery,
      searchLocation,
      markerPosition,
      handleMapClick,
      confirmLocation,
      cancelLocation,
      infoWindowText,
      locationConfirmed,
      uploadResource,
      suggestions,
      fetchSuggestions,
      selectSuggestion
    };
  }
};
</script> -->


<template>
  <div id="map-container">
    <div class="search-bar me-4">
      <input v-model="searchQuery" @keyup.enter="searchLocation" placeholder="Search for a place" />
      <button class="search-button" @click="searchLocation">Search</button>
    </div>
    <LMap :zoom="zoom" :center="center" style="height: 100vh; width: 100vw;" @click="handleMapClick">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LMarker :lat-lng="markerPosition" v-if="markerPosition !== null">
        <LPopup>
          <div class="info-window">
            <p>{{ infoWindowText }}</p>
            <div v-if="!locationConfirmed">
              <button class="yes-button me-2"   @click="confirmLocation">Yes</button>
              <button class="no-button ms-2"  @click="cancelLocation">No</button>
            </div>
          </div>
        </LPopup>
      </LMarker>
      <LMarker :lat-lng="center">
        <LPopup>
          <div>
            <p>Default Center</p>
          </div>
        </LPopup>
      </LMarker>
    </LMap>
    <button class="upload-button" :disabled="!locationConfirmed" @click="uploadResource"> + Upload</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue3-leaflet';
import 'leaflet/dist/leaflet.css';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
// import { Icon } from 'leaflet';
// import '@mdi/font/css/materialdesignicons.css';

export default {
  
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  emits: ['location-confirmed'], // Define the emitted event
  // setup() {
    setup() {
      const store = useStore();
      const router = useRouter();
    const zoom = ref(20); // Adjusted default zoom level for street-level view
    const center = ref([9.4981, 76.3388]); // Default center coordinates
    const searchQuery = ref('');
    const markerPosition = ref(null); // To store the marker position
    const locationConfirmed = ref(false); // Flag to track if location is confirmed
    const infoWindowText = ref(''); // Text to display in the info window


    const searchLocation = async () => {
      const provider = new OpenStreetMapProvider();
      const results = await provider.search({ query: searchQuery.value });

      if (results && results.length > 0) {
        center.value = [results[0].y, results[0].x];
        zoom.value = 17; // Set a more detailed zoom level for street-level view
      } else {
        alert('Location not found');
      }
    };

    const handleMapClick = (event) => {
      if (!locationConfirmed.value) {
        markerPosition.value = event.latlng;
        infoWindowText.value = 'Is this your location?';
      }
    };
    const confirmLocation = () => {
      infoWindowText.value = `Your location: Latitude ${markerPosition.value.lat}, Longitude ${markerPosition.value.lng}`;
      locationConfirmed.value = true;
     console.log(markerPosition.value.lat);
     console.log(markerPosition.value.lng);
     sessionStorage.setItem("location", JSON.stringify({"lat":markerPosition.value.lat,"long":markerPosition.value.lng}));
       store.commit('setLatitude',markerPosition.value.lat);
       store.commit('setLongitude',markerPosition.value.lng);
      // emit('location-confirmed', { lat: markerPosition.value.lat, lng: markerPosition.value.lng });
    };
    // const confirmLocation = () => {
    //   // Display latitude and longitude of marker position
    //   infoWindowText.value = `Your location: Latitude ${markerPosition.value.lat}, Longitude ${markerPosition.value.lng}`;
    //   locationConfirmed.value = true;
    // };
    const cancelLocation = () => {
      markerPosition.value = null; // Clear marker position if user cancels
      infoWindowText.value = ''; // Clear info window text
    };

    const uploadResource = () => {
      // Implement the upload logic here
      console.log('Upload resource clicked');
      
      router.push('/upload-new'); // Navigate to /upload-new route
    };
    // Define custom marker icon for center
    // const centerIcon = new Icon({
    //   iconUrl: require('@/assets/marker-icon-blue.png').default,
    //   iconSize: [25, 41],
    //   iconAnchor: [12, 41],
    //   popupAnchor: [1, -34],
    //   tooltipAnchor: [16, -28],
    // });
    return {
      zoom,
      center,
      searchQuery,
      searchLocation,
      markerPosition,
      handleMapClick,
      confirmLocation,
      cancelLocation,
      infoWindowText,
      locationConfirmed,
      uploadResource
      // centerIcon,
    };
  }
};
</script>  

<style>
.autocomplete-list {
  list-style-type: none;
  padding: 0;
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #ccc;
  z-index: 1000;
  width: 100%;
}

.autocomplete-list li {
  padding: 10px;
  cursor: pointer;
  color: black;
}

.autocomplete-list li:hover {
  background-color: #e9e9e9;
  
}
#map-container {
  height: 100vh;
  width: 100vw;
  position: relative;
}

.search-bar {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  display: flex;
}

.search-bar input {
  margin-right: 10px;
  border: 2px solid black;
  padding: 5px;
  border-radius: 5px;
}

.search-button {
  color: white;
  background-color: blue;
  border: 2px solid rgb(49, 49, 151);
  padding: 5px 10px;
  border-radius: 5px;
}

.info-window {
  max-width: 300px;
  text-align: center;
}

.info-window p {
  margin-bottom: 10px;
}
.no-button
.yes-button
.info-window button {
  margin: 5px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  
  border: 1px solid gray;
}

/* .info-window button:hover {
  background-color: #f0f0f0;
} */
.yes-button:hover{
 background-color: blue;
 color: white;
 padding: 5px;
 border-radius: 10px;
}
.no-button:hover{
 background-color: red;
 color: white;
 padding: 5px;
 border-radius: 10px;
}
.upload-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
  margin-right: 10px;
}

.upload-button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>



 <!-- <template>
  <div id="map"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'GeoLocationMap',
  mounted() {
    this.initMap();
    this.watchPosition();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([51.505, -0.09], 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(this.map);
    },
    watchPosition() {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 2000,
      };

      navigator.geolocation.watchPosition(this.success, this.error, options);
    },
    success(pos) {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const accuracy = pos.coords.accuracy;

      if (this.marker) {
        this.map.removeLayer(this.marker);
        this.map.removeLayer(this.circle);
      }

      this.marker = L.marker([lat, lng]).addTo(this.map);
      this.circle = L.circle([lat, lng], { radius: accuracy }).addTo(this.map);

      if (!this.zoomed) {
        this.zoomed = this.map.fitBounds(this.circle.getBounds());
      }

      this.map.setView([lat, lng]);
    },
    error(err) {
      if (err.code === 1) {
        alert("Please allow geolocation access");
      } else {
        alert("Cannot get current location");
      }
    },
  },
  data() {
    return {
      map: null,
      marker: null,
      circle: null,
      zoomed: false,
    };
  },
};
</script>

<style>
#map {
  height: 100%;
  width: 100%;
}
</style> -->
