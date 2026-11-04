import { Request, Response } from "express";

const findOne = async (req: Request, res: Response) => {
  res.status(200).send({ user: null, tokens: "" });
};

export default { findOne };
