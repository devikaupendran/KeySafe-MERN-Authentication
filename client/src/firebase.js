// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "keysafe-9ab4c.firebaseapp.com",
    projectId: "keysafe-9ab4c",
    storageBucket: "keysafe-9ab4c.firebasestorage.app",
    messagingSenderId: "848984010172",
    appId: "1:848984010172:web:b43fea765a44409cd30fb9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);