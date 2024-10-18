import React, { useState, useEffect } from 'react';
import { Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from 'react-router-dom';
import ToastNotification from '../../notifications/ToastNotification';
import { Label, TextInput } from "flowbite-react";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function EditSneaker() {

  const navigate = useNavigate();

  const { id } = useParams();
  const [oldName, setOldName] = useState('');
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchSneaker = async () => {
      try {
        const response = await fetch(`https://localhost:7187/api/Sneaker/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch shoe');
        }
        const sneakerData = await response.json();

        setOldName(sneakerData.name)
        setName(sneakerData.name);
        setSize(sneakerData.size);
        setPrice(sneakerData.price);

      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSneaker();

  }, [id]);

  const handleUpdateSneaker = async () => {
    const response = await fetch(`https://localhost:7187/api/Sneaker/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name: name,
        size: size,
        price: price
      }),
    });

    if (response.status === 200) {
      ToastNotification('success', 'Updated sneaker');
      return navigate("../../dashboard")
    } else {
      ToastNotification('error', 'Error while updating sneaker');
    }
  }

  return (
    <div className="w-full h-full">
      <div>
        <h1 className="text-xl font-bold mb-4 font-logo uppercase">{oldName}</h1>
      </div>
      <div className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label className="w-full" htmlFor="small" value="Name" />
          </div>
          <TextInput id="small" type="text" value={name} onChange={(e) => setName(e.target.value)} sizing="sm" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="small" value="Size" />
          </div>
          <TextInput id="small" type="text" value={size} onChange={(e) => setSize(e.target.value)} sizing="sm" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="small" value="Price" />
          </div>
          <TextInput id="small" type="number" value={price} onChange={(e) => setPrice(e.target.value)} sizing="sm" />
        </div>
      </div>
      <button className="px-10 mt-10 py-2 transition-all rounded-md hover:bg-secondaryHover flex font-logo bg-secondary text-white">
        FINALIZE EDIT <p className='ml-2'><FontAwesomeIcon icon={faPen} /></p>
      </button>
    </div>
  )
}

export default EditSneaker