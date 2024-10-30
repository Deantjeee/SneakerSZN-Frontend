import React, { useState, useEffect } from 'react';
import { Table, Button } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, redirect } from 'react-router-dom';
import ToastNotification from '../../../notifications/ToastNotification';
import AuthService from '../../../services/AuthService';

function AllBrands() {
  const [data, setData] = useState([]);

  const fetchBrands = () => {
    fetch('https://localhost:7187/api/Brand')
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
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  async function handleDelete(id) {
    const response = await fetch(`https://localhost:7187/api/Brand/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if (response.status === 200) {
      ToastNotification('success', 'Deleted sneaker');
      fetchBrands();
    } else {
      ToastNotification('error', 'Error while deleting sneaker');
    }
  }

  return (
    <div className="">
      { AuthService.isAuthenticated() ? (
      <div className="w-full ">
        <div className='w-full flex flex-col'>
          <div className="flex mb-4">
            <Link to="./create" className=''>
              <button className="px-10 py-2 transition-all rounded-md hover:bg-secondaryHover flex font-logo bg-secondary text-white">
                CREATE NEW <p className='ml-2'><FontAwesomeIcon icon={faPlus} /></p>
              </button>
            </Link>
          </div>
          <div className="overflow-x-auto rounded-md">
            <Table>
              <Table.Head>
                <Table.HeadCell>Brand Name</Table.HeadCell>
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
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white py-3">
                      {item.name}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`./${item.id}/edit`} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
                        Edit <FontAwesomeIcon icon={faPen} />
                      </Link>
                    </Table.Cell>
                    <Table.Cell className='py-3'>
                      <Button onClick={() => handleDelete(item.id)} className="font-medium text-red-600 hover:underline dark:text-red-500">
                        Delete <FontAwesomeIcon className='ml-1 mt-1' icon={faTrash} />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    ) : (
      <div>
        Not logged in
      </div>
    )}
    </div>
  )
}

export default AllBrands