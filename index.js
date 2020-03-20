const express = require("express");

require("dotenv").config();
const port = process.env.PORT || 5000;

const main = require("./server");

const server = express();

server.use(express.json());
server.use(main);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});