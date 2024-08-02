<template>
  <div id="root">
    <!-- Header Component -->
    <header-page></header-page>

    <!-- Filter Dropdowns -->
    <div class="filters-container">
      <!-- Category Dropdown -->
      <div class="dropdown-wrapper">
        <label for="categoryDropdown">
          <i class="mdi mdi-filter-menu filter-icon"></i>
        </label>
        <select id="categoryDropdown" v-model="selectedCategory">
          <option value="">Filter Category</option>
          <option
            class="dropdown"
            v-for="category in categories"
            :key="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <!-- District Dropdown -->
      <div class="dropdown-wrapper">
        <label for="districtDropdown">
          <i class="mdi mdi-filter-menu filter-icon"></i>
        </label>
        <select id="districtDropdown" v-model="selectedDistrict">
          <option value="">Filter Districts</option>
          <option
            class="dropdown"
            v-for="district in districts"
            :key="district"
          >
            {{ district }}
          </option>
        </select>
      </div>
    </div>

    <!-- Card Container Component -->
    <div class="card-container mb-3" v-motion-fade-visible v-if="allCities.length">
      <div
        class="card"
        v-for="(city, index) in filteredCities"
        :key="index"
        :class="{ 'is-flipped': city.showDetails }"
        @click="toggleDetails(city)"
      >
        <!-- Card Front -->
        <div class="card-front">
          <div class="card-header" @click.stop="openModal(city.image)">
            <img
              :src="'data:image/jpeg;base64,' + city.image"
              :width="310.92"
              :height="215.02"
            />
          </div>
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between">
              <h3>{{ city.saverName }}</h3>
              <button
                @click="navLocation(city.id)"
                class="location-btn mdi mdi-map-marker-radius"
              ></button>
            </div>
            <p class="text-subtitle-1">Category: {{ city.category }}</p>
            <p class="text-subtitle-2 mb-2">District: {{ city.district }}</p>
            <p>{{ shortenedDescription(city.description) }}</p>
            <button class="btn py-1 mt-2 ps-0" @click.stop="toggleDetails(city)">
              {{ city.showDetails ? 'Show Less' : 'Read More' }}
            </button>
          </div>
        </div>

        <!-- Card Back -->
        <div class="card-back">
          <div class="card-body">
            <h3>{{ city.saverName }}</h3>
            <hr />
            <p class="scrollable-description">{{ city.description }}</p>
          </div>
        </div>
      </div>

      <!-- Modal for Image -->
      <v-dialog v-model="showModal" @click="closeModal" width="100%" height="600">
        <v-btn class="close-btn" @click="closeModal" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card>
          <v-img
            :src="'data:image/jpeg;base64,' + modalImage"
            @click.stop
            cover
            height="100vh"
          ></v-img>
        </v-card>
      </v-dialog>
    </div>

    <!-- Footer Component -->
    <footer-page></footer-page>
  </div>
</template>

<script>
import axios from "axios";
import FooterPage from "./FooterPage.vue";
import HeaderPage from "./HeaderPage.vue";

