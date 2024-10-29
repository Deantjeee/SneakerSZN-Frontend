import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SideNavBar from "./components/Elements/SideNavBar";

function AdminRoot() {
    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.css" rel="stylesheet" />
            <SideNavBar/>
            <div className="flex justify-center">
                <div className="w-[98%] md:w-[80%]">
                    <Outlet />
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default AdminRoot