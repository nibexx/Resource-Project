<template>
  <div>
    <div class="navbar">
      <div class="navbar-left">
        <img src="" alt="">
        <h1>Profile Page</h1>
      </div>
      <div class="navbar-right">
        <button class="upload-button" >+ Upload New</button>
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
        <button class="sidebar-button" @click="showLogoutModal = true">
          <i class="mdi mdi-logout"></i> Logout
        </button>
        <button class="sidebar-button" @click="showDeleteModal = true">
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
          <button type="button" @click="togglePasswordChange" class="change-password-button ms-1 mb-3">Change Password</button>
          <div v-if="isChangingPassword" class="password-input">
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" v-model="newPassword">
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>

    <!-- Logout and Deactivate Popups -->
    <div v-if="showLogoutModal" class="modal">
      <div class="modal-content small-modal" >
        <h2>Are you sure you want to logout?</h2>
        <button class="button-ok" @click="confirmLogout">OK</button>
        <button class="button-cancel" @click="showLogoutModal = false">Cancel</button>
      </div>
    </div>
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content small-modal">
        <h2>Are you sure you want to delete your account?</h2>
        <button class="button-ok" @click="confirmDelete">OK</button>
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
      isSidebarOpen: false,
      isEditProfileOpen: false,
      showLogoutModal: false,
      showDeleteModal: false,
      editUserName: '', // Loaded in modal open
      editUserEmail: '', // Loaded in modal open
      isChangingPassword: false,
      newPassword: '',
    };
  },
  computed: {
    firstName() {
      return this.userName ? this.userName.split(' ')[0] : '';
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
      // Pre-fill inputs from Vuex store
      this.editUserName = this.userName;
      this.editUserEmail = this.userEmail;
      this.isEditProfileOpen = true;
    },
    closeEditProfile() {
      this.isEditProfileOpen = false;
    },
    togglePasswordChange() {
      this.isChangingPassword = !this.isChangingPassword;
    },
    async updateProfile() {
      console.log('start')
      try {
        // Construct profile data
        const profileData = {
          name: this.editUserName,
          email: this.editUserEmail,
        };

        // Send PUT request to update profile
        const response = await axios.put(`http://192.168.1.31:8080/UserReg/update/${this.userId}`, profileData);

        if (response.status === 200) {
          console.log('edited')
          // Commit updated data to Vuex immediately
          this.$store.commit('setName', response.data.name);
          this.$store.commit('setEmail', response.data.email);
          this.$store.commit('setUserData', response.data)
          // If password is being changed
          if (this.isChangingPassword && this.newPassword) {
            const passwordData = { password: this.newPassword };
            const passwordResponse = await axios.put(`http://192.168.1.31:8080/UserReg/updatePassword/${this.userId}`, passwordData);

            if (passwordResponse.status === 200) {
              console.log('Password updated successfully');
            }
          }

          // Close edit modal and notify success
          this.closeEditProfile();
          alert('Profile updated successfully!');
        } else {
          console.error('Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },
    confirmLogout() {
      this.$store.commit('setAuthenticated', false);
      this.$router.push('/');
    },
    async confirmDelete() {
      try {
        const formData = new FormData();
        formData.append('email', this.userEmail);

        const response = await axios.delete('http://192.168.1.31:8080/UserReg/deleteByUserEmail', { data: formData });

        if (response.status === 200) {
          this.$store.commit('setAuthenticated', false);
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Styles for page */
.navbar {
  background-color: #2C3E50;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upload-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
