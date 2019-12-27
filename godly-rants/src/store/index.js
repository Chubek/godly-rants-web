import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { db } from '../firestore'


Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    siteTitle: "Godly Rants",
    currentUser: {
      displayName: null,
      role: null,
      bio: null
    },
    registerWarning: null,
    warningVisible: false,

    loginWarning: null,
    loginWarningVisible: false,

    userLoggedIn: false,

    rant: {
      uid: null,
      submitter_name: null,
      submitter_id: null,
      time: null,
      title: null,
      content: null,
      tags: []
    },

  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.currentUser.displayName = user.displayName
      state.currentUser.uid = user.uid
      state.currentUser.role = user.role
      state.currentUser.bio = user.bio
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
    SET_BIO(state, bio) {
      state.currentUser.bio = bio
    },

    POST_RANT(state, rant) {
      state.rant.uid = rant.uid
      state.rant.title = rant.title
      state.rant.content = rant.content
      state.rant.tags = rant.tags
      state.rant.time = rant.time
      state.rant.submitter_name = rant.submitter_name
      state.rant.submitter_id = rant.submitter_id
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
            role: userData.role,
            bio: userData.bio
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


      reLogin({commit}) {
        firebase.auth().onAuthStateChanged(user => {
          db.collection("users").where("email", "==", user.email)
              .get()
                   .then(snapshot => {
                     snapshot.forEach(doc => {
                       let data = doc.data(); 
                       let id = doc.id; 
                       commit("SET_CURRENT_USER", {
                         displayName: data.displayName, 
                         uid: id,
                          role: data.role, 
                          bio: data.bio})})})
        })
      },

      editBio({commit}, newBio) {
        commit("SET_BIO", newBio)
        db.collection("users").doc(this.state.currentUser.uid).update({
          "bio": newBio
        })
          .catch(e => console.log(e))
      },

      submitRant({commit}, rant) {
        db.collection("rants").add({
            title: rant.title,
            content: rant.content,
            time: rant.time,
            submitter_name: this.state.currentUser.uid,
            submitter_id: this.state.currentUser.uid,
            tags: rant.tags.split(",")

        })
          .then(res=> {
            commit("POST_RANT", {
              uid: res.id,
              title: rant.title,
              content: rant.content,
              time: rant.time,
              submitter_name: this.state.currentUser.uid,
              submitter_id: this.state.currentUser.uid,
              tags: rant.tags
            })
          })
              .catch(e => console.log(e))

      },

      loadRant({commit}, id) {
        db.collection('rants').doc(id).get()
          .then(doc => {
            console.log(doc)
            let data = doc.data()
            commit("POST_RANT", {
              uid: id,
              submitter_id: data.submitter_id,
              submitter_name: data.submitter_name,
              content: data.content,
              title: data.title,
              time: data.time,
              tags: data.tags.split(",")
            })
          })
          .catch(e => console.log(e)) 
            
          
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
      return state.currentUser.bio
    },
    getSingleRant: state => {
      return state.rant
    }

  },
  modules: {
  }
})

