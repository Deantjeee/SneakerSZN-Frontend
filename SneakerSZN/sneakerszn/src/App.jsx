import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AllSneakers from '../src/components/Sneakers/AllSneakers';
import Root from "./Root";
import CreateSneaker from './components/Sneakers/CreateSneaker';
import EditSneaker from './components/Sneakers/EditSneaker';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoot from './AdminRoot';
import AllBrands from './components/Brands/AllBrands';
import CreateBrand from './components/Brands/CreateBrand';
import EditBrand from './components/Brands/EditBrand';

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

            {/* ADMIN ROUTES */}
            <Route path="admin" element={<ProtectedRoute requiredRole="Admin"><AdminRoot /></ProtectedRoute>}>
              <Route path="dashboard/sneakers" element={<AllSneakers />}/>
              <Route path="dashboard/sneakers/create" element={<CreateSneaker />}/>
              <Route path="dashboard/sneakers/:id/edit" element={<EditSneaker />}/>

              <Route path="dashboard/brands" element={<AllBrands />}/>
              <Route path="dashboard/brands/create" element={<CreateBrand />}/>
              <Route path="dashboard/brands/:id/edit" element={<EditBrand />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer stacked />
    </>
  );
}

export default App;
