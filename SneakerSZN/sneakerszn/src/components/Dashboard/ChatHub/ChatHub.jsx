import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import ToastNotification from '../../../notifications/ToastNotification';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { Label, TextInput } from 'flowbite-react';

const ChatHub = () => {
  const [message, setMessage] = useState('');
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/chathub')
      .build();

    newConnection
      .start()
      .then(() => {
        console.log('SignalR Connected');
      })
      .catch((err) => console.log('Error connecting to SignalR:', err));

    newConnection.on('ReceiveMessage', (message) => {
      console.log('New message received:', message);
      ToastNotification('info', message);
    });

    setConnection(newConnection);

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, []);

  const sendMessage = async () => {
    if (connection && message.trim()) {
      try {
        console.log('Sending message:', message);
        await connection.send('SendMessageToAll', message);
        setMessage('');
      } catch (err) {
        console.error('Error sending message:', err);
      }
    } else {
      console.log('No connection or message is empty');
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold mb-3 font-logo">CHATHUB</h1>
      </div>
      <hr />
      <div className="flex max-w-md flex-col mt-3">
        <div className="mb-2 block">
          <Label htmlFor="message" value="Message" />
        </div>
        <TextInput
          id="message"
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          sizing="sm"
          placeholder="Enter a message"
        />
      </div>
      <button
        onClick={sendMessage}
        className="px-10 mt-10 py-2 transition-all rounded-md hover:bg-secondaryHover flex font-logo bg-secondary text-white"
      >
        SEND MESSAGE <p className='ml-2'><FontAwesomeIcon icon={faMessage} /></p>
      </button>
    </div>
  );
};

export default ChatHub;
