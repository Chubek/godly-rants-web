import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    siteTitle: "Godly Rants",
    userInfo: {
      displayName: null, 
      email: null      
    },
  },
  mutations: {
    ADD_USER(state, user) {
      state.userInfo.displayName = user.displayName
      state.userInfo.email = user.email      

    }
  },
  actions: {
    addUser({commit}, user) {
      commit("ADD_USER", {displayName: user.displayName,
                          email: user.email})

                          
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .catch(e => console.log(e))
    }
  },
  modules: {
  }
})
