import { Request, Response } from "express";
import { request } from "node:http";
import { userService } from "../services";
import { ICreateUserPayload } from "../types/user.type";

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUser();
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getUniqueUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const getUserById = await userService.getUniqueUser(id);

    if (!getUserById) res.json("User does not exist!");

    res.status(200).json(getUserById);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const findOne = async (req: Request, res: Response) => {
  res.status(200).send({ user: null, tokens: "" });
};

const createUser = async (req: Request, res: Response) => {
  try {
    const body = req.body as ICreateUserPayload;
    const user = await userService.createUser(body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updateUser = userService.updateUser(id, req.body);
    res.status(201).json(updateUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleteUser = await userService.deleteUser(id);
    res.status(200).json(deleteUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export default {
  findOne,
  createUser,
  getUser,
  getUniqueUser,
  updateUser,
  deleteUser,
};
