import { useNavigate, Link } from "react-router-dom";

import { groupURL, homeURL, loginURL } from "../../constants/url";
import PrivateRoute from "../../components/Privatenavbar/privatenavbar";
import { useAuth } from "../../Context/contex";
import PrivateRouteUser from "../../components/Privatenavbar/privateguest";
import PrivateRouteAdmin from "../../components/Privatenavbar/privateadmin";
import PrivateRouteAdmin2 from "../../components/Privatenavbar/privateadmin2";

export function NavBar() {
  const navigate = useNavigate();
  const { user,logout } = useAuth()


  const handleLogout = async () => {
    logout()
    navigate(homeURL);
  }
  const handleprofile = () => {
    navigate('/profile');
  }
  return (

    <div className="navbar bg-orange">
      <div className="flex-1">
        <a className=" btn btn-ghost text-white text-2 lg:text-2xl ">MetroVibe</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal  px-1 text-white text-1 lg: text-2">
        <PrivateRouteAdmin2>
          <li > <Link to={homeURL}>Home</Link></li>
          </PrivateRouteAdmin2>
          <PrivateRouteAdmin>
          <li > <Link onClick={handleLogout} to={homeURL}>Logout</Link></li>
 
            
          </PrivateRouteAdmin>
          <PrivateRouteAdmin2>
          <PrivateRouteUser>
            <li > <Link to={loginURL}>Login</Link></li>
          </PrivateRouteUser>
          </PrivateRouteAdmin2>
          <PrivateRoute>
            <li > <Link to={groupURL}>Group</Link></li>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={user?.getIcon()} />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52">
                <li onClick={handleprofile}>
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
  )
}