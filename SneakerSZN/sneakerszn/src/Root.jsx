import {Outlet} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/Elements/Navbar";

function Root(){
    return(
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.css" rel="stylesheet" />
            <NavBar/>
            <div className="Content-Box">
                <Outlet/>
            </div>
            <ToastContainer/>
        </>
    )
}
export default Root