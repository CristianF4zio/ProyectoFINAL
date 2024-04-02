import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import  { useState } from "react";
import AddGroupInput from "../../components/add";
import AddTopicInput from "../../components/add2";
import DeleteGroupInput from "../../components/delete2";
import DeleteTopicInput from "../../components/delete";

export function AdminHome() {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showCreateTopic, setShowCreateTopic] = useState(false);
  const [showDeleteTopic, setShowDeleteTopic] = useState(false);
  const [showDeleteGroup, setShowDeleteGroup] = useState(false);
  const [showBackground, setShowBackground] = useState(true); // Estado para controlar la visibilidad del div fondo

  const handleCheckboxChange = () => {
    // Al cambiar el estado de las opciones, también cambia el estado del div fondo
    setShowBackground(!showBackground);
  };

  return (
    <div className="flex w-full flex-col mt-10  items-center h-full">
      <CheckboxGroup label="Select" orientation="horizontal" color="secondary" onChange={handleCheckboxChange}>
        <Checkbox value="createGroup" onChange={() => setShowCreateGroup(!showCreateGroup)}>Crear Grupo</Checkbox>
        <Checkbox value="createTopic" onChange={() => setShowCreateTopic(!showCreateTopic)}>Crear Tópico</Checkbox>
        <Checkbox value="deleteTopic" onChange={() => setShowDeleteTopic(!showDeleteTopic)}>Eliminar Tópico</Checkbox>
        <Checkbox value="deleteGroup" onChange={() => setShowDeleteGroup(!showDeleteGroup)}>Eliminar Grupo</Checkbox>
      </CheckboxGroup>
      
      {/* El div fondo se muestra u oculta según el estado de showBackground */}
      {!showCreateGroup && !showCreateTopic && !showDeleteTopic && !showDeleteGroup &&  <div className="fondo flex w-screen h-screen flex-col mt-10 items-center h-full"></div>}
      
      {showCreateGroup && (
        <>
          <h1 className="mt-5">Crear Grupo</h1>
          <div className="card shrink-0 w-full max-w-sm bg-base-100 mt-5 gap-4">
            <AddGroupInput />
          </div>
        </>
      )}

      {showCreateTopic && (
        <>
          <h1 className="mt-5">Crear Tópico</h1>
          <div className="card shrink-0 w-full max-w-sm bg-base-100 mt-5 gap-4">
            <AddTopicInput />
          </div>
        </>
      )}

      {showDeleteTopic && (
        <>
          <h1 className="mt-5">Eliminar Tópico</h1>
          <div className="card shrink-0 w-full max-w-sm bg-base-100 mt-5 gap-4">
            <DeleteTopicInput />
          </div>
        </>
      )}

      {showDeleteGroup && (
        <>
          <h1 className="mt-5">Eliminar Grupo</h1>
          <div className="card shrink-0 w-full max-w-sm bg-base-100 mt-5 gap-4">
            <DeleteGroupInput />
          </div>
        </>
      )}
    </div>
  );
}
