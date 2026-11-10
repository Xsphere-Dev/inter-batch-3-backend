import express from "express";
const adminRouter = express.Router();
import { validate } from "../middlewares/validate.middleware";
import { createUserValidator, deleteUserValidator, findOneValidator, updateUserValidator, validateId } from "../validators/user.validator";
import adminController from "../controllers/admin.controller";



adminRouter.get("/", adminController.getAdmins);
adminRouter.get("/:id",validate(...validateId),adminController.getUniqueAdmin)
adminRouter.get("/find-one",validate(...findOneValidator), adminController.findWithEmailOrPhone);
adminRouter.post("/create",validate(...createUserValidator), adminController.createAdmin);
adminRouter.patch("/update/:id",validate(...updateUserValidator), adminController.updateAdmin);
adminRouter.delete("/delete/:id",validate(...deleteUserValidator), adminController.deleteAdmin);

export default adminRouter