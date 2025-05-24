const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { login, createUser } = require("./controllers/users");

const app = express();
const { PORT = 3001 } = process.env;
const auth = require("./middlewares/auth");
const cors = require("cors");
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

app.use(express.json());

app.post("/signup", createUser);
app.post("/signin", login);

app.use(auth);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
