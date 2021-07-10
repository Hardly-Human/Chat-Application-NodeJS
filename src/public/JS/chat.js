const socket = io();

const message = document.getElementById("message");

socket.on("countUpdated", (count) => {
	message.innerText = `Count : ${count}`;
});

document.querySelector("#increment").addEventListener("click", () => {
	socket.emit("increment");
});
