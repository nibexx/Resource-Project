<template>
  <div class="background">
    <div class="logo-container">
      <a href="/">
        <img :src="logo" alt="Home" class="logoimage">
      </a>
    </div>
    <div class="content">
      <div class="quote">
        <p>
          "Adopt the pace of nature: her secret is patience.<br />
          Nature always wears the colors of the spirit."<br>
          <b>-Ralph Waldo Emerson</b>
        </p>
      </div>
      <div class="container">
        <v-card class="mx-auto mt-4 ml-3 mr-3 text-center custom-card" max-width="450" style="color: white; padding: 10px; border-radius: 8px 8px 0 0; font-weight: bold;">
          <div class="headline registration-title">
            <h3> User Registration</h3>
          </div>
          <v-form ref="form" v-model="formValid" @submit.prevent="validateForm">
            <keep-alive>
              <v-container>
                <v-text-field 
                  v-model="first"
                  color="white"
                  label="Name"
                  placeholder="Enter your Name"
                  class="ms-2 me-2"
                  prepend-inner-icon="mdi-clipboard-account"
                  variant="outlined"
                  :rules="nameRules"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  color="white"
                  label="Email"
                  placeholder="Enter your email Id"
                  class="ms-2 me-2"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  color="white"
                  label="Password"
                  class="ms-2 me-2"
                  placeholder="Create your password"
                  variant="outlined"
                  :rules="passwordRules"
                  :type="visible ? 'text' : 'password'"
                  append-inner-icon="mdi-eye"
                  @click:append-inner="visible = !visible"
                  required
                ></v-text-field>
              </v-container>
            </keep-alive>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" class="btn"  :disabled="registrationInProgress">
                Register
               
              </v-btn>
            </v-card-actions>
            <v-card-text class="login-container">
              <p class="exist-acc">Already have an account? <router-link to="/login-page" class="login-here">Login here</router-link></p>
            </v-card-text>
          </v-form>
        </v-card>
      </div>
    </div>
    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" max-width="600px" persistent>
      <v-card class="success-card">
        <v-card-title class="headline success-title" align="center">Registration Successful</v-card-title>
        <v-card-text>
          <v-icon large class="success-icon">mdi-check-circle-outline</v-icon>
          <p class="success-message">Congratulations! Your registration was successful. You can now log in with your new account.</p>
        </v-card-text>
        <v-card-actions class="success-actions">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeSuccessDialog">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      logo: require('@/assets/homewhite.png'),
      first: null,
      email: null,
      password: null,
      formValid: false,
      visible: false,
      successDialog: false,
      registrationInProgress: false,
    };
  },
  methods: {
    async validateForm() {
      this.registrationInProgress = true;

      try {
        if (await this.$refs.form.validate()) {
          const response = await axios.post('http://192.168.1.31:8080/UserReg/reg', {
            name: this.first,
            email: this.email,
            password: this.password,
          });

          if (response.status === 200 || response.status < 300) {
            this.successDialog = true;
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Error fetching user details: ' + error.message);
      } finally {
        this.registrationInProgress = false;
      }
    },
    closeSuccessDialog() {
      this.successDialog = false;
      this.$router.push('/login-page');
    }
  },
  computed: {
    nameRules() {
      return [
        (v) => !!v || "Name is required",
        (v) => (v && v.length >= 3) || "Name must be at least 3 characters long",
      ];
    },
    emailRules() {
      return [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ];
    },
    passwordRules() {
      return [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must be at least 8 characters long",
      ];
    },
  },
};
</script>


<style>
.login-here{
  color: white;
  text-decoration: underline;
  
}
.custom-card {
  background-color: #3d523f;
  
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}



.custom-card .v-card-title {
  background: linear-gradient(135deg, #f0f0f0 0%, #ffffff 100%);
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.custom-card .v-card-actions {
  border-top: 1px solid #ddd;
}

.btn {
  border: 2px solid white;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  padding-bottom: 30px;
  margin-right: 45px;
}
.btn:hover{
  background-color: green;
  color: white;
  border:2px solid white;
}



.view-more {
  color: white;
  text-decoration: underline;
  cursor: pointer;
}

.background {
  background-image: url('@/assets/forest3.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logo-container {
  position: absolute;
  top: 20px;
  left: 20px;
}

.logoimage {
  width: 50px;
  height: 35px;
  margin-right: 10px;
  border: 2px white solid;
  padding: 5px;
  border-radius: 5px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin-right: 40px;
}

.quote {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  color: white;
  font-size: 20px;
  margin-top: 15px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.success-card {
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  background-color: #f9f9f9;
}

.success-title {
  background-color: green;
  padding-top: 20px !important;
  font-weight: bold;
  font-size: 24px;
  color: beige;
}

.success-icon {
  color: #4caf50;
  font-size: 46px !important;
  display: block;
  margin-left: 250px !important; /* Centers the icon horizontally */
}

.success-message {
  text-align: center;
  font-size: 17px;
  margin: 20px 0;
  color: #333;
}
.registration-title {
  background-color: #3d523f!important;
 
  padding: 10px;
  border-radius: 8px 8px 0 0;
  font-weight: bold;
  text-align: center;
}

</style>
