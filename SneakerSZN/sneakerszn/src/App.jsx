import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
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


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="" element={<Root />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* ACCOUNT ROUTES */}
            <Route path="account" element={<ProtectedRoute requiredRole=""><Root /></ProtectedRoute>}>
              <Route path="myorders" element={<MyOrders />} />
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
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer stacked />
    </>
  );
}

export default App;
