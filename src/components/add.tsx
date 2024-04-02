import { Input, Select, MenuItem, Textarea } from "@nextui-org/react";
import { ReactElement, useEffect, useState } from "react";
import Topic from "../Class/Topic";
import { addGroup, mostrarTopic } from "./autent";

export default function AddGroupInput() : ReactElement {

const [name, setName] = useState('');
const [description, setDescription] =useState('');
const [file, setFile] = useState<File | null>(null);
const [topicUser, setTopicUser] = useState<Topic| null> (null); // No se usa en el código que has compartido
const [topicsD, setTopics] = useState<Topic[]>([]);
const [error, setError] = useState<string | null>(null);
console.log(error)

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
      }, []);
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
return ( 
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
)
}

