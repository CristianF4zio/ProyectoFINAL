// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDighVIThlurlZJXV5sQ97bvPrBsCTpwxk",
  authDomain: "proyectofinalsdi.firebaseapp.com",
  projectId: "proyectofinalsdi",
  storageBucket: "proyectofinalsdi.appspot.com",
  messagingSenderId: "1078514805162",
  appId: "1:1078514805162:web:32366cc928aeea7370e3d3",
  measurementId: "G-XN9ENS7RPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getFirestore(app);
export const storage = getStorage(app);





