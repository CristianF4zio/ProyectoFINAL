import { Card, CardBody, user, CardHeader, Image } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { getGroupById } from "../components/autent";
import { useState, useEffect } from "react";
import Group from "../Class/Group";

export function GroupProfile (){
    const { groupId = "" } = useParams();
    const [group, setGroup] = useState<Group | null>(null);

    useEffect(() => {
      getGroupById(groupId).then(setGroup);
    }, [groupId]);

  
      return (
        <div className="h-screen mt-10">
          {/* Este div limitará el ancho máximo del Card */}
          <div className="bg-white flex items-center  justify-center  gap-2"> {/* Establecer el div card como flex y centrar verticalmente */}
            <div className="w-60 rounded"> {/* Ajustar la posición de la foto del avatar */}
              <img src={group?.getIcon()} alt="Avatar" className="h-full rounded" /> {/* Asegurar que la imagen ocupe toda la altura y tenga bordes redondeados */}
            </div>
            <div className="max-w-md flex flex-col"> {/* Div contenedor del nombre y descripción */}
              <h4 className="font-bold text-large mb-2">{group?.getName()}</h4> {/* Añadir un margen inferior al nombre */}
              <p className="">{group?.getDescription()}</p> {/* Mantener la descripción */}
              <small className="text-default-500"> {group?.getTopic().getName()}</small>
            </div>
          </div>
          
          <div className="divider mt-5 mb-5"></div> 
          
          {/* Mostrar información de los miembros si hay miembros en el grupo */}
          {group?.getMembers() && group.getMembers().length > 0 ? (
            <div className=" flex items-center gap-2">
              {/* Iterar sobre los miembros del grupo y mostrarlos */}
              <h3>Miembros:</h3>
              <ul>
                {group.members.map(member => (
                <li key={member.getEmail()}>{member.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex justify-center gap-2 max-w-lg mx-auto ">
            <p>No hay integrantes en este grupo.</p>
            </div>
          )}
        </div>
      );
  }