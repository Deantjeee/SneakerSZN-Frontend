import { Button } from "flowbite-react";
import { Link } from "react-router-dom"

function NavBar() {
  return (
    <div className='w-full py-5 justify-center bg-main font-logo text-secondary flex shadow-md mb-8'>
      <div className="w-[98%] md:w-[80%] flex">
        <div id="logo" className="text-3xl flex items-center">
          <Link to="/">
            SNEAKERSZN
          </Link>
        </div>
        <div id="navbar-items" className="pl-10 flex items-center gap-5 w-full">
          <div className="flex gap-5">
            <Link to="/" className="hover:text-secondaryHover transition-all">
              HOME
            </Link>
            <Link to="/dashboard" className="hover:text-secondaryHover transition-all">
              DASHBOARD
            </Link>
          </div>
          <div className="ml-auto">
            <Link to="/login" className="">
              <button className="px-10 py-2 transition-all rounded-full hover:bg-secondaryHover bg-secondary text-white">
                LOGIN
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar