const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
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
