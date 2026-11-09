import { Request } from "express";

export interface ICreateUserPayload extends IFindOneUser {
  username: string;
  password: string;
  age: number;
}

export interface IFindOneUser {
  phone: string;
  email: string;
}

export interface User {
  id: string;
  email: string;
  password?: string;
  role: "user" | "admin";
}

export interface AccessTokenPayload {
  userId: number;
  role: "user" | "admin";
}

export interface RefreshTokenPayload {
  userId: number;
  role: "user" | "admin";
}

// Extend Express Request to include authenticated user info
export interface AuthenticatedRequest extends Request {
  user?: AccessTokenPayload;
}
