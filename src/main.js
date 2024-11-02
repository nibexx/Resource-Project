import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router.js';
import store from './store.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { MotionPlugin } from '@vueuse/motion';
import ProfileCardView from './components/ProfileCardView.vue';
import FooterPage from './components/FooterPage.vue';
import HeaderPage from './components/HeaderPage.vue';
import LocationManager from './components/LocationManager.vue';
// import VueGoogleMaps from '@fawmi/vue-google-maps';

loadFonts();

const app = createApp(App);
app.component('ProfileCardView-page', ProfileCardView);
app.component('footer-page', FooterPage);
app.component('header-page', HeaderPage);
app.component('location-manager', LocationManager);
app.use(vuetify);
app.use(router);
app.use(store);
app.use(MotionPlugin);
app.mount('#app');


// const app = createApp(App)
//   app.use(vuetify);
//   app.use(router);
//   app.use(VueGoogleMaps, {
//     load: {
//       key: 'AIzaSyAXgJylB1VcUsGMEBFxgxaR02NPxWOUp08'
//     }
//     });
//   app.mount('#app');

