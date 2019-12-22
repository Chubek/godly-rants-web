import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import 'firebase/firestore'
import { getImages } from './image_fetcher'
import RegisterView from './views/RegisterView.vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyAEswQtXp0xOBccjQXmfTXcc8excqnysdU",
      authDomain: "godly-rants.firebaseapp.com",
      databaseURL: "https://godly-rants.firebaseio.com",
      projectId: "godly-rants",
      storageBucket: "godly-rants.appspot.com",
      messagingSenderId: "733891230507",
      appId: "1:733891230507:web:e5980376aedc57283e636e",
      measurementId: "G-CEV15PZFPT"
  
    })
    
    let arr = getImages("I love my mom!")    
    console.log(arr)
  },
  components: {
    RegisterView
  }
}).$mount('#app')
