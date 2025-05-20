const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
// CRUD

// Create

router.post("/", createItem);

// Read

router.get("/", getItems);

// Delete

router.delete("/:itemId", deleteItem);

// Like
router.put("/:itemId/likes", likeItem);

// Dislike
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
