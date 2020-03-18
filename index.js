const express = require("express");
const main = require("./server");

const server = express();

server.use(express.json());
server.use(main);

server.listen(5000, () => {
    console.log("Server listening on port 5000");
})