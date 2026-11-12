import express from "express";
const adminRouter = express.Router();
import { validate } from "../middlewares/validate.middleware";
import { createUserValidator, deleteUserValidator, findOneValidator, updateUserValidator, validateId } from "../validators/user.validator";
import adminController from "../controllers/admin.controller";
import { createBusScheduleValidator, createBusValidator } from "../validators/admin.validator";
import { authenticateToken } from "../middlewares/authMiddleware";



adminRouter.get("/", adminController.getAdmins);
adminRouter.get("/:id",validate(...validateId),adminController.getUniqueAdmin)
adminRouter.get("/find-one",validate(...findOneValidator), adminController.findWithEmailOrPhone);
adminRouter.post("/create",validate(...createUserValidator), adminController.createAdmin);
adminRouter.patch("/update/:id",validate(...updateUserValidator), adminController.updateAdmin);
adminRouter.delete("/delete/:id", validate(...deleteUserValidator), adminController.deleteAdmin);
adminRouter.post("/bus/create", validate(...createBusValidator), authenticateToken, adminController.createBus)
adminRouter.post("/bus/schedule/create",validate(...createBusScheduleValidator),authenticateToken,adminController.createBusSchedule)
adminRouter.get("/bus/list", adminController.getBusList);
adminRouter.get("/bus/schedule", adminController.getBusSchedule);


export default adminRouter