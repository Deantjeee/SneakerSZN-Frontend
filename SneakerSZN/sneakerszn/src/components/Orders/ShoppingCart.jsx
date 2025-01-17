import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ShoppingCart({ cart = [], setCart }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Calculate the total price of items in the cart
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total.toFixed(2));
  }, [cart]);

  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleIncreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Handle the proceed to payment action
  const handleProceedToPayment = () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Add some items before proceeding.");
    } else {
      navigate("/account/payment", { state: { cart } }); // Navigate to payment page and pass cart data
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.length > 0 ? (
        <>
          <div className="mb-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4 border-b pb-2"
              >
                <div className="flex items-center">
                  <img
                    src={`data:image/jpeg;base64,${item.image}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div>
                    <div className="font-bold text-lg">{item.name}</div>
                    <div>Size: {item.size}</div>
                    <div>Price: €{item.price}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-md"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="mx-4">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-md"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-500 font-bold"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="text-xl font-bold">
            Total: €{totalPrice}
          </div>
          <div className="mt-6">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleProceedToPayment} // Trigger payment process
            >
              Proceed to Payment
            </button>
          </div>
        </>
      ) : (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/" className="text-blue-500 underline">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
