// src/services/socketService.js
let io;

exports.initSocket = (server) => {
    io = require("socket.io")(server, {
        cors: { origin: "http://localhost:5173", credentials: true },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("joinProject", (projectId) => {
            socket.join(`project:${projectId}`);
            console.log(`User ${socket.id} joined room project_${projectId}`);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    return io;
};

exports.getIo = () => io;
