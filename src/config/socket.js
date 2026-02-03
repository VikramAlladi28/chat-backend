
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const connectSocket = ({ server }) => {

    const io = new Server(server, {
        cors: {
            origin: process.env.SOCKET_URL,
            methods: ["GET", "POST"],
        },
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if (!token) return next(new Error("Unauthorized"));

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded; // { id }
            next();
        } catch {
            next(new Error("Invalid token"));
        }
    });


    io.on("connection", (socket) => {
        console.log("User connected:", socket.user.id);

        socket.on("joinChat", (chatId) => {
            socket.join(chatId);
            console.log(`User joined chat: ${chatId}`);
        });

        // socket.on("sendMessage", (message) => {
        //     socket.to(message.chat._id).emit("messageReceived", message);
        // });

        socket.on("newMessage", (message) => {
            socket.to(message.chat._id).emit("messageReceived", message);
        });


        socket.on("typing", (chatId) => {
            socket.to(chatId).emit("typing");
        });

        socket.on("stopTyping", (chatId) => {
            socket.to(chatId).emit("stopTyping");
        });

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    })
}

export default connectSocket;