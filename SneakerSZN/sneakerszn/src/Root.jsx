import {Outlet} from "react-router-dom";

function Root(){
    return(
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.css" rel="stylesheet" />
            {/* Navbar */}
            <Outlet/>
        </>
    )
}
export default Root