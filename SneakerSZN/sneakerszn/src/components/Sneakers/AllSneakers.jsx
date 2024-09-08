import React, { useState, useEffect } from 'react';

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
    <div>
      <div className="w-full flex justify-center">
        <div className="w-5/6">
          <div className="w-full flex gap-6 flex-row col-span-4">
            {data.map(item => (
              <div key={item.id} className=" w rounded-md ">
                <div className="w-[25%]">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.size}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllSneakers;
