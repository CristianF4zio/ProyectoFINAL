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
<div className="relative top-10 ">
  <h1>Profile</h1>
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
        <small className="text-default-500">{user?.getEmail()}</small>
        <h4 className="font-bold text-large"> {user?.getName()} {user?.getLastName()} </h4>
      </CardHeader>
  <div className="bg-grays"> 
    <div className="grid grid-cols-2 gap-4  p-4"> 
      <label className="form-control">
        <div className="label">
          <span className="label-text">Name</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered max-w-xs"value={newname} onChange={(ev) => setNewname(ev.target.value)} />
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Last name</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered max-w-xs" value={newlastname} onChange={(ev) => setNewlastname(ev.target.value)} />
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Email</span> 
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered max-w-xs" value={newemail} onChange={(ev) => setNewemail(ev.target.value)}/>
      </label>
    </div>

  </div>
  <button className="btn btn-primary " onClick={handleSummit}>Guardar</button>
 


  </Card>
</div>
</div>

 )
}