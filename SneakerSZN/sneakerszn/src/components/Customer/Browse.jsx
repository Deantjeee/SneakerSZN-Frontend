import { useEffect, useState } from "react";

function Browse() {

  const [sneakerData, setSneakerData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [usableBrands, setUsableBrands] = useState([]);

  const fetchUsableBrands = () => {
    const usableBrandsAsMap = {};

    sneakerData.forEach(sneaker => {
      usableBrandsAsMap[sneaker.brand.name] = sneaker.brand;
    });
    
    setUsableBrands(Object.values(usableBrandsAsMap));
  };

  const fetchSneakers = () => {
    fetch('https://localhost:7187/api/Sneaker')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSneakerData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchBrands = () => {
    fetch('https://localhost:7187/api/Brand')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBrandData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchSneakers();
    fetchBrands();
  }, []);

  useEffect(() => {
    if (sneakerData.length > 0) {
      fetchUsableBrands();
    }
  }, [sneakerData]);

  return (
    <div className="w-full">
      {usableBrands.map(brand => (
        <div key={brand.id} className="w-full mb-4">
          <div className="text-3xl pl-4 py-2 mb-2 font-bold font-logo uppercase bg-white border-r-4 border-b-4 border-gray-300 rounded-md">
            {brand.name}
          </div>
          <div className="w-full flex flex-wrap gap-[2%]">
          {sneakerData.map(sneaker => (
            <>
              {sneaker.brand.name === brand.name ? (
                <div className="w-[32%] h-80 bg-white rounded-md border-r-4 border-b-4 border-gray-300">
                  <div className="w-full h-full p-2">
                    {sneaker.name}
                  </div>
                </div>
              ) : null }
            </>
          ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Browse