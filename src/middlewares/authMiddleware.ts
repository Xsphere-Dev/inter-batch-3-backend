import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest, AccessTokenPayload } from "../types/user.type";

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access token missing or malformed" });
    return;
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({ error: "Token expired or invalid", errorCode: "auth-001" });
        return;
      }

      req.user = decoded as AccessTokenPayload;
      next();
    },
  );
};