export default {
  components: {
    FooterPage,
    HeaderPage,
  },
  data() {
    return {
      allCities: [], // Store all cities data
      showModal: false,
      modalImage: "",
      selectedCategory: "",
      selectedDistrict: "",
      categories: [
        "Lake",
        "Pond",
        "Tree",
        "Seashore",
        "Soil",
        "Canal",
        "Plantation",
        "Garden",
        "River",
      ],
      districts: [
        "Alappuzha",
        "Ernakulam",
        "Idukki",
        "Kannur",
        "Kasaragod",
        "Kollam",
        "Kottayam",
        "Kozhikode",
        "Malappuram",
        "Palakkad",
        "Pathanamthitta",
        "Thiruvananthapuram",
        "Thrissur",
        "Wayanad",
      ],
    };
  },
  created() {
    this.fetchCities();
  },
  computed: {
    filteredCities() {
      // Filter cities based on selectedCategory and selectedDistrict
      return this.allCities.filter((city) => {
        const categoryMatch =
          !this.selectedCategory || city.category === this.selectedCategory;
        const districtMatch =
          !this.selectedDistrict || city.district === this.selectedDistrict;
        return categoryMatch && districtMatch;
      });
    },
  },
  methods: {
    navLocation(locationId) {
      this.$router.push({ path: "/locations", query: { locationId } });
    },
    async fetchCities() {
      try {
        const response = await axios.get("http://192.168.1.18:8080/GreenGuard/getAll");
        console.log("Fetched cities:", response.data);
        // Wrap data update in nextTick to ensure reactivity
        this.$nextTick(() => {
          this.allCities = response.data.map((city) => ({
            ...city,
            showDetails: false, // Initialize showDetails for each city
          }));
        });
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    },
    toggleDetails(city) {
      city.showDetails = !city.showDetails;
    },
    shortenedDescription(description) {
      const words = description.split(" ");
      if (words.length > 16) {
        return words.slice(0, 16).join(" ") + "...";
      } else {
        return description;
      }
    },
    openModal(image) {
      this.modalImage = image;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.modalImage = "";
    },
  },
};
</script>

<style scoped>
#root {
  background-color: #8bc34a;
  background-image: url("~@/assets/b2.jpg"); /* Adjust path if necessary */
  background-size: cover; /* Adjust to cover the entire container */
  background-position: center; /* Center the background image */
  min-height: 100vh;
  min-height: 100vh; /* Ensure the background covers the full height */
}

/* Filters Styles */
.filters-container {
  display: flex;
  gap: 20px; /* Adds space between the dropdowns */
  margin-left: 1130px;
  margin-top: 10px;
}

.dropdown-wrapper {
  position: relative;
  display: inline-block;
}

.filter-icon {
  position: absolute;
  top: 50%;
  left: 10px; /* Adjust icon's horizontal position */
  transform: translateY(-50%);
  pointer-events: none; /* Ensures clicks go through to the select */
  color: #ffffff;
  font-size: 1.2em;
  z-index: 1; /* Ensure icon is above the dropdown */
}

select {
  padding: 10px 30px; /* Adjust padding for the icon */
  border-radius: 4px;
  border: 2px solid #ffffff;
  background-color: rgba(13, 13, 13, 0.201);
  appearance: none; /* Remove default styling */
  -webkit-appearance: none; /* Remove default styling for Safari */
  -moz-appearance: none; /* Remove default styling for Firefox */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E"); /* Custom arrow */
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  background-size: 12px;
  color: #ffffff;
  font-size: 1em;
  width: 180px; /* Set a width for the dropdown */
}

.dropdown {
  padding: 8px;
  color: #333;
  background-color: white;
  border-bottom: 1px solid #ffffff;
}

.dropdown:last-child {
  border-bottom: none; /* Remove border from last item */
}

.card-container {
  padding: 0 1rem;
  counter-reset: card;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
  gap: 1rem;
  max-width: 92%;
  margin: 20px auto; /* Added margin-top for spacing from filters */
}
.card {
  margin: 1em 0;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.5s;
  transform-style: preserve-3d;
  cursor: pointer;
}
.card:hover {
  transform: scale(1.05);
}
.card.is-flipped {
  transform: rotateY(180deg);
}
.card-front,
.card-back {
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}
.card-back {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotateY(180deg);
}
.card-header img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.card-body {
  padding: 1em;
}
.scrollable-description {
  max-height: 200px;
  overflow-y: auto;
}
.location-btn {
  color: #3b5998;
  border: none;
  background: none;
  cursor: pointer;
}
.location-btn:focus {
  outline: none;
}

.btn {
  border: none;
  background-color: transparent;
  color: #1976d2;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
}

.v-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
}

.v-card {
  background: transparent;
  box-shadow: none;
}

.v-btn.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
}
</style>
