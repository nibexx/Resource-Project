// import { createRouter, createWebHistory } from 'vue-router';
// // import store from './store'; // Import the Vuex store

// const routes = [
//   {
//     path: '/',
//     component: () => import('./components/HomePage.vue'),
//   },
//   {
//     path: '/profile-page',
//     component: () => import('./components/ProfilePage.vue'),
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/display-resources',
//     component: () => import('./components/DisplayPage.vue'),
//     // meta: { requiresAuth: true },
//   },
//   {
//     path: '/dummy',
//     component: () => import('./components/DummyPage.vue'),
//     // meta: { requiresAuth: true },
//   },
//   {
//     path: '/file-upload',
//     component: () => import('./components/UploadPage.vue'),
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/login-page',
//     component: () => import('./components/LoginPage.vue'),
//   },
//   {
//     path: '/signup-page',
//     component: () => import('./components/SignupPage.vue'),
//   },
//   {
//     path: '/edit-page',
//     component: () => import('./components/EditPage.vue'),
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/map-page',
//     component: () => import('./components/MapPage.vue'),
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/terms-conditions',
//     component: () => import('./components/TermsAndConditions.vue'),
//   },
//   {
//     path: '/delete-acc',
//     component: () => import('./components/AccountDeleted.vue'),
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/upload-dummy',
//     component: () => import('./components/UploadPageDummy.vue'),
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/new-user',
//     component: () => import('./components/NewUser.vue'),
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/:pathMatch(.*)',
//     component: () => import('./components/ErrorPage.vue'),
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.getters.getAuthenticated) {
//       next({ path: '/' }); // Redirect to home page if not authenticated
//     } else {
//       next(); // Proceed to the route
//     }
//   } else {
//     next(); // Proceed to the route if no authentication is required
//   }
// });

// export default router;


import { createRouter, createWebHistory } from 'vue-router';
// import LocationManager from './components/LocationManager.vue';

const routes = [
  
  {
    path: '/',
    component: () => import('./components/HomePage.vue')
  },
  {
    path: '/profile-page',
    component: () => import('./components/ProfilePage.vue')
  },
  {
    path: '/display-page',
    component: () => import('./components/DisplayPage.vue')
  },
  {
    path: '/dummy',
    component: () => import('./components/DummyPage.vue')
  },
  {
    path: '/file-upload',
    component: () => import('./components/UploadPage.vue')
  },
  {
    path: '/login-page',
    component: () => import('./components/LoginPage.vue')
  },
  {
    path: '/signup-page',
    component: () => import('./components/SignupPage.vue')
  },
  {
    path: '/edit-page',
    component: () => import('./components/EditPage.vue')
  
  },

    {       path: '/locations',
      component: () => import('./components/AllLocations.vue'),
   },
  {
    path: '/map-page',
 
        component: () => import('./components/MapPage.vue'),

  },

  {
    path: '/upload-new',
  
    component: () => import('./components/UploadNewDummy.vue')
  },

  {
    path: '/card-view',
    component: () => import('./components/ProfileCardView.vue')
  },
  {
    path: '/explore',
 
        component: () => import('./components/ExplorePage.vue'),

  },
  

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;


// import { createRouter, createWebHistory } from 'vue-router';

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     {
//       path: '/',
//       component: () => import('./components/HomePage.vue'),
//     },
//     {
//       path: '/profile-page',
//       component: () => import('./components/ProfilePage.vue'),
//     },
//     {
//       path: '/display-resorces',
//       component: () => import('./components/DisplayPage.vue'),
//     },
//     {
//       path: '/dummy',
//       component: () => import('./components/DummyPage.vue'),
//     },
//     // {
//     //   path: '/dummy2',
//     //   component: () => import('./components/Dummy2Page.vue'),
//     // },
//     {
//       path: '/file-upload',
//       component: () => import('./components/UploadPage.vue'),
//     },
//     {
//       path: '/login-page',
//       component: () => import('./components/LoginPage.vue'),
//     },
//     {
//       path: '/signup-page',
//       component: () => import('./components/SignupPage.vue'),
//     },
//     {
//       path: '/edit-page',
//       component: () => import('./components/EditPage.vue'),
//     },
//     {
//       path: '/map-page',
//       name: 'map-page',
//       component: () => import('./components/MapPage.vue'),
//     },
//     {
//       path: '/terms-conditions',
//       component: () => import('./components/TermsAndConditions.vue'),
//     },
//     {
//       path: '/:pathMatch(.*)',
//       component: () => import('./components/ErrorPage.vue'),
//     },
//     {
//       path: '/delete-acc',
//       component: () => import('./components/AccountDeleted.vue'),
//     },
//     {
//       path: '/upload-dummy',
//       name: 'upload-dummy',
//       component: () => import('./components/UploadPageDummy.vue'),
//     },
//     {
//       path: '/new-user',
//       component: () => import('./components/NewUser.vue'),
//     },

//   ]
// });

// export default router;


