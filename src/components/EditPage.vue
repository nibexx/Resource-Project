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
            <input type="password" id="password" v-model="editUserPassword" required>
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
    <ProfileCardView-page></ProfileCardView-page>
  </div>
</template>

<script>
import ProfileCardView from './ProfileCardView.vue';
import axios from 'axios';
export default {
  data() {
    return {
      components: {
        ProfileCardView
      },
      userImage: '@/assets/profileicon.jpg', // Replace with actual user image URL
      // userName: '', // User name will be fetched from the backend
      // userEmail: '', // User email will be fetched from the backend
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
    async updateProfile() {
      try {
        const response = await axios.put(`http://192.168.1.9:8080/GreenGuard/edit/${this.userId}`, {
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
        const response = await axios.delete(`http://192.168.1.9:8080/GreenGuard/delete/${this.userId}`);
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
      const response = await axios.get('http://192.168.1.9:8080/GreenGuard/save');
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
  z-index: 1000;
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

   Logout and deactivate popups -->
          <!--<div v-if="showLogoutModal" class="modal">
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
      userName: 'Shalvin Doe', // Replace with actual user name
      userEmail: 'john.doe@example.com', // Replace with actual user email
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
edit profile popup



<template>
  <div>
    <button @click="openPopup">Edit Profile</button>
    <div v-if="show" class="popup">
      <div class="popup-content">
        <h2>Edit Profile</h2>
        <form @submit.prevent="saveChanges">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <div class="form-actions">
            <button type="submit">Save Changes</button>
            <button type="button" @click="closePopup">Cancel</button>
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
      show: false,
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    openPopup() {
      this.show = true;
    },
    closePopup() {
      this.show = false;
    },
    saveChanges() {
      // Handle the save changes logic here, e.g., sending data to an API
      console.log('Saved data:', { name: this.name, email: this.email, password: this.password });
      this.closePopup();
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}

.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 550px;
  text-align: center;
}

.popup-content h2 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  outline-color: lightblack;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: black;
}
.form-actions {
  display: flex;
  justify-content: space-between;
}

.form-actions button {
  padding: 10px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.form-actions button:first-child {
  background-color: #4CAF50;
  color: white;
}

.form-actions button:last-child {
  background-color: #f44336;
  color: white;
}
</style> -->



<!-- <template>
  <div class="background">

<div class="card ">
  <div class="container mt-3 ml-2">
    <h2>Edit Page</h2>
</div>
    <v-img
  :width="500"
  
  aspect-ratio="16/9"
  cover
  src="@/assets/lake3.jpg"
></v-img>
<span class="mdi mdi-pencil edit-icon"></span>
<v-textarea
          class="textarea"
          label="Description"
          row-height="22"
          rows="4"
          variant="outlined"
          auto-grow
          shaped
        ></v-textarea>
        <div class="button-group">
      <button class="button" type="button">Submit</button>
      <button class="button1" type="button">Delete</button>
    </div>
</div>
</div>
</template>

<style scoped>
.background {
  background-image: url('@/assets/forest3.jpg');
  background-size: cover; /* Ensure the image covers the entire background */
  background-position: center; /* Center the background image */
  min-height: 100vh;
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  padding: 20px; /* Optional: add some padding */
}

.container {
  margin-bottom: 20px;
}

.card {
  width: 100%;
  max-width: 60rem;
  height: auto;
  margin-left: 280px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
  position: relative; /* Ensure the edit icon positions correctly */
}

.edit-icon {
  position: absolute;
  top: 280px;
  right: 380px;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.edit-icon:hover {
  transform: scale(1.2);
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 5px;
}

.textarea {
  margin-top: 26px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 20px; /* Increase space between buttons */
  margin-top: 20px;
}

.button,
.button1 {
  margin-top: 0;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button {
  background-color: #89c697;
  color: #ffffff;
}

.button:hover {
  background-color: #218838;
}

.button1 {
  background-color: #a31422;
  color: #ffffff;
}

/* .button1:hover {
  background-color: #c82333;
} */
</style> -->
