import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBfkn6k3gAIIO5w91WxxrwXCHrqHop8bIk",
    authDomain: "clone-ey1.firebaseapp.com",
    projectId: "clone-ey1",
    storageBucket: "clone-ey1.appspot.com",
    messagingSenderId: "252861274077",
    appId: "1:252861274077:web:46984115dc9d676f734834",
    measurementId: "G-ZJ0KXT6ETF"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();