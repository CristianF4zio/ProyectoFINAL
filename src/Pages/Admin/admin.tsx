import { Input, Textarea } from "@nextui-org/react";
import InputPassword from "../../components/inputPassword";
import React from "react";
import { addGroup } from "../../components/autent";

export function AdminHome() {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [file, setFile] = React.useState<File | null>(null);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          // Almacena todos los archivos seleccionados en el estado files
          setFile(event.target.files[0]);
          
          // También puedes realizar otras operaciones con los archivos aquí si es necesario
        }
      };
      const handleAcctionAd = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log(name)
        console.log(description)
        console.log(file)
        if (file) {
          addGroup(name, description, file)
        }
        console.log("Agregar Grupo")
      }
return (
<div className="flex w-full flex-col mt-10 items-center">
    <h1> Create Group</h1>

    <div className="card shrink-0 w-full max-w-sm  bg-base-100 mt-5 gap-4">
      <form className="card-body">
   
      <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
        
            <Input
              key= "outside"
              type="text"
              label="Name"
              labelPlacement= "outside"
              placeholder="Enter their name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />

        </div>
    <div ><Textarea
      isRequired
      label="Description"
      labelPlacement="outside"
      placeholder="Enter your description"
      className="max-w-xs "
      value={description}
      onChange={(ev) => setDescription(ev.target.value)}
    /></div>
    <input  onChange={handleChange}  type="file" className="file-input file-input-bordered w-full max-w-xs" accept="image/*"/>
       
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={handleAcctionAd}>Agregar Grupo</button>
        </div>
      </form>
  
  
    </div>

</div>
)


}