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

    comments: [{
      uid: null,
      parent_post_uid: null,
      submitter_name: null,
      submitter_uid: null,
      time: null,
      content: null      
    }],

    childComments: [{
      uid: null,
      parent_comment_uid: null,
      submitter_name: null,
      submitter_uid: null,
      time: null,
      content: null      
    }],
   
    rantParentComments: {
      rant_uid: null,
      rant_parent_comments: []
    },

    postChildrenComments: [{
      comment_uid: null,
      child_comments: []
    }],

   
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

    POST_COMMENT(state, comment) {
      state.comments.push({
      uid: comment.uid,
      parent_post_uid: comment.parent_post_uid,
      submitter_name: comment.submitter_name,
      submitter_uid: comment.submitter_uid,
      time: comment.time,
      content: comment.content
      })
    },

    POST_CHILD_COMMENT(state, comment) {
      state.childComments.push({
      uid: comment.uid,
      parent_comment_uid: comment.comment_post_uid,
      submitter_name: comment.submitter_name,
      submitter_uid: comment.submitter_uid,
      time: comment.time,
      content: comment.content
      })
    },

    LOAD_PARENT_COMMENTS(state, payload) {
      state.rantParentComments.rant_uid = payload.uid
      state.rantParentComments.rant_parent_comments = payload.comments
    },

    LOAD_CHILD_COMMENTS(state, payload) {
      state.postChildrenComments.push({
        comment_uid: payload.uid,
        child_comments: payload.comments
      })
    },

    
 
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
        db.collection("rants").doc(this.state.rant.uid).collection("comments").add(
          {            
            submitter_id: this.state.currentUser.uid,
            submitter_name: this.state.currentUser.displayName,
            time: comment.time,
            content: comment.content
          }
        )
          .then(res => {
            commit("POST_COMMENT", 
            {
              uid: res.id,
              parent_post_uid: this.state.rant.uid,
              submitter_id: this.state.currentUser.uid,
              submitter_name: this.state.currentUser.displayName,
              time: comment.time,
              content: comment.content
            })
          })
      },

      postChildComment({commit}, comment) {
        db.collection("rants").doc(this.state.rant.uid).collection("comments")
            .doc(comment.parent_comment_uid).collection("comments.children").add(
          {            
            submitter_id: this.state.currentUser.uid,
            submitter_name: this.state.currentUser.displayName,
            time: comment.time,
            content: comment.content,
            parent_comment_uid: comment.parent_comment_uid
          }
        )
          .then(res => {
            commit("POST_COMMENT", 
            {
              uid: res.id,
              parent_comment_uid: this.state.rant.uid,
              submitter_id: this.state.currentUser.uid,
              submitter_name: this.state.currentUser.displayName,
              time: comment.time,
              content: comment.content
            })
          })
      },
     
      loadRantParentComments({commit}, id) {        
        db.collection("rants").doc(id).collection('comments').get()
              .then(snapshot => {
                snapshot.forEach(doc => { 
                  let data = doc.data()
                  commit("POST_COMMENT", {
                    uid: doc.id,
                    parent_comment_uid: id,
                    submitter_id: data.submitter_uid,
                    submitter_name: data.submitter_name,
                    time: data.time,
                    content: data.content
                  })                 
                  
                  
                })
              }).catch(e => console.log(e))
              
           
      },

      loadChildComments({commit}, id) {
        let ret = []
        db.collection("rants").doc(this.state.rant.uid).collection("comments")
            .doc(id).collection("comments.children").get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  let data = doc.data()
                  ret.push({
                    uid: data.id,
                    parent_comment_uid: id,
                    submitter_name: data.submitter_name,
                    submitter_uid: data.submitter_uid,
                    time: data.time,
                    content: data.content    
                  })
                })
              })

              commit("LOAD_CHILD_COMMENTS", {
                uid: id,
                comments: ret
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
    },
    getRantParentComments: state => {
      return state.comments
    },
    getChildComments: state => {
      return state.postChildrenComments
    }
    

  },
  modules: {
  }
})

