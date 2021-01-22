const router = require("express").Router();
module.exports = router;

router.use("/search", require("./search"));

router.use('/artist', require("./artist"))

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
