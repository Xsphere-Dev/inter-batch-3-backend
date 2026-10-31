const express = require("express");

const router = express.Router();

const db = require("../db/db");

router.get("/", (req, res) => {
  res.json([
    {
      name: "mgmg",
    },
    {
      name: "agag",
    },
  ]);
});

module.exports = router;
