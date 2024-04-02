import { useParams } from "react-router-dom";
import { getGroupById } from "../components/autent";
import { useState, useEffect } from "react";
import Group from "../Class/Group";
import { LoadingSpinner } from "./loading";
import { Card, CardBody } from "@nextui-org/react";

export function GroupProfile() {
  const { groupId = "" } = useParams();
  const [group, setGroup] = useState<Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); // Mostrar spinner de carga al iniciar la carga del grupo
    getGroupById(groupId)
      .then((group) => {
        setGroup(group);
      })
      .catch((error) => {
        console.error("Error al obtener el grupo:", error);
        // Manejar el error aquí (por ejemplo, mostrar un mensaje de error)
      })
      .finally(() => {
        setIsLoading(false); // Ocultar spinner de carga una vez que se complete la carga del grupo
      });
  }, [groupId]);

  return (
    <div className="h-screen mt-10">
      {isLoading && <LoadingSpinner />}

      {!isLoading && group && (
        <div className="flex items-center justify-center gap-2">
          <div className="w-60 rounded">
            <img src={group.getIcon()} alt="Avatar" className="h-full rounded" />
          </div>
          <div className="max-w-md flex flex-col">
            <h4 className="font-bold text-large ">{group.getName()}</h4>
            <small className="text-default-500 mb-2">{group.getTopic().getName()}</small>
            <p className="">{group.getDescription()}</p>
          </div>
        </div>
      )}

      <div className="divider mt-5 mb-5"></div>
   
      {!isLoading && group && group.getMembers().length > 0 ? (
       <div className="mt-5 text-center ">
    <h3 className="font-30  text-3xl">Miembros</h3>
          <ul className="gap-2 flex flex-col flex-wrap justify-center gap-2 w-full mt-5 sm:flex-row md:flex-row">
            {group.getMembers().map((member) => (
              <li key={member.getEmail()} className="">
                <Card className="py-3">
                  <CardBody  className="pb-0 pt-2 px-4 flex-col">
                  <h4 className=" text-large">
                      {member.getName()} {member.getLastName()}
                    </h4>
                  </CardBody>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex justify-center gap-2 max-w-lg mx-auto">
          <p>No hay integrantes en este grupo.</p>
        </div>
      )}
    </div>
  );
}
