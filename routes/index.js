const router = require("express").Router();

const clothingItem = require("./clothingItems");

const userRouter = require("./users");

const NotFoundError = require("../utils/errors/NotFoundError");

router.use("/users", userRouter);

router.use("/items", clothingItem);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;
