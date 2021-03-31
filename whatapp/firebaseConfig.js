import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDZXxhBZPqMDzbRF0uuKlExxM9a7KjEgcA",
    authDomain: "whatsapp-web-1.firebaseapp.com",
    projectId: "whatsapp-web-1",
    storageBucket: "whatsapp-web-1.appspot.com",
    messagingSenderId: "1074945620544",
    appId: "1:1074945620544:web:b51109e019521dec2ffda5",
    measurementId: "G-TTK29NBPGW"
};

const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig)
export const db = app.firestore()
export const auth = app.auth()
export const provider = new firebase.auth.GoogleAuthProvider()
