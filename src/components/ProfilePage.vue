<template>
  <div>
    <div class="navbar">
      <div class="navbar-left">
        <!-- Add Earth Icon before the Profile Page heading -->
        <div class="logo-container">
      <!-- Direct link to the homepage -->
      <a href="/">
        <img :src="logo" alt="Home" class="logoimage">
        
      </a>
      
    </div>

    
      </div>
      <h2 style="color: white; margin-right: 1150px; margin-top: 10px;">Profile Page</h2>
      <div class="navbar-right">
        <button class="upload-button" @click="toUpload">+ Upload New</button>
        <span class="mdi mdi-earth explore-icon" @click="toDisplay" title="Explore All Resources"></span>
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
            <label for="newPassword">New Password:</label>
            <div class="password-container">
              <input
                class="password-field"
                :type="passwordVisible ? 'text' : 'password'"
                id="newPassword"
                v-model="newPassword"
                :class="{ 'is-invalid': passwordLengthError }"
                required
                minlength="8"
              />
              <i
                class="mdi"
                :class="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                @click="togglePasswordVisibility"
              ></i>
            </div>
            <p v-if="passwordLengthError" class="error-text">Password must be at least 8 characters long.</p>
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
      userImage: '@/assets/profileicon.jpg',
      logo: require('@/assets/homewhite.png'),
      userPassword: '',
      isSidebarOpen: false,
      isEditProfileOpen: false,
      showLogoutModal: false,
      showDeleteModal: false,
      editUserName: '',
      editUserEmail: '',
      editUserPassword: '',
      isChangingPassword: false,
      newPassword: '',
      passwordVisible: false, 
      passwordLengthError: false,
    };
  },
  computed: {
    firstName() {
      return this.userName.split(' ')[0];
    },
    userId() {
      return this.$store.getters.getUserData.id;
    },
    userName() {
      return this.$store.getters.getUserData.name;
    },
    userEmail() {
      return this.$store.getters.getUserData.email;
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toUpload() {
      this.$router.push('/upload-new');
    },
    openEditProfile() {
      this.editUserName = this.userName;
      this.editUserEmail = this.userEmail;
      this.editUserPassword = this.userPassword;
      this.isEditProfileOpen = true;
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    closeEditProfile() {
      this.isEditProfileOpen = false;
    },
    changePassword() {
      this.isChangingPassword = true;
    },
    async updateProfile() {
      try {
        if (this.newPassword && this.newPassword.length < 8) {
          this.passwordLengthError = true;
          return;
        } else {
          this.passwordLengthError = false;
        }
        
        let profileData = {
          name: this.editUserName,
          email: this.editUserEmail,
        };

        let passwordData = {
          password: this.newPassword,
        };

        const response = await axios.put(`http://192.168.1.31:8080/UserReg/update/${this.userId}`, profileData);

        if (response.status === 200) {
          this.$store.commit('setName', response.data.name);
          this.$store.commit('setEmail', response.data.email);
          this.$store.commit('setUserData', response.data);
        }
        
        if (this.isChangingPassword && this.newPassword) {
          const passwordResponse = await axios.put(`http://192.168.1.31:8080/UserReg/updatePassword/${this.userId}`, passwordData);
          if (passwordResponse.status === 200) {
            console.log('Password updated successfully');
          }
        } 
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
          url: 'http://192.168.1.31:8080/GreenGuard/deleteByUserEmail',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.status === 200) {
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    },
    confirmLogout() {
      this.$store.commit('setAuthenticated', false);
      sessionStorage.removeItem("user");
      this.$router.push('/');
    },
    toDisplay() {
      this.$router.push('/dummy'); // Navigate to the homepage
    }
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: rgb(33, 33, 50);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.logoimage{
  width: 80px;
  height: 50px;
  border: 2px double white;
  padding: 5px;
  border-radius: 8px;
  
}
.navbar-left h1 {
  margin: 0;
  font-size: 24px;
  color: white;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.upload-button {
  background-color: #1d6326;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 290px;
  
  transition: background-color 0.3s ease;
}
.explore-icon {
  font-size: 40px; /* Adjust size if needed */
  color: white;
  margin-right: 15px; /* Space between icon and user info */
  cursor: pointer;
}

.explore-icon:hover {
  color: #007bff; /* Optional: Change color on hover */
  /* You can customize hover effects here */
}

.upload-button:hover {
  background-color: #175820;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 2px 10px;
  border: 1px solid white;
  border-radius: 16px;
  cursor: pointer;
  margin-right: 20px;
}

.user-icon {
  font-size: 30px;
  margin-right: 5px;
  color: white;
}

.user-name {
  font-size: 16px;
  color: white;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  animation: slideIn 0.3s forwards;
}

.sidebar-header {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
}

.close-icon {
  font-size: 24px;
  cursor: pointer;
}

.sidebar-content {
  text-align: center;
  padding: 20px;
  width: 100%;
}

.sidebar-user-icon {
  font-size: 60px;
  color: #333;
  margin-bottom: 10px;
}

.sidebar-user-name {
  font-size: 24px;
  margin: 10px 0;
}

.sidebar-user-email {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.sidebar-button {
  display: block;
  width: 80%;
  margin: 10px auto;
  padding: 10px;
  border-radius: 4px;
  border: 2px solid blue;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sidebar-button:hover {
  background-color: #007bff;
  color: white;
}

.sidebar-button1 {
  display: block;
  width: 80%;
  margin: 10px auto;
  padding: 10px;
  border: 2px solid blue;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sidebar-button1:hover {
  background-color: #007bff;
  color: white;
}

.sidebar-button2 {
  display: block;
  width: 80%;
  margin: 10px auto;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: red;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sidebar-button2:hover {
  background-color: rgb(178, 42, 42);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar-right {
    margin-top: 10px;
    width: 100%;
    justify-content: space-between;
  }

  .user-info {
    margin-left: auto;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  position: relative;
}

.modal-content .close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content form {
  display: flex;
  flex-direction: column;
}

.modal-content form label {
  margin: 10px 0 5px;
}

.modal-content form input {
  padding: 8px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.modal-content form button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-content form button:hover {
  background-color: #0056b3;
}

.small-modal {
  width: 60%;
  max-width: 400px;
}

.modal-content1 {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 60%;
  max-width: 300px;
}

.button-ok,
.button-cancel {
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
}

.button-ok {
  background-color: blue;
  color: white;
}

.button-ok:hover {
  background-color: rgb(4, 4, 147);
  color: white;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
}

.button-cancel {
  background-color: white;
  color: black;
}

.button-cancel:hover {
  background-color: #d4d0d0;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
}
.button-ok1{
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s; 
}
.button-ok1 {
  background-color: red;
  color: white;
}

.button-ok1:hover {
  background-color: rgb(202, 25, 25);
  color: white;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
}
.change-password-button{
  margin-top: 5px;
  width: 160px;
  color: white;
  background-color: green !important;
}
.password-container {
  position: relative;
}

.password-field {
  width: 370px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.password-field.is-invalid {
  border-color: red;
}

.mdi-eye, .mdi-eye-off {
  position: absolute;
  right: 15px;
  
  top: 50%;
  font-size: 34px; /* Increased size */
  transform: translateY(-60%);
 
  cursor: pointer;
  z-index: 10; /* Ensures icon is above input field */
}

.error-text {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
.earth-icon {
  width: 100px;
  height: 55px;
}
</style>
