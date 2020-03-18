const express = require('express');
const user = require('./users/userRouter');
const post = require('./posts/postRouter');

const server = express();

server.use(logger);
server.use("/users", user);
server.use("/posts", post);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

function logger(req, _, next) {
  console.log("req body: ", req.body);
  console.log("req params: ", req.params);
  next();
}

module.exports = server;
