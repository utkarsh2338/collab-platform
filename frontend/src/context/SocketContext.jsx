import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        socketRef.current = io("http://localhost:5000", {
            auth: { token },
        });

        socketRef.current.on("connect", () => {
            console.log("🔌 Connected:", socketRef.current.id);
        });

        socketRef.current.on("disconnect", () => {
            console.log("❌ Disconnected");
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socketRef.current}>
            {children}
        </SocketContext.Provider>
    );
};
