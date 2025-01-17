import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Browse({ cart, setCart }) {
  const [sneakerData, setSneakerData] = useState([]);
  const [usableBrands, setUsableBrands] = useState([]);
  const [brandData, setBrandData] = useState([]);

  const fetchUsableBrands = () => {
    const usableBrandsAsMap = {};

    sneakerData.forEach((sneaker) => {
      usableBrandsAsMap[sneaker.brand.name] = sneaker.brand;
    });

    setUsableBrands(Object.values(usableBrandsAsMap));
  };

  const fetchSneakers = () => {
    fetch("http://localhost:5000/api/Sneaker")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSneakerData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchBrands = () => {
    fetch("http://localhost:5000/api/Brand")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBrandData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleAddToCart = (sneaker) => {
    const existingItemIndex = cart.findIndex((item) => item.id === sneaker.id);

    if (existingItemIndex !== -1) {
      // If item is already in cart, update quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If item is not in cart, add to cart
      const updatedCart = [...cart, { ...sneaker, quantity: 1 }];
      setCart(updatedCart);
    }
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
      {usableBrands.map((brand) => (
        <div key={brand.id} className="w-full mb-4">
          <div className="text-3xl pl-4 py-2 mb-2 font-bold font-logo uppercase bg-white border-r-4 border-b-4 border-gray-300 rounded-md">
            {brand.name}
          </div>
          <div className="w-full flex flex-wrap gap-[2%]">
            {sneakerData.map((sneaker) =>
              sneaker.brand.name === brand.name ? (
                <div
                  key={sneaker.id}
                  className="w-[32%] mb-4 h-[450px] bg-white rounded-md border-r-4 border-b-4 border-gray-300"
                >
                  <div className="w-full h-full">
                    <div className="p-[3%] w-full h-full">
                      <div className="w-full h-[80%] overflow-hidden rounded-md bg-gray-200">
                        <img
                          src={`data:image/jpeg;base64,${sneaker.image}`}
                          alt={sneaker.name}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="w-full h-[20%] pt-2 flex justify-between">
                        <div className="h-full flex items-center">
                          <div>
                            <span className="font-logo uppercase">
                              {sneaker.brand.name + " "}
                              {sneaker.name}
                            </span>
                            <br />
                            Size: {sneaker.size} <br />
                            € {sneaker.price}
                          </div>
                        </div>
                        <div className="h-full flex items-center ml-auto">
                          <button
                            onClick={() => handleAddToCart(sneaker)}
                            className="hover:bg-secondaryHover transition-all bg-secondary text-white w-14 h-14 rounded-full"
                          >
                            <FontAwesomeIcon icon={faCartShopping} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      ))}
      {/* Optionally, you can add a link to the shopping cart page */}
      <Link to="/account/mycart" className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full">
        Go to Cart ({cart.length})
      </Link>
    </div>
  );
}

export default Browse;
