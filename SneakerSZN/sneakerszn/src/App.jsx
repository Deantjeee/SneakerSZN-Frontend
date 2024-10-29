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
            <Route path="admin" element={<AdminRoot />}>
              <Route path="dashboard" element={<ProtectedRoute requiredRole="Admin"><AllSneakers /></ProtectedRoute>} />
              <Route path="dashboard/sneaker/create" element={<ProtectedRoute requiredRole="Admin"><CreateSneaker /></ProtectedRoute>} />
              <Route path="dashboard/sneaker/:id/edit" element={<ProtectedRoute requiredRole="Admin"><EditSneaker /></ProtectedRoute>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer stacked />
    </>
  );
}

export default App;
