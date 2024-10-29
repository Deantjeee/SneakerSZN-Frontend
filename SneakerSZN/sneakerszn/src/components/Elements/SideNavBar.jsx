import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom"
import AuthService from "../../services/AuthService";
import { useEffect, useState } from "react";
import { faUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavBar() {

  return (
    <div className="h-dvh bg-main w-full flex justify-center font-logo">
      <div className="w-[80%]">
        <div className="text-3xl pt-4 text-secondary">
          SNEAKERSZN
        </div>
        <div className="gap-5 mt-10 text-lg">
          <div className="">
            <Link to="./dashboard/sneakers" className="hover:text-secondaryHover transition-all active:text-secondaryHover">
              SNEAKERS
            </Link>
          </div>
          <div>
            <Link to="./dashboard/brands" className="hover:text-secondaryHover transition-all active:text-secondaryHover">
              BRANDS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar