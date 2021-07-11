const socket = io();

socket.on("message", (message) => {
	console.log(message);
});

document.getElementById("form").addEventListener("submit", (event) => {
	event.preventDefault();

	const message = event.target.elements.message.value;
	socket.emit("sendMessage", message, () => {
		console.log("The Message was Delivered!");
	});
});

document.getElementById("send-location").addEventListener("click", () => {
	if (!navigator.geolocation) {
		return alert("Goelocation is not Supported by your Browser.");
	}

	navigator.geolocation.getCurrentPosition((position) => {
		socket.emit(
			"sendLocation",
			{
				lat: position.coords.latitude,
				long: position.coords.longitude,
			},
			() => {
				console.log("The Location was Delivered!");
			}
		);
	});
});
