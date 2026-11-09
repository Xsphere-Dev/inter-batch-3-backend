import jwt from "jsonwebtoken";
import { Models } from "../prisma/contract";
import { AccessTokenPayload, RefreshTokenPayload } from "../types/user.type";

export const generateAccessToken = (
  user: Models.public_Admin | Models.public_User,
  role: "admin" | "user",
): string => {
  const payload: AccessTokenPayload = { userId: user.id, role: role };
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "15m",
  });

  return token;
};

export const generateRefreshToken = (
  user: Models.public_Admin | Models.public_User,
  role: "admin" | "user",
): string => {
  const payload: RefreshTokenPayload = { userId: user.id, role: role };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
};
