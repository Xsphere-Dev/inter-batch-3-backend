const express = require("express");

const router = express.Router();

const db = require("../db/db");
const { userController } = require("../controllers");

router.get("/register", userController.register);

module.exports = router;
