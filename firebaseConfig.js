// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-xA-9U0AOBWr0vLgJBT-SYf-rPxe-PBc",
  authDomain: "lab201-86579.firebaseapp.com",
  projectId: "lab201-86579",
  storageBucket: "lab201-86579.appspot.com",
  messagingSenderId: "875647575843",
  appId: "1:875647575843:web:865145a3f9862301a3ce96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(app);
export const db = getFirestore(app);