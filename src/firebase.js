// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFireStore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcZtUwQnPLY715s90c9pG__tbq3dh7uAM",
  authDomain: "tummy-tracker-c3c0f.firebaseapp.com",
  projectId: "tummy-tracker-c3c0f",
  storageBucket: "tummy-tracker-c3c0f.firebasestorage.app",
  messagingSenderId: "137224100566",
  appId: "1:137224100566:web:32a24d413fd985fac84777"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);