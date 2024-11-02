<template>
  <div id="app1" class="container-fluid body">
    <div v-if="cards.length === 0">
      <h1 class="name">
        <span class="emoji">&#128075;</span> Hi {{ userName }}!
      </h1>
      <p class="desc">
        Upload your amazing finds and contribute to our growing community of nature enthusiasts!&#127807;
      </p>
      <v-btn class="upload-btn" @click="toUpload">
        <v-icon left>mdi-upload</v-icon> Upload Resource
      </v-btn>
    </div>
    <v-row v-else class="card-row">
      <v-col cols="2" v-for="(card, index) in cards" :key="card.title">
        <div class="card-flip" :class="{ flipped: expandedIndex === index }">
          <v-card class="card-container front" max-width="280">
            <v-img
              :src="'data:image/jpeg;base64,' + card.image"
              class="card-image"
              @click="openImageModal('data:image/jpeg;base64,' + card.image)"
              cover
            ></v-img>
            <v-card-item>
              <v-card-title>{{ card.title }}</v-card-title>
              <div class="icon-container">
                <v-icon @click="navigateHome" color="green" style="margin-right: 8px;">mdi-earth</v-icon>
                <v-card-subtitle class="bold-text">{{ card.district }}</v-card-subtitle>
                <v-spacer></v-spacer>
                <v-icon @click="editCard(card)" :style="{ color: 'blue' }">mdi-pencil</v-icon>
                <v-icon @click="deleteCard(card.id)" :style="{ color: 'red' }">mdi-delete</v-icon>
              </div>
            </v-card-item>
            <v-card-text>
              <div class="my-4 text-subtitle-1 card-category">{{ card.category }}</div>
              <div :class="{ description: expandedIndex !== index }">
                {{ expandedIndex === index ? card.description : truncateDescription(card.description) }}
              </div>
              <a href="#" @click.prevent="toggleReadMore(index)" class="read-more-link">
                {{ expandedIndex === index ? 'read less' : 'read more' }}
              </a>
            </v-card-text>
            <v-divider class="mx-4 mb-1"></v-divider>
          </v-card>
          <v-card class="card-container back" max-width="324">
            <v-card-text>
              <div class="my-4 text-subtitle-1">{{ card.title }}</div>
              <div>{{ card.description }}</div>
              <a href="#" @click.prevent="toggleReadMore(index)" class="read-more-link">
                read less
              </a>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <!-- Image Modal -->
    <div v-if="showImageModal" class="image-modal" @click="closeImageModal">
      <img :src="selectedImage" class="image-modal-content" @click.stop>
    </div>

    <!-- Edit Popup -->
    <div v-if="showEditPopup" class="modal" @click.self="closeEditPopup">
      <div class="modal-content">
        <h2>Edit Card</h2>
        <form @submit.prevent="saveChanges">
          <div class="form-group">
            <label for="category">Category:</label>
            <v-select
              v-model="editedCard.category"
              :items="categoryOptions"
              label="Select category"
              required
            ></v-select>
          </div>

          <div class="form-group">
            <label for="district">District:</label>
            <v-select
              v-model="editedCard.district"
              :items="districtOptions"
              label="Select district"
              required
            ></v-select>
          </div>

          <div class="form-group">
            <label for="description">Description:</label>
            <textarea id="description" v-model="editedCard.description" rows="7" required></textarea>
          </div>

          

          

          <div class="modal-buttons">
            <button type="button" @click="closeEditPopup" class="cancelbtn"><b>Cancel</b></button>
            <button type="submit" class="savebtn" :disabled="isSubmitting"><b>{{ isSubmitting ? 'Submitting...' : 'Save' }}</b></button>
          </div>
        </form>
        
      </div>
    </div>

    <!-- Change Location Popup -->
    <div v-if="showChangeLocationPopup" class="modal" @click.self="closeChangeLocationPopup">
      <div class="modal-content">
        <h2>Select Location</h2>
        <p>Select a new location for the card:</p>
        <!-- Logic to select or change location goes here -->
        <div class="modal-buttons">
          <button type="button" @click="confirmLocationChange" class="savebtn">Confirm</button>
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
      expandedIndex: -1,
      cards: [],
      showEditPopup: false,
      showChangeLocationPopup: false,
      selectedCard: null,
      showImageModal: false,
      selectedImage: null,
      editedCard: {
        title: '',
        category: '',
        district: '',
        description: '',
        image: null,
      },
      imagePreviewUrl: null,
      isSubmitting: false,
      categoryOptions: [
        "Pond",
        "Tree",
        "Canal",
        "River",
        "Lake",
        "Soil",
        "Garden",
        "Plantation",
        "Paddy Field"
      ],
      districtOptions: [
        'Thiruvananthapuram',
        'Kollam',
        'Pathanamthitta',
        'Alappuzha',
        'Kottayam',
        'Idukki',
        'Ernakulam',
        'Thrissur',
        'Palakkad',
        'Malappuram',
        'Kozhikode',
        'Wayanad',
        'Kannur',
        'Kasaragod'
      ],
    };
  },
  computed: {
    userName() {
      return this.$store.getters.getUserData.name;
    },
    userId() {
      return this.$store.getters.getUserData.id;
    },
    userEmail() {
      return this.$store.getters.getUserData.email;
    },
  },
  mounted() {
    this.fetchCards();
  },
  methods: {
    toUpload() {
      this.$router.push('/upload-new');
    },
    navigateHome() {
      this.$router.push('/locations');
    },
    async fetchCards() {
      try {
        const response = await axios.get(`http://192.168.1.31:8080/GreenGuard/getGuardsByUserId/${this.userId}`);
        if (response.status >= 200 && response.status < 300) {
          this.cards = response.data;
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    },
    editCard(card) {
      this.selectedCard = card;
      this.editedCard = { ...card };
      this.showEditPopup = true;
    },
    async deleteCard(cardId) {
      try {
        await axios.delete(`http://192.168.1.31:8080/GreenGuard/delete/${cardId}`);
        this.cards = this.cards.filter(card => card.id !== cardId);
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    },
    async saveChanges() {
      

      try {
        const formData = new FormData();
        formData.append('saverName', this.userName);
        formData.append('email', this.userEmail);
        formData.append('category', this.editedCard.category);
        formData.append('description', this.editedCard.description);
        formData.append('district', this.editedCard.district);
        formData.append('latitude', this.editedCard.latitude);
        formData.append('longitude', this.editedCard.longitude);

        if (this.editedCard.image instanceof File) {
          formData.append('imageFile', this.editedCard.image);
        }

        await this.updateCard(formData);
        
        const index = this.cards.findIndex(card => card.id === this.selectedCard.id);
        if (index !== -1) {
          this.cards.splice(index, 1, { ...this.editedCard, id: this.selectedCard.id });
        }

        this.closeEditPopup();
      } catch (error) {
        console.error('Error saving changes:', error);
      } 
    },
    async updateCard(formData) {
      const response = await axios.put(`http://192.168.1.31:8080/GreenGuard/edit/${this.selectedCard.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    truncateDescription(description) {
      return description.length > 100 ? description.slice(0, 100) + '...' : description;
    },
    toggleReadMore(index) {
      this.expandedIndex = this.expandedIndex === index ? -1 : index;
    },
    openImageModal(image) {
      this.selectedImage = image;
      this.showImageModal = true;
    },
    closeImageModal() {
      this.showImageModal = false;
      this.selectedImage = null;
    },
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.editedCard.image = file;
        const reader = new FileReader();
        reader.onload = e => {
          this.imagePreviewUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    closeEditPopup() {
      this.showEditPopup = false;
      this.editedCard = {};
      this.imagePreviewUrl = null;
    },
    openChangeLocationPopup() {
      this.showChangeLocationPopup = true;
    },
    closeChangeLocationPopup() {
      this.showChangeLocationPopup = false;
    },
    confirmLocationChange() {
      // Logic to change the location goes here
      this.closeChangeLocationPopup();
    }
  }
};
</script>

<style scoped>
/* General Styles */
.my-4 {
  margin-top: 20px;
}

.card-category {
  margin-top: 20px;
  font-size: 16px;
}

.bold-text {
  font-weight: bold;
}

/* Card Styles */
.card-flip {
  perspective: 1000px;
  
}

.card-flip .card-container {
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: relative;
  backface-visibility: hidden;
  width: 280px !important;
  height: 400px;
}

.card-flip .back {
  transform: rotateY(180deg);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 10px;
}



.card-flip.flipped .front {
  transform: rotateY(180deg);
}

.card-flip.flipped .back {
  transform: rotateY(0deg);
}

.card-container {
  border: 2px solid black;
  border-radius: 8px;
  box-shadow: 0 5px 10px black;
  height: 440px !important;
  width: 310px !important;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0; /* Ensure no extra margin on the right side */
  display: flex;
  flex-direction: column;
}

.card-image {
  object-fit: cover;
  cursor: pointer;
  height: 200px;
}

.name {
  text-align: center;
  margin-top: 300px;
}

.emoji {
  font-size: 48px;
}

.desc {
  text-align: center;
  font-size: 20px;
  color: black;
}

.upload-btn {
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  font-weight: bold;
  background-color: green;
  color: white;
  
  
}

.read-more-link {
  text-decoration: underline;
  cursor: pointer;
}

.description {
  max-height: 100px;
  overflow: hidden;
  height: 60px;
}

/* Icon Container */
.icon-container {
  display: flex;
  align-items: center;
}

.icon-container v-icon {
  cursor: pointer;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-content h2 {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.form-group input[type="file"] {
  padding: 0;
}

.image-preview {
  margin-top: 10px;
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancelbtn,
.savebtn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.cancelbtn {
  margin-left: 185px;
  color: black;
}

.savebtn {
  background-color: green;
  color: white;
}

.savebtn:hover {
  opacity: 0.8;
}

.cancelbtn:hover {
  background-color: rgb(161, 161, 161);
  opacity: 0.8;
}

/* Card Row */
.card-row {
  margin-top: 40px; /* Space between cards and navbar */
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 60px; /* Reduce the gap between cards */
  margin-right: 10px;
}

/* Image Modal */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.image-modal-content {
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
}

</style>
