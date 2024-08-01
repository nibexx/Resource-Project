<template>
  <div class="background">
    <div class="card">
      <h3>Upload Form</h3>
      <form>
        <v-text-field
          v-model="state.name"
          :counter="10"
          :error-messages="v$.name.$errors.map(e => e.$message)"
          label="Name"
          required
          @blur="v$.name.$touch"
          @input="v$.name.$touch"
        ></v-text-field>
        <v-text-field
          v-model="state.email"
          :counter="10"
          :error-messages="v$.name.$errors.map(e => e.$message)"
          label="Email"
          required
          @blur="v$.name.$touch"
          @input="v$.name.$touch"
        ></v-text-field>
        <!-- <v-text-field
          v-model="state.category"
          :counter="10"
          :error-messages="v$.category.$errors.map(e => e.$message)"
          label="Enter Category"
          required
          @blur="v$.category.$touch"
          @input="v$.category.$touch"
        ></v-text-field> -->
        <v-select
          v-model="state.category"
          :error-messages="v$.select.$errors.map(e => e.$message)"
          :items="categories"
          label="Select Category"
          required
          @blur="v$.select.$touch"
          @change="v$.select.$touch"
        ></v-select>
        <v-select
          v-model="state.select"
          :error-messages="v$.select.$errors.map(e => e.$message)"
          :items="items"
          label="Select District"
          required
          @blur="v$.select.$touch"
          @change="v$.select.$touch"
        ></v-select>
        <v-text-field label="Select Location" prepend-icon="mdi-map-marker"></v-text-field>
        <v-textarea
          v-model="state.description"
          :error-messages="v$.description.$errors.map(e => e.$message)"
          label="Description"
          rows="7"
          cols="30"
          required
          @blur="v$.description.$touch"
          @input="v$.description.$touch"
        ></v-textarea>
  
        <v-file-input
          v-model="state.image"
          label="Image Upload"
          prepend-icon="mdi-camera"
          variant="filled"
          @change="handleFileUpload($event)"
          required
        ></v-file-input>
        <p v-if="state.fileName">Selected File: {{ state.fileName }}</p>
  
        <v-btn class="me-4" @click="validateAndSubmit">
          Submit
        </v-btn>
        <v-btn @click="clear">
          Clear All
        </v-btn>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'

const initialState = {
  name: '',
  category: '',
  description: '',
  email:'',
  select: null,
  image: null,
  fileName: '' // Added to store the file name
}

const state = reactive({
  ...initialState,
  url: ''
})

const items = [
  'Thiruvananthapuram',
  'Kollam',
  'Pathanamthitta',
  'Alappuzha',
  'Kottayam',
  'Idukki',
  'Ernakulam',
  'Thrissur',
  'Palakkad',
  'Malappuram',
  'Kozhikode',
  'Wayanad',
  'Kannur',
  'Kasaragod'
]
const categories = [
  "Pond",
  "Tree",
  "Canal",
  "River",
  "Lake",
  "Soil",
  "Garden",
  "Plantation",
  "Paddy Field",
  
] 


const rules = {
  name: { required },
  description: { required },
  email:  { required },
  select: { required },
  category: { required },
  image: { required }
}

const v$ = useVuelidate(rules, state)

function handleFileUpload(event) {
  const imgInput = event.target.files[0];
  state.fileName = imgInput.name; // Store the file name
  
  const reader = new FileReader();
  reader.onload = () => {
    state.image = imgInput
  };
  reader.readAsDataURL(imgInput); // Read the file as a data URL
}

async function validateAndSubmit() {
  v$.value.$validate();
  if (!v$.value.$pending && !v$.value.$invalid) {
    console.log('Form submitted successfully!');

    try {
      const formData = new FormData();
      formData.append('saverName', state.name);
      formData.append('email', state.email);
      formData.append('category', state.category);
      formData.append('description', state.description);
      formData.append('district', state.select);
      formData.append('imageFile', state.image); // Append the Base64 string

      // Log formData to see what is being sent
      for (var pair of formData.entries()) {
        console.log(pair[0]+ ': ' + pair[1]); 
      }

      const response = await axios.post('http://192.168.1.18:8080/GreenGuard/save', formData, {
  //       headers: {
  //   'Content-Type': 'multipart/form-data'
  // }
      
      });

      if (response.status >= 200 || response.status < 300) {
        console.log('Response:', response.data);
        alert('Form submitted successfully!');
        Object.assign(state, initialState); // Reset the state to initial values
        v$.value.$reset(); // Reset validations
}
        // this.$router.push('/profile-page'); // Uncomment this if using within a Vue component
      // multi part data aakumbol applicatiions/json use cheyyanda
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      alert('Error submitting form: ' + error.message);
    }
  }
}

function clear() {
  v$.value.$reset();
  Object.assign(state, initialState); // Reset the state to initial values
}

</script>


