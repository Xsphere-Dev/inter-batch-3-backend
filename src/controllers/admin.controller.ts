import { Request, Response } from "express";
import { request } from "node:http";
import adminService from "../services/admin.service";
import { ICreateUserPayload, IFindOneUser } from "../types/user.type";

const getAdmins = async (req: Request, res: Response) => {
  try {
    const admin = await adminService.getAdmins();
    res.status(200).json(admin);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getUniqueAdmin = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const getAdminById = await adminService.getUniqueAdmin(id);

    if (!getAdminById) res.json("admin does not exist!");

    res.status(200).json(getAdminById);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const findWithEmailOrPhone = async (req: Request, res: Response) => {
  const adminInfo = req.body as string;
  const findOneAdmin = await adminService.findWithEmailOrPhone(adminInfo);
  res.status(200).json(findOneAdmin);
};

const createAdmin = async (req: Request, res: Response) => {
  try {
    const body = req.body as ICreateUserPayload;
    const admin = await adminService.createAdmin(body);
    res.status(201).json("admin create successful!");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateAdmin = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updateAdmin = adminService.updateAdmin(id, req.body);
    res.status(201).json("Update successful!");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleteAdmin = await adminService.deleteAdmin(id);
    res.status(200).json("delete successful!");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export default {
  findWithEmailOrPhone,
  createAdmin,
  getAdmins,
  getUniqueAdmin,
  updateAdmin,
  deleteAdmin,
};
