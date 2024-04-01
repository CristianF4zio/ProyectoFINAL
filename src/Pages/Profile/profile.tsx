// import { useContext, useEffect, useState } from "react";
// import { AuthContext, useAuth } from "../../Context/contex";

import { Card, CardHeader, CardBody,Image } from "@nextui-org/react";
import { useAuth } from "../../Context/contex";
import { useState } from "react";
import { updateUserProfile } from "../../components/autent";
import User from "../../Class/User";



export function Profile() {
  const [componentKey, setComponentKey] = useState(0);
  const [newname, setNewname]= useState("");
  const [newlastname, setNewlastname]= useState("");
  const [newemail, setNewemail]= useState("");

    const { user } = useAuth(); // Obtén el usuario actual del contexto de autenticación
const handleSummit = () => {
 
  if (user) {
    const newUserData = new User(newname, newlastname, newemail, user.getPassword(), user.getIcon(), user.getMember());
    updateUserProfile(newUserData)
    user.setName(newname);
    user.setLastName(newlastname);
    
    setComponentKey(prevKey => prevKey + 1);
  }


  }
    
    return (
<div className="relative top-10 ">
  <h1>Perfil de Usuario</h1>
<div className="mx-auto p-4 flex items-center justify-center mt-20 gap-9   md:flex-row lg: flex-row ">
<Card className="py-5">
<CardBody className="overflow-visible py-2 flex items-center">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={user?.getIcon()}
          width={270}
        />
      </CardBody>
      <CardHeader className="pb-0 pt-2 px-4 flex-col ">
        <p className="text-tiny  font-bold"> </p>
        <small className="text-default-500 text-black">{user?.getEmail()}</small>
        <h4 className="font-bold text-large">Bienvenido {user?.getName()} {user?.getLastName()} </h4>
      </CardHeader>
  <div className="bg-grays"> 
    <div className="grid grid-cols-2 gap-4  p-4"> 
      <label className="form-control">
        <div className="label">
          <span className="label-text text-black">Cambio de Nombre</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered max-w-xs"value={newname} onChange={(ev) => setNewname(ev.target.value)} />
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text text-black">Cmabio de apellido</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered max-w-xs" value={newlastname} onChange={(ev) => setNewlastname(ev.target.value)} />
      </label>
     
    </div>

  </div>
  <button className="btn btn-primary " onClick={handleSummit}>Guardar</button>
 


  </Card>
</div>
</div>

 )
}