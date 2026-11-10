import express from "express";
const authRouter = express.Router();
import { authController } from "../controllers";
import { loginValidator, registerValidator } from "../validators/user.validator";
import { validate } from "../middlewares/validate.middleware";
import { authenticateToken } from "../middlewares/authMiddleware";
import { registerAdminValidator } from "../validators/admin.validator";


// user auth
authRouter.post(
  "/register",
  validate(...registerValidator),
  authController.register,
);
authRouter.post("/refresh", authController.refresh);
authRouter.get("/profile", authenticateToken, authController.profile);
authRouter.post("/login",loginValidator, authController.login);
authRouter.post("/logout",authController.logout)

// admin auth
authRouter.post(
  "/admin/register",
  validate(...registerAdminValidator),
  authController.adminRegister,
);
authRouter.get("/admin/profile", authenticateToken, authController.adminProfile);
authRouter.post("/admin/refresh", authController.refreshAdmin);
authRouter.post("/admin/login",loginValidator, authController.adminLogin);
authRouter.post("/admin/logout",authController.logout)

export default authRouter;
