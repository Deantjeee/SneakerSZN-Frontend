import { SneakerFormComponent } from "../Elements/SneakerForm";
import { Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function EditSneaker() {
  return (
    <div className="w-full h-full">
      <div className="Content-Box">
        <div>
          <h1 className="text-xl font-bold mb-4">Sneaker Name</h1>
        </div>
        <SneakerFormComponent />
        <Button className='mt-8 hover:bg-blue-800 transition-all' style={{ width: "180px" }} color="blue">
          Finalize Edit <p className='ml-2'><FontAwesomeIcon icon={faPen} /></p>
        </Button>
      </div>
    </div>
  )
}

export default EditSneaker