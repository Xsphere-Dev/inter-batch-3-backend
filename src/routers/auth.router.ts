import express from "express";
const authRouter = express.Router();
import { authController } from "../controllers";
import { registerValidator } from "../validators/user.validator";
import { validate } from "../middlewares/validate.middleware";
import { authenticateToken } from "../middlewares/authMiddleware";

authRouter.post(
  "/register",
  validate(...registerValidator),
  authController.register,
);

authRouter.post("/refresh", authController.refresh);
authRouter.get("/profile", authenticateToken, authController.profile);

export default authRouter;
