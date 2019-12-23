import firebase from 'firebase'
import 'firebase/firestore'

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

  const db = firebase.firestore()

  export {db}