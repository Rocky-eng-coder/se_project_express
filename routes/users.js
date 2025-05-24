const router = require("express").Router();
const { login } = require("../controllers/users");

const { getCurrentUser, updateUserProfile } = require("../controllers/users");

router.post("/login", login);
router.get("/me", getCurrentUser);
router.patch("/me", updateUserProfile);

module.exports = router;
