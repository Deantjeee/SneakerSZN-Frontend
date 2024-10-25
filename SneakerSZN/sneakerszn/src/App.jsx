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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ADMIN ROUTES */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole="Admin">
                  <AllSneakers />
                </ProtectedRoute>
              }
            />
            <Route path="/dashboard/sneaker/create" element={<CreateSneaker />} />
            <Route path="/dashboard/sneaker/:id/edit" element={<EditSneaker />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer stacked />
    </>
  );
}

export default App;
