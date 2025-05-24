const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  CONFLICT,
  UNAUTHORIZED,
} = require("../utils/constants");

const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required." });
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = JWT.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => {
      res
        .status(UNAUTHORIZED)
        .send({ message: "Incorrect email or password." });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT)
        .send({ message: "An error has occured on the server." });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  console.log("Received:", { name, avatar, email });

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required." });
  }

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      return User.create({
        name,
        avatar,
        email,
        password: hashedPassword,
      });
    })
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(201).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(CONFLICT).send({ message: "Email already exists." });
      }

      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data provided for user creation." });
      }

      console.error(err);
      return res
        .status(DEFAULT)
        .send({ message: "An error has occured on the server." });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found." });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid user ID format." });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occured on the server." });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found." });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occured on the server." });
    });
};

const updateUserProfile = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data provided for update" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found." });
      }

      return res
        .status(DEFAULT)
        .send({ message: "An error occured on the server." });
    });
};

module.exports = { createUser, login, getCurrentUser, updateUserProfile };
