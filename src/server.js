const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server); // socketio requires raw http server.

const PORT = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "./public");
app.use(express.static(publicDirPath));

let count = 0;

// server [emit] => client [recieve] - countUpdated
// client [emit] => server [recieve] - increment

io.on("connection", (socket) => {
	console.log("New web socket connection");

	// socket.emit("countUpdated", count);

	socket.on("increment", () => {
		count += 1;
		io.emit("countUpdated", count);
	});
});

server.listen(PORT, () => console.log("Server running on port :", PORT));
