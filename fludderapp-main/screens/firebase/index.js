import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Replace this with your Firebase SDK config snippet
const firebaseConfig = {
    apiKey: "AIzaSyAehXzPC8ODTaJfi2JtJY-6uiARkM-_BPs",
    authDomain: "fludder-ece67.firebaseapp.com",
    projectId: "fludder-ece67",
    storageBucket: "fludder-ece67.appspot.com",
    messagingSenderId: "415288817533",
    appId: "1:415288817533:web:7cc3b5815bbd37665a7e14",
    measurementId: "G-HNQNE3RMJ7"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };