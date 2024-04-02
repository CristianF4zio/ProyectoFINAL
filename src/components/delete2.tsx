import { Input } from "@nextui-org/react";
import { useState } from "react";
import { deleteGroup } from "./autent";




export default function DeleteGroupInput() { 
    const [groupDelete, setGroupDelete]= useState('');
    const handleAcctionDe2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log(groupDelete);
        console.log("Eliminar Grupo");
        deleteGroup(groupDelete)
      }

    return(

<form className="card-body">
          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              key="outside"
              type="text"
              label="Name"
              labelPlacement="outside"
              placeholder="Enter their name"
              value={groupDelete}
              onChange={(ev) => setGroupDelete(ev.target.value)}
            />
          </div>
        
          <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={handleAcctionDe2}>Eliminar Grupo</button>
          </div>
        </form>)}