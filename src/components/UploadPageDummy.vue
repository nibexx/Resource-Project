<template>
  <div class="background">
    <keep-alive>
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
          :error-messages="v$.email.$errors.map(e => e.$message)"
          label="Email"
          required
          @blur="v$.email.$touch"
          @input="v$.email.$touch"
        ></v-text-field>
        <v-select
          v-model="state.category"
          :error-messages="v$.category.$errors.map(e => e.$message)"
          :items="categories"
          label="Select Category"
          required
          @blur="v$.category.$touch"
          @change="v$.category.$touch"
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

        <v-text-field
            label="Select Location"
            prepend-icon="mdi-map-marker"
            :value="locationText"
            @click="navigateToMapPage"
            readonly
          ></v-text-field>
          <!-- <v-text-field label="Select Location" v-model="location" readonly prepend-icon="mdi-map-marker"></v-text-field> -->
        <!-- <v-text-field label="Select Location" prepend-icon="mdi-map-marker"></v-text-field> -->
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
          v-model="state.images"
          label="Image Upload"
          prepend-icon="mdi-camera"
          variant="filled"
          multiple
          @change="handleFileUpload"
          required
        ></v-file-input>
        <p v-if="state.fileNames.length">Selected Files: {{ state.fileNames.join(', ') }}</p>
  
        <v-btn class="me-4" @click="validateAndSubmit">
          Submit
        </v-btn>
        <v-btn @click="clear">
          Clear All
        </v-btn>
      </form>
    </div>
  </keep-alive>

  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const initialState = {
  name: '',
  category: '',
  description: '',
  email: '',
  select: null,
  images: [],
  fileNames: [] // Store file names
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
  email: { required },
  select: { required },
  category: { required },
  images: { required }
}

const v$ = useVuelidate(rules, state)

function handleFileUpload(event) {
  state.images = Array.from(event.target.files);
  state.fileNames = state.images.map(file => file.name);
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
      state.images.forEach(image => {
        formData.append('imageFile', image); // Append each image with the same key
      });

      // Log formData to see what is being sent
      for (var pair of formData.entries()) {
        console.log(pair[0]+ ': ' + pair[1]); 
      }

      const response = await axios.post('http://192.168.1.26:8080/GreenGuard/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status >= 200 && response.status < 300) {
        console.log('Response:', response.data);
        alert('Form submitted successfully!');
        Object.assign(state, initialState); // Reset the state to initial values
        v$.value.$reset(); // Reset validations
        router.push('/profile-page');
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
// const navigateToMapPage = () => {
//   router.push({ name: 'map-page' });
// };

// const locationText = computed(() => {
//   const lat = route.params.lat;
//   const lng = route.params.lng;
//   return lat && lng ? `Latitude: ${lat}, Longitude: ${lng}` : '';
// });

// onMounted(() => {
//   const lat = route.params.lat;
//   const lng = route.params.lng;
//   if (lat && lng) {
//     state.url = `Latitude: ${lat}, Longitude: ${lng}`;
//   }
// });
</script>


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

h3 {
  text-align: center;
  /* text-decoration: underline; */
  color: black;
  margin-bottom: 20px;
}
.label {
  float: left;
  width: 150px; /* Adjust the width as needed */
  margin-right: 20px; /* Add margin for spacing between labels */
  margin-top: 8px;
  font-weight: bold;
}
h1 {
  margin-top: 10px;
}
.uploaded-file {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  /* border: 1px solid #ccc; */
  padding: 5px;
  border-radius: 5px;
  width: 900px;
  
}

.uploaded-file span {
  flex: 1;
}

.uploaded-file v-icon {
  cursor: pointer;
}
.but {
  color: white;
  background-color: blue;
  padding: 7px;
  margin-left: 720px;
}
.disabled-button {
  background-color: grey !important;
}
</style> 
