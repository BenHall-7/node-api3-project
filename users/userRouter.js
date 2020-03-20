const express = require('express');
const db = require('./userDb');
const validatePost = require("../posts/validatePost");

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  db.insert(req.body)
    .then(res2 => res.status(200).json(res2))
    .catch(() => res.status(500).json({error: "Error creating user"}))
});

// router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
//   res.status(500).json({error: "Unimplemented endpoint"});
// });

router.get('/', (_, res) => {
  db.get()
    .then(res2 => res.status(200).json(res2))
    .catch(() => res.status(500).json({error: "Error retrieving users"}));
});

router.get('/:id', validateUserId, (req, res) => {
  db.getById(req.user.id)
    .then(res2 => res.status(200).json(res2))
    .catch(() => res.status(500).json({error: "Error retrieving user"}));
});

router.get('/:id/posts', validateUserId, (req, res) => {
  db.getUserPosts(req.user.id)
    .then(res2 => res.status(200).json(res2))
    .catch(() => res.status(500).json({error: "Error retrieving user posts"}));
});

router.delete('/:id', validateUserId, (req, res) => {
  db.remove(req.user.id)
    .then(() => res.sendStatus(204))
    .catch(() => res.status(500).json({error: "Error deleting user"}));
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  db.update(req.user.id, req.body)
    .then(() => res.sendStatus(204))
    .catch(() => res.status(500).json({error: "Error replacing user"}));
});

function validateUserId(req, res, next) {
  let id = req.params.id;
  db.getById(id)
    .then(res2 => {
      if (res2) {
        req.user = res2;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(() => { res.status(400).json({ message: "invalid user id" }); })
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
