<template>
        <!-- Header Component -->
        <nav class="navBar">
      <h5 class="nav-heading">Natural</h5>
      <div class="nav-buttons">
        <button class="white-border" @click="toSign">Sign Up</button>
        <button class="white-border" @click="toLogin">Login</button>
      </div>
    </nav>
</template>

<script>
export default {

  data() {
    return {

    };
},
    methods:{
        toSign() {
      console.log("Sign Up clicked");
    },
    toLogin() {
      console.log("Login clicked");
    },
    }
 
}
</script>

<style scoped>
/* Header Styles */
.navBar {
  width: 100%;
  background-color:black;
  /* background-color: #25383c; */
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  position: relative; /* Ensure position relative for absolute positioning of filters */
}
.nav-heading {
  margin: 0;
  font-size: 2rem;
  text-transform: uppercase;
}
.nav-buttons {
  display: flex;
  gap: 10px;
}
.white-border {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
  padding: 10px 30px;
  margin: 0 15px;
  font-size: 1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.white-border:hover {
  background-color: #fff;
  color: #111;
}
</style>