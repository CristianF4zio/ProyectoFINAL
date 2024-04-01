import { Input, MenuItem, Select, Textarea } from "@nextui-org/react";

import React, { useEffect, useState } from "react";
import { addGroup, deleteGroup, deleteTopic, mostrarTopic, uploadTopic } from "../../components/autent";
import Topic from "../../Class/Topic";

export function AdminHome() {
  const [name, setName] = useState('');
  const [description, setDescription] =useState('');
  const [file, setFile] = useState<File | null>(null);
  const [topicUser, setTopicUser] = useState<Topic| null> (null); // No se usa en el código que has compartido
  const [topicsD, setTopics] = useState<Topic[]>([]);
  const [, setError] = useState<string | null>(null);
  const [nameTopic, setnameTopic]= useState('');
  const [descriptionTopic, setDescriptionTopic]= useState('');
  const [topicIdDelete, setTopicIdDelete]= useState('');
  const [groupDelete, setGroupDelete]= useState('');
  
  useEffect(() => {
    mostrarTopic()
      .then(topics => {
        if (topics.length === 0) {
          setError("No se encontraron temas.");
        } else {

setTopics(topics.map(topic => new Topic( topic.getName(), topic.getDescription(),topic.getId())));
        console.log(topicsD);
        }
      })
      .catch(error => {
        console.error("Error al obtener temas:", error);
        setError("Error al obtener temas. Por favor, inténtalo de nuevo más tarde.");
      });
  },);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // Almacena todos los archivos seleccionados en el estado files
      setFile(event.target.files[0]);
    }
  };

  const handleAcctionAd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(name);
    console.log(description);
    console.log(file);
    console.log(topicUser); // No se usa en el código que has compartido
    if (file && name && description && topicUser) {
      addGroup(name, description, file,topicUser);
    }
    console.log("Agregar Grupo");
  };
  const handleAcctionAd2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(nameTopic);
    console.log(descriptionTopic);
    console.log("Agregar Topico");
    uploadTopic(nameTopic, descriptionTopic)
  };
const handleAcctionDe = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteTopic(topicIdDelete)
    console.log(topicIdDelete);
    console.log("Eliminar Topico");
  }
  const handleAcctionDe2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(groupDelete);
    console.log("Eliminar Grupo");
    deleteGroup(groupDelete)
  }
  return (
    <div className="flex w-full flex-col mt-10 items-center">
      <h1> Create Group</h1>

      <div className="card shrink-0 w-full max-w-sm  bg-base-100 mt-5 gap-4">
        <form className="card-body">
          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              key="outside"
              type="text"
              label="Name"
              labelPlacement="outside"
              placeholder="Enter their name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>

          <div>
          <Select
            label="Select a topic"
            className="max-w-xs"
            value={topicUser ? topicUser.getName() : ''} // Supongo que getName() devuelve el nombre del tema
            onChange={(ev) => {
              const selectedTopic = topicsD.find(topic => topic.getName() === ev.target.value);
              setTopicUser(selectedTopic || null); // Establece la instancia de topic seleccionada en topicUser, o null si no se encuentra
            }}
          >
            {topicsD.map((topic) => (
              <MenuItem key={topic.getName()} value={topic.getName()}>{topic.getName()}</MenuItem>
            ))}
          </Select>
          </div>

          <div>
            <Textarea
              isRequired
              label="Description"
              labelPlacement="outside"
              placeholder="Enter your description"
              className="max-w-xs"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
          </div>

          <input onChange={handleChange} type="file" className="file-input file-input-bordered w-full max-w-xs" accept="image/*" />

          <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={handleAcctionAd}>Agregar Grupo</button>
          </div>
        </form>
      </div>
      <h1> Create Topic</h1>
      <div className="card shrink-0 w-full max-w-sm  bg-base-100 mt-5 gap-4">
        <form className="card-body">
          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              key="outside"
              type="text"
              label="Name"
              labelPlacement="outside"
              placeholder="Enter their name"
              value={nameTopic}
              onChange={(ev) => setnameTopic(ev.target.value)}
            />
          </div>

          <div>
            <Textarea
              isRequired
              label="Description"
              labelPlacement="outside"
              placeholder="Enter your description"
              className="max-w-xs"
              value={descriptionTopic}
              onChange={(ev) => setDescriptionTopic(ev.target.value)}
            />
          </div>

        
          <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={handleAcctionAd2}>Agregar Topico</button>
          </div>
        </form>
      </div>
      <h1> Elimnar Topic</h1>
      <div className="card shrink-0 w-full max-w-sm  bg-base-100 mt-5 gap-4">
        <form className="card-body">
          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              key="outside"
              type="text"
              label="Name"
              labelPlacement="outside"
              placeholder="Enter their name"
              value={topicIdDelete}
              onChange={(ev) => setTopicIdDelete(ev.target.value)}
            />
          </div>
        
          <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={handleAcctionDe}>Eliminar Topico</button>
          </div>
        </form>
      </div>
      <h1> Elimnar Group</h1>
      <div className="card shrink-0 w-full max-w-sm  bg-base-100 mt-5 gap-4">
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
            <button className="btn btn-primary" onClick={handleAcctionDe2}>Eliminar Topico</button>
          </div>
        </form>
      </div>
    </div>
  );
}