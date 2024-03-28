import './profile.css';

// import { useContext, useEffect, useState } from "react";
// import { AuthContext, useAuth } from "../../Context/contex";

import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useAuth } from "../../Context/contex";
import { useState } from "react";
import { updateUserProfile } from "../../components/autent";
import User from "../../Class/User";



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
    <div className="contenedor ">

      <h1>Perfil de Usuario</h1>

      <div className="tarjeta">
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

          <button className='boton' >Actualizar perfil</button>
        </div>

      </div>
    </div>
  )
}