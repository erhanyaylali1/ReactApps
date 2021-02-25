import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDeSatpWwjIROkDmxhGvO6a1aX_sdrAfYw",
    authDomain: "slack-clone-ey1.firebaseapp.com",
    projectId: "slack-clone-ey1",
    storageBucket: "slack-clone-ey1.appspot.com",
    messagingSenderId: "1087983152683",
    appId: "1:1087983152683:web:815d586da9cbe08e64046e",
    measurementId: "G-0X5KJ0VX13"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };