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

// server [emit] => client [recieve] => acknowledgement => server

// client [emit] => server [recieve] => acknowledgement => client

io.on("connection", (socket) => {
	console.log("New web socket connection");
	socket.emit("message", "Welcome!");
	socket.broadcast.emit("message", "A user has Joined!");

	socket.on("sendMessage", (message, callback) => {
		io.emit("message", message);

		callback(); // acknowledgement function
	});

	socket.on("sendLocation", (data, callback) => {
		io.emit(
			"message",
			`https://google.com/maps?q=${data.lat},${data.long}`
		);

		callback(); //acknowledgement Function
	});

	socket.on("disconnect", () => {
		io.emit("message", "A user has left");
	});
});

server.listen(PORT, () => console.log("Server running on port :", PORT));
