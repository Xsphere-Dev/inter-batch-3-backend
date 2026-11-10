import { Request, Response } from "express";
import { userService } from "../services";
import { generateAccessToken, generateRefreshToken } from "../utils/authUtils";
import jwt from "jsonwebtoken";
import { AccessTokenPayload, RefreshTokenPayload } from "../types/user.type";
import bcrypt from "bcryptjs";
import adminService from "../services/admin.service";

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
    async (err:any, decoded:any) => {
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

const login = async (req:Request,res:Response) =>
{
  const { email, password } = req.body 
  console.log(req.body)
  const existUser = await userService.findWithEmailOrPhone(email);
  console.log(existUser)
  if (!existUser) res.status(400).json("user does not exist!")
  
  const isMatch = await bcrypt.compare(password,existUser?.password!)
  // const loginUser = await userService.getUniqueUser(existUser?.id!)
  // if (loginUser?.email === existUser?.email && loginUser?.password === existUser?.password)
  if (!isMatch) res.status(401).json("password not match");
  
  const accessToken = generateAccessToken(existUser!, "user");
  const refreshToken = generateRefreshToken(existUser!, "user");

  res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

  res.json({ accessToken, user: {
    id:existUser?.id,
    email: existUser?.email,
    userName:existUser?.username
  }
});
  // res.json(
  //   {
  //     token: {
  //     accessToken,
  //     refreshToken,
  //   },
  //   user: {
  //     id:existUser?.id,
  //     email: existUser?.email,
  //     userName:existUser?.username
  //   }
  //  }
  // )

}


const adminRegister = async (req:Request, res:Response)=> {

  const existAdmin = await adminService.findWithEmailOrPhone(req.body.email);

  if (existAdmin) res.status(400).json({ msg: "admin already exist" });

  const newAdmin = await adminService.createAdmin(req.body);
  if (newAdmin) {
    const accessToken = generateAccessToken(newAdmin, "admin");
    const refreshToken = generateRefreshToken(newAdmin, "admin");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  }
}

const adminProfile = async (req: Request, res: Response) => {
  const adminId = req.user?.userId;

  const admin = await adminService.getUniqueAdmin(adminId!);

  res.json(admin);
};

const refreshAdmin = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken);
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token missing" });
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    async (err:any, decoded:any) => {
      if (err) {
        return res.status(403).json({ error: "Invalid refresh token" });
      }
      const adminToken = decoded as RefreshTokenPayload;

      if (!adminToken) {
        return res.status(404).json({ error: "User not found" });
      }

      const admin = await userService.getUniqueUser(adminToken.userId);
      const newAccessToken = generateAccessToken(admin!, "admin");
      const newRefreshToken = generateRefreshToken(admin!, "admin");

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


const adminLogin = async (req:Request,res:Response) =>
{
  const { email, password } = req.body 
  console.log("admin",req.body)
  const existAdmin = await adminService.findWithEmailOrPhone(email);
  console.log("admin",existAdmin)
  if (!existAdmin) res.status(400).json("user does not exist!")
  
  const isMatch = await bcrypt.compare(password,existAdmin?.password!)

  if (!isMatch) res.status(401).json("password not match");
  
  const accessToken = generateAccessToken(existAdmin!, "admin");
  const refreshToken = generateRefreshToken(existAdmin!, "admin");

  res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

  res.json({ accessToken, admin: {
    id:existAdmin?.id,
    email: existAdmin?.email,
    adminName:existAdmin?.username
  }
});

}




const logout = (req: Request, res: Response) =>
{
  res.clearCookie('token').status(200).json({ message: 'Logout successfully!' });
}


export default { register, profile, refresh,login, adminRegister,adminProfile,refreshAdmin,adminLogin,logout };
