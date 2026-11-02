const express = require("express");

const router = express.Router();

const { userController } = require("../controllers");

router.get("/", userController.getUsers); //read
router.post("/create", userController.register);//create
router.get("/:id", userController.getUser); //readById
router.patch("/:id/update", userController.updateUser); //update
router.delete("/:id/delete", userController.deleteUser); //delete

module.exports = router;
