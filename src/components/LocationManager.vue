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
    <button class="upload-button" :disabled="!locationConfirmed" @click="handle"> + Upload</button>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
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
  setup(_, { emit }) {
    const store = useStore();
    const zoom = ref(20);
    const center = ref([9.4981, 76.3388]);
    const searchQuery = ref('');
    const markerPosition = ref(null);
    const locationConfirmed = ref(false);
    const infoWindowText = ref('');

    const isFlag = computed(() => store.getters.getFlag);

    watch(isFlag, (newValue) => {
      if (!newValue) {
        resetComponentState();
      }
    });

    const resetComponentState = () => {
      searchQuery.value = '';
      markerPosition.value = null;
      locationConfirmed.value = false;
      infoWindowText.value = '';
    };

    const searchLocation = async () => {
      const provider = new OpenStreetMapProvider();
      const results = await provider.search({ query: searchQuery.value });

      if (results && results.length > 0) {
        center.value = [results[0].y, results[0].x];
        zoom.value = 17;
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
      sessionStorage.setItem("location", JSON.stringify({ "lat": markerPosition.value.lat, "long": markerPosition.value.lng }));
      store.commit('setLatitude', markerPosition.value.lat);
      store.commit('setLongitude', markerPosition.value.lng);
    };

    const cancelLocation = () => {
      markerPosition.value = null;
      infoWindowText.value = '';
    };

    const handle = () => {
      if (locationConfirmed.value) {
        const location = {
          lat: markerPosition.value.lat,
          lng: markerPosition.value.lng
        };
        emit('back', location);
      }
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
      handle
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
