<!-- <template>
  <div id="app1" class="cards-container">
    <div v-for="card in cards" :key="card.title" class="card me-2 ms-2 mb-3">
      <img class="card-image" :src="card.image" :alt="card.title" />
      <div class="card-content">
        <div class="card-header">
          <h2 class="card-title">{{ card.title }}</h2>
          <hr class="title-divider">
          <div class="action-icons">
            <span @click="editCard(card)">
              <i class="mdi mdi-pencil edit"></i> 
            </span>
            <span @click="deleteCard(card.title)">
              <i class="mdi mdi-delete delete"></i> 
            </span>
          </div>
        </div>
        <p>{{ card.category }}</p>
        <p>{{ card.district }}</p>
        <p>{{ truncateDescription(card.description, true) }}</p> Display truncated description
      </div>
    </div> 
    
   
  
    <div v-if="showEditPopup" class="modal" @click.self="closeEditPopup">
      <div class="modal-content">
        <h2>Edit Card</h2>
        <form @submit.prevent="saveChanges">
          <label>Title:</label>
          <input type="text" v-model="editedCard.title" required>
          
          <label>Category:</label>
          <input type="text" v-model="editedCard.category" required>
          
          <label>District:</label>
          <input type="text" v-model="editedCard.district" required>
          
          <label>Description:</label>
          <textarea v-model="editedCard.description" rows="7" required></textarea>
          
          <label>Image:</label>
          <input type="file" @change="previewImage" accept="image/*">
          <div v-if="imagePreviewUrl">
            <img :src="imagePreviewUrl" alt="Image Preview" style="max-width: 100%; max-height: 200px;">
          </div>
          
          <div class="modal-buttons">
            <button type="button" @click="closeEditPopup">Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cards: [
        {
          image: require("@/assets/lake1.jpg"),
          title: "Card Title 1",
          category: "Category 1",
          district: "District A",
          description: "Description for card 1. This is a sample description of the card content.  This is a sample description of the card content. This is a sample description of the card content.This is a sample description of the card content.This is a sample description of the card content.",
        },        {
          image: require("@/assets/lake1.jpg"),
          title: "Card Title 671",
          category: "Category 1",
          district: "District A",
          description: "Description for card 1. This is a sample description of the card content.",
        },
        {
          image: require("@/assets/lake2.jpg"),
          title: "Card Title 2",
          category: "Category 2",
          district: "District B",
          description: "Description for card 2. This is a sample description of the card content.",
        },
        {
          image: require("@/assets/lake3.jpg"),
          title: "Card Title 9",
          category: "Category 1",
          district: "District A",
          description: "Description for card 1. This is a sample description of the card content.",
        },
        {
          image: require("@/assets/lake5.jpg"),
          title: "Card Title 3",
          category: "Category 3",
          district: "District C",
          description: "Description for card 3. This is a sample description of the card content.",
        }
        ],
      showEditPopup: false,
      selectedCard: null,
      editedCard: {
        title: '',
        category: '',
        district: '',
        description: '',
        image: null,
      },
      imagePreviewUrl: null,
    };
  },
  methods: {
    editCard(card) {
      this.selectedCard = card;
      this.editedCard = { ...card };
      this.showEditPopup = true;
    },
    deleteCard(title) {
      this.cards = this.cards.filter(card => card.title !== title);
    },

    saveChanges() {
      // Update card data
      const index = this.cards.findIndex(card => card.title === this.selectedCard.title);
      if (index !== -1) {
        // Check if editedCard has a new image
        if (this.editedCard.image instanceof File) {
          // Handle case where image is updated from file input
          const reader = new FileReader();
          reader.onload = () => {
            this.cards[index] = { ...this.editedCard, image: reader.result };
          };
          reader.readAsDataURL(this.editedCard.image);
        } else {
          // Handle case where image is unchanged or updated directly (URL)
          this.cards[index] = { ...this.editedCard };
        }
      }
      this.closeEditPopup();
    },
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviewUrl = reader.result;
          this.editedCard.image = reader.result; // Update editedCard.image with base64 data URL
        };
        reader.readAsDataURL(file);
      }
    },
    closeEditPopup() {
      this.showEditPopup = false;
      this.selectedCard = null;
      this.editedCard = {
        title: '',
        category: '',
        district: '',
        description: '',
        image: null,
      };
      this.imagePreviewUrl = null;
    },
    truncateDescription(description, truncate) {
      if (truncate) {
        return description.split(' ').slice(0, 14).join(' ') + (description.split(' ').length > 14 ? '...' : '');
      } else {
        return description;
      }
    }
  }
};
</script>

<style scoped>
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 0 20px;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 10px black;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  margin: 0;
  font-size: 1.5rem; /* Increase font size of card title */
  color: #333; /* Adjust text color */
}

