// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAmGp3aRhMeGX1QDCjQDA8vYaGQpAbNkQ",
  authDomain: "testf1-b1c52.firebaseapp.com",
  projectId: "testf1-b1c52",
  storageBucket: "testf1-b1c52.firebasestorage.app",
  messagingSenderId: "411384242736",
  appId: "1:411384242736:web:05ed43c96341f9400e03f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);