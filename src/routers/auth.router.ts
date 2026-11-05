import express from "express";
const authRouter = express.Router();
import { authController } from "../controllers";
import { registerValidator } from "../validators/user.validator";
import { validate } from "../middlewares/validate.middleware";

authRouter.post(
  "/register",
  validate(...registerValidator),
  authController.register,
);

export default authRouter;
