const router = require("express").Router();

router.get("/", () => console.log("GET users"));
router.get("/foo", () => console.log("GET users"));
router.get("/bar", () => console.log("GET users"));

module.exports = router;
