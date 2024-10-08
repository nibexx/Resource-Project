<template>
  <div id="root">
    <div class="header-container">
      <h1>NATURAL</h1>
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
        <div class="card-front">
          <div class="card-header">
            <img :src="'data:image/jpeg;base64,' + city.image" alt="City Image" />
          </div>
          <div class="card-body">
            <h3>{{ city.saverName }}</h3>
            <p>Category: {{ city.category }}</p>
            <p>District: {{ city.district }}</p>
            <p>{{ shortenedDescription(city.description) }}</p>
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
        const response = await axios.get('http://192.168.1.6:8080/GreenGuard/getAll');
        this.allCities = response.data;
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
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-front {
  flex: 1;
  display: flex;
  flex-direction: column;
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
}

@media (max-width: 768px) {
  .card-container {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
