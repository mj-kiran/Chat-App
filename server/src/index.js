import express from "express"
import dotenv from "dotenv";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/auth.route.js" 
import messageRoutes from "./routes/message.route.js" 
import { app, server } from "./lib/socket.js";
dotenv.config();





const PORT = process.env.PORT || 4000;;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use('/api/auth', authRoutes)
app.use("/api/messages", messageRoutes);

 
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  connectDB()
});

