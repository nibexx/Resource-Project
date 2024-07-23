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
          <!-- Password input field with eye icon -->
<div class="password-input">
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
      passwordVisible: false, 
      passwordLengthError: false,
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
      this.passwordLengthError = true; // Show error if password is too short
      return; // Prevent form submission if validation fails
    } else {
      this.passwordLengthError = false; // Clear error if password is valid
    }
        let profileData = {
          name: this.editUserName,
          email: this.editUserEmail,
        };

            // Data for updating the password
      let passwordData = {
      password: this.newPassword,
    };

        const response = await axios.put(`http://192.168.1.25:8080/UserReg/update/${this.userId}`, profileData);

        if (response.status === 200) {
          this.$store.commit('setName', this.editUserName);
          this.$store.commit('setEmail',  this.editUserEmail);
        }
           // If the password is being changed, update it
    if (this.isChangingPassword && this.newPassword) {
      const passwordResponse = await axios.put(`http://192.168.1.25:8080/UserReg/updatePassword/${this.userId}`, passwordData);

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
      url: 'http://192.168.1.25:8080/GreenGuard/deleteByUserEmail',
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
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: rgb(33, 33, 50);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  margin-right: 155px;
  
  transition: background-color 0.3s ease;
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

</style>


<!-- <template>
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
            <label for="password">Password:</label>
            <input type="text" id="password" v-model="editUserPassword" required>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>

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
  </div>
  <ProfileCardView-page></ProfileCardView-page>
</template>

<script>
import ProfileCardView from './ProfileCardView.vue';

export default {
  data() {
    return {
      components: {
        ProfileCardView
      },
      userImage: '@/assets/profileicon.jpg', // Replace with actual user image URL
      // userName: 'Shalvin Doe', // Replace with actual user name
      // userEmail: 'john.doe@example.com', // Replace with actual user email
      userPassword: 234516772,
      isSidebarOpen: false,
      isEditProfileOpen: false,
      showLogoutModal: false,
      showDeleteModal: false,
      editUserName: '',
      editUserEmail: '',
      editUserPassword: ''
    };
  },
  computed: {
    firstName() {
      return this.userName.split(' ')[0];
    },
    userId(){
        return this.$store.getters.getId
       
    },
    userName(){
        return this.$store.getters.getName
       
    },
    userEmail(){
      return this.$store.getters.getEmail
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
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
    updateProfile() {
      this.userName = this.editUserName;
      this.userEmail = this.editUserEmail;
      this.userPassword = this.editUserPassword;
      this.closeEditProfile();
    },
    confirmLogout() {
      this.$router.push("/");
    },
    confirmDelete() {
      this.$router.push("/delete-acc");
    }
  }
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
  margin-right: 15px;
  transition: background-color 0.3s ease;
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
</style> -->

<!-- 
profile nav bar connected to the backend

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
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="editUserPassword" required>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div> -->

      <!-- Logout and deactivate popups
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
  </div>
  <ProfileCardView-page></ProfileCardView-page>
</template>

<script>
import axios from 'axios';
import ProfileCardView from './ProfileCardView.vue';

export default {
  data() {
    return {
      components: {
        ProfileCardView
      },
      userImage: '@/assets/profileicon.jpg', // Replace with actual user image URL
      userName: '', // User name will be fetched from the backend
      userEmail: '', // User email will be fetched from the backend
      userPassword: '', // User password will be fetched from the backend
      isSidebarOpen: false,
      isEditProfileOpen: false,
      showLogoutModal: false,
      showDeleteModal: false,
      editUserName: '',
      editUserEmail: '',
      editUserPassword: ''
    };
  },
  computed: {
    firstName() {
      return this.userName.split(' ')[0];
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
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
    async updateProfile() {
      try {
        const response = await axios.put('/api/user/profile', {
          name: this.editUserName,
          email: this.editUserEmail,
          password: this.editUserPassword
        });
        if (response.status === 200) {
          this.userName = this.editUserName;
          this.userEmail = this.editUserEmail;
          this.userPassword = this.editUserPassword;
          this.closeEditProfile();
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },
    async confirmDelete() {
      try {
        const response = await axios.delete('/api/user/profile');
        if (response.status === 200) {
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    },
    confirmLogout() {
      this.$router.push("/");
    }
  },
  async mounted() {
    try {
      const response = await axios.get('/api/user/profile');
      if (response.status === 200) {
        this.userName = response.data.name;
        this.userEmail = response.data.email;
        this.userPassword = response.data.password; // Note: Usually, you don't fetch passwords directly like this for security reasons.
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }
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
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #FFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.small-modal {
  max-width: 400px;
}

.close-icon {
  cursor: pointer;
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
}

.sidebar-header {
  display: flex;
  justify-content: flex-end;
}

.sidebar-content {
  text-align: center;
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
}

.sidebar-button1 {
  background-color: #E74C3C;
}

.sidebar-button2 {
  background-color: #C0392B;
}

.button-ok,
.button-cancel,
.button-ok1 {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #2C3E50;
  color: #FFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-ok1 {
  background-color: #C0392B;
}
</style> -->




<!-- <template>
  <div id="app">
    <div class="profile">
    
      <button class="logout-button" @click="showLogoutModal = true">
        <i class="mdi mdi-power"></i> 

        <span class="button-text">Logout</span> 
      </button>
      <div class="profile-header">
        <img :src="profileImage" alt="Profile Picture" class="profile-picture" />
        <h1>{{ user.name }}</h1>
      </div>
      <div class="profile-details">
        <ul>
          <li><strong>Email:</strong> {{ user.email }}</li>
        </ul>
      </div>
    </div>
    <button class="spin-on" @click="toUpload">+ Upload New</button>
  </div>
  <hr>
  <div class="background">
  <div id="app1" class="cards-container">
    <div v-for="card in cards" :key="card.title" class="card">
      <img class="card-image" :src="card.image" alt="Card Image" />
      <div class="card-content">
        <h2>{{ card.title }}</h2>
        <p>{{ card.description }}</p>
        <button class="button1" @click="editCard(card)">Edit</button>
        <button class="button2" @click="deleteCard(card.title)">Delete</button>
      </div>
    </div>

    <div v-if="editingCard" class="modal">
      <h2>Edit Details</h2>
      <label for="editTitle">Title:</label>
      <input v-model="editingCard.title" id="editTitle" type="text" />

      <label for="editImage">Image:</label>
      <input type="file" @change="onImageChange" id="editImage" />
      <img v-if="editingCard.image" :src="editingCard.image" alt="New Image Preview" class="image-preview" />

      <label for="editDescription">Description:</label>
      <textarea v-model="editingCard.description" id="editDescription" rows="5"></textarea>
      <p v-if="descriptionWordCount > 40" class="error-message">Description must not exceed 60 words.</p>

      <button class="button3" @click="saveChanges">Save</button>
      <button class="button4" @click="cancelEdit">Cancel</button>
    </div>
    <div v-if="showLogoutModal" class="modal1">
        <div class="modal-content1">
          <h2>Are you sure you want to logout?</h2>
          <button class="button-ok" @click="confirmLogout">OK</button>
          <button class="button-cancel" @click="showLogoutModal = false">Cancel</button>
        </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      profileImage: require('@/assets/profile icon.jpg'),
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      cards: [
        {
          image: require("@/assets/lake1.jpg"),
          title: "Card Title 1",
          description: "Description for card 1. This is a sample description of the card content.",
        },
        {
          image: require("@/assets/lake1.jpg"),
          title: "Card Title 2",
          description: "Description for card 2. This is a sample description of the card content.",
        },
        {
          image: "https://via.placeholder.com/150",
          title: "Card Title 3",
          description: "Description for card 3. This is a sample description of the card content.",
        },
        {
          image: "https://via.placeholder.com/150",
          title: "Card Title 3",
          description: "Description for card 3. This is a sample description of the card content.",
        }
      ],
      editingCard: null,
      originalTitle: "",
      showLogoutModal: false,
    };
  },
  computed: {
    descriptionWordCount() {
      if (this.editingCard && this.editingCard.description) {
        return this.editingCard.description.split(/\s+/).filter(word => word.length > 0).length;
      }
      return 0;
    }
  },
  methods: {
    logout(){
      this.showLogoutModal = true;
    },
    confirmLogout() {
      this.$router.push("/");
    },
    toUpload() {
      this.$router.push("/file-upload");
    },

    deleteCard(title) {
      this.cards = this.cards.filter(card => card.title !== title);
    },
    editCard(card) {
      this.editingCard = { ...card };
      this.originalTitle = card.title;
    },
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editingCard.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveChanges() {
      if (this.descriptionWordCount <= 60) {
        const index = this.cards.findIndex(card => card.title === this.originalTitle);
        if (index !== -1) {
          this.cards.splice(index, 1, { ...this.editingCard });
          this.editingCard = null;
        }
      } else {
        alert("Description must not exceed 60 words.");
      }
    },
    cancelEdit() {
      this.editingCard = null;
    }
  }
};
</script> -->

<!-- <style scoped>

.logout-button {
  position: absolute;
  top: 6px;
  right: 10px;
  background-color: red;
  
  cursor: pointer;
  font-size: 14px;
  color: white;
}

.logout-button .mdi {
  font-size: 20px; /* Adjust the icon size */
}

.logout-button .button-text {
  font-size: 16px; /* Adjust the text size */
  font-weight: bold; /* Make the text bold */
  margin-left: 4px; /* Add some spacing between icon and text */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
.error-message {
  color: red;
} -->
<!-- .spin-on{
  background-color: rgb(18, 88, 19); /* Background white for contrast with black text */
    color: white; /* Set content color to black */
    margin: 10px;
    padding: 5px 10px;
    /* border: 2px solid rgb(43, 159, 95); Set border color to red */
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add box shadow */
    margin-left: 23px;
}
.spin-on:hover {
    background-color: rgb(20, 121, 65); /* Maintain the same background color on hover */
    color: white; /* Maintain the same text color on hover */
    /* border: 2px solid rgb(43, 159, 95); Maintain the same border color on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Maintain the same box shadow on hover */
}
  /* .spin-on-hover:hover {
   
    background-color: #0e5f0c;
    color: white;
  } */
/* .profile-header {
  text-align: center;
} -->

<!-- .profile-picture {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.profile-details {
  margin-top: 5px;
}

.profile-details ul {
  list-style: none;
  padding: 0;
}

.profile-details li {
  margin-bottom: 10px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-left: 30px;
  margin-right: 50px;

} -->
<!-- .background{
  /* background-image: linear-gradient(45deg, rgb(18, 88, 19),rgb(49,138,57)); */
  background-image: url('@/assets/forest3.jpg');
  /* background-size: cover; /* Ensure the image covers the entire background */
  /* background-position: center; Center the background image */ 
  height: 100%;
}
.button1 {
    background-color: white; /* Background white for contrast with black text */
    color: black; /* Set content color to black */
    margin: 10px;
    padding:  5px 10px;
    border: 2px solid rgb(43, 159, 95); /* Set border color to red */
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add box shadow */
}

.button1:hover {
    background-color: white; /* Maintain the same background color on hover */
    color: black; /* Maintain the same text color on hover */
    border: 2px solid rgb(43, 159, 95); /* Maintain the same border color on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Maintain the same box shadow on hover */
}
.button3 {
    background-color: #0000ff; /* Background white for contrast with black text */
    color: white; /* Set content color to black */
    margin: 10px;
    padding:  5px 10px;
    border: 2px solid rgb(0, 0, 255); /* Set border color to red */
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add box shadow */
}

 .button3:hover {
  background-color: #0000ff; 
  color: white;
  margin: 10px;
    padding:  5px 10px;
    border: 2px solid rgb(0, 0, 255);
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* background-color: rgb(48, 9, 139); Maintain the same background color on hover */
    /* color: white; Maintain the same text color on hover */
    /* border: 2px solid rgb(18, 2, 123); Maintain the same border color on hover */
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); Maintain the same box shadow on hover */
} 
.button2 {
    background-color: white; /* Background white for contrast with black text */
    color: black; /* Set content color to black */
    margin: 10px;
    padding:  5px 10px;
    border: 2px solid red; /* Set border color to red */
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add box shadow */
}

.button2:hover {
    background-color: white; /* Maintain the same background color on hover */
    color: black; /* Maintain the same text color on hover */
    border: 2px solid red; /* Maintain the same border color on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Maintain the same box shadow on hover */
}
.button4:hover {
    background-color: rgb(177, 169, 169); /* Maintain the same background color on hover */
    color: black; /* Maintain the same text color on hover */
    /* border: 2px solid red; Maintain the same border color on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Maintain the same box shadow on hover */
}

.card {
  display: flex;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  width: 48%;
  max-width: 740px;
  height: 310px;
  margin: 16px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 40%;
  object-fit: cover;
} -->
<!-- 
.card-content {
  padding: 16px;
  width: 60%;
}

.card-content h2 {
  margin: 0;
  font-size: 1.5em;
  color: #333;
}

.card-content p {
  margin: 8px 0 0;
  color: #666;
}

button {
  margin-top: 10px;
  margin-right: 10px;
  padding:  5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* button:hover {
  background-color: #ddd;
} */

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal input,
.modal textarea {
  width: 100%;
  margin-top: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.image-preview {
  width: 100%;
  max-height: 150px;
  object-fit: cover;
  margin-top: 10px;
}

.modal button {
  margin-top: 10px;
}
.modal1 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content1 {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.button-ok, .button-cancel {
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
}

.button-ok {
  background-color: red;
  color: white;
}

.button-ok:hover {
  background-color: rgb(172, 36, 36);
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
</style>-->



<!-- <template>
  <div id="app">
    <div class="profile">
      <button class="logout-button" @click="showLogoutModal = true">
        <i class="mdi mdi-power"></i>\
        <span class="button-text">Logout</span> 
      </button>
      <div class="profile-header">
        <img :src="profileImage" alt="Profile Picture" class="profile-picture" />
        <h1>{{ user.name }}</h1>
      </div>
      <div class="profile-details">
        <ul>
          <li><strong>Email:</strong> {{ user.email }}</li>
        </ul>
      </div>
    </div>
    <button class="spin-on" @click="toUpload">+ Upload New</button>
  </div>
  <hr>
  <div class="background">
    <div id="app1" class="cards-container">
      <div v-for="card in cards" :key="card.id" class="card">
        <img class="card-image" :src="card.image" alt="Card Image" />
        <div class="card-content">
          <h2>{{ card.title }}</h2>
          <p>{{ card.description }}</p>
          <button class="button1" @click="editCard(card)">Edit</button>
          <button class="button2" @click="deleteCard(card.id)">Delete</button>
        </div>
      </div>

      <div v-if="editingCard" class="modal">
        <h2>Edit Details</h2>
        <label for="editTitle">Title:</label>
        <input v-model="editingCard.title" id="editTitle" type="text" />

        <label for="editImage">Image:</label>
        <input type="file" @change="onImageChange" id="editImage" />
        <img v-if="editingCard.image" :src="editingCard.image" alt="New Image Preview" class="image-preview" />

        <label for="editDescription">Description:</label>
        <textarea v-model="editingCard.description" id="editDescription" rows="5"></textarea>
        <p v-if="descriptionWordCount > 40" class="error-message">Description must not exceed 60 words.</p>

        <button class="button3" @click="saveChanges">Save</button>
        <button class="button4" @click="cancelEdit">Cancel</button>
      </div>
      <div v-if="showLogoutModal" class="modal1">
        <div class="modal-content1">
          <h2>Are you sure you want to logout?</h2>
          <button class="button-ok" @click="confirmLogout">OK</button>
          <button class="button-cancel" @click="showLogoutModal = false">Cancel</button>
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
      profileImage: require('@/assets/profile icon.jpg'),
      user: {
        name: '',
        email: '',
      },
      cards: [],
      editingCard: null,
      originalTitle: "",
      showLogoutModal: false,
    };
  },
  computed: {
    descriptionWordCount() {
      if (this.editingCard && this.editingCard.description) {
        return this.editingCard.description.split(/\s+/).filter(word => word.length > 0).length;
      }
      return 0;
    }
  },
  methods: {
    logout() {
      this.showLogoutModal = true;
    },
    confirmLogout() {
      this.$router.push("/");
    },
    async fetchUserData() {
      try {
        const response = await axios.get('/api/user');
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    async fetchCards() {
      try {
        const response = await axios.get('/api/cards');
        this.cards = response.data;
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    },
    async deleteCard(id) {
      try {
        await axios.delete(`/api/cards/${id}`);
        this.cards = this.cards.filter(card => card.id !== id);
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    },
    editCard(card) {
      this.editingCard = { ...card };
      this.originalTitle = card.title;
    },
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editingCard.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async saveChanges() {
      if (this.descriptionWordCount <= 60) {
        try {
          const response = await axios.put(`/api/cards/${this.editingCard.id}`, this.editingCard);
          const index = this.cards.findIndex(card => card.id === this.editingCard.id);
          if (index !== -1) {
            this.cards.splice(index, 1, response.data);
            this.editingCard = null;
          }
        } catch (error) {
          console.error("Error saving card:", error);
        }
      } else {
        alert("Description must not exceed 60 words.");
      }
    },
    cancelEdit() {
      this.editingCard = null;
    }
  },
  async mounted() {
    await this.fetchUserData();
    await this.fetchCards();
  }
};
</script>
 -->
