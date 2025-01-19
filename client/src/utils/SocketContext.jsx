import React, { createContext, useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export const SocketContext = createContext();




export const SocketProvider = ({ children }) => {
    const authUser = useSelector((state) => state?.auth?.authUser);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);
  
  console.log(messages);
  
   useEffect(() => {
     if (authUser?._id) {
       const newSocket = io("http://localhost:4000", {
         query: {
           userId: authUser._id,
         },
       });
       setSocket(newSocket);

        newSocket.on("connect", () => {
          console.log("Socket connected:", newSocket.id);
        });

        newSocket.on("getOnlineUsers", (userIds) => {
          setOnlineUsers(userIds);
        });

        return () => {
          newSocket.disconnect();
          setSocket(null);
        };
     }
}, [authUser]);
      
    useEffect(() => {
      if (!socket) return;

      const handleNewMessage = (newMessage) => {
        console.log(newMessage);
        
        if (selectedUser && newMessage?.senderId === selectedUser._id) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      };

      socket.on("newMessage", handleNewMessage);

      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }, [socket, selectedUser]);

  const value = useMemo(
    () => ({
      socket,
      onlineUsers,
      messages,
      selectedUser,
      setSelectedUser,
      setMessages,
    }),
    [onlineUsers, messages, selectedUser, setMessages]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
