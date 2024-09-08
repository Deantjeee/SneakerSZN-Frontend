import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AllSneakers from '../src/components/Sneakers/AllSneakers';
import Root from "./Root";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Root/>}>
              <Route path="/overview" element={<AllSneakers/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer stacked/>
    </>
  );
}

export default App;
