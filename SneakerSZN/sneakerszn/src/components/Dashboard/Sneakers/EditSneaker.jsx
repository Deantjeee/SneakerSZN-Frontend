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
  const [imageFile, setImageFile] = useState(null); // State for the new image file
  const [originalImage, setOriginalImage] = useState(''); // State for the original image

  useEffect(() => {
    const fetchSneaker = async () => {
      try {
        const response = await fetch(`https://localhost:7187/api/Sneaker/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch sneaker');
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
        setOriginalImage(`data:image/png;base64, ${sneakerData.image}`);
        
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
    const formData = new FormData(); // Use FormData for file upload
    formData.append("name", name);
    formData.append("size", size);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("brandId", brandId);

    if (imageFile) {
      formData.append("imageFile", imageFile); // Add image file to form data if selected
    }

    const response = await fetch(`https://localhost:7187/api/Sneaker/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.status === 200) {
      ToastNotification('success', 'Updated sneaker');
      return navigate("../dashboard/sneakers");
    } else {
      ToastNotification('error', 'Error while updating sneaker');
    }
  };

  return (
    <div className="w-full h-full">
      <div>
        <h1 className="text-xl font-bold mb-3 font-logo uppercase">EDIT {oldName}</h1>
      </div>
      <hr />
      <div className="flex max-w-md mt-3 flex-col gap-4">
        {originalImage && ( // Display original image if it exists
          <div className="mb-4">  
            <img src={originalImage} alt="Original Sneaker" className="h-32 w-auto object-contain mb-2" />
            <p>Current Image</p>
          </div>
        )}
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
              brand.id !== selectedBrandId && (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              )
            ))}
          </Select>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="imageFile" value="Upload Image" />
          </div>
          <input type="file" id="imageFile" onChange={(e) => setImageFile(e.target.files[0])} />
          <p className="text-sm text-gray-500">Leave blank to keep the original image.</p>
        </div>
      </div>
      <button onClick={handleUpdateSneaker} className="px-10 mt-10 py-2 transition-all rounded-md hover:bg-secondaryHover flex font-logo bg-secondary text-white">
        FINALIZE EDIT <p className='ml-2'><FontAwesomeIcon icon={faPen} /></p>
      </button>
    </div>
  );
}

export default EditSneaker;
