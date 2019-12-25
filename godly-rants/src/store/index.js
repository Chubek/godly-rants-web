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
      uid: null,
      email: null      
    },
    userBio: null,
    currentUser: {
      displayName: null,
      role: null
    },
    registerWarning: null,
    warningVisible: false,

    loginWarning: null,
    loginWarningVisible: false,

    userLoggedIn: false,

    rants: {
      uid: null,
      submitter: null,
      time: null,
      title: null,
      content: null
    }

  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.currentUser.displayName = user.displayName
      state.currentUser.uid = user.uid
      state.currentUser.role = user.role
      state.userLoggedIn = true

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
    },

    SET_USER_BIO(state, bio) {
      state.userBio = bio
    }

 
  },
  actions: {
    
    addUser({commit}, user) {
      
      let userExists = false
      db.collection('users').where("displayName", "==", user.displayName).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.data().displayName == user.displayName) {
              
              userExists = true

              console.log(userExists)
            }
          })
        })

        if (userExists) {
          db.collection('users').add({
            displayName: user.displayName,
            email: user.email,
            role: "Regular"
          })
            .then(ref => console.log(`Document written with id: ${ref.id}`))
              .catch(e => commit("REGISTER_WARNING", e.message))
        } else {
          commit("REGISTER_WARNING", "This username already exists.")
        }
        
            


         

           

                         
                          
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .catch(e => {
              commit("REGISTER_WARNING", e.message)
              
            })

   },

   userLogin({commit}, user) {


    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        
        db.collection("users").where("email", "==", user.email).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let userData = doc.data()
          let id = doc.id
          commit("SET_CURRENT_USER", {
            displayName: userData.displayName,
            uid: id,
            role: userData.role
          })
        })
      
   
      })
          .catch(e => {
            commit("LOGIN_WARNING", e.message)
          })

    .catch(e => commit("LOGIN_WARNING", e.message))
      })
        .catch(e => commit("LOGIN_WARNING", e.message))


    


    


      


          
          
},

  reLogin() {

    let userEmail

    firebase.auth().onAuthStateChanged(user => {
        userEmail = user.email
        db.collection('users').where("email", "==", userEmail).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            console.log(userEmail)
            let data = doc.data()
            let id = doc.id
            this.commit("SET_CURRENT_USER", {
              displayName: data.displayName,
              erole: data.role,
              uid: id
            })
          })
        })
        
    })

 



  },

  setUserBio({commit}, bio) {
    commit("SET_USER_BIO", bio)
  }


   


  },
  getters: {
    getUserName: state => {
      return state.currentUser.displayName
    },
    getUserUID: state => {
      return state.currentUser.uid
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
    },
    getUserLoggedIn: state => {
      return state.userLoggedIn
    },
    getUserBio: state => {
      return state.userBio
    }

  },
  modules: {
  }
})

