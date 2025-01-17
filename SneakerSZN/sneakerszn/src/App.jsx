import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useState
import AllSneakers from './components/Dashboard/Sneakers/AllSneakers';
import CreateSneaker from './components/Dashboard/Sneakers/CreateSneaker';
import EditSneaker from './components/Dashboard/Sneakers/EditSneaker';
import AllBrands from './components/Dashboard/Brands/AllBrands';
import CreateBrand from './components/Dashboard/Brands/CreateBrand';
import EditBrand from './components/Dashboard/Brands/EditBrand';
import Overview from './components/Dashboard/Overview/Overview';
import Root from "./Root";
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoot from './AdminRoot';
import MyOrders from './components/Orders/MyOrders';
import AuthService from './services/AuthService';
import Browse from './components/Customer/Browse';
import ChatHub from './components/Dashboard/ChatHub/ChatHub';
import ShoppingCart from './components/Orders/ShoppingCart';
import Payment from './components/Orders/Payment';

function App() {

  const [cart, setCart] = useState([]); // State to store the shopping cart items

  // Ensure that the cart data is persistent across page refreshes
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Whenever cart is updated, store it in localStorage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const stripePromise = loadStripe('pk_test_51Qi0gxRojpK2vozcvwxcHm95kyYMfUBvDbQ9mm1QrTiuKR4h8NxNZYoEPQu4cXSPfbVwRewG55pVdmWFRVIDS03600grSJ53DU'); // Replace with your public key

  return (
    <>
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="" element={<Root />}>
              <Route path="" element={<Browse cart={cart} setCart={setCart} />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* ACCOUNT ROUTES */}
            <Route path="account" element={<ProtectedRoute requiredRole=""><Root /></ProtectedRoute>}>
              <Route path="myorders" element={<MyOrders />} />
              <Route path="mycart" element={<ShoppingCart cart={cart} setCart={setCart} />} />
              <Route path="payment" element={<Payment cart={cart} setCart={setCart}/>} />
            </Route>

            {/* ADMIN ROUTES */}
            <Route path="admin" element={<ProtectedRoute requiredRole="Admin"><AdminRoot /></ProtectedRoute>}>
              <Route path="dashboard/overview" element={<Overview />} />
              <Route path="dashboard/sneakers" element={<AllSneakers />} />
              <Route path="dashboard/sneakers/create" element={<CreateSneaker />} />
              <Route path="dashboard/sneakers/:id/edit" element={<EditSneaker />} />
              <Route path="dashboard/brands" element={<AllBrands />} />
              <Route path="dashboard/brands/create" element={<CreateBrand />} />
              <Route path="dashboard/brands/:id/edit" element={<EditBrand />} />
              <Route path="dashboard/chathub" element={<ChatHub />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer stacked />
      </Elements>
    </>
  );
}

export default App;
