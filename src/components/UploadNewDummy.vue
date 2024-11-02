<template>
  <div class="background">
    <div v-if="!isFlag" class="card">
      <h3 style="color: white;">Upload Form</h3>
      <form>
        <v-text-field
          v-model="state.name"
          :counter="10"
          :error-messages="v$.name.$errors.map(e => e.$message)"
          placeholder='Name'
          
          required
          @blur="v$.name.$touch"
          @input="v$.name.$touch"
          
        ></v-text-field>
        <v-text-field
          v-model="state.email"
          :counter="10"
          :error-messages="v$.email.$errors.map(e => e.$message)"
          placeholder='Email'
          
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
        <div>
          <!-- Conditionally display the 'Add Location' button -->
          <v-btn v-if="!locationAdded" class="me-4 mb-4" @click="addLocation" >
            Add Location
          </v-btn>
          <span v-if="locationAdded" class="success-message">
            <v-icon>mdi-check-circle</v-icon> <h6>Location Added Successfully</h6>
            <v-btn class="change-location-btn" text small @click="addLocation" >
              Change Location
            </v-btn>
          </span>
        </div>
        <v-file-input
          v-model="state.images"
          label="Image Upload"
          prepend-icon="mdi-camera"
          variant="filled"
          multiple
          :disabled="!locationAdded"
          @change="handleFileUpload"
          required
          ref="uploadBtn"
        ></v-file-input>
        <p v-if="state.fileNames.length">Selected Files: {{ state.fileNames.join(', ') }}</p>
        <v-btn class="me-4" @click="clear" style="background-color: darkgreen; color: white; margin-top: 20px; margin-left: 640px;">
          Clear All
        </v-btn>
        <v-btn class="me-4" @click="validateAndSubmit" style="background-color: darkgreen; color: white; margin-top: 20px; ">
          Submit
        </v-btn>
        <!-- Success message popup -->
        <v-dialog v-model="showSuccessPopup" max-width="290">
          <v-card>
            <v-card-title class="headline">Success</v-card-title>
            <v-card-text>Your form has been submitted successfully!</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="showSuccessPopup = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </form>
    </div>
    <location-manager v-else @back="handleBack"></location-manager>
  </div>

</template>

<script>
import LocationManager from './LocationManager.vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import axios from 'axios'

export default {
  components: {
    LocationManager
  },
  data() {
    return {
      state: {
        name: '',
        category: '',
        description: '',
        email: '',
        select: null,
        images: [],
        fileNames: [],
        latitude: '',
        longitude: '',
        isFlag: false,
        locationAdded: false
      },
      items: [
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
      ],
      categories: [
        "Pond",
        "Tree",
        "Canal",
        "River",
        "Lake",
        "Soil",
        "Garden",
        "Plantation",
        "Paddy Field"
      ],
      v$: null,
      showSuccessPopup: false // New state for success popup
    }
  },
  computed: {
    isFlag() {
      return this.state.isFlag
    },
    locationAdded() {
      return this.state.locationAdded
    }
  },
  methods: {
    handleFileUpload(event) {
      this.state.images = Array.from(event.target.files)
      this.state.fileNames = this.state.images.map(file => file.name)
    },
    async validateAndSubmit() {
      this.v$.$validate()
      if (!this.v$.$pending && !this.v$.$invalid) {
        console.log('Form submitted successfully!')

        try {
          const formData = new FormData()
          formData.append('saverName', this.state.name)
          formData.append('email', this.state.email)
          formData.append('category', this.state.category)
          formData.append('description', this.state.description)
          formData.append('district', this.state.select)
          formData.append('latitude', this.state.latitude)
          formData.append('longitude', this.state.longitude)
          this.state.images.forEach(image => {
            formData.append('imageFile', image)
          })

          for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1])
          }

          const response = await axios.post('http://192.168.1.31:8080/GreenGuard/save', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })

          if (response.status >= 200 && response.status < 300) {
            console.log('Response:', response.data)
            this.showSuccessPopup = true // Show success popup
            Object.assign(this.state, {
              name: '',
              category: '',
              description: '',
              email: '',
              select: null,
              images: [],
              fileNames: [],
              latitude: '',
              longitude: '',
              isFlag: false,
              locationAdded: false
            })
            this.v$.$reset()
            this.$router.push('/profile-page')
          }
        } catch (error) {
          console.error('Error submitting form:', error)
          if (error.response) {
            console.error('Response data:', error.response.data)
            console.error('Response status:', error.response.status)
            console.error('Response headers:', error.response.headers)
          }
          alert('Error submitting form: ' + error.message)
        }
      }
    },
    clear() {
      this.v$.$reset()
      Object.assign(this.state, {
        name: '',
        category: '',
        description: '',
        email: '',
        select: null,
        images: [],
        fileNames: [],
        latitude: '',
        longitude: '',
        isFlag: false,
        locationAdded: false
      })
    },
    addLocation() {
      this.state.isFlag = true
    },
    handleBack(location) {
      this.state.isFlag = false
      this.state.latitude = location.lat
      this.state.longitude = location.lng
      this.state.locationAdded = true
      this.$nextTick(() => {
        this.$refs.uploadBtn.$el.focus()
      })
      console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`)
    }
  },
  created() {
    this.v$ = useVuelidate({
      name: { required },
      description: { required },
      email: { required },
      select: { required },
      category: { required },
      images: { required }
    }, this.state)
  }
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #3d523f;
  margin: 30px;
  color: white;
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

.uploaded-file {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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
}

.success-message {
  display: flex;
  align-items: center;
  color: greenyellow;
  font-size: 14px;
  margin: 10px 0;
}

.success-message v-icon {
  margin-right: 8px;
}

.change-location-btn {
  color: blue;
  margin-left: 10px;
}
</style>
