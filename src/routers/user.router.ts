import express from "express";
const userRouter = express.Router();
import { userController } from "../controllers";
import { validate } from "../middlewares/validate.middleware";
import { createUserValidator, deleteUserValidator, findOneValidator, updateUserValidator, validateId } from "../validators/user.validator";
import { authenticateToken } from "../middlewares/authMiddleware";

userRouter.get("/", userController.getUser);
userRouter.get("/:id",validate(...validateId),userController.getUniqueUser)
userRouter.get("/find-one",validate(...findOneValidator), userController.findWithEmailOrPhone);
userRouter.post("/create",validate(...createUserValidator), userController.createUser);
userRouter.patch("/update/:id",validate(...updateUserValidator), userController.updateUser);
userRouter.delete("/delete/:id",validate(...deleteUserValidator), userController.deleteUser);
userRouter.post("/book/seat/create/:id", authenticateToken, userController.bookSeat);
export default userRouter;
