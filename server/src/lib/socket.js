import { Server as socketIO } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});



// used to store online users
const userSocketMap = {}; 

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (!userId) {
    console.error("Invalid or missing userId in handshake query.");
  } else {
    userSocketMap[userId] = socket.id;
    
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export const getReceiverSocketId = (userId) => {
  console.log("Current userSocketMap:", userSocketMap);  
  return userSocketMap[userId];
};

export { io, app, server };
