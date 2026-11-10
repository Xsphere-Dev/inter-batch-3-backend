import express from "express";
import userRoute from "./user.router";
import authRoute from "./auth.router"; 
import adminRoute from "./admin.router";


const router = express.Router();

router.use("/admins", adminRoute);
router.use("/users", userRoute);
router.use("/auth", authRoute);

export default router;
