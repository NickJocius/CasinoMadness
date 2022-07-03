// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkBeaM-bYxqDI7RuHa0Nai-ooINnWuDKs",
    authDomain: "casino-madness.firebaseapp.com",
    projectId: "casino-madness",
    storageBucket: "casino-madness.appspot.com",
    messagingSenderId: "647703826130",
    appId: "1:647703826130:web:8c179c362ff2227cffe70b"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);