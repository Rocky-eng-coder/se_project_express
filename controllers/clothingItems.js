const ClothingItem = require("../models/clothingItems");
const {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} = require("../utils/errors");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      return next(e);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => next(e));
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError(
          "You do not have permission to delete this item"
        );
      }
      return item.deleteOne().then(() => {
        res.status(200).send({
          message: "Item successfully deleted",
          data: item,
        });
      });
    })
    .catch((e) => {
      if (e.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      if (e.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(e);
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      if (e.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(e);
    });
};

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      if (e.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(e);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
