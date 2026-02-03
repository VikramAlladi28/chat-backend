import { io } from "socket.io-client";

console.log("🚀 socketTest started");

const socket = io("http://localhost:4000", {
    transports: ["websocket"],
    auth: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzBhOTMyOTIzZWVkMDk5MDdiNTkwMiIsImlhdCI6MTc2OTA4NjQ4OSwiZXhwIjoxNzY5NjkxMjg5fQ.kcSC14kUJWuYe-e9UFVtRn8zl3IUyseWiF7u5lnyKlU",
    },
});

socket.on("connect", () => {
    console.log("✅ Connected to server:", socket.id);

    // Join a chat room
    socket.emit("joinChat", "69721922ae3e8ca362b74418");
});

socket.on("messageReceived", (msg) => {
    console.log("📩 New Message:", msg);
});


socket.on("connect_error", (err) => {
    console.error("❌ Connection error:", err.message);
});
