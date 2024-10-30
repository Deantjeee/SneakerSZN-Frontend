import { Link, NavLink, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge, faBox, faBriefcase } from '@fortawesome/free-solid-svg-icons';

function SideNavBar() {

  const navlinks = [
    { name: "DASHBOARD", href: "/admin/dashboard/overview", icon: faGauge },
    { name: "PRODUCTS", href: "/admin/dashboard/sneakers", icon: faBox },
    { name: "BRANDS", href: "/admin/dashboard/brands", icon: faBriefcase }
  ]

  return (
    <div className="h-dvh bg-main w-[18%] flex justify-center fixed font-logo">
      <div className="w-[80%]">
        <div className="text-3xl mt-3 pt-1 text-secondary text-center pb-1 border-b-4  border-secondary rounded-xl">
          SNEAKERSZN
        </div>
        <div className="mt-10 text-lg w-full">
          {navlinks.map(item => (
            <div className="w-full mb-1">
              <NavLink to={item.href} className={({ isActive }) => {
                return "hover:bg-secondaryHover w-full text-white transition-all py-2 block rounded-xl bg-secondary " +
                  (isActive == true
                    ? "border-l-4 pl-4 border-gray-100 bg-secondaryHover"
                    : "pl-8"
                  );
              }}>
                {item.icon != null ? (
                  <div>
                    <FontAwesomeIcon icon={item.icon} className="mr-2" />
                    {item.name}
                  </div>
                ) : (
                  <div>
                    {item.name}
                  </div>
                )}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideNavBar