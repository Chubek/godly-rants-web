import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { getImages } from './image_fetcher'
import RegisterView from './views/RegisterView.vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    
    
    let arr = getImages("I love my mom!")    
    console.log(arr)
  },
  components: {
    RegisterView
  }
}).$mount('#app')
