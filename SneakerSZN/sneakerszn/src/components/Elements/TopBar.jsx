import { Link, useNavigate } from "react-router-dom"
import AuthService from "../../services/AuthService";
import { useEffect, useState } from "react";
import { faUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TopBar() {

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
    <div className="w-full font-logo mb-5 bg-white rounded-md shadow-md">
      <div className="flex w-full items-center p-2 justify-between">
        <div className="pl-2 text-xl font-bold">
          DASHBOARD
        </div>
        <div className="flex items-center space-x-4">
          <div className="pl-2 pr-3 py-2 transition-all uppercase rounded-md flex bg-secondary text-white">
            <div className="bg-gray-300 rounded-full mr-2 w-6 h-6 flex justify-center items-center">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div>
              {userEmail}
            </div>
          </div>
          <button onClick={handleLogout} className="px-10 py-2 transition-all rounded-md hover:bg-red-600 bg-red-500 text-white">
            <FontAwesomeIcon icon={faArrowRightFromBracket} /> LOGOUT
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default TopBar