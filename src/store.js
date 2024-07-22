import {createStore} from 'vuex';
const store = createStore({
    state() {
        return {
          user: {
            id: null,
            name: '',
            email: '',
        
           
          },
          isAuthenticated: false,
          lat : '',
          lng : '',
          isFlag : false,
        }
    },
    mutations: {
        setId(state, payload){
            state.user.id = payload;    
         },
         setName(state, payload) {
          state.user.name = payload;    
       },
       setEmail(state, payload) {
        state.user.email = payload;    
     },
     setAuthenticated(state, payload) {
      state.isAuthenticated = payload;    
   },
   setLatitude(state, payload){
    state.lat = payload;
   },
   setLongitude(state, payload){
    state.lng = payload;
   },
   setFlag(state, payload) {
    state.isFlag = payload;    
 },

    },
    getters: {
        getId(state) {
            return state.user.id;
          },
          getName(state) {
            return state.user.name ;
          },
          getEmail(state) {
            return state.user.email;
          },
          getAuthenticated(state) {
            return state.isAuthenticated;
          },
          getLatitude(state) {
            return state.lat;
          },
          getLongitude(state) {
            return state.lng;
          },
          getFlag(state) {
            return state.isFlag;
          },


    }

    })
    export default store;