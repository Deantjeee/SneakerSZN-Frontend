import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SideNavBar from "./components/Elements/SideNavBar";
import TopBar from "./components/Elements/TopBar";

function AdminRoot() {
  return (
    <>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.css" rel="stylesheet" />
      <div className="flex w-full min-h-dvh bg-backgroundLight">
        <div className="w-[18%]">
          <SideNavBar />
        </div>
        <div className="w-[82%] py-5 flex justify-center">
          <div className="w-[97%] ">
            <TopBar />
            <div className=" rounded-md w-full bg-white p-4 shadow-md">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
export default AdminRoot