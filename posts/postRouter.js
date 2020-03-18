const express = require('express');
const db = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(res2 => res.status(200).json(res2))
    .catch(() => res.status(500).json({error: "Error retrieving posts"}));
});

router.get('/:id', (req, res) => {
  db.getById(req.params.id)
    .then(res2 => {
      if (res2) {
        res.status(200).json(res2);
      } else {
        res.status(404).json({message: "No post found matching that ID"});
      }
    })
    .catch(() => res.status(500).json({error: "Error retrieving post"}));
});

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then(res2 => {
      if (res2 === 0) {
        res.status(400).json({error: "No post with matching ID to delete"})
      } else {
        res.sendStatus(204);
      }
    })
    .catch(() => res.status(500).json({error: "Error deleting post"}))
});

router.put('/:id', validatePost, (req, res) => {
  db.update(req.params.id, req.body)
    .then(res2 => {
      if (res2 === 0) {
        res.status(400).json({error: "No post with matching ID to update"})
      } else {
        res.sendStatus(204);
      }
    })
    .catch(() => res.status(500).json({error: "Server error updating post"}))
});

function validatePost(req, res, next) {
  if (typeof req.body === "object") {
    if (typeof req.body.text === "string") {
      next();
    } else {
      res.status(400).json({ message: "missing field required: 'text'" });
    }
  } else {
    res.status(400).json({ message: "missing post data" });
  }
}

module.exports = router;
