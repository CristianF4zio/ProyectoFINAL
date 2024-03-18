import React, { createContext, useContext, useState } from 'react';
import User from '../Class/User';
import Admin from '../Class/Admin';

interface AuthContextType {
  isAuthenticated: boolean;
  admin: Admin | null;
  user: User | null; // Añadimos la información del usuario
  login: (user: User | Admin, isAdmin: boolean) => void; // Pasamos la información del usuario al iniciar sesión
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Inicialmente no hay usuario
  const [admin, setAdmin] = useState<Admin | null>(null); // Inicialmente no hay usuario

  const login = (loggedInUser: User | Admin, isAdmin: boolean) => {
    // Aquí realizarías la lógica de autenticación, como enviar credenciales al servidor
    // y actualizar isAuthenticated basado en la respuesta
    console.log("Usuario logeado")
    setIsAuthenticated(true);
    if(isAdmin){
        setUser(null);
        setAdmin(loggedInUser as Admin);
    }
    else{
    setAdmin(null);
    setUser(loggedInUser as User); // Actualizamos la información del usuario al iniciar sesión
    }
  };

  const logout = () => {
    // Lógica para cerrar sesión, como eliminar tokens de sesión
    setIsAuthenticated(false);
    setUser(null); // Eliminamos la información del usuario al cerrar sesión
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user ,admin , login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
