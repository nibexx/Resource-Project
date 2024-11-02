<template>
  <div id="root">
    <div class="header-container">
      <h1 class="logo">GREEN GUARD</h1>
      <div class="user-actions">
        <button @click="goToProfile" class="btn">
          <img :src="profileIcon" alt="Profile Icon" class="profile-icon" />
        </button>
        <button @click="logout" class="btn">
          <img :src="logoutIcon" alt="Logout Icon" class="logout-icon" />
        </button>
      </div>
    </div>

    <!-- Filter Dropdowns -->
    <div class="filters-container">
      <div class="dropdown-wrapper category-dropdown">
        <select v-model="selectedCategory">
          <option value="">Filter Category</option>
          <option v-for="category in categories" :key="category">{{ category }}</option>
        </select>
      </div>

      <div class="dropdown-wrapper district-dropdown">
        <select v-model="selectedDistrict">
          <option value="">Filter Districts</option>
          <option v-for="district in districts" :key="district">{{ district }}</option>
        </select>
      </div>
    </div>

    <!-- Card Container -->
    <div class="card-container">
      <div
        class="card"
        v-for="(city, index) in filteredCities"
        :key="index"
      >
        <!-- Card Front -->
        <div class="card-front" v-if="!flippedCards[index]">
          <div class="card-header">
            <img :src="'data:image/jpeg;base64,' + city.image" alt="City Image" />
          </div>
          <div class="card-body">
            <h3>{{ city.saverName }}</h3>
            <p>Category: {{ city.category }}</p>
            <p>District: {{ city.district }}</p>
            <p>{{ shortenedDescription(city.description) }}</p>
            <a @click="flipCard(index)" class="read-more-link">Read More</a>
          </div>
        </div>

        <!-- Card Back -->
        <div class="card-back" v-if="flippedCards[index]">
          <div class="card-body">
            <h3>{{ city.saverName }}</h3>
            <p>{{ city.description }}</p>
            <a @click="flipCard(index)" class="show-less-link">Show Less</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      allCities: [],
      selectedCategory: '',
      selectedDistrict: '',
      profileIcon: require('@/assets/account.png'),
      logoutIcon: require('@/assets/logout.png'),
      categories: ['Lake', 'Pond', 'Tree', 'Seashore', 'Soil', 'Canal', 'Plantation', 'Garden', 'River'],
      districts: ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'],
      flippedCards: [] // To track which cards are flipped
    };
  },
  created() {
    this.fetchCities();
  },
  computed: {
    filteredCities() {
      return this.allCities.filter((city) => {
        const categoryMatch = !this.selectedCategory || city.category === this.selectedCategory;
        const districtMatch = !this.selectedDistrict || city.district === this.selectedDistrict;
        return categoryMatch && districtMatch;
      });
    },
  },
  methods: {
    async fetchCities() {
      try {
        const response = await axios.get('http://192.168.1.31:8080/GreenGuard/getAll');
        this.allCities = response.data;
        // Initialize flippedCards with 'false' for each city
        this.flippedCards = this.allCities.map(() => false);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    },
    shortenedDescription(description) {
      const words = description.split(' ');
      if (words.length > 16) {
        return words.slice(0, 16).join(' ') + '...';
      } else {
        return description;
      }
    },
    flipCard(index) {
      // Directly modify the flippedCards array in Vue 3
      this.flippedCards[index] = !this.flippedCards[index];
    },
    goToProfile() {
      this.$router.push('/profile-page');
    },
    logout() {
      this.$router.push('/login-page');
    },
  },
};
</script>

<style scoped>

#root {
  background-color: #8BC34A;
  background-image: url('~@/assets/b2.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
.logo{
  background: linear-gradient(45deg, #1fec08, #fad325);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.header-container h1 {
  margin: 0;
}

.user-actions {
  display: flex;
  gap: 10px;
}

.profile-button {
  background: none;
  border: none;
  cursor: pointer;
}

.profile-icon {
  width: 24px;
  height: 24px;
}

.logout-icon {
  width: 24px;
  height: 24px;
}

.btn {
  background-color: transparent;
  border: 2px solid black;
  color: black;
  padding: 10px 30px;
  font-size: 1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.filters-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0;
  gap: 15px; /* Adds space between the dropdowns */
}

.dropdown-wrapper select {
  color: rgb(0, 0, 0);
  padding: 10px;
  border-radius: 4px;
  border: 2px solid #ffffff;
  background-color: rgba(243, 224, 224, 0.201);
  font-size: 1em;
  width: 180px;
  cursor: pointer;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.card {
  width: 310.92px;
  background: #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-size: 16px; /* Set a consistent font size */
  color: black; /* Ensure font color is black */
  transition: all 0.3s ease; /* Smooth transitions */
}

.card-header {
  flex: 0 0 auto;
  width: 100%;
  height: 215.02px;
  overflow: hidden;
}

.card-header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 10px;
  background-color: #fff;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column; /* Arrange content vertically */
  justify-content: space-between; /* Push content to top and bottom */
  
}
.card-body p {
  overflow: hidden;
  white-space: nowrap; /* Prevents line breaks */
  text-overflow: ellipsis; /* Shows ellipsis for overflow */
}


.show-less-link {
  cursor: pointer;
  color: #4CAF50;
  text-decoration: underline;
}
.read-more-link {
  cursor: pointer;
  color: #4CAF50;
  text-decoration: underline;
  align-self: flex-end; /* Aligns the link to the bottom */
  margin-top: auto; /* Pushes the link to the bottom */
}


@media (max-width: 768px) {
  .card-container {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
