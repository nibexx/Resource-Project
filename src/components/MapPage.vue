<template>
  <div id="map-container">
    <div class="search-bar me-4">
      <input v-model="searchQuery" @keyup.enter="searchLocation" placeholder="Search for a place" />
      <button class="search-button" @click="searchLocation">Search</button>
    </div>
    <LMap :zoom="zoom" :center="center" style="height: 100vh; width: 100vw;" @click="handleMapClick">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LMarker :lat-lng="markerPosition" v-if="markerPosition !== null" @click="selectLocation">
        <LPopup>
          <div class="info-window">
            <p class="text-black">{{ infoWindowText }}</p>
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

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const zoom = ref(20); // Adjusted default zoom level for street-level view
    const center = ref([9.4981, 76.3388]); // Default center coordinates
    const searchQuery = ref('');
    const markerPosition = ref(null); // To store the marker position
    const locationConfirmed = ref(false); // Flag to track if location is confirmed
    const infoWindowText = ref('Click on the marker to confirm location'); // Updated info text

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
      markerPosition.value = event.latlng;
      infoWindowText.value = 'Location marked. Click the marker to confirm.';
      locationConfirmed.value = true; // Automatically enable the upload button when a location is marked
    };

    const selectLocation = () => {
      if (markerPosition.value) {
        infoWindowText.value = `Your location: Latitude ${markerPosition.value.lat}, Longitude ${markerPosition.value.lng}`;
        sessionStorage.setItem("location", JSON.stringify({"lat": markerPosition.value.lat, "long": markerPosition.value.lng}));
        store.commit('setLatitude', markerPosition.value.lat);
        store.commit('setLongitude', markerPosition.value.lng);
      }
    };

    const uploadResource = () => {
      // Implement the upload logic here
      console.log('Upload resource clicked');
      router.push('/upload-new'); // Navigate to /upload-new route
    };

    return {
      zoom,
      center,
      searchQuery,
      searchLocation,
      markerPosition,
      handleMapClick,
      selectLocation,
      infoWindowText,
      locationConfirmed,
      uploadResource
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
