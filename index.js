const express = require("express");
const middleware = require("./server");

const server = express();

server.use(middleware);

server.listen(5000, () => {
    console.log("Server listening on port 5000");
})