import { Request, Response } from "express";
import { userService } from "../services";
import { generateAccessToken, generateRefreshToken } from "../utils/authUtils";
import jwt from "jsonwebtoken";
import { AccessTokenPayload, RefreshTokenPayload } from "../types/user.type";

const register = async (req: Request, res: Response) => {
  //find user -> user-service
  const existUser = await userService.findWithEmailOrPhone(req.body.email);

  if (existUser) res.status(400).json({ msg: "user already exist" });
  //if user exist err throw
  //create user -> user.service
  const newUser = await userService.createUser(req.body);
  if (newUser) {
    const accessToken = generateAccessToken(newUser, "user");
    const refreshToken = generateRefreshToken(newUser, "user");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  }
};

const profile = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  const user = await userService.getUniqueUser(userId!);

  res.json(user);
};

const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken);
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token missing" });
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid refresh token" });
      }
      const tokenUser = decoded as RefreshTokenPayload;

      if (!tokenUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const user = await userService.getUniqueUser(tokenUser.userId);
      const newAccessToken = generateAccessToken(user!, "user");
      const newRefreshToken = generateRefreshToken(user!, "user");

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken: newAccessToken });
    },
  );
};

export default { register, profile, refresh };
