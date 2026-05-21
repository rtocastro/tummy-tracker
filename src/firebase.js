import { initializeApp } from "firebase/app";
import {
  getFirestore,
} from "firebase/firestore";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcZtUwQnPLY715s90c9pG__tbq3dh7uAM",
  authDomain: "tummy-tracker-c3c0f.firebaseapp.com",
  projectId: "tummy-tracker-c3c0f",
  storageBucket: "tummy-tracker-c3c0f.firebasestorage.app",
  messagingSenderId: "137224100566",
  appId: "1:137224100566:web:32a24d413fd985fac84777"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();