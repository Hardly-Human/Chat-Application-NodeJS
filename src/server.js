const path = require("path");
const express = require("express");

const server = express();
const PORT = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");
server.use(express.static(publicDirPath));

server.listen(PORT, () => console.log("Server running on port :", PORT));
