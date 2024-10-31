import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from 'react-router-dom';
import ToastNotification from '../../../notifications/ToastNotification';
import { Label, TextInput, Select } from "flowbite-react";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function EditSneaker() {

  const navigate = useNavigate();

  const { id } = useParams();
  const [oldName, setOldName] = useState('');
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchSneaker = async () => {
      try {
        const response = await fetch(`https://localhost:7187/api/Sneaker/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch shoe');
        }
        const sneakerData = await response.json();

        setOldName(sneakerData.name);
        setName(sneakerData.name);
        setSize(sneakerData.size);
        setPrice(sneakerData.price);
        setStock(sneakerData.stock);
        setSelectedBrand(sneakerData.brand.name);
        setSelectedBrandId(sneakerData.brand.id);
        setBrandId(sneakerData.brand.id);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSneaker();
  }, [id]);

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
        price: price,
        stock: stock,
        brandId: brandId
      }),
    });

    if (response.status === 200) {
      ToastNotification('success', 'Updated sneaker');
      return navigate("../dashboard/sneakers")
    } else {
      ToastNotification('error', 'Error while updating sneaker');
    }
  }

  return (
    <div className="w-full h-full">
      <div>
        <h1 className="text-xl font-bold mb-3 font-logo uppercase">EDIT {oldName}</h1>
      </div>
      <hr />
      <div className="flex max-w-md mt-3 flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} sizing="sm" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="size" value="Size" />
          </div>
          <TextInput id="size" type="text" value={size} onChange={(e) => setSize(e.target.value)} sizing="sm" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Price" />
          </div>
          <TextInput id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} sizing="sm" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="stock" value="Stock" />
          </div>
          <TextInput id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} sizing="sm" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="brand" value="Brand" />
          </div>
          <Select id="brand" value={brandId} onChange={(e) => setBrandId(e.target.value)} required>
            <option key={selectedBrandId}>{selectedBrand}</option>
            {brands.map((brand) => (
              <>
                {brand.id === selectedBrandId ? (
                  <>
                  </>
                ) : (
                  <>
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  </>
                )}
              </>
            ))}
          </Select>
        </div>
      </div>
      <button onClick={handleUpdateSneaker} className="px-10 mt-10 py-2 transition-all rounded-md hover:bg-secondaryHover flex font-logo bg-secondary text-white">
        FINALIZE EDIT <p className='ml-2'><FontAwesomeIcon icon={faPen} /></p>
      </button>
    </div>
  )
}

export default EditSneaker