const socket = io();

// elements
const messageForm = document.querySelector("#form");
const messageFormInput = messageForm.querySelector("input");
const messageFormButton = messageForm.querySelector("button");
const sendLocationButton = document.querySelector("#send-location");

socket.on("message", (message) => {
	console.log(message);
});

messageForm.addEventListener("submit", (event) => {
	event.preventDefault();

	// disable Button while sending message...
	messageFormButton.setAttribute("disabled", "disabled");

	const message = event.target.elements.message.value;
	socket.emit("sendMessage", message, (error) => {
		// enable button after sending message..
		messageFormButton.removeAttribute("disabled");
		messageFormInput.value = "";
		messageFormInput.focus();

		if (error) {
			return console.log(error);
		}
		return console.log("The Message was Delivered!");
	});
});

sendLocationButton.addEventListener("click", () => {
	// disable button while fetching and sending Location..
	sendLocationButton.setAttribute("disabled", "disabled");

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
				sendLocationButton.removeAttribute("disabled");
				messageFormInput.focus();
				console.log("Location Shared!");
			}
		);
	});
});
