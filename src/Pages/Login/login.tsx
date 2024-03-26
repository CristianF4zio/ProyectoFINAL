import { useNavigate } from "react-router-dom";
import './login.css';
import { useState, useEffect } from "react";
import { registerURL } from "../../constants/url";
import { Alert } from "../../components/alert";

import { signInWithEmailAndPasswordAndFetchUserData } from "../../components/autent";
import { useAuth } from "../../Context/contex";


export function Login() {

  const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); // Estado de carga inicialmente true
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // Función para manejar la carga completa del fondo
    useEffect(() => {
        const backgroundImage = new Image();
        backgroundImage.src = 'https://scontent-fra3-1.xx.fbcdn.net/v/t31.18172-8/16722786_10154118294695899_8023236610765669194_o.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=R-URHiyKjhgAX-qlCoW&_nc_ht=scontent-fra3-1.xx&oh=00_AfAUlz8B2p3DsNMkTwcx4Js82vqjLLGSnvBqME0v86rQmQ&oe=661DE695';
        backgroundImage.onload = () => {
            setIsLoading(false); // Cuando el fondo se carga, cambia el estado a false
        };
      }, []);
const handleLogin = () => {
 
    navigate(registerURL);
}

const handleacept = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  event.preventDefault();
  if (email === '' || password === '') {
    setError('Todos los campos son obligatorios');
    setShowAlert(true);
    return;}
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
			setError("Please enter a valid email");
      setShowAlert(true);
			return;
    }
    try {
      const id: any = await signInWithEmailAndPasswordAndFetchUserData(email, password);
      if (id && id[1]==true && typeof id[0] !== 'string' && typeof id[0] !== 'boolean') {
        login(id[0], false);
        document.body.classList.remove('hide-overflow');
        navigate('/inicio');
      }
      else{
        setError(id[0]);
        setShowAlert(true);

      }
  } catch (error) {
      setError('Error al registrar usuario. Por favor, inténtalo de nuevo más tarde.');
      setShowAlert(true);
  }}
const handleAccept = () => {
  setShowAlert(false);
  return;
}  
    return (
    
        <div  className="div">
               {showAlert && <Alert onClose={handleAccept} text={error}/>}    
                      {isLoading ? (
                <div className="loader"></div> // Indicador de carga mientras el fondo se está cargando
            ) : (
                <div className="hero min-h-screen" style={{backgroundImage: 'url(https://scontent-fra3-1.xx.fbcdn.net/v/t31.18172-8/16722786_10154118294695899_8023236610765669194_o.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=R-URHiyKjhgAX-qlCoW&_nc_ht=scontent-fra3-1.xx&oh=00_AfAUlz8B2p3DsNMkTwcx4Js82vqjLLGSnvBqME0v86rQmQ&oe=661DE695)'}}>
                    
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="container">
            <div className="login">
            <h1 className="italic">Inicar Sesión</h1>
            <form className="card-body">
            <label className="input input-bordered flex items-center gap-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                <input type="text" className="grow" placeholder="Email" value={email} onChange={(ev) => setEmail(ev.target.value)}/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                <input type="password" className="grow" value={password} onChange={(ev) => setPassword(ev.target.value)}/>
            </label>
            <button className="form-btn" onClick={handleacept}>Log in</button>
            </form>
            <p className="sign-up-label">
        Don't have an account?<span className="sign-up-link" onClick={handleLogin}> Sign up</span>
      </p>
      <div className="google-login-button">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px" className="google-icon" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <span>Log in with Google</span>
        </div>
            </div>
        </div>
        
        </div>
         )}
        </div>
    )}