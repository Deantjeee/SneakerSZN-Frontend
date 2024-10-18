import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ToastNotification from "../../notifications/ToastNotification";

function Register() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = async (e) => {

    e.preventDefault();

    const response = await fetch(`https://localhost:7187/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    });

    if (response.ok) {
      ToastNotification('success', 'Succesfully signed up!');
      return navigate("/login");
    } else {
      ToastNotification('error', 'Error while creating your account');
    }
  }
  
  return (
    <div>
      <div className="font-logo text-2xl text-center pb-10">
        SIGN UP NOW
      </div>
      <div>
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
          </div>
          <div className="mb-5">
            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
          <div className="flex justify-center">
            <button onClick={handleCreateUser} className="px-10 py-2 transition-all rounded-full hover:bg-secondaryHover font-logo bg-secondary text-white">
              REGISTER
            </button>
          </div>
          <div className="w-full pt-3 text-center">
            <Link to="/login" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              Already have an account? Log in here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register