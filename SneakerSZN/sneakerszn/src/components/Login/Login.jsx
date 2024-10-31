import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthService from "../../services/AuthService";
import ToastNotification from "../../notifications/ToastNotification";
import NavBar from "../Elements/Navbar";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if(AuthService.isAuthenticated()) {
      return navigate("/");
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await AuthService.login(email, password);
      return navigate('/admin/dashboard/sneakers'); 
    } catch (error) {
      ToastNotification('error', error.message);
    }
  };

  return (
    <div>
      <div className="font-logo text-2xl text-center pb-10">
        LOG INTO YOUR ACCOUNT
      </div>
      <div>
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="flex justify-center">
            <button onClick={handleLogin} className="px-10 py-2 transition-all rounded-full hover:bg-secondaryHover font-logo bg-secondary text-white">
              LOG IN
            </button>
          </div>
          <div className="w-full pt-3 text-center">
            <Link to="/register" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              Don't have an account yet, sign up here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login