.title-divider {
  margin: 10px 0; /* Adjust margin around the hr tag */
  border: none;
  border-top: 1px solid #ddd; /* Customize hr line style */
}

.card-content p {
  margin: 5px 0;
}

.action-icons {
  display: flex;
  align-items: center;
}

.action-icons span {
  cursor: pointer;
  margin-left: 10px; /* Adjust as needed */
}

.action-icons span:first-child {
  margin-left: 0;
}

.delete {
  color: brown;
  font-size: 24px; /* Increase delete icon size */
}

.edit {
  color: green;
  font-size: 24px; /* Increase edit icon size */
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 800px;
  max-height: 80vh; /* Set maximum height of the modal */
  overflow-y: auto; 
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content form {
  display: flex;
  flex-direction: column;
}

.modal-content label {
  margin-bottom: 5px;
}

.modal-content input[type="text"],
.modal-content textarea {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.modal-buttons button {
  margin-left: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-buttons button[type="submit"] {
  background-color: #007bff;
  color: white;
}

.modal-buttons button[type="submit"]:hover {
  background-color: #0056b3;
}

.modal-buttons button[type="button"] {
  background-color: #6c757d;
  color: white;
}

.modal-buttons button[type="button"]:hover {
  background-color: #5a6268;
}
</style> -->
 
<template>
  <div id="app1" class="container-fluid">
    <!-- <div v-if="cards.length === 0" class="add-card-icon" @click="toUpload">
      +
    </div> -->
    <div v-if="cards.length === 0"  >
     <h1 style="text-align: center;  margin-top: 180px;" class="name"> &#128075; Hi {{ userName }}!..</h1>
     <p style="text-align: center; " class="desc">Upload your amazing finds and contribute to our growing community of nature enthusiasts!&#127807;</p>
     <v-btn  class="upload-btn">
          <v-icon left>mdi-plus</v-icon> Upload Resource
        </v-btn>
    </div>
    <v-row v-else>
      <v-col cols="3" v-for="card in cards" :key="card.title">
        <v-card class="mx-auto my-12" max-width="324">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
    
      :src="'data:image/jpeg;base64,'+ card.image" :width="360.92" :height="200"
      cover
    ></v-img>

    <v-card-item>
      <v-card-title>{{ card.title }}</v-card-title>
    </v-card-item>

    <v-card-text>
      <div class="my-4 text-subtitle-1">{{ card.category }}</div>

      <div>
        {{ truncateDescription(card.description, true) }}
      </div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-actions>
      <v-btn @click="editCard(card)" icon="mdi-pencil"></v-btn>
      <v-btn @click="deleteCard(card.id)" icon="mdi-delete"></v-btn>
    </v-card-actions>
  </v-card>

      </v-col>

    <!-- <div v-for="card in cards" :key="card.title" class="card me-2 ms-2 mb-3">
      <img :src="'data:image/jpeg;base64,'+ card.image" :width="360.92" :height="200" />
      
      <div class="card-content">
        <div class="card-header">
          <h2 class="card-title">{{ card.title }}</h2>
          <hr class="title-divider">
          <div class="action-icons">
            <span @click="editCard(card)">
              <i class="mdi mdi-pencil edit"></i>
            </span>
            <span @click="deleteCard(card.id)">
              <i class="mdi mdi-delete delete"></i>
            </span>
          </div>
        </div>
        <p>{{ card.category }}</p>
        <p>{{ card.district }}</p>
        <p>{{ truncateDescription(card.description, true) }}</p>
      </div>
    </div> -->
  </v-row>
    
    <div v-if="showEditPopup" class="modal" @click.self="closeEditPopup">
      <div class="modal-content">
        <h2>Edit Card</h2>
        <form @submit.prevent="saveChanges">
          <!-- <label>Title:</label>
          <input type="text" v-model="editedCard.title" >
           -->
          <label>Category:</label>
          <input type="text" v-model="editedCard.category" required>
          
          <label>District:</label>
          <input type="text" v-model="editedCard.district" required>
          
          <label>Description:</label>
          <textarea v-model="editedCard.description" rows="7" required></textarea>
          
          <label>Image:</label>
          <input type="file" @change="previewImage" accept="image/*">
          <div v-if="imagePreviewUrl">
            <img :src="imagePreviewUrl" alt="Image Preview" style="max-width: 100%; max-height: 200px;">
          </div>
          
          <div class="modal-buttons">
            <button type="button" @click="closeEditPopup">Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  
  data() {
    return {
      cards: [],
      showEditPopup: false,
      selectedCard: null,
      editedCard: {
        title: '',
        category: '',
        district: '',
        description: '',
        image: null,
      },
      imagePreviewUrl: null,
    };
  },
  computed: {
    userEmail() {
      // return this.$store.getters.getEmail;
      return this.$store.getters.getUserData.email;
    },
      userName() {
        return this.$store.getters.getUserData.name;
      },
   
    userId() {
      return this.$store.getters.getUserData.id;
    },
    
  },
  mounted() {
    this.fetchCards();
  },
  methods: {
  async fetchCards() {
    try {
      const response = await axios.get(`http://192.168.1.20:8080/GreenGuard/getGuardsByUserId/${this.userId}`);
      if (response.status >= 200 && response.status < 300) {
        console.log('backendResponse', response.data);
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
      await axios.delete(`http://192.168.1.20:8080/GreenGuard/delete/${cardId}`);
      this.cards = this.cards.filter(card => card.id !== cardId);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  },
  async saveChanges() {
    try {
      const formData = new FormData();
      formData.append('saverName', this.userName); // Assuming 'title' maps to 'saverName'
      formData.append('category', this.editedCard.category);
      formData.append('description', this.editedCard.description);
      formData.append('latitude', this.editedCard.latitude); // Add latitude if required
      formData.append('longitude', this.editedCard.longitude); // Add longitude if required
      formData.append('district', this.editedCard.district);

      if (this.editedCard.image instanceof File) {
        formData.append('imageFile', this.editedCard.image);
      }

      await this.updateCard(formData);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
    this.closeEditPopup();
  },
  async updateCard(formData) {
    try {
      const response = await axios.put(`http://192.168.1.20:8080/GreenGuard/edit/${this.selectedCard.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const index = this.cards.findIndex(card => card.id === this.selectedCard.id);
      if (index !== -1) {
        this.cards[index] = response.data;
      }
    } catch (error) {
      console.error('Error updating card:', error);
    }
  },
  previewImage(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
        this.editedCard.image = file;
      };
      reader.readAsDataURL(file);
    }
  },
  closeEditPopup() {
    this.showEditPopup = false;
    this.selectedCard = null;
    this.editedCard = {
      title: '',
      category: '',
      district: '',
      description: '',
      image: null,
    };
    this.imagePreviewUrl = null;
  },
  truncateDescription(description, truncate) {
    if (truncate) {
      return description.split(' ').slice(0, 14).join(' ') + (description.split(' ').length > 14 ? '...' : '');
    } else {
      return description;
    }
  }
},
toUpload(){
  this.$router.push('upload-new');
}

  // methods: {
  //   async fetchCards() {
  // try {
  //   const response = await axios.get(`http://192.168.1.26:8080/GreenGuard/getGuardsByUserId/${this.userId}`);
  //   if (response.status >= 200 && response.status < 300) {
  //     console.log('backendResponse', response.data);
  //     this.cards = response.data;
  //   }
  //     } catch (error) {
  //       console.error('Error fetching cards:', error);
  //     }
  //   },
  //   editCard(card) {
  //     this.selectedCard = card;
  //     this.editedCard = { ...card };
  //     this.showEditPopup = true;
  //   },
  //   async deleteCard(cardId) {
  //     try {
  //       await axios.delete(`http://192.168.1.26:8080/UserReg/login/${cardId}`);
  //       this.cards = this.cards.filter(card => card.id !== cardId);
  //     } catch (error) {
  //       console.error('Error deleting card:', error);
  //     }
  //   },
  //   async saveChanges() {
  //     try {
  //       const formData = new FormData();
  //       formData.append('title', this.editedCard.title);
  //       formData.append('category', this.editedCard.category);
  //       formData.append('district', this.editedCard.district);
  //       formData.append('description', this.editedCard.description);

  //       if (this.editedCard.image instanceof File) {
  //         formData.append('image', this.editedCard.image);
  //       }

  //       await this.updateCard(formData);
  //     } catch (error) {
  //       console.error('Error saving changes:', error);
  //     }
  //     this.closeEditPopup();
  //   },
    // async saveChanges() {3
    //   try {
    //     if (this.editedCard.image instanceof File) {
    //       const reader = new FileReader();
    //       reader.onload = async () => {
    //         this.editedCard.image = reader.result;
    //         await this.updateCard();
    //       };
    //       reader.readAsDataURL(this.editedCard.image);
    //     } else {
    //       await this.updateCard();
    //     }
    //   } catch (error) {
    //     console.error('Error saving changes:', error);
    //   }
    //   this.closeEditPopup();
    // },
  //   async updateCard() {
  //     try {
  //       const response = await axios.put(`http://192.168.1.26:8080/GreenGuard/edit/${this.selectedCard.id}`, this.editedCard);
  //       const index = this.cards.findIndex(card => card.id === this.selectedCard.id);
  //       if (index !== -1) {
  //         this.cards[index] = response.data;
  //       }
  //     } catch (error) {
  //       console.error('Error updating card:', error);
  //     }
  //   },
  //   previewImage(event) {
  //     const file = event.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         this.imagePreviewUrl = reader.result;
  //         this.editedCard.image = file;
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   },
  //   closeEditPopup() {
  //     this.showEditPopup = false;
  //     this.selectedCard = null;
  //     this.editedCard = {
  //       title: '',
  //       category: '',
  //       district: '',
  //       description: '',
  //       image: null,
  //     };
  //     this.imagePreviewUrl = null;
  //   },
  //   truncateDescription(description, truncate) {
  //     if (truncate) {
  //       return description.split(' ').slice(0, 14).join(' ') + (description.split(' ').length > 14 ? '...' : '');
  //     } else {
  //       return description;
  //     }
  //   }
  // }
  
};
</script> 
<!-- <script>
import axios from 'axios';

export default {
  data() {
    return {
      cards: [],
      showEditPopup: false,
      selectedCard: null,
      editedCard: {
        title: '',
        category: '',
        district: '',
        description: '',
        image: null,
      },
      imagePreviewUrl: null,
    };
  },
  computed: {
    userEmail() {
      return this.$store.getters.getEmail;
    },
    userId() {
      return this.$store.getters.getId;
    },
  },
  mounted() {
    this.fetchCards();
  },
  methods: {
    async fetchCards() {
      try {
        const response = await axios.get('http://192.168.1.26:8080/get', {
          params: { id: this.userId }
        });
        if (response.status >= 200 && response.status < 300) {
          console.log('backendResponse', response.data);
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
        await axios.delete(`http://192.168.1.26:8080/UserReg/login/${cardId}`);
        this.cards = this.cards.filter(card => card.id !== cardId);
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    },
    async saveChanges() {
      try {
        if (this.editedCard.image instanceof File) {
          const reader = new FileReader();
          reader.onload = async () => {
            this.editedCard.image = reader.result;
            await this.updateCard();
          };
          reader.readAsDataURL(this.editedCard.image);
        } else {
          await this.updateCard();
        }
      } catch (error) {
        console.error('Error saving changes:', error);
      }
      this.closeEditPopup();
    },
    async updateCard() {
      try {
        const response = await axios.put(`http://192.168.1.26:8080/UserReg/login/${this.selectedCard.id}`, this.editedCard);
        const index = this.cards.findIndex(card => card.id === this.selectedCard.id);
        if (index !== -1) {
          this.cards[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating card:', error);
      }
    },
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviewUrl = reader.result;
          this.editedCard.image = file;
        };
        reader.readAsDataURL(file);
      }
    },
    closeEditPopup() {
      this.showEditPopup = false;
      this.selectedCard = null;
      this.editedCard = {
        title: '',
        category: '',
        district: '',
        description: '',
        image: null,
      };
      this.imagePreviewUrl = null;
    },
    truncateDescription(description, truncate) {
      if (truncate) {
        return description.split(' ').slice(0, 14).join(' ') + (description.split(' ').length > 14 ? '...' : '');
      } else {
        return description;
      }
    }
  }
};
</script> -->

<style scoped>
.name{
  font-size: 60px;
}
.desc{
  font-size: 32px;
}
.upload-btn {
    margin-left: 650px;
    margin-top: 20px;
    font-weight: bold;
    background-color: green;
    color: white;

  }
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 0 20px;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 10px black;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  color: black;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  margin: 0;
  font-size: 1.5rem;
  color: black; 
}

.title-divider {
  margin: 10px 0;
  border: none;
  border-top: 1px solid #ddd;
}

.card-content p {
  margin: 5px 0;
  color: black;
}

.action-icons {
  display: flex;
  align-items: center;
}

.action-icons span {
  cursor: pointer;
  margin-left: 10px;
}

.action-icons span:first-child {
  margin-left: 0;
}

.delete {
  color: brown;
  font-size: 24px;
}

.edit {
  color: green;
  font-size: 24px;
}

.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 800px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content form {
  display: flex;
  flex-direction: column;
}

.modal-content label {
  margin-bottom: 5px;
}

.modal-content input[type="text"],
.modal-content textarea {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.modal-buttons button {
  margin-left: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-buttons button[type="submit"] {
  background-color: #007bff;
  color: white;
}

.modal-buttons button[type="submit"]:hover {
  background-color: #0056b3;
}

.modal-buttons button[type="button"] {
  background-color: #6c757d;
  color: white;
}

.modal-buttons button[type="button"]:hover {
  background-color: #5a6268;
}
.add-card-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px; /* Reduced width */
  height: 80px; /* Reduced height */
  background-color: rgb(22, 127, 22);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px; /* Reduced font size */
  cursor: pointer;
}


.add-card-icon:hover {
  background-color: rgb(14, 83, 14);
  color: white;
}

</style>  
