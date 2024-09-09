import { SneakerFormComponent } from "../Elements/SneakerForm";
import { Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from 'react-router-dom';

function CreateSneaker() {

  // const navigate = useNavigate();

  // const [name, setName] = useState('');
  // const [size, setSize] = useState('');
  // const [minimalPrice, setMinimalPrice] = useState('');

  // const handleCreateShoe = async () => {
  //   const response = await fetch(`https://localhost:7077/api/Shoe`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: name,
  //       size: size,
  //       minimalPrice: minimalPrice
  //     }),
  //   });

  //   if (response.status === 200) {
  //     ToastNotification('success', 'Created a new shoe');
  //     return navigate("../shoes")
  //   } else {
  //     ToastNotification('error', 'Error while creating shoe');
  //   }

  return (
    <div className="w-full h-full">
      <div className="Content-Box">
        <div>
          <h1 className="text-xl font-bold mb-4">Create New</h1>
        </div>
        <SneakerFormComponent />
        <Button className='mt-8 hover:bg-blue-800 transition-all' style={{ width: "180px" }} color="blue">
          Create New <p className='ml-2'><FontAwesomeIcon icon={faPlus} /></p>
        </Button>
      </div>
    </div>
  )
}

export default CreateSneaker