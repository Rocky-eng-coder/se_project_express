const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
// CRUD

const {
  validateClothingItem,
  validateIdParam,
} = require("../middlewares/validation");
// Create

router.post("/", auth, validateClothingItem, createItem);

// Read

router.get("/", getItems);

// Delete

router.delete("/:itemId", auth, validateIdParam, deleteItem);

// Like
router.put("/:itemId/likes", auth, validateIdParam, likeItem);

// Dislike
router.delete("/:itemId/likes", auth, validateIdParam, dislikeItem);

module.exports = router;
