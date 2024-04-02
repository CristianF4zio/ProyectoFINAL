import React from "react";
import { useAuth } from "../../Context/contex";


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRouteAdmin: React.FC<PrivateRouteProps> = ({ children }) => {
  const {  isAuthenticated } = useAuth(); // Supongamos que useAuth devuelve información sobre el usuario y si se está cargando

  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirigir a la página de inicio o a una página de acceso denegado
    return null;
  }

  // Si el usuario está autenticado, mostrar el contenido de la ruta privada
  return <>{children}</>;
};

export default PrivateRouteAdmin;