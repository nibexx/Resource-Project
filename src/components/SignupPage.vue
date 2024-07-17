<!-- <template>
    <v-card
      class="mx-auto mt-4 text-center custom-card"
      max-width="590"
     
      title="User Registration"
    >
      <v-container>
        <v-text-field
          v-model="first"
          color="black"
          label="Name"
          variant="underlined"
        ></v-text-field>
  

        <v-text-field
          v-model="email"
          color="black"
          label="Email"
          variant="underlined"
        ></v-text-field>
  
        <v-text-field
          v-model="password"
          color="black"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="district"
          color="black"
          label="District name"
          variant="underlined"
        ></v-text-field>
        <v-textarea
          label="Description"
          row-height="25"
          rows="4"
          variant="outlined"
          auto-grow
          shaped
        ></v-textarea>
  
  
        <v-checkbox
        v-model="terms"
        color="secondary"
      >
        <template v-slot:label>
          <span>I agree to <router-link to="/terms-conditions" class="view-more">site terms and conditions</router-link></span>
        </template>
      </v-checkbox>
        
        
      </v-container>
  
      <v-divider></v-divider>
  
      <v-card-actions>
        <v-spacer></v-spacer>
  
        <v-btn @click="toUploadPage" color="success">
          Complete Registration
  
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>

<script>
export default {
  data: () => ({
    first: null,
    district: null,
    email: null,
    password: null,
    terms: false,
  }),

    methods: {
          toUploadPage(){
              this.$router.push("/file-upload")
          }   
      }

}
</script>


<style>
.custom-card {
  box-shadow: 0 6px 13px rgba(0, 0, 0, 0.3);
}
body{
background: #218838;
}
.view-more {
  color: blue;
  text-decoration: underline;
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
  <v-card
    class="mx-auto mt-4 ml-3 mr-3 text-center custom-card"
    max-width="590"
    title="User Registration"
  >
    <v-form ref="form" v-model="formValid" @submit.prevent="validateForm">
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

        <!-- <v-text-field
          v-model="district"
          color="black"
          label="District name"
         variant="underlined"
          :rules="districtRules"
          required 
        ></v-text-field> -->

        <!-- <v-textarea
          v-model="description"
          label="Description"
          row-height="25"
          rows="4"
          variant="outlined"
          :rules="descriptionRules"
          @input="handleDescriptionInput"
          :readonly="maxWordsReached"
          auto-grow
          shaped
          required
        ></v-textarea> -->

        <v-checkbox
          v-model="terms"
          color="secondary"
          :rules="termsRules"
        >
          <template v-slot:label>
            <span>I agree to <router-link to="/terms-conditions" class="view-more">site terms and conditions</router-link></span>
          </template>
        </v-checkbox>
      </v-container>

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
    if (this.$refs.form.validate()) {
      console.log("going to backend");
      const response = await axios.post('http://192.168.1.14:8080/UserReg/reg', {
        "name": this.first,
        "email": this.email,
        "password": this.password
      });
      if (response.status === 200) {
        console.log(response.data);
   
        this.$router.push('/profile-page');
      }
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    alert('Error fetching user details: ' + error.message);
  }
},

    },
    // toUploadPage() {
    //   this.$router.push("/file-upload");
    // },
    // handleDescriptionInput(event) {
    //   const words = event.target.value.trim().split(/\s+/);
    //   if (words.length > 38) {
    //     // If more than 38 words, truncate and set flag to indicate max words reached
    //     this.description = words.slice(0, 38).join(' ');
    //     this.maxWordsReached = true;
    //   } else {
    //     this.description = event.target.value;
    //     this.maxWordsReached = false;
    //   }
    // },
    
  
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
    termsRules() {
      return [(v) => !!v || "You must agree to the terms and conditions"];
    },
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
</style>
