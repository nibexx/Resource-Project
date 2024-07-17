<template>
  <div class="background">
    <div class="content">
      <div class="quote">
        <p>
          "Adopt the pace of nature: her secret is patience.<br />
          Nature always wears the colors of the spirit."<br>
          
          <b >-Ralph Waldo Emerson</b>
        </p>
        
        
      </div>

      <div class="container">
        <v-card
          class="card pa-12 pb-8"
          elevation="8"
          max-width="448"
          rounded="lg"
        >
          <h4 class="text-center mb-4">Login Form</h4>
          <div class="text-subtitle-1 text-medium-emphasis">Account</div>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            density="compact"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            :error-messages="emailErrors"
          ></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Password
            <!-- <a
              class="text-caption text-decoration-none text-green"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              Forgot login password?
            </a> -->
          </div>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            :error-messages="passwordErrors"
            @click:append-inner="visible = !visible"
          ></v-text-field>

          <v-btn
            class="mb-8 custom-button"
            color="light-green"
            size="large"
            variant="tonal"
            block
            @click="validateForm"
          >
            Log In
          </v-btn>

          <v-card-text class="text-center">
            <a
              class="text-green text-decoration-none signup-link"
              @click="toSign"
              rel="noopener noreferrer"
              target="_blank"
            >
              Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      password: '',
      visible: false,
      emailErrors: [],
      passwordErrors: [],
      
    };
  },
  computed: {
    emailRules() {
      return [(v) => !!v || 'Email is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'];
    },
    passwordRules() {
  return [
    (v) => !!v || "Password is required",
    (v) => (v && v.length >= 8) || "Password must be at least 8 characters long"
  ];
},
  },
  methods: {
    async validateForm() {
      this.emailErrors = [];
      this.passwordErrors = [];

      if (!this.email) {
        this.emailErrors.push('Email is required');
      } else if (!/.+@.+\..+/.test(this.email)) {
        this.emailErrors.push('E-mail must be valid');
      }

      if (!this.password) {
        this.passwordErrors.push('Password is required');
      }

      if (!this.emailErrors.length && !this.passwordErrors.length) {
        console.log('Form is valid! Submitting...');
        try {
          const response = await axios.post('http://192.168.1.14:8080/UserReg/login', {
            "email": this.email,
            "password": this.password,
          });
          if ((response.status === 200) || (response.status < 300)) {
            console.log(response.data);
            this.$store.commit('setAuthenticated',true);
            console.log('Success');
            this.$store.commit('setId',response.data.id);
            this.$store.commit('setName',response.data.name);
            this.$store.commit('setEmail',response.data.email);
            this.$router.push('/edit-page');
          }
        } catch (error) {
          console.error(error);
          alert("Invalid UserName or Password");
          
        }
      }    },
    toSign() {
      this.$router.push('/signup-page');
    },
  },
};
</script>

<style>
.signup-link {
  cursor: pointer;
}
.custom-button {
  background-color: #b6ecb6; /* Light green color */
  color: white; /* Text color */
}

.custom-button:hover {
  background-color: #008000; /* Green color */
  color: white !important; 
  
}
.background {
  background-image: url('@/assets/forest3.jpg');
  background-size: cover; /* Ensure the image covers the entire background */
  background-position: center; /* Center the background image */
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Align vertically center */
  width: 100%;
  padding: 20px;
  margin-right: 40px;
}
.quote {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 50%; /* Adjusted for better alignment */
}
p {
  color: #f0f8ff;
  font-size: 20px;
  text-align: left;
  margin-left: 60px;
}
b{
  margin-left: 240px;
}
.container {
  display: flex;
  justify-content: flex-end;
  width: 50%; /* Adjusted for better alignment */
  margin-right: 30px;
}
.card {
  width: 100%;
  max-width: 448px;
}
@media (max-width: 400px) {
  .quote {
    display: none;
  }
  .background {
    background-position: center;
  }
  .content {
    flex-direction: column;
    margin-right: 0;
  }
  .container {
    justify-content: center;
    width: 100%;
    margin-right: 0;
  }
}
</style>
