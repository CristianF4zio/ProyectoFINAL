import { collection, doc,  getDoc,  getDocs,  query,  setDoc, where } from "@firebase/firestore";
import {   auth, database, storage} from "./firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import User from "../Class/User";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
export async function signUp(user :User, n:  File ) {
    try {
        // Registra al usuario en Firebase Authentication
        const emailAlreadyRegistered = await isEmailRegistered(user.getEmail());
        if (emailAlreadyRegistered) {
            return null;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, user.getEmail(),user.getPassword());
        
        // Obtén el ID único del usuario creado
        const userId = userCredential.user?.uid;

        if (!userId) {
            throw new Error("No se pudo obtener el ID del usuario");
        }

        // Agrega los datos del usuario a la colección "users" en Firestore
        await setDoc(doc(collection(database, 'users'), userId), {
            email: user.getEmail(),
            name: user.getName(),
            member: user.getMember(),
            iconref: n.name

            // Puedes agregar más datos del usuario aquí si es necesario
        });
        uploadImageAndSaveReference(userId, n);
        // Devuelve el ID del usuario creado
        return userId;
    } catch (error) {
    if (error instanceof Error) {
            throw new Error("Error al registrar usuario: " + error.message);
        }
    }
}
async function uploadImageAndSaveReference(userId: string, file: File | null) {
    if (!file) {
        console.error("No se proporcionó ningún archivo");
        return;
    }
    try {
        // Sube la imagen a Firebase Storage
        const storageRef = ref(storage, `images/${userId}/${file.name}`);
        await uploadBytes(storageRef, file);
        console.log("Imagen subida a Firebase Storage");

        // Obtiene la URL de descarga de la imagen
        const imageUrl = await getDownloadURL(storageRef);

        // Guarda la referencia de la imagen en Firestore
        await setDoc(doc(database, 'users', userId), {
            profileImage: imageUrl
        }, { merge: true }); // Utiliza merge: true para fusionar los datos con los existentes
        console.log("Imagen subida y referencia guardada en Firestore");
    } catch (error) {
        console.error("Error al subir la imagen y guardar la referencia:", error);
    }
}

export async function signInWithEmailAndPasswordAndFetchUserData(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); // Autenticar al usuario
  
      // Una vez autenticado, obtener el ID del usuario
      const userId = userCredential.user.uid;
  
      // Consultar Firestore para obtener los datos del usuario utilizando el ID
      const userDocRef = doc(database, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        console.log("hola")
        const userData = userDocSnap.data();
        console.log(userData)
       
        const imageUrl = await getImageUrl(userId, userData.iconref);
        if (imageUrl) {
            const user = new User(userData.name, userData.email, password, imageUrl, userData.member);
     
        
        

        return user;}
      } else {
        console.log("hola")
        console.log("El usuario no tiene datos asociados en Firestore");
        return null;
      }
    } catch (error) {
      console.error("Error al autenticar al usuario:", error);
      throw new Error("Error al autenticar al usuario");

   
    }
  }
  async function getImageUrl(userId: string, fileName: string): Promise<string | null> {
    try {
        // Obtén la referencia de la imagen en Firebase Storage
        const storageRef = ref(storage, `images/${userId}/${fileName}`);

        // Obtiene la URL de descarga de la imagen
        const imageUrl = await getDownloadURL(storageRef);
  

        return imageUrl; // Devuelve la URL de descarga de la imagen
    } catch (error) {
        console.error("Error al obtener la URL de la imagen:", error);
        return null; // Devuelve null en caso de error
    }
}

async function isEmailRegistered(email: string): Promise<boolean> {
    // Crea una referencia a la colección "users"
    const usersRef = collection(database, "users");

    // Crea una consulta para buscar documentos con el email dado
    const q = query(usersRef, where("email", "==", email));

    // Ejecuta la consulta y obtiene los resultados
    const querySnapshot = await getDocs(q);

    // Verifica si se encontraron documentos con el email dado
    return !querySnapshot.empty;
}