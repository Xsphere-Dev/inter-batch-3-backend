import { Request, Response } from "express";
import { userService } from "../services";

const register = async (req: Request, res: Response) => {
  console.log(req.body);

  //find user -> user-service
  const existUser = await userService.findOne(req.body.email);

  if (existUser) res.status(400).json({ msg: "user already exist" });
  //if user exist err throw
  //create user -> user.service
  // token generate -> auth service
  res.json({ existUser });
};

export default { register };
