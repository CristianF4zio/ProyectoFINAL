import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../components/autent";
import User from "../../Class/User";
import { Alert } from "../../components/alert";
import { Input } from "@nextui-org/react";
import { LoadingSpinner } from "../loading";


export function Register() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true); // Estado de carga inicialmente true
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [showAlert, setShowAlert] = useState(false);

const handleRegister = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsLoading(true);
   if (!email || !password || !name || !lastName) {
    setIsLoading(false);
    setShowAlert(true);
        setError('Todos los campos son obligatorios');
        
       return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    setError("Please enter a valid email");
    setIsLoading(false);
     setShowAlert(true);
        return;
}
const namefile= file?.name;
    const user = new User(  name, lastName ,email, password, namefile ||"" , false);
    const id = file ? signUp(user, file) : null;
    console.log(id)
    if (await id) {
        console.log("Usuario registrado")
        setIsLoading(false);
        navigate('/login');
    } else {
      setIsLoading(false);
        setError('El usuario ya existe');
        setShowAlert(true); // Muestra la alerta si los datos ya existen
        return;
    }
}
const handleAccept = () => {
    setShowAlert(false);
    return;
}    // Función para manejar la carga completa del fondo
    useEffect(() => {
     
        const backgroundImage = new Image();
        backgroundImage.src = 'https://scontent-fra3-1.xx.fbcdn.net/v/t31.18172-8/16722786_10154118294695899_8023236610765669194_o.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=R-URHiyKjhgAX-qlCoW&_nc_ht=scontent-fra3-1.xx&oh=00_AfAUlz8B2p3DsNMkTwcx4Js82vqjLLGSnvBqME0v86rQmQ&oe=661DE695';
        backgroundImage.onload = () => {
            setIsLoading(false); // Cuando el fondo se carga, cambia el estado a false
        };
      }, []);
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          // Almacena todos los archivos seleccionados en el estado files
          setFile(event.target.files[0]);
          
          // También puedes realizar otras operaciones con los archivos aquí si es necesario
        }
      };

    return (

        <div  className="div">
              
            {showAlert && <Alert onClose={handleAccept} text={error}/>}    
            {isLoading && <LoadingSpinner />}
            <div className="hero min-h-screen" style={{backgroundImage: 'url(https://scontent-fra3-1.xx.fbcdn.net/v/t31.18172-8/16722786_10154118294695899_8023236610765669194_o.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=R-URHiyKjhgAX-qlCoW&_nc_ht=scontent-fra3-1.xx&oh=00_AfAUlz8B2p3DsNMkTwcx4Js82vqjLLGSnvBqME0v86rQmQ&oe=661DE695)'}}>
            
          <div className="hero-overlay bg-opacity-60"></div>

          <div className="container">
          <div className="login">
          <h1 className="italic">Registro</h1>
          <form className="card-body">
          <Input
                            key="outside"
                            type="text"
                    
                            placeholder="Email"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                          />
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
            <input type="password" className="grow" value={password} onChange={(ev) => setPassword(ev.target.value)}/>
          </label>
          <Input
                  key="outside"
                  type="text"
              
                  placeholder="Name"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
            <Input
                  key="outside"
                  type="text"
              
                  placeholder="LastName"
                  value={lastName}
                  onChange={(ev) => setLastName(ev.target.value)}
                />
          <input  onChange={handleChange}  type="file" className="file-input file-input-bordered  file-input-ghost   w-full max-w-xs  b" accept="image/*"/>
          <button className="form-btn" onClick={handleRegister}>Log in</button>
          </form>
          </div>
          </div>

          </div>
          
            
          </div>

    )
}