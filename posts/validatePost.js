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

module.exports = validatePost;