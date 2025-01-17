import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/Elements/Navbar";

function Root() {
    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.css" rel="stylesheet" />
            <NavBar />
            <div className="flex justify-center bg-backgroundLight pt-28 min-h-dvh">
                <div className="w-[98%] md:w-[80%]">
                    <Outlet />
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default Root