// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(app);