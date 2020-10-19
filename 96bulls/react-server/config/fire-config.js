import firebase from 'firebase';
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
try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}
const fire = firebase;
export default fire;