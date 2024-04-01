import { Button, Card, CardBody, CardHeader,  Image } from "@nextui-org/react";
import { SetStateAction, useState } from "react";
import {  searchGroups, updateGroupMembers } from "../../components/autent";
import Group from "../../Class/Group";
import { useNavigate } from "react-router-dom";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useAuth } from "../../Context/contex";
import GroupCard from "../../components/Card";


export function GroupSearch() {
    const [componentKey, setComponentKey] = useState(0);
    const {user}=useAuth()
    const [query, setQuery] = useState('');
    const [resultados, setResultados] = useState<Group[]>([]);

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true); // Activar el estado de carga
  
      try {
        const gruposEncontrados = await searchGroups(query);
        setResultados(gruposEncontrados);
        setComponentKey(prevKey => prevKey + 1);
      } catch (error) {
        console.error('Error al buscar grupos:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
  
      setIsLoading(false); // Desactivar el estado de carga después de obtener los resultados
      
    };
    const handleGoProfileGroup = (grupo : Group) => {
        const url = `/group/${grupo.getId()}`; // Construye la URL utilizando el ID del grupo
        navigate(url); // Navega a la URL
console.log('hola')

    }
    const handleAfiliacion = (grupo: Group) => {
        // Aquí puedes agregar la lógica para afiliar al usuario al grupo
        if(user){
        const existingMember = grupo.getMembers().find((member) => member.getEmail() === user.getEmail());

        if (existingMember) {
            console.log("El usuario ya está afiliado al grupo.");
            // Puedes manejar aquí el caso en el que el usuario ya esté afiliado al grupo
        } else {
          user.setMember(true);
            console.log("Usuario afiliado al grupo:", user);
            grupo.addMember(user);
            updateGroupMembers(grupo.getId(),grupo.getMembers())
          

            // Aquí puedes agregar la lógica para afiliar al usuario al grupo
            // Por ejemplo, puedes enviar una solicitud al servidor para afiliar al usuario al grupo
        }}}

    return (
     
        <div className="flex items-center h-screen w-screen mt-10 flex-col">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="border border-gray-300 rounded-full px-4 py-1 focus:outline-none focus:border-blue-500 transition-colors duration-300"
            value={query} 
            onChange={(ev) => setQuery(ev.target.value)}
            placeholder="Buscar grupos..."
          />
          <Button size="sm" color="primary" radius="lg" type="submit">Buscar</Button>
        </form>
        
        {isLoading && <div>Cargando...</div>}
        
        <ul className="flex flex-col flex-wrap gap-4 mt-7 sm:flex-row md:flex-row">
          {resultados.map((grupo) => (
            <GroupCard
                            key={grupo.id}
                            grupo={grupo}
                            handleGoProfileGroup={handleGoProfileGroup}
                            handleAfiliacion={handleAfiliacion}
                          />
          ))}
        </ul>
        </div>
        );
        
}
