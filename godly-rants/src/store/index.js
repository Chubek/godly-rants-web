import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { db } from '../firestore'


Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    siteTitle: "Godly Rants",
    userInfo: {
      displayName: null, 
      email: null      
    },
    currentUser: {
      displayName: null,
      role: null
    },
    registerWarning: null,
    warningVisible: false,

    loginWarning: null,
    loginWarningVisible: false,

  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.currentUser.displayName = user.displayName
      state.currentUser.role = user.role

    },

    REGISTER_WARNING(state, warning) {
      state.registerWarning = warning
      state.warningVisible = true
    },
    
    LOGIN(state, user) {
      state.currentUser.displayName = user.displayName
      state.currentUser.role = user.role
    },

    LOGIN_WARNING(state, warning) {
      state.loginWarning = warning
      state.loginWarningVisible = true
    }

 
  },
  actions: {
    
    addUser({commit}, user) {
      

      db.collection('users')
        .get()
          .then(snapshop => {
            snapshop.forEach(doc => {
              if (doc.data().displayName == user.displayName) {
                commit("RGISTER_WARNING", "This display name is already taken.")
              }
            })
          })
            .catch(e => console.log(e))

                         
                          
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .catch(e => {
              commit("REGISTER_WARNING", e.message)
              
            })

   },

   userLogin({commit}, user) {


    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .catch(e => commit("LOGIN_WARNING", e.message))


    db.collection("users").where("email", "==", user.email).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          commit("SET_CURRENT_USER", {
            displayName: doc.displayName,
            role: doc.role
          })
        })
      })
          .catch(e => {
            commit("LOGIN_WARNING", e.message)
          })


      


          
          
},


   


  },
  getters: {
    getUserName: state => {
      return state.currentUser.displayName
    },
    getUserRole: state => {
      return state.currentUser.role
    },
    getRegisterWarning: state => {
      return state.registerWarning
    },
    getWarningVisible: state => {
      return state.warningVisible
    },
    getLoginWarning: state => {
      return state.loginWarning
    },
    getLoginWarningVisible: state => {
      return state.loginWarningVisible
    }

  },
  modules: {
  }
})
