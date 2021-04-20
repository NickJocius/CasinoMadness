import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBkBeaM-bYxqDI7RuHa0Nai-ooINnWuDKs",
    authDomain: "casino-madness.firebaseapp.com",
    projectId: "casino-madness",
    storageBucket: "casino-madness.appspot.com",
    messagingSenderId: "647703826130",
    appId: "1:647703826130:web:8c179c362ff2227cffe70b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export auth
export const auth = firebase.default.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();