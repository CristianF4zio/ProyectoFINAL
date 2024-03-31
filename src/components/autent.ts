import { DocumentData, deleteDoc } from "@firebase/firestore";


import { addDoc, collection, doc,  getDoc,  getDocs,  orderBy,  query,  setDoc, updateDoc, where } from "@firebase/firestore";
import {   auth, database, storage} from "./firebase"
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateEmail, verifyBeforeUpdateEmail} from "firebase/auth";
import User from "../Class/User";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import Group from "../Class/Group";
import Admin from "../Class/Admin";
import Topic from "../Class/Topic";



export async function signUp(user: User, n: File): Promise<string | null> {
   
    try {
        // Verifica si el correo electrónico ya está registrado
        const emailAlreadyRegistered = await isEmailRegistered(user.getEmail());
        if (emailAlreadyRegistered) {
            return null;
        }

        // Registra al usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, user.getEmail(), user.getPassword());

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
            lastname: user.getLastName(),
            iconref: n.name
        });

        // Sube la imagen y guarda la referencia
        await uploadImageAndSaveReference(userId, n, '');
        const useraux = auth.currentUser;
        // Envía el correo de verificación
        if(useraux){
        await sendEmailVerification(useraux);
        console.log("entro")
        }
        // Devuelve el ID del usuario creado
        return userId;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw new Error("Error al registrar usuario.");
    }
}



async function uploadImageAndSaveReference(userId: string, file: File | null, groupID:string) {
    if (!file) {
        console.error("No se proporcionó ningún archivo");
        return;
    }
    try {
        // Sube la imagen a Firebase Storage
        if(userId){
            const storageRef = ref(storage, `images/${userId}/${file.name}`);
            await uploadBytes(storageRef, file);
            console.log("Entro en user")  
            const imageUrl = await getDownloadURL(storageRef);
            await setDoc(doc(database, 'users', userId), {
                profileImage: imageUrl
            }, { merge: true }); // Utiliza merge: true para fusionar los datos con los existentes}
        }
        if(groupID){
            console.log("Entro en grupo") 
            const storageRef = ref(storage, `images/${groupID}/${file.name}`);
            await uploadBytes(storageRef, file); 
            const imageUrl = await getDownloadURL(storageRef);
            await setDoc(doc(database, 'groups', groupID), {
                profileImage: imageUrl
            }, { merge: true }); // Utiliza merge: true para fusionar los datos con los existentes
    
        
        }

       
      
        console.log("Imagen subida a Firebase Storage");

        // Obtiene la URL de descarga de la imagen
    

        
        // Guarda la referencia de la imagen en Firestore
    
            console.log("Imagen subida y referencia guardada en Firestore");
    } catch (error) {
        console.error("Error al subir la imagen y guardar la referencia:", error);
    }
}

