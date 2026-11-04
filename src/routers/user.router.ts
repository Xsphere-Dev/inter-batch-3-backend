import express from "express";
const userRouter = express.Router();
import { userController } from "../controllers";

userRouter.get("/find-one", userController.findOne);

export default userRouter;
