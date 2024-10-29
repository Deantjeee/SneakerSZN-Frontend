import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom"
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
    <div>
      hallo
    </div>
  );
}

export default NavBar