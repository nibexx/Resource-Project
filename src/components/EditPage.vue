<template>
  <div>
    <div>
      <div class="navbar">
        <div class="navbar-left">
          <h1>Profile Page</h1>
        </div>
        <div class="navbar-right">
          <button class="upload-button">+ Upload New</button>
          <div class="user-info" @click="toggleSidebar">
            <i class="mdi mdi-account user-icon"></i>
            <span class="user-name">{{ firstName }}</span>
          </div>
        </div>
      </div>

      <div v-if="isSidebarOpen" class="sidebar">
        <div class="sidebar-header">
          <span class="close-icon" @click="toggleSidebar">&times;</span>
        </div>
        <div class="sidebar-content">
          <i class="mdi mdi-account-circle sidebar-user-icon"></i>
          <h2 class="sidebar-user-name">{{ userName }}</h2>
          <p class="sidebar-user-email">{{ userEmail }}</p>
          <button class="sidebar-button" @click="openEditProfile">
            <i class="mdi mdi-pencil-outline"></i> Edit Profile
          </button>
          <button class="sidebar-button1" @click="showLogoutModal = true">
            <i class="mdi mdi-logout"></i> Logout
          </button>
          <button class="sidebar-button2" @click="showDeleteModal = true">
            <i class="mdi mdi-delete-alert"></i> Deactivate Account
          </button>
        </div>
      </div>

      <div v-if="isEditProfileOpen" class="modal">
    <div class="modal-content">
      <span class="close-icon" @click="closeEditProfile">&times;</span>
      <h2>Edit Profile</h2>
      <form @submit.prevent="updateProfile">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="editUserName" required>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="editUserEmail" required>
        <button type="button" @click="changePassword" class="change-password-button ms-1 mb-3">Change Password</button>
        <div v-if="isChangingPassword" class="password-input">
          <label for="newPassword">New Password : </label>
          <input  class="ms-2"   type="password" id="newPassword" v-model="newPassword" required>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </div>

      <!-- Logout and deactivate popups -->
      <div v-if="showLogoutModal" class="modal">
        <div class="modal-content small-modal">
          <h2>Are you sure you want to logout?</h2>
          <button class="button-ok" @click="confirmLogout">OK</button>
          <button class="button-cancel" @click="showLogoutModal = false">Cancel</button>
        </div>
      </div>
      <div v-if="showDeleteModal" class="modal">
        <div class="modal-content small-modal">
          <h2>Are you sure you want to delete your account?</h2>
          <button class="button-ok1" @click="confirmDelete">OK</button>
          <button class="button-cancel" @click="showDeleteModal = false">Cancel</button>
        </div>
      </div>
    </div>
    <ProfileCardView></ProfileCardView>
  </div>
</template>

<script>
import ProfileCardView from './ProfileCardView.vue';
import axios from 'axios';

export default {
  components: {
    ProfileCardView
  },
  data() {
    return {
      userImage: '@/assets/profileicon.jpg', // Replace with actual user image URL
      userPassword: '', // User password will be fetched from the backend
      isSidebarOpen: false,
      isEditProfileOpen: false,
      showLogoutModal: false,
      showDeleteModal: false,
      editUserName: '',
      editUserEmail: '',
      editUserPassword: '',
      isChangingPassword: false, // Add this line
      newPassword: '', // Add this line to store the new password
      showPassword: false,
    };
  },
  computed: {
    firstName() {
      return this.userName.split(' ')[0];
    },
    userId() {
      return this.$store.getters.getId;
    },
    userName() {
      return this.$store.getters.getName;
    },
    userEmail() {
      return this.$store.getters.getEmail;
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    openEditProfile() {
      this.editUserName = this.userName;
      this.editUserEmail = this.userEmail;
      this.editUserPassword = this.userPassword;
      this.isEditProfileOpen = true;
    },
    closeEditProfile() {
      this.isEditProfileOpen = false;
    },
     changePassword() {
      this.isChangingPassword = true;
    },
    async updateProfile() {
      try {
        let profileData = {
          name: this.editUserName,
          email: this.editUserEmail,
        };

            // Data for updating the password
      let passwordData = {
      password: this.newPassword,
    };

        const response = await axios.put(`http://192.168.1.18:8080/UserReg/update/${this.userId}`, profileData);

        if (response.status === 200) {
          this.$store.commit('setName', this.editUserName);
          this.$store.commit('setEmail',  this.editUserEmail);
        }
           // If the password is being changed, update it
    if (this.isChangingPassword && this.newPassword) {
      const passwordResponse = await axios.put(`http://192.168.1.18:8080/UserReg/updatePassword/${this.userId}`, passwordData);

      // Check if the password update was successful
      if (passwordResponse.status === 200) {
        console.log('Password updated successfully');
      }
    }
           
        
          console.log("going to store");
          this.closeEditProfile();
        
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },
    async confirmDelete() {
  try {
    const formData = new FormData();
    formData.append('email', this.userEmail);

    const response = await axios({
      method: 'delete',
      url: 'http://192.168.1.18:8080/GreenGuard/deleteByUserEmail',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    console.log("btn clicked");
    if (response.status === 200) {
      this.$router.push('/');
    }
  } catch (error) {
    console.error('Error deleting account:', error);
  }
}

,

    confirmLogout() {
      this.$store.commit('setAuthenticated',false);
      this.$router.push('/');
    }
  },
  // async mounted() {
  //   try {
  //     const response = await axios.get('http://192.168.1.9:8080/GreenGuard/save');
  //     if (response.status === 200) {
  //       const { name, email, password } = response.data;
  //       this.$store.dispatch('setUser', { name, email });
  //       this.userPassword = password; // Note: Usually, you don't fetch passwords directly like this for security reasons.
  //     }
  //   } catch (error) {
  //     console.error('Error fetching profile:', error);
  //   }
  // }
};
</script>

<style scoped>
body {
  background-color: #F7F7F7; /* Light Gray */
  margin: 0;
  font-family: Arial, sans-serif;
}

.navbar {
  background-color: #2C3E50; /* Darker color for contrast */
  color: #FFF;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-left h1 {
  margin: 0;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.upload-button {
  background-color: #3498DB; /* Button color */
  color: #FFF;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 16px;
}

.upload-button:hover {
  background-color: #2980B9; /* Darker shade for hover */
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-icon {
  font-size: 24px;
  margin-right: 5px;
}

.user-name {
  font-size: 16px;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #FFF;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
  z-index: 1000; /* Ensure it is above other content */
}

.sidebar-header {
  display: flex;
  justify-content: flex-end;
}

.close-icon {
  cursor: pointer;
  font-size: 24px;
}

.sidebar-content {
  text-align: center;
}

.sidebar-user-icon {
  font-size: 80px;
}

.sidebar-user-name {
  margin: 10px 0;
}

.sidebar-user-email {
  color:black;
  margin-bottom: 20px;
}

.sidebar-button,
.sidebar-button1,
.sidebar-button2 {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #2C3E50;
  color: #FFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.sidebar-button1 {
  background-color: #E74C3C;
}

.sidebar-button2 {
  background-color: #C0392B;
}

.cards-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 20px;
}

.card {
  background-color: #FFF;
  width: 300px;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background: #FFF;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.modal-content small-modal {
  background: #FFF;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.modal-content .close-icon {
  float: right;
  cursor: pointer;
  font-size: 24px;
}

.button-ok,
.button-ok1,
.button-cancel {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}

.button-ok {
  background-color: #3498DB;
  color: #FFF;
}

.button-ok1 {
  background-color: #C0392B;
  color: #FFF;
}

.button-cancel {
  background-color: #95A5A6;
  color: #FFF;
}

form {
  display: flex;
  flex-direction: column;
}

form label {
  margin: 10px 0 5px;
}

form input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #CCC;
  border-radius: 4px;
}

form button {
  padding: 10px;
  background-color: #3498DB;
  color: #FFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

form button:hover {
  background-color: #2980B9;
}
.change-password-button{
  margin-top: 5px;
  width: 160px;
  background-color: green;

  
}
.change-password-button:hover{
  background-color: rgb(25, 71, 25);
}
.password-input {
  margin-top: 10px;
}
</style>




