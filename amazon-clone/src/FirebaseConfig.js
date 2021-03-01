import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBk7PO7ruaEQ8NRcmHoOslhbmkexGXJiQk",
    authDomain: "ey1-f69b8.firebaseapp.com",
    projectId: "ey1-f69b8",
    storageBucket: "ey1-f69b8.appspot.com",
    messagingSenderId: "332302051403",
    appId: "1:332302051403:web:5be0cebac174a7fdc2c5ce",
    measurementId: "G-HKHLZKP41P"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };