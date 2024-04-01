// Importa las funciones necesarias de los SDKs que necesitas
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "@firebase/storage";

// Configuración de tu aplicación Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDighVIThlurlZJXV5sQ97bvPrBsCTpwxk",
  authDomain: "proyectofinalsdi.firebaseapp.com",
  projectId: "proyectofinalsdi",
  storageBucket: "proyectofinalsdi.appspot.com",
  messagingSenderId: "1078514805162",
  appId: "1:1078514805162:web:32366cc928aeea7370e3d3",
  measurementId: "G-XN9ENS7RPN"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getFirestore(app);
export const storage = getStorage(app);
