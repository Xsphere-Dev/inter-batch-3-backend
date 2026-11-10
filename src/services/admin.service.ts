import { or } from "@prisma/orm-postgres/orm-client";
import { db } from "../prisma/db";
import { ICreateUserPayload, IFindOneUser } from "../types/user.type";
import bcrypt from "bcryptjs";


// get Admin

const getAdmins = async () => {
  const admin = await db.orm.public.Admin.all();
  return admin;
};

// get unique Admin

const getUniqueAdmin = async (id: number) => {
  const admin = await db.orm.public.Admin.where({ id }).first();
  return admin;
};

//  idy would be email or phone
const findWithEmailOrPhone = async (identity: string) => {
  const admin = await db.orm.public.Admin.where((u) =>
    or(u.email.eq(identity), u.phone.eq(identity)),
  ).first();
  return admin;
};

// Admin create
const createAdmin = async (data: ICreateUserPayload) => {
  const { phone, username, email, password, age } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await db.orm.public.Admin.create({
    phone,
    username,
    email,
    password: hashedPassword,
  });
  return admin;
};

// update Admin

const updateAdmin = async (
  id: number,
  data: {
    username: string;
    phone: string;
    email: string;
    password: string;
  },
) => {
  const admin = await db.orm.public.Admin.where({ id }).update({
    username: data.username,
    phone: data.phone,
    email: data.email,
    password: data.password,
  });
  return admin;
};

// delete Admin

const deleteAdmin = async (id: number) => {
  const admin = await db.orm.public.Admin.where({ id }).delete();
  return admin;
};

export default {
  findWithEmailOrPhone,
  createAdmin,
  getAdmins,
  getUniqueAdmin,
  updateAdmin,
  deleteAdmin,
};
