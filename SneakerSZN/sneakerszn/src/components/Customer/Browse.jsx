import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

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
        <div className="w-full mb-4">
          <div key={brand.id} className=" text-3xl pl-4 py-2 mb-2 font-bold font-logo uppercase bg-white border-r-4 border-b-4 border-gray-300 rounded-md">
            {brand.name}
          </div>
          <div className="w-full flex flex-wrap gap-[2%]">
            {sneakerData.map(sneaker => (
              <>
                {sneaker.brand.name === brand.name ? (
                  <div key={sneaker.id} className="w-[32%] mb-4 h-[400px] bg-white rounded-md border-r-4 border-b-4 border-gray-300">
                    <div className="w-full h-full">
                      <div className="p-[3%] w-full h-full">
                        <div className="w-full h-[80%] rounded-md bg-gray-400">

                        </div>
                        <div className="w-full h-[20%] pt-2 flex">
                          <div className="h-full w-[70%] flex items-center">
                            {sneaker.brand.name} <br />
                            {sneaker.name}
                          </div>
                          <div className="w-[30%] h-full flex items-center justify-center">
                            <button className="bg-secondary text-white w-14 h-14 rounded-full"><FontAwesomeIcon icon={faCartShopping} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Browse