import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Label } from 'flowbite-react';
import ToastNotification from '../../notifications/ToastNotification';

function Payment({ cart, setCart }) {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]); // State to manage form errors

  // Calculate the total amount of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Call the backend to create the PaymentIntent
  const createPaymentIntent = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/paymentintent/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: calculateTotal(), description: 'Sneaker Shop Payment' })
      });

      if (response.ok) {
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } else {
        ToastNotification('error', 'Failed to create payment intent');
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
      setError('Error creating payment intent');
    }
  };

  // Handle form submission and payment
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
  
    if (!stripe || !elements || !clientSecret) return; // Make sure Stripe is loaded and clientSecret is available
  
    setLoading(true);
    setError(null); // Clear previous errors
  
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
  
      if (error) {
        setError(error.message);
        setLoading(false);
      } else if (paymentIntent.status === 'succeeded') {
        ToastNotification('success', 'Payment successful');
        setCart([]); // Clear the cart on successful payment
        navigate('/'); // Redirect to the home page (or shopping page)
      } else {
        setError('Payment failed');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  useEffect(() => {
    createPaymentIntent();
  }, [cart]);

  return (
    <div className='flex items-center justify-center'>
      <div className="w-[50%] h-full">
        <h1 className="text-xl font-bold mb-3 font-logo">COMPLETE YOUR PAYMENT</h1>
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

        {/* Display general errors */}
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}

        <div onSubmit={handlePaymentSubmit} className="flex flex-col gap-4 mt-3">
          {/* Card input element */}
          <div className='mb-8'>
            <div className="mb-2 block">
              <Label htmlFor="card" value="Card Details" />
            </div>
            <CardElement id="card" options={{ hidePostalCode: true }} />
          </div>

          <div className='flex items-center justify-center'>
            <button onClick={handlePaymentSubmit} className="px-10 py-2 w-[50%] transition-all rounded-full font-logo hover:bg-secondaryHover bg-secondary text-white">
              {loading ? 'Processing...' : 'PAY NOW'}
            </button>
          </div>

        </div>

        <div className="mt-4">
          <strong>Total: €{calculateTotal()}</strong>
        </div>

        <br />
        <br />
        <div>
          <b>TEST PAYMENT INFO:</b> <br /> <br />
          <div className='bg-white w-fit p-3 mb-2'>
            Test card for a successful payment <br />
            Card number: 4242 4242 4242 4242 - Expiration Date: 12/25 - CVC: 123
          </div>
          <div className='bg-white w-fit p-3 mb-2'>
            Test card for insufficient funds <br />
            Card number: 4000 0000 0000 9995 - Expiration Date: 12/25 - CVC: 123
          </div>
          <div className='bg-white w-fit p-3 mb-2'>
            Test card for a declined card <br />
            Card number: 4000 0000 0000 9987 - Expiration Date: 12/25 - CVC: 123
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
