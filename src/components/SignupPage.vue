<!-- 

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
    class="mx-auto mt-4 ml-3 mr-3 text-center custom-card"
    max-width="500"
    title="User Registration"
  >
    <v-form ref="form" v-model="formValid" @submit.prevent="validateForm">
      <keep-alive>
      <v-container>
   
        <v-text-field
          v-model="first"
          color="black"
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
          color="black"
          label="Email"
           placeholder="Enter your emailId"
          class="ms-2 me-2"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          :rules="emailRules"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          color="black"
          label="Password"
          class="ms-2 me-2"
          placeholder="Create your password"
          variant="outlined"
          :rules="passwordRules"
          :type="visible ? 'text' : 'password'"
          append-inner-icon="mdi-eye"
          @click:append-inner="visible = !visible"
          required
        ></v-text-field> -->

        <!-- <v-checkbox
          v-model="terms"
          color="secondary"
          :rules="termsRules"
        >
          <template v-slot:label>
            <span>I agree to <router-link to="/terms-conditions" class="view-more">site terms and conditions</router-link></span>
          </template>
        </v-checkbox>
      </v-container>

    </keep-alive>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn type="submit" class="btn"  color="success">
          Complete Registration
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-form>
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
      first: null,

      email: null,
      password: null,
    
      terms: false,
      formValid: false,
      visible: false,
      
    };
  },
  methods: {
    async validateForm() {
  try {
    if (await this.$refs.form.validate()) {
      console.log("going to backend");
      const response = await axios.post('http://192.168.1.19:8080/UserReg/reg', {
        "name": this.first,
        "email": this.email,
        "password": this.password
      });
      if ((response.status === 200) || (response.status < 300)) {
        console.log(response.data);
       
        this.$router.push('/login-page');
      }
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    alert('Error fetching user details: ' + error.message);
  }
},

  },
    
  
  computed: {
    nameRules() {
      return [(v) => !!v || "Name is required",
      (v) => (v && v.length >= 3) || "Name must be at least 3 characters long"
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
    (v) => (v && v.length >= 8) || "Password must be at least 8 characters long"
  ];
},
termsRules() {
      return [(v) => !!v || "You must agree to the terms and conditions"];
    },
// descriptionRules() {
//       return [
//         (v) => !!v || "Description is required",
//         (v) => {
//           const wordCount = v ? v.trim().split(/\s+/).length : 0;
//           return wordCount <= 38 || "Description must be no more than 38 words";
//         },
//       ];
//     },

//     districtRules() {
//       return [(v) => !!v || "District name is required"];
//     },

  },
 
};
</script>


<style>
.custom-card {
  box-shadow: 0 6px 13px rgba(0, 0, 0, 0.3);
  width: 100%;
  border-radius: 16px;
}
.btn:hover{
background-color: rgb(192, 242, 176);
color: black !important;
}
.view-more {
  color: blue;
  text-decoration: underline;
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
  width: 600px;
  margin-left: auto; /* Pushes the card to the right */
  margin-left: 400px;
}
</style> -->



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
        <v-card class="mx-auto mt-4 ml-3 mr-3 text-center custom-card" max-width="450" title="User Registration">
          <v-form ref="form" v-model="formValid" @submit.prevent="validateForm">
            <keep-alive>
              <v-container>
                <v-text-field
                  v-model="first"
                  color="black"
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
                  color="black"
                  label="Email"
                  placeholder="Enter your emailId"
                  class="ms-2 me-2"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  :rules="emailRules"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  color="black"
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

                <v-checkbox v-model="terms" color="secondary" :rules="termsRules">
                  <template v-slot:label>
                    <span>I agree to <a href="#" @click.prevent="showTerms" class="view-more">site terms and conditions</a></span>
                  </template>
                </v-checkbox>
              </v-container>
            </keep-alive>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" class="btn" color="success">
                Complete Registration
                <v-icon icon="mdi-chevron-right" end></v-icon>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </div>
    </div>

    <v-dialog v-model="termsDialog" max-width="700px">
      <v-card>
        <v-card-title class="headline">Terms and Conditions</v-card-title>
        <v-card-text>
          <ol class="terms">
            <li>By accessing and using this website, you agree to comply with and be bound by these terms and conditions. If you do not agree, please do not use our site.</li>
            <li>All content provided on this website, including text, images, and other materials, is for informational purposes only. You may not reproduce, distribute, or use any content without our explicit permission.</li>
            <li>You agree to use this website only for lawful purposes and in a way that does not infringe the rights of others or restrict or inhibit their use and enjoyment of the site. Prohibited behavior includes harassing or causing distress or inconvenience to any other user.</li>
            <li>By using our site, you agree to the collection and use of information as described in the privacy policy.</li>
            <li>We are not liable for any direct, indirect, incidental, or consequential damages arising out of your use of, or inability to use, this website. This includes any errors or omissions in the content provided.</li>
          </ol>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="success" @click="agreeTerms">I Agree</v-btn>
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
      first: null,
      email: null,
      password: null,
      terms: false,
      formValid: false,
      visible: false,
      termsDialog: false
    };
  },
  methods: {
    async validateForm() {
      try {
        if (await this.$refs.form.validate()) {
          console.log("going to backend");
          const response = await axios.post('http://192.168.1.19:8080/UserReg/reg', {
            "name": this.first,
            "email": this.email,
            "password": this.password
          });
          if ((response.status === 200) || (response.status < 300)) {
            console.log(response.data);
            this.$router.push('/login-page');
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Error fetching user details: ' + error.message);
      }
    },
    showTerms() {
      this.termsDialog = true;
    },
    agreeTerms() {
      this.terms = true;
      this.termsDialog = false;
    }
  },
  computed: {
    nameRules() {
      return [
        (v) => !!v || "Name is required",
        (v) => (v && v.length >= 3) || "Name must be at least 3 characters long"
      ];
    },
    emailRules() {
      return [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ];
    },
    passwordRules() {
      return [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must be at least 8 characters long"
      ];
    },
    termsRules() {
      return [
        (v) => !!v || "You must agree to the terms and conditions"
      ];
    }
  }
};
</script>

<style>
.custom-card {
  box-shadow: 0 6px 13px rgba(0, 0, 0, 0.3);
  width: 100%;
  border-radius: 16px;
}
.btn:hover{
  background-color: rgb(192, 242, 176);
  color: black !important;
}
.view-more {
  color: blue;
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
  justify-content: flex-start;
  width: 50%;
}
p {
  color: #f0f8ff;
  font-size: 20px;
  text-align: left;
  margin-left: 60px;
}
b {
  margin-left: 240px;
}
.container {
  display: flex;
  justify-content: flex-end;
  width: 600px;
  margin-left: 400px;
}
.terms {
  margin: 0;
  padding: 0;
  list-style-type: decimal;
  padding: 20px;
}
.terms li {
  margin-bottom: 15px;
  padding-left: 10px;
  margin-left: 20px;
}
.success{
  color: green;

}
.success:hover{
  color: white;
  background-color: rgb(63, 132, 63);
}
</style>
