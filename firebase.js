// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHgNmgsNQiwr5GlqM0nZ_OJA6WYECDlW0",
  authDomain: "gold-4a1f9.firebaseapp.com",
  projectId: "gold-4a1f9",
  storageBucket: "gold-4a1f9.appspot.com",
  messagingSenderId: "1008818745546",
  appId: "1:1008818745546:web:8c61131544f84378730433",
  measurementId: "G-7PLHKM4CXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);