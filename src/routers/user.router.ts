import express from "express";
const userRouter = express.Router();
import { userController } from "../controllers";

userRouter.get("/", userController.getUser);
userRouter.get("/:id",userController.getUniqueUser)
userRouter.get("/find-one", userController.findOne);
userRouter.post("/create", userController.createUser);
userRouter.patch("/update/:id", userController.updateUser);
userRouter.delete("/delete/:id", userController.deleteUser);

export default userRouter;