export async function signInWithEmailAndPasswordAndFetchUserData(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); // Autenticar al usuario
      if (!userCredential) {
        return false;
    }
    if (userCredential.user) {
        await userCredential.user.reload(); // Actualiza los datos del usuario para obtener la información más reciente
        userCredential.user.emailVerified;
    }

    if (!userCredential.user.emailVerified) {

  
        return  ["El correo electrónico no está verificado, por favor ingresar a su correo y validarlo",false]}
      // Una vez autenticado, obtener el ID del usuario
      const userId = userCredential.user.uid;
  
      // Consultar Firestore para obtener los datos del usuario utilizando el ID
      const userDocRef = doc(database, "users", userId);
      const adminDocRef= doc(database, "admins", userId);
      const adminDocSnap = await getDoc(adminDocRef);
      const userDocSnap = await getDoc(userDocRef);

      if(adminDocSnap.exists()){
        console.log("hola aparecio admin")
        const userData = adminDocSnap.data();
        const admin = new Admin(userData.email, password);
        return [admin,true];}
        
      if (userDocSnap.exists()) {
        console.log("hola")
        const userData = userDocSnap.data();
        console.log(userData)
       
        const imageUrl = await getImageUrl(userId, userData.iconref);
        if (imageUrl) {
            const user = new User(userData.name, userData.lastname ,userData.email, password, imageUrl, userData.member);
     
        
        

        return [user,true];}
      } else {
        console.log("hola")
        console.log("El usuario no tiene datos asociados en Firestore");
        return ["El usuario no tiene datos asociados en Firestore",false];
      }
    } catch (error) {
      console.error("Error al autenticar al usuario:", error);
      return ["El usuario no tiene datos asociados / Los datos son invalidos",false];

   
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

export async function updateUserProfile( newUserData: User){
    // const credential = promptForCredentials();

    try {
        const user = auth.currentUser;
        console.log(user)
        if (user !== null) {
            try{
            await verifyBeforeUpdateEmail(user,newUserData.getEmail());
 
            console.log(user)
          
        }
        catch(error){
            console.log(error)
            return [false,"Vuelva a iniciar sesion para poder cambiar el correo electronico"];
        }
        const userRef = doc(collection(database, "users"), user.uid);
        // Actualiza los datos del usuario en Firestore
        await updateDoc(userRef, {
            name: newUserData.getName(),
            lastname: newUserData.getLastName(),
            email: newUserData.getEmail()
          });
      
       
        console.log("Se cambio el correo")
        return [true,"Se cambio el correo"];
       
  
        // const userRef = doc(collection(database, "users"), user.uid);
    
        // // Actualiza los datos del usuario en Firestore
        // await updateDoc(userRef, {
        //     name: newUserData.getName(),
        //     lastname: newUserData.getLastName(),
        //     email: newUserData.getEmail()
        //   });
      
    
        // console.log('Datos del usuario actualizados correctamente');
    
        // // Desestructura el objeto newUserData para extraer el campo 'email'
        // const { email } = newUserData;
    
        // Actualiza el correo electrónico del usuario en Authentication
   
        } else {}
     } catch(error){

   }
}
export async function addGroup(name: string, description: string, n: File, topic: Topic) {
    try {
        // Crea un nuevo grupo con los datos proporcionados
        const groupData = {
            name: name,
            description: description,
            members: [], // Asumiendo que aún no tienes miembros
            icon: n.name,
            topic: topic.getId() // Asegúrate de que getId() devuelve el ID del tema como una cadena
        };

        // Agrega el grupo a la colección "groups" en Firestore
        const docRef = await addDoc(collection(database, 'groups'), groupData);

        const groupId = docRef.id;
        console.log(groupId);

        // Sube la imagen y guarda la referencia
        await uploadImageAndSaveReference('', n, groupId);

        // Actualiza el documento recién creado para agregar el ID
        await updateDoc(doc(database, 'groups', groupId), {
            id: groupId
        });

        console.log('Grupo agregado correctamente');
    } catch (error) {
        console.error('Error al agregar el grupo:', error);
    }
}

    export async function mostrarTopic(): Promise<Topic[]> {
        try {
            // Obtener una referencia a la colección "topics" en la base de datos
            const topicsCollection = collection(database, 'topics');
    
            // Obtener todos los documentos de la colección "topics"
            const snapshot = await getDocs(topicsCollection);

            // Inicializar una variable para almacenar todos los temas
            const topics: Topic[] = [];
    
            // Iterar sobre cada documento y obtener los temas
            snapshot.forEach((doc) => {
                const data = doc.data() as DocumentData;
                if (data.name) {
                    const topic = new Topic(data.name as string, data.description as string, doc.id);
                    topics.push(topic); // Asumiendo que el nombre del tema está en un campo llamado "name"
                    console.log(topic)
                }
            });
    
            if (topics.length === 0) {
                console.log("No se encontraron temas");
            } else {
                console.log("Temas recuperados y mostrados exitosamente");
            }
    
            return topics;
        } catch (error) {
            console.error("Error al recuperar y mostrar temas:", error);
            return [];
        }
    }
    
    export async function uploadTopic(name: string, description: string): Promise<void> {
        try {
            // Crear un objeto que representa el tema
            const topic = {
                name: name,
                description: description
            };
    
            // Subir el tema a la colección "topics" en Firestore
            const docRef = await addDoc(collection(database, 'topics'), topic);
            
            // Obtener el ID del documento creado
            const docId = docRef.id;
    
            // Actualizar el documento para agregar el ID
            await updateDoc(doc(database, 'topics', docId), {
                id: docId
            });
    
            console.log("ID del documento creado:", docId);
            console.log("Tema subido correctamente");
        } catch (error) {
            console.error("Error al subir el tema:", error);
            throw error; // Re-lanzar el error para que se maneje en el lugar donde se llama a esta función
        }
    }
    export async function deleteTopic(identifier: string): Promise<void> {
        try {
            let topicRef;
            if (identifier.length == 20) { // Si la longitud es menor o igual a 20, asumimos que es un ID
                topicRef = doc(database, 'topics', identifier);
                console.log("aca")
            } else { // De lo contrario, asumimos que es un nombre de tema
                const querySnapshot = await getDocs(query(collection(database, 'topics'), where('name', '==', identifier)));
                if (querySnapshot.empty) {
                    throw new Error('No se encontró ningún tema con el nombre especificado');
                }
                console.log("Entra para el san")
                console.log(querySnapshot.docs)
                // Solo debería haber un documento que coincida con el nombre, por lo que tomamos el primero
                topicRef = querySnapshot.docs[0].ref;
            }
    
            if (topicRef) {
                console.log("entra al if")
                // Eliminar los grupos asociados al tema
                const groupQuerySnapshot = await getDocs(query(collection(database, 'groups'), where('topic', '==', topicRef.id)));
                groupQuerySnapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                    console.log("Grupo asociado al tema eliminado correctamente:", doc.id);
                });
    
                // Eliminar el tema
                await deleteDoc(topicRef);
                console.log("Tema eliminado correctamente");

            } else {
                console.log("No se encontró ningún tema con el identificador especificado");

            }
        } catch (error) {
            console.error("Error al eliminar el tema:", error);
            throw error;
        }
    }