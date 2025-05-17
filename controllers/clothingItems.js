const ClothingItem = require("../models/clothingItems");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        return res.status(400).send({ message: "Invalid data provided" });
      }
      res.status(500).send({ message: "Error from createItem" });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error from getItems", e });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(500).send({ message: "Error from updateItem", e });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(204).send({}))
    .catch((e) => {
      if (e.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }
      if (e.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID" });
      }
      return res.status(500).send({ message: "Error from deleteItem" });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
