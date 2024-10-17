import { Link } from "react-router-dom"

function NavBar() {
  return (
    <div className='w-full p-5 bg-main font-logo text-secondary flex shadow-md mb-8'>
      <div id="logo" className="text-3xl">
        SNEAKERSZN
      </div>
      <div id="navbar items" className="pl-10 flex items-center gap-5 ">
        <Link to="/" className="hover:text-secondaryHover transition-all">
          HOME
        </Link>
        <Link to="/dashboard" className="hover:text-secondaryHover transition-all">
          DASHBOARD
        </Link>
      </div>
    </div>
  );
}

export default NavBar