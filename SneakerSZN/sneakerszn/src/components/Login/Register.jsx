import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToastNotification from "../../notifications/ToastNotification";
import AuthService from "../../services/AuthService";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState([]); // Array for error messages

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      navigate("/");
    }
  }, []);

  const validateInputs = () => {
    const validationErrors = [];
    if (!email.trim()) validationErrors.push("Email is required.");
    if (!password.trim()) validationErrors.push("Password is required.");
    if (!repeatPassword.trim()) validationErrors.push("Repeat password is required.");
    if (password !== repeatPassword) validationErrors.push("The passwords do not match.");
    return validationErrors;
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    // Client-side validation
    const clientErrors = validateInputs();
    if (clientErrors.length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors([]); // Clear errors

    try {
      const response = await fetch(`http://localhost:5000/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        ToastNotification("success", "Successfully signed up!");
        return navigate("/login");
      } else if (response.status === 400) {
        // Parse .NET Core Identity errors from the response
        const data = await response.json();
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat();
          setErrors(errorMessages); // Display errors
        } else {
          ToastNotification("error", "Invalid input.");
        }
      } else {
        ToastNotification("error", "An error occurred during registration.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      ToastNotification("error", "Unexpected error occurred.");
    }
  };

  return (
    <div>
      <div className="font-logo text-2xl text-center pb-10">SIGN UP NOW</div>
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
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@example.com"
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
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="repeat-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Repeat password
            </label>
            <input
              type="password"
              id="repeat-password"
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          {/* Display validation errors */}
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
              onClick={handleCreateUser}
              className="px-10 py-2 transition-all rounded-full hover:bg-secondaryHover font-logo bg-secondary text-white"
            >
              REGISTER
            </button>
          </div>
          <div className="w-full pt-3 text-center">
            <Link
              to="/login"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Already have an account? Log in here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
