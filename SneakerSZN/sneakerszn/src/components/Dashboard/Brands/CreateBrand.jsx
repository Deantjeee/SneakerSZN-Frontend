import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import ToastNotification from '../../../notifications/ToastNotification';
import { Label, TextInput } from "flowbite-react";

function CreateBrand() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [errors, setErrors] = useState([]); // State for error messages

  const handleCreate = async () => {
    setErrors([]); // Clear previous errors

    try {
      const response = await fetch(`http://localhost:5000/api/Brand`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      });

      if (response.status === 200) {
        ToastNotification('success', 'Created a new brand');
        return navigate("../dashboard/brands");
      } else if (response.status === 400) {
        const data = await response.json();
        if (data.errors) {
          // Parse ModelState errors
          const errorMessages = Object.values(data.errors).flat();
          setErrors(errorMessages);
        } else {
          ToastNotification('error', 'Invalid input');
        }
      } else if (response.status === 401) {
        ToastNotification('error', "You don't have the rights to do this");
      } else {
        ToastNotification('error', 'Error while creating brand');
      }
    } catch (error) {
      ToastNotification('error', 'An unexpected error occurred');
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full">
      <div>
        <h1 className="text-xl font-bold mb-3 font-logo">CREATE NEW BRAND</h1>
      </div>
      <hr />
      <div className="flex max-w-md mt-3 flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label className="w-full" htmlFor="small" value="Name" />
          </div>
          <TextInput id="small" placeholder="Enter brand name" type="text" onChange={(e) => setName(e.target.value)} sizing="sm" />
        </div>
        {/* Display validation errors */}
        {errors.length > 0 && (
          <div className="text-red-500 text-sm mt-2">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={handleCreate}
        className="px-10 mt-10 py-2 transition-all rounded-md hover:bg-secondaryHover flex font-logo bg-secondary text-white"
      >
        CREATE NEW <p className='ml-2'><FontAwesomeIcon icon={faPlus} /></p>
      </button>
    </div>
  );
}

export default CreateBrand;
