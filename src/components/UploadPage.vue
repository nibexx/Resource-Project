<template>
  <div class="background">
    <div class="card">
      <h3>
        Upload Form
        <!-- Earth icon as a link to the homepage -->
        <router-link to="/" class="earth-icon">
          <v-icon>mdi-earth</v-icon>
        </router-link>
      </h3>
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
  fileName: ''
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
      formData.append('imageFile', state.image);

      const response = await axios.post('http://192.168.1.6:8080/GreenGuard/save', formData);

      if (response.status >= 200 || response.status < 300) {
        console.log('Response:', response.data);
        alert('Form submitted successfully!');
        Object.assign(state, initialState); // Reset the state to initial values
        v$.value.$reset(); // Reset validations
      }
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

<style>
.background {
  background-image: url('@/assets/forest3.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  width: 100%;
  max-width: 60rem;
  height: auto;
  border-radius: 16px;
  box-shadow: 8px 8px 8px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
  margin: 30px;
}

h3 {
  text-align: center;
  color: black;
  margin-bottom: 20px;
}

.earth-icon {
  cursor: pointer;
  font-size: 24px;
  float: right;
  margin-top: -6px;
  color: inherit;
  text-decoration: none;
}
</style>
