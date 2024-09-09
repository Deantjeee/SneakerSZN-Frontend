import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AllSneakers from '../src/components/Sneakers/AllSneakers';
import Root from "./Root";
import CreateSneaker from './components/Sneakers/CreateSneaker';
import EditSneaker from './components/Sneakers/EditSneaker';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Root/>}>
              <Route path="/sneaker/overview" element={<AllSneakers/>}/>
              <Route path="/sneaker/create" element={<CreateSneaker/>}/>
              <Route path="/sneaker/:id/edit" element={<EditSneaker/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer stacked/>
    </>
  );
}

export default App;
