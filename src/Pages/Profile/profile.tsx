// import { useContext, useEffect, useState } from "react";
// import { AuthContext, useAuth } from "../../Context/contex";

import { Card, CardHeader, CardBody,Image, Input } from "@nextui-org/react";
import { useAuth } from "../../Context/contex";
import { useState } from "react";
import { updateUserProfile } from "../../components/autent";
import User from "../../Class/User";

import { Alert } from "../../components/alert";



export function Profile() {
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [componentKey, setComponentKey] = useState(0);
  const [newname, setNewname]= useState("");
  const [newlastname, setNewlastname]= useState("");
  const [newemail, setNewemail]= useState("");
console.log(componentKey)
console.log(setNewemail)
    const { user } = useAuth(); // Obtén el usuario actual del contexto de autenticación
const handleSummit = () => {
 
  if (user && newname && newlastname ) {
    const newUserData = new User(newname, newlastname, newemail, user.getPassword(), user.getIcon(), user.getMember());
    updateUserProfile(newUserData)
    user.setName(newname);
    user.setLastName(newlastname);
    
    setComponentKey(prevKey => prevKey + 1);
    setNewname("");
    setNewlastname("");
  }
  else{
console.log("ero")
setShowAlert(true)
setError("Todos los campos son obligatorios")
  }


  }
  const handleAccept = () => {
    setShowAlert(false);
    return;
}  
    
    return (
    

      <div className="">
      {showAlert && <Alert onClose={handleAccept} text={error}/>}  
  <h1 className="">Perfil de Usuario</h1>
<div className="mx-auto p-4 flex items-center justify-center mt-10 gap-9   md:flex-row lg: flex-row ">
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
  <div className="bg-grays text-center "> 
  <div className="divider"></div>
  <h4 className="font-bold text-large mb-5">Cambiar datos </h4>
    <div className="grid grid-cols-2 gap-4  p-4"> 
    
    <Input
                  key="outside"
                  type="text"
                  label="Name"
                  labelPlacement="outside"
                  placeholder="Enter their text"
                  value={newname}
                  onChange={(ev) => setNewname(ev.target.value)}
                />
      <Input
                  key="outside"
                  type="text"
                  label="LastName"
                  labelPlacement="outside"
                  placeholder="Enter their LastName"
                  value={newlastname}
                  onChange={(ev) => setNewlastname(ev.target.value)}
                />
     
    </div>

  </div>
  <button className="btn btn-primary " onClick={handleSummit}>Guardar</button>
 


  </Card>
</div>
</div>

 )
}