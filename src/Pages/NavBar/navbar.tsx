import { useNavigate, Link } from "react-router-dom";
import "./navbar.css";
import { groupURL, homeURL, loginURL } from "../../constants/url";
import PrivateRoute from "../../components/Privatenavbar/privatenavbar";
import { useAuth } from "../../Context/contex";
import PrivateRouteUser from "../../components/Privatenavbar/privateguest";

export function NavBar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); // Obtener la función de logout del contexto de autenticación

    const handleLogout = async () => {
        // Cerrar sesión al hacer clic en el botón de Logout
        await logout();
        navigate(homeURL); // Redirigir a la página de inicio después de cerrar sesión
    }

    const handleProfile = () => {
      navigate('/profile');
    }

    return ( 
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">MetroVibe</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to={homeURL}>Home</Link></li>
                    <PrivateRouteUser>
                        <li><Link to={loginURL}>Login</Link></li>
                    </PrivateRouteUser>
                    <PrivateRoute>
                        <li><Link to={groupURL}>Group</Link></li>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user?.getIcon()} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li onClick={handleProfile}>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li onClick={handleLogout}><a>Logout</a></li>
                            </ul>
                        </div>
                    </PrivateRoute>
                </ul>
            </div>
        </div>
    );
}