<!-- <template>
  <div class="card">
    <h3>Upload Form</h3>
    <form @submit.prevent="submitForm">
      <v-text-field
        v-model="state.name"
        :counter="10"
        :error-messages="v$.name.$errors.map(e => e.$message)"
        label="Name"
        required
        @blur="v$.name.$touch"
        @input="v$.name.$touch"
      ></v-text-field>
      <v-text-field
        v-model="state.email"
        :error-messages="v$.email.$errors.map(e => e.$message)"
        label="E-mail"
        required
        @blur="v$.email.$touch"
        @input="v$.email.$touch"
      ></v-text-field>
      <v-textarea
        v-model="state.description"
        :error-messages="v$.description.$errors.map(e => e.$message)"
        label="Description"
        rows="5"
        cols="30"
        required
        @blur="v$.description.$touch"
        @input="v$.description.$touch"
      ></v-textarea>
      <v-file-input
        label="Image Upload"
        prepend-icon="mdi-camera"
        variant="filled"
        @change="handleFileUpload"
      ></v-file-input>
      <v-checkbox
        v-model="state.checkbox"
        :error-messages="v$.checkbox.$errors.map(e => e.$message)"
        label="Do you agree?"
        required
        @blur="v$.checkbox.$touch"
        @change="v$.checkbox.$touch"
      ></v-checkbox>
      <v-btn class="me-4" @click="v$.$validate">
        Submit
      </v-btn>
      <v-btn @click="clear">
        Clear
      </v-btn>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import axios from 'axios';

const initialState = {
  name: '',
  email: '',
  description: '',
  image: null,
  checkbox: null,
};

const state = reactive({
  ...initialState,
});

const rules = {
  name: { required },
  email: { required, email },
  description: { required },
  checkbox: { required },
};

const v$ = useVuelidate(rules, state);

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}

function handleFileUpload(event) {
  state.image = event.target.files[0];
}

async function submitForm() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }

  const formData = new FormData();
  formData.append('name', state.name);
  formData.append('email', state.email);
  formData.append('description', state.description);
  formData.append('image', state.image);
  formData.append('checkbox', state.checkbox);

  try {
    const response = await axios.post('YOUR_BACKEND_ENDPOINT', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Form submitted successfully', response.data);
  } catch (error) {
    console.error('Error submitting form', error);
  }
}
</script>

<style>
.card {
  margin: 2rem auto;
  max-width: 60rem;
  height: 39rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
  margin-top: 30px;
}
.form-control {
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.btn {
  background-color: #007bff;
  color: white;
  margin: 30px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn:hover {
  background-color: #0056b3;
}
h3 {
  text-align: center;
  color: black;
  margin-bottom: 20px;
}
.label {
  float: left;
  width: 150px;
  margin-right: 20px;
  margin-top: 8px;
  font-weight: bold;
}
h1 {
  margin-top: 10px;
}
</style> -->


<!-- <template>
  <div>
    <h1>Upload Image and Add Description</h1>
    <div class="card">
      <form @submit.prevent="submitForm">
        <label class="label">Upload Image</label>
        <input type="file" @change="handleFileUpload" :rules="imageRules" class="form-control">
        <div v-if="imageError" class="error">{{ imageError }}</div>

        <label class="label">Description</label>
        <textarea rows="9" cols="80" v-model="description" :rules="descriptionRules" class="form-control"></textarea>
        <div v-if="descriptionError" class="error">{{ descriptionError }}</div>

        <label class="label">Location</label>
        <input type="text" v-model="location" :rules="locationRules" class="form-control">
        <div v-if="locationError" class="error">{{ locationError }}</div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: null,
      description: '',
      location: '',
      imageError: '',
      descriptionError: '',
      locationError: ''
    }
  },
  methods: {
    handleFileUpload(event) {
      this.image = event.target.files[0]
    },
    submitForm() {
      if (this.validateForm()) {
        // Handle form submission
      }
    },
    validateForm() {
      let isValid = true
      if (!this.image) {
        this.imageError = 'Please upload an image'
        isValid = false
      }
      if (!this.description) {
        this.descriptionError = 'Please enter a description'
        isValid = false
      }
      if (!this.location) {
        this.locationError = 'Please enter a location'
        isValid = false
      }
      return isValid
    }
  }
}
</script> -->



   
  <style>
.background {
  background-image: url('@/assets/forest3.jpg');
  background-size: cover; /* Ensure the image covers the entire background */
  background-position: center; /* Center the background image */
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  width: 100%;
  max-width: 60rem;
  height: auto; /* Adjust height based on content */
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
  margin: 30px;
}

  
  .form-control {
    width: 100%;
    padding: 15px;
    margin-top: 20px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .btn {
    background-color: #007bff;
    color: white;
    margin: 30px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  h3{
    text-align: center;
    /* text-decoration: underline; */
    color: black;
    margin-bottom: 20px;
}
.label{
    float: left;
  width: 150px; /* Adjust the width as needed */
  margin-right: 20px; /* Add margin for spacing between labels */
  margin-top: 8px;
  font-weight: bold;
}
h1{
    margin-top: 10px;
}
.uploaded-file {
  display: flex;
  
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
  width:160px;
  
}

.uploaded-file span {
  flex: 1;
 
}

.uploaded-file v-icon {
  cursor: pointer;
}
  </style>
  