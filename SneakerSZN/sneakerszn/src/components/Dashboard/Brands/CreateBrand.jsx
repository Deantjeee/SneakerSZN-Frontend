import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import ToastNotification from '../../../notifications/ToastNotification';
import { Label, TextInput} from "flowbite-react";

function CreateBrand() {
  const navigate = useNavigate();

  const [name, setName] = useState('');

  const handleCreate = async () => {

    if(name === null || name === "") {
      ToastNotification('error', 'Every field needs to be filled in!');
    }
    else {
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
      } else if (response.status === 401) {
        ToastNotification('error', "You don't have the rights to do this");
      } else {
        ToastNotification('error', 'Error while creating brand');
      }
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
          <TextInput id="small" type="text" onChange={(e) => setName(e.target.value)} sizing="sm" />
        </div>
      </div>
      <button onClick={handleCreate} className="px-10 mt-10 py-2 transition-all rounded-md hover:bg-secondaryHover flex font-logo bg-secondary text-white">
        CREATE NEW <p className='ml-2'><FontAwesomeIcon icon={faPlus} /></p>
      </button>
    </div>
  );
}

export default CreateBrand