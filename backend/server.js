// backend/server.js
require("dotenv").config();
const http = require("http");
const app = require("./src/app");
const socketService = require("./src/services/socketService");

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

socketService.initSocket(server);

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
