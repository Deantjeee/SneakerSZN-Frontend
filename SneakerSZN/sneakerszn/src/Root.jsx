import {Outlet} from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Root(){
    return(
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.css" rel="stylesheet" />
            {/* Navbar */}
            <div className="Content-Box">
                <Outlet/>
            </div>
            <ToastContainer/>
        </>
    )
}
export default Root