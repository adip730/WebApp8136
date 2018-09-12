// Initialize Firebase
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

require("firebase/firestore");
require("firebase/auth");

firebase.initializeApp({
    apiKey: "AIzaSyD7H_fKhS1IRVscDY8A6P-RLNqFD8DTJW0",
    authDomain: "athlete-physics.firebaseapp.com",
    databaseURL: "https://athlete-physics.firebaseio.com",
    projectId: "athlete-physics",
    storageBucket: "athlete-physics.appspot.com",
    messagingSenderId: "224232150692"
});

const db = firebase.firestore();
const auth = firebase.auth();

export default firebase;

export {
  auth,
  db
}
