const express = require("express");
const { register, login, testToken, logout } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/test", testToken);

module.exports = router;