import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import http from "http";
// import { Server } from "socket.io";
// import jwt from "jsonwebtoken";
import connectSocket from "./config/socket.js";

const app = express();
const server = http.createServer(app);


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


dotenv.config();


app.use(cors());
app.use(express.json());

connectDB();
connectSocket({ server });

app.get("/", (req, res) => {
    res.send("Chat API running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);






// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"],
//     },
// });

// io.use((socket, next) => {
//     const token = socket.handshake.auth.token;

//     if (!token) return next(new Error("Unauthorized"));

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         socket.user = decoded; // { id }
//         next();
//     } catch {
//         next(new Error("Invalid token"));
//     }
// });


// io.on("connection", (socket) => {
//     console.log("User connected:", socket.user.id);

//     socket.on("joinChat", (chatId) => {
//         socket.join(chatId);
//         console.log(`User joined chat: ${chatId}`);
//     });

//     // socket.on("sendMessage", (message) => {
//     //     socket.to(message.chat._id).emit("messageReceived", message);
//     // });

//     socket.on("newMessage", (message) => {
//         socket.to(message.chat._id).emit("messageReceived", message);
//     });


//     socket.on("typing", (chatId) => {
//         socket.to(chatId).emit("typing");
//     });

//     socket.on("stopTyping", (chatId) => {
//         socket.to(chatId).emit("stopTyping");
//     });


//     socket.on("disconnect", () => {
//         console.log("User disconnected");
//     });
// });
