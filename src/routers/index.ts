import express from "express";
import userRoute from "./user.router";
import authRoute from "./auth.router";

const router = express.Router();

router.use("/users", userRoute);
router.use("/auth", authRoute);

export default router;
