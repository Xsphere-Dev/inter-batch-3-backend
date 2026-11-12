import { Request, Response } from "express";
import { request } from "node:http";
import adminService from "../services/admin.service";
import { ICreateUserPayload, IFindOneUser } from "../types/user.type";
import { ICreateBusPayLoad, ICreateBusSchedulePayLoad } from "../types/admin.type";
import { userService } from "../services";


// admin list
const getAdmins = async (req: Request, res: Response) => {
  try {
    const admin = await adminService.getAdmins();
    res.status(200).json(admin);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// admin list close


// admin list by id

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

// admin list by id close


// find admin with email or phone

const findWithEmailOrPhone = async (req: Request, res: Response) => {
  const adminInfo = req.body as string;
  const findOneAdmin = await adminService.findWithEmailOrPhone(adminInfo);
  res.status(200).json(findOneAdmin);
};

// find admin with email or phone close


// create admin

const createAdmin = async (req: Request, res: Response) => {
  try {
    const body = req.body as ICreateUserPayload;
    const admin = await adminService.createAdmin(body);
    console.log(admin)
    res.status(201).json("admin create successful!");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// create admin close


// update admin

const updateAdmin = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updateAdmin = adminService.updateAdmin(id, req.body);
    res.status(201).json("Update successful!");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// update admin close


// delete admin


const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleteAdmin = await adminService.deleteAdmin(id);
    res.status(200).json("delete successful!");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// delete admin close


// create bus

const createBus = async (req:Request,res:Response) =>
{
  try {
    const body = req.body as ICreateBusPayLoad;
    const bus = await adminService.createBus(body);
    console.log(bus);
    res.status(201).json("successfully bus create!")
  } catch (error : any) {
    res.status(500).json({ error: error.message });
  }
}

// create bus close

// create bus schedule

const createBusSchedule = async (req: Request, res:Response) =>
{
  try {
    const body = req.body as ICreateBusSchedulePayLoad;
    const schedule = await adminService.createBusSchedule(body);
    console.log(schedule)
    res.status(201).json("Schedule create successful!");
  } catch (error : any) {
    res.status(500).json({error : error.message})
  }
}

export default {
  findWithEmailOrPhone,
  createAdmin,
  getAdmins,
  getUniqueAdmin,
  updateAdmin,
  deleteAdmin,
  createBus,
  createBusSchedule,
};
