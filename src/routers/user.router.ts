import express from "express";
const userRouter = express.Router();
import { userController } from "../controllers";

userRouter.get("/find-one", userController.findOne);
userRouter.get("/",userController.getUser);
userRouter.post("/create",userController.createUser);
userRouter.get("/:id",userController.getUniqueUser);
userRouter.patch("/update/:id", userController.updateUser);
userRouter.delete("/delete/:id", userController.deleteUser);


export default userRouter;
