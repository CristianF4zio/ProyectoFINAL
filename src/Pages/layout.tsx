import { Outlet } from "react-router-dom";
import {   AuthProvider } from "../Context/contex";
import { NavBar } from "./NavBar/navbar";


export function Layout() {


    
    return (
        <AuthProvider>
        <main>
            <NavBar />
            <section  >
                <Outlet />
               
            </section>

        </main>
        </AuthProvider>
    )}