import './profile.css';

// import { useContext, useEffect, useState } from "react";
// import { AuthContext, useAuth } from "../../Context/contex";

import { useAuth } from "../../Context/contex";
import { useState, useEffect } from "react";
import { updateUserProfile } from "../../components/autent";
import User from "../../Class/User";

import { Alert } from "../../components/alert";


export function Profile() {
  const [componentKey, setComponentKey] = useState(0);
  const [newname, setNewname] = useState("");
  const [newlastname, setNewlastname] = useState("");
  const [newemail, setNewemail] = useState("");

  const { user } = useAuth(); // Obtén el usuario actual del contexto de autenticación
  const handleSummit = () => {

    if (user) {
      const newUserData = new User(newname, newlastname, newemail, user.getPassword(), user.getIcon(), false);
      updateUserProfile(newUserData)

      setComponentKey(prevKey => prevKey + 1);
    }


  }

  const [isLoading, setIsLoading] = useState(true); // Estado de carga inicialmente true
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const backgroundImage = new Image();
    backgroundImage.src = 'https://scontent-fra3-1.xx.fbcdn.net/v/t31.18172-8/16722786_10154118294695899_8023236610765669194_o.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=R-URHiyKjhgAX-qlCoW&_nc_ht=scontent-fra3-1.xx&oh=00_AfAUlz8B2p3DsNMkTwcx4Js82vqjLLGSnvBqME0v86rQmQ&oe=661DE695';
    backgroundImage.onload = () => {
      setIsLoading(false); // Cuando el fondo se carga, cambia el estado a false
    };
  }, []);

  const handleAccept = () => {
    setShowAlert(false);
    return;
  }

  return (
    // <div> 
    //  <div className="hero min-h-screen bg-base-200">
    //     <div className="hero-content flex-col lg:flex-row-reverse">
    //         <img src={user?.getIcon()} className="max-w-sm rounded-lg shadow-2xl" />
    //         <div>
    //         <h1 className="text-5xl font-bold">{user?.getName()}</h1>
    //         <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    //         <button className="btn btn-primary">Get Started</button>
    //         </div>
    //     </div>
    // </div>
    // </div>


    <div className="div">
      {showAlert && <Alert onClose={handleAccept} text={error} />}
      {isLoading ? (
        <div className="loader"></div> // Indicador de carga mientras el fondo se está cargando
      ) : (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://scontent-fra3-1.xx.fbcdn.net/v/t31.18172-8/16722786_10154118294695899_8023236610765669194_o.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=R-URHiyKjhgAX-qlCoW&_nc_ht=scontent-fra3-1.xx&oh=00_AfAUlz8B2p3DsNMkTwcx4Js82vqjLLGSnvBqME0v86rQmQ&oe=661DE695)' }}>

          <div className="hero-overlay bg-opacity-60"></div>


          <div className="contenedorP ">



            <h1 >Perfil de Usuario</h1>

            <div className="tarjetaP ">
              <h3 className='bienvenida'>Bienvenido {user?.getName()} {user?.getLastName()}</h3>
              <div className="imagen">
                <img src={user?.getIcon()} className="imagen" />
              </div>

              <div className="informacion">
                <p className='user'>Nombre: <input type='text' className='box' placeholder='Name' value={newname} onChange={(ev) => setNewname(ev.target.value)}></input></p>
                <p className='user'>Apellido: <input type='text' className='box' placeholder='LastName' value={newlastname} onChange={(ev) => setNewlastname(ev.target.value)}></input></p>
                <p className='user'>Correo Electronico: <input type='text' className='box' placeholder='Email' value={newemail} onChange={(ev) => setNewemail(ev.target.value)}></input></p>

              </div>

              <div className="ajustes">

                <button className='boton' onClick={handleSummit}>Actualizar perfil</button>
              </div>

            </div>
          </div>
        </div>
      )
      }
    </div>


  )
}