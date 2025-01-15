import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import ToastNotification from '../../../notifications/ToastNotification';
import { Label, TextInput, Select } from "flowbite-react";

function CreateSneaker() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [brandId, setBrandId] = useState('');
  const [brands, setBrands] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState([]); // State for all errors (ModelState + client-side)

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/Brand`);
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

  const validateInputs = () => {
    const validationErrors = [];
    if (!name.trim()) validationErrors.push('Sneaker name is required.');
    if (!size.trim()) validationErrors.push('Sneaker size is required.');
    if (!price.trim()) validationErrors.push('Sneaker price is required.');
    if (!stock.trim()) validationErrors.push('Sneaker stock is required.');
    if (!brandId) validationErrors.push('Brand selection is required.');
    return validationErrors;
  };

  const handleCreateSneaker = async () => {
    const clientErrors = validateInputs();
    if (clientErrors.length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors([]); // Clear previous errors

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Size', size);
    formData.append('Price', price);
    formData.append('Stock', stock);
    formData.append('BrandId', brandId);
    formData.append('ImageFile', imageFile);

    try {
      const response = await fetch(`http://localhost:7187/api/Sneaker`, {
        method: "POST",
        body: formData
      });

      if (response.status === 200) {
        ToastNotification('success', 'Created a new sneaker');
        navigate("../dashboard/sneakers");
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
        ToastNotification('error', 'Error while creating sneaker');
      }
    } catch (error) {
      console.error('Error creating sneaker:', error);
      ToastNotification('error', 'An unexpected error occurred');
    }
  };

  return (
    <div className="w-full h-full">
      <div>
        <h1 className="text-xl font-bold mb-3 font-logo">CREATE NEW PRODUCT</h1>
      </div>
      <hr />
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
      <div className="flex max-w-md flex-col mt-3 gap-4">
        <div>
          <div className="mb-2 block">
            <Label className="w-full" htmlFor="name" value="Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            sizing="sm"
            placeholder="Enter sneaker name"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="size" value="Size" />
          </div>
          <TextInput
            id="size"
            type="text"
            onChange={(e) => setSize(e.target.value)}
            sizing="sm"
            placeholder="Enter sneaker size in EU sizing"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Price" />
          </div>
          <TextInput
            id="price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            sizing="sm"
            placeholder="Enter sneaker price"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="stock" value="Stock" />
          </div>
          <TextInput
            id="stock"
            type="number"
            onChange={(e) => setStock(e.target.value)}
            sizing="sm"
            placeholder="Enter sneaker stock"
          />
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
        <div>
          <div className="mb-2 block">
            <Label htmlFor="image" value="Sneaker Image" />
          </div>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>
      </div>
      <button
        onClick={handleCreateSneaker}
        className="px-10 mt-10 py-2 transition-all rounded-md hover:bg-secondaryHover flex font-logo bg-secondary text-white"
      >
        CREATE NEW <p className='ml-2'><FontAwesomeIcon icon={faPlus} /></p>
      </button>
    </div>
  );
}

export default CreateSneaker;
