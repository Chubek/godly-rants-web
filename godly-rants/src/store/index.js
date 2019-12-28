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
      tags: [],
      image: null,
    },

    parentComment: {
      uid: null,
      parent_post_uid: null,
      submitter_name: null,
      submitter_uid: null,
      time: null,
      content: null,
    },
    childComment: {
      uid: null,
      parent_comment_uid: null,
      submitter_name: null,
      submitter_uid: null,
      time: null,
      content: null,
    }

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
      state.rant.image = rant.image
    }, 

    sOST_PARENT_COMMENT(state, comment) {
      state.comment.uid = comment.uid
      state.comment.parent_post_uid = comment.parent_post_uid
      state.comment.submitter_id = comment.submitter_id
      state.comment.submitter_name = comment.submitter_name
      state.comment.time = comment.time
      state.comment.content = comment.content
    },

    POST_CHILD_COMMENT(state, comment) {
      state.childComment.uid = comment.uid
      state.childComment.parent_comment_uid = comment.parent_comment_uid
      state.childComment.submitter_id = comment.submitter_id
      state.childComment.submitter_name = comment.submitter_name
      state.childComment.time = comment.time
      state.childComment.content = comment.content

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
            tags: rant.tags.split(","),
            image: rant.image

        })
          .then(res=> {
            commit("POST_RANT", {
              uid: res.id,
              title: rant.title,
              content: rant.content,
              time: rant.time,
              submitter_name: this.state.currentUser.uid,
              submitter_id: this.state.currentUser.uid,
              tags: rant.tags,
              image: rant.image
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
              tags: data.tags.split(","),
              image: data.image
            })
          })
          .catch(e => console.log(e)) 
            
          
      },

      postParentComment({commit}, comment) {
        db.collection("comments.parents").add(
          {
            parent_post_uid: comment.parent_post_uid,
            submitter_id: comment.submitter_uid,
            submitter_name: comment.submitter_name,
            time: comment.time,
            content: comment.content
          }
        )
          .then(res => {
            commit("POST_PARENT_COMMENT", 
            {
              uid: res.id,
              parent_post_uid: comment.parent_post_uid,
              submitter_id: comment.submitter_uid,
              submitter_name: comment.submitter_name,
              time: comment.time,
              content: comment.content
            })
          })
      },
      postChildComment({commit}, comment) {
        db.collection("comments.parents").add(
          {
            parent_comment_uid: comment.parent_comment_uid,
            submitter_id: comment.submitter_uid,
            submitter_name: comment.submitter_name,
            time: comment.time,
            content: comment.content
          }
        )
          .then(res => {
            commit("POST_PARENT_COMMENT", 
            {
              uid: res.id,
              parent_comment_uid: comment.parent_comment_uid,
              submitter_id: comment.submitter_uid,
              submitter_name: comment.submitter_name,
              time: comment.time,
              content: comment.content
            })
          })
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

