const router = require("express").Router();

const clothingItem = require("./clothingItems");

const userRouter = require("./users");

const { NOT_FOUND } = require("../utils/constants");

router.use("/users", userRouter);

router.use("/items", clothingItem);

router.use((req, res, next) => {
  const error = new Error("Router not found");
  error.statusCode = NOT_FOUND;
  next(error);
});

module.exports = router;
