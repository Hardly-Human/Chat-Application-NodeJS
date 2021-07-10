const socket = io();

socket.on("WelcomeMessage", (welcomeMessage) => {
	console.log(welcomeMessage);
});

document.getElementById("form").addEventListener("submit", (event) => {
	event.preventDefault();

	const message = event.target.elements.message.value;
	socket.emit("message", message);
});

socket.on("messageUpdated", (message) => {
	console.log(message);
});
