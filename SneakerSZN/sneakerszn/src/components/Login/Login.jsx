import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import ToastNotification from "../../notifications/ToastNotification";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      return navigate("/");
    }
  }, []);

  const validateInputs = () => {
    const validationErrors = [];
    if (!email.trim()) validationErrors.push("Email is required.");
    if (!password.trim()) validationErrors.push("Password is required.");
    return validationErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Client-side validation
    const clientErrors = validateInputs();
    if (clientErrors.length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors([]); // Clear errors

    try {
      await AuthService.login(email, password);
      navigate("/admin/dashboard/sneakers");
    } catch (error) {
      // Handle backend errors
      if (error.response && error.response.data && error.response.data.errors) {
        const backendErrors = Object.values(error.response.data.errors).flat();
        setErrors(backendErrors); // Set backend errors
      } else {
        setErrors([error.message || "An error occurred during login."]);
      }
      ToastNotification("error", "Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div>
      <div className="font-logo text-2xl text-center pb-10">LOG INTO YOUR ACCOUNT</div>
      <div>
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              data-selenium="login-input-username"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          {errors.length > 0 && (
            <div className="text-red-500 text-sm mt-2">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
              <br />
            </div>
          )}
          <div className="flex justify-center">
            <button
              onClick={handleLogin}
              className="px-10 py-2 transition-all rounded-full hover:bg-secondaryHover font-logo bg-secondary text-white"
            >
              LOG IN
            </button>
          </div>
          <div className="w-full pt-3 text-center">
            <Link
              to="/register"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Don't have an account yet, sign up here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
