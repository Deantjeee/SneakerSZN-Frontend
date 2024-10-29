import React, { useState, useEffect } from 'react';
import { Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import ToastNotification from '../../notifications/ToastNotification';
import { Label, TextInput, Select } from "flowbite-react";

function CreateSneaker() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [brandId, setBrandId] = useState('');
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`https://localhost:7187/api/Brand`);
        if (response.ok) {
          const data = await response.json();
          setBrands(data);
        } else {
          ToastNotification('error', 'Failed to fetch brands');
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
        ToastNotification('error', 'Error fetching brands');
      }
    };

    fetchBrands();
  }, []);

  const handleCreateSneaker = async () => {
    const response = await fetch(`https://localhost:7187/api/Sneaker`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name: name,
        size: size,
        price: price,
        stock: stock,
        brandId: brandId
      }),
    });

    if (response.status === 200) {
      ToastNotification('success', 'Created a new sneaker');
      return navigate("../../dashboard");
    } else if (response.status === 401) {
      ToastNotification('error', "You don't have the rights to do this");
    } else {
      ToastNotification('error', 'Error while creating sneaker');
    }
  };

  return (
    <div className="w-full h-full">
      <div>
        <h1 className="text-xl font-bold mb-4 font-logo">CREATE NEW SNEAKER</h1>
      </div>
      <div className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label className="w-full" htmlFor="small" value="Name" />
          </div>
          <TextInput id="small" type="text" onChange={(e) => setName(e.target.value)} sizing="sm" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="small" value="Size" />
          </div>
          <TextInput id="small" type="text" onChange={(e) => setSize(e.target.value)} sizing="sm" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="small" value="Price" />
          </div>
          <TextInput id="small" type="number" onChange={(e) => setPrice(e.target.value)} sizing="sm" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="small" value="Stock" />
          </div>
          <TextInput id="small" type="number" onChange={(e) => setStock(e.target.value)} sizing="sm" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="brand" value="Brand" />
          </div>
          <Select id="brand" onChange={(e) => setBrandId(e.target.value)} required>
            <option value="">Select a brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <button onClick={handleCreateSneaker} className="px-10 mt-10 py-2 transition-all rounded-md hover:bg-secondaryHover flex font-logo bg-secondary text-white">
        CREATE NEW <p className='ml-2'><FontAwesomeIcon icon={faPlus} /></p>
      </button>
    </div>
  );
}

export default CreateSneaker;