import React, { createContext, useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

// Create a SignalR context
export const SignalRContext = createContext();

const SignalRProvider = ({ children }) => {
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

        setConnection(newConnection);

        // Cleanup connection on unmount
        return () => {
            if (newConnection) {
                newConnection.stop();
            }
        };
    }, []);

    return (
        <SignalRContext.Provider value={{ connection }}>
            {children}
        </SignalRContext.Provider>
    );
};

export default SignalRProvider;