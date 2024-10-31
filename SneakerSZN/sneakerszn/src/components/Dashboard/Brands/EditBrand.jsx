import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from 'react-router-dom';
import ToastNotification from '../../../notifications/ToastNotification';
import { Label, TextInput } from "flowbite-react";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function EditBrand() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [name, setName] = useState('');
  const [oldName, setOldName] = useState('');

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await fetch(`https://localhost:7187/api/Brand/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch brand');
        }
        const data = await response.json();

        setOldName(data.name);
        setName(data.name);
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBrand();
  }, [id]);

  const handleUpdate = async () => {
    const response = await fetch(`https://localhost:7187/api/Brand/${id}`, {
      method: "PUT",
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
      ToastNotification('error', 'Error while editing brand');
    }
  };

  return (
    <div className="w-full h-full">
      <div>
        <h1 className="text-xl font-bold mb-3 font-logo uppercase">EDIT {oldName}</h1>
      </div>
      <hr />
      <div className="flex max-w-md flex-col mt-3 gap-4">
        <div>
          <div className="mb-2 block">
            <Label className="w-full" htmlFor="small" value="Name" />
          </div>
          <TextInput id="small" type="text" value={name} onChange={(e) => setName(e.target.value)} sizing="sm" />
        </div>
      </div>
      <button onClick={handleUpdate} className="px-10 mt-10 py-2 transition-all rounded-md hover:bg-secondaryHover flex font-logo bg-secondary text-white">
        FINALIZE EDIT <p className='ml-2'><FontAwesomeIcon icon={faPen} /></p>
      </button>
    </div>
  );
}

export default EditBrand