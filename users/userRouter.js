const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  if (typeof req.body === "object") {
    let id = req.body.id;
    db.getById(id)
      .then(res2 => { req.user = res2; next(); })
      .catch(() => { res.status(200).json({ message: "invalid user id" }); })
  } else {
    res.status(400).json({ message: "no request body"} );
  }
}

function validateUser(req, res, next) {
  if (typeof req.body === "object") {
    if (typeof req.body.name === "string") {
      next();
    } else {
      res.status(400).json({ message: "missing field required: 'name'" });
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

module.exports = router;
