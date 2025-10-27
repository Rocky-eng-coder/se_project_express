const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const {
  validateClothingItem,
  validateIdParam,
} = require("../middlewares/validation");

router.post("/", auth, validateClothingItem, createItem);

router.get("/", getItems);

router.delete("/:itemId", auth, validateIdParam, deleteItem);

router.put("/:itemId/likes", auth, validateIdParam, likeItem);

router.delete("/:itemId/likes", auth, validateIdParam, dislikeItem);

module.exports = router;
