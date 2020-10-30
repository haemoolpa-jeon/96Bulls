//Firebase Configuration file for DB connection and AUTH

//import firebase related
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// FIREBASE SETTING
const firebaseConfig = {
  apiKey: "AIzaSyAkparbwtS5hoKujhbdP5k0B2_UzdlNZ9U",
  authDomain: "altis-academia.firebaseapp.com",
  databaseURL: "https://altis-academia.firebaseio.com",
  projectId: "altis-academia",
  storageBucket: "altis-academia.appspot.com",
  messagingSenderId: "509211971530",
  appId: "1:509211971530:web:aaa132bdf5537bda4bc933",
  measurementId: "G-PWWYPWK69C"
};
firebase.initializeApp(firebaseConfig);

export default firebase;