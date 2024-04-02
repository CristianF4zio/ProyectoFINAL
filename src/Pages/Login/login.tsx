import { useNavigate } from "react-router-dom";
import './login.css';
import { useState, useEffect } from "react";
import { registerURL } from "../../constants/url";
import { Alert } from "../../components/alert";

import signUpWithGoogle, { signInWithEmailAndPasswordAndFetchUserData } from "../../components/autent";
import { useAuth } from "../../Context/contex";
import Admin from "../../Class/Admin";
import { Input } from "@nextui-org/react";
import { LoadingSpinner } from "../loading";



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
  const [isVisible, setIsVisible] = useState(false);
  
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleacept = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true);
    
    event.preventDefault();
    if (email === '' || password === '') {
      setError('Todos los campos son obligatorios');
      setShowAlert(true);
      setIsLoading(false);
      return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError("Please enter a valid email");
      setIsLoading(false);
      setShowAlert(true);
      return;
    }
    try {
      const id: any = await signInWithEmailAndPasswordAndFetchUserData(email.toLowerCase(), password);
      if (id && id[1] == true && typeof id[0] !== 'string' && typeof id[0] !== 'boolean') {
        if (id[0] instanceof Admin) {
          login(id[0], true);
          setIsLoading(false);

          console.log("entro admin")
          navigate('/admin');
        }
        else {
          console.log("entro usuario")
          login(id[0], false);
          setIsLoading(false);
          navigate('/inicio');
          
        } document.body.classList.remove('hide-overflow');

      }
      else {
        setIsLoading(false);
        setError(id[0]);
        setShowAlert(true);

      }
    } catch (error) {
      setIsLoading(false);
      setError('Error al registrar usuario. Por favor, inténtalo de nuevo más tarde.');
      setShowAlert(true);
    }
  }
  const handleAccept = () => {
    setShowAlert(false);
    return;
  }
  const handleGoogle = async () => {
    setIsLoading(true)
    console.log("Google");
    const user = await signUpWithGoogle()
    if(user){
      setIsLoading(false);
      login(user, false);
      navigate('/inicio');
    }
    else {
      setIsLoading(false);
      setError('Error al registrar usuario. Por favor, inténtalo de nuevo más tarde.');
      setShowAlert(true);
  }}
  return (

    <div className="">
      {showAlert && <Alert onClose={handleAccept} text={error} />}
      {isLoading && <LoadingSpinner />}

 
        <div className="hero min-h-screen " style={{ backgroundImage: 'url(https://scontent-fra3-1.xx.fbcdn.net/v/t31.18172-8/16722786_10154118294695899_8023236610765669194_o.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=R-URHiyKjhgAX-qlCoW&_nc_ht=scontent-fra3-1.xx&oh=00_AfAUlz8B2p3DsNMkTwcx4Js82vqjLLGSnvBqME0v86rQmQ&oe=661DE695)' }}>

          <div className="hero-overlay bg-opacity-60"></div>
          <div className="container">
            <div className="login">
              <h1 className="italic">Inicar Sesión</h1>
              <form className="card-body">
                  <Input
                  key="outside"
                  type="text"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter their email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <Input
                  label="Password"
                  labelPlacement="outside"
                  placeholder="Enter your password"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? "Hide" : "Show"}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="max-w-xs"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
                <button className="form-btn" onClick={handleacept}>Log in</button>
              </form>

              <p className="sign-up-label ">
                Don't have an account?<span className="sign-up-link " onClick={handleLogin}> Sign up</span>
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
                <span onClick={handleGoogle}>Log in with Google</span>
              </div>
            </div>
          </div>

        </div>
      
    </div>
  )
}