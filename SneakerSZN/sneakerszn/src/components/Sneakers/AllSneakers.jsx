import React, { useState, useEffect } from 'react';
import { Table, Button } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function AllSneakers() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7187/api/Sneaker')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="mt-8">
      <div className="w-full flex justify-center">
        <div style={{ width: "80%" }}>
          <Link to="../sneaker/create">
            <Button className='mb-4 hover:bg-blue-800 transition-all' style={{ width: "180px" }} color="blue">
              Create New <p className='ml-2'><FontAwesomeIcon icon={faPlus} /></p>
            </Button>
          </Link>
          <div className="overflow-x-auto rounded-md">
            <Table>
              <Table.Head>
                <Table.HeadCell>Product Name</Table.HeadCell>
                <Table.HeadCell>Size</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit </span>
                </Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {data.map(item => (
                  <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </Table.Cell>
                    <Table.Cell>{item.size}</Table.Cell>
                    <Table.Cell>€{item.price}</Table.Cell>
                    <Table.Cell>
                      <Link to={`../sneaker/${item.id}/edit`} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
                        Edit <FontAwesomeIcon icon={faPen} />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <a href="#" className="font-medium text-red-600 hover:underline dark:text-red-500">
                        Delete <FontAwesomeIcon icon={faTrash} />
                      </a>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllSneakers;
