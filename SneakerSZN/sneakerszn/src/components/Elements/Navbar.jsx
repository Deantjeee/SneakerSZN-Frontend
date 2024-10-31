import { Button } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom"
import AuthService from "../../services/AuthService";
import { useEffect, useState } from "react";
import { faUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavBar() {

  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (AuthService.isAuthenticated()) {
        try {
          const userInfo = await AuthService.getUserInfo();
          setUserEmail(userInfo[1]);
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }
      }
    };

    fetchUserInfo();
  }, [AuthService.isAuthenticated()]);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <div className='w-full py-5 justify-center bg-main font-logo text-secondary flex shadow-md'>
      <div className="w-[98%] md:w-[80%] flex">
        <div id="logo" className="text-3xl flex items-center">
          <Link to="/">
            SNEAKERSZN
          </Link>
        </div>
        <div id="navbar-items" className="pl-10 flex items-center gap-5 w-full">
          <div className="flex gap-5 ">
            <NavLink to="/" className={({ isActive }) => {
              return "hover:text-secondaryHover transition-all " +
                (isActive
                  ? "text-secondaryHover underline"
                  : ""
                );
            }}>
              BROWSE
            </NavLink>
            {AuthService.isAuthenticated() ? (
              <NavLink to="/account/myorders" className={({ isActive }) => {
                return "hover:text-secondaryHover transition-all " +
                (isActive
                  ? "text-secondaryHover underline"
                  : ""
                );
              }}>
                MY ORDERS
              </NavLink>
            ) : (
              <></>
            )}
          </div>
          <div className="ml-auto">
            {AuthService.isAuthenticated() ? (
              <div className="flex items-center">
                <div className="pl-2 pr-3 py-2 transition-all uppercase rounded-full flex bg-secondary text-white">
                  <div className=" bg-gray-300 rounded-full mr-2 w-6 h-6 flex justify-center items-center ">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div>
                    {userEmail}
                  </div>
                </div>
                <button onClick={handleLogout} className="ml-3 px-10 py-2 transition-all rounded-full hover:bg-red-600  bg-red-500 text-white">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} /> LOGOUT
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="">
                  <button className="px-10 py-2 transition-all rounded-full hover:bg-secondaryHover  bg-secondary text-white">
                    LOGIN
                  </button>
                </Link>
                <Link to="/register" className="ml-3">
                  <button className="px-10 py-2 transition-all rounded-full hover:bg-secondaryHover  bg-secondary text-white">
                    REGISTER
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar