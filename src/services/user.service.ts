import { or } from "@prisma/orm-postgres/orm-client";
import { db } from "../prisma/db";
import { ICreateUserPayload, IFindOneUser } from "../types/user.type";

// get user

const getUser = async () => {
  const user = await db.orm.public.User.all();
  return user;
};

// get unique user

const getUniqueUser = async (id: number) => {
  const user = await db.orm.public.User.where({ id }).all();
  return user;
};

//  idy would be email or phone
const findWithEmailOrPhone = async (identity: IFindOneUser) => {
  const user = await db.orm.public.User.where((u) => or(u.email.eq(identity.email),u.phone.eq(identity.phone))).all();
  return user;
};

// user create
const createUser = async (data: ICreateUserPayload) => {
  const { phone, username, email, password, age } = data;

  const user = await db.orm.public.User.create({
    phone,
    username,
    email,
    password,
    age,
  });
  return user;
};

// update user

const updateUser = async (
  id: number,
  data: {
    username: string;
    phone: string;
    age: number;
    email: string;
    password: string;
  },
) => {
  const user = await db.orm.public.User.where({ id }).update({
    username: data.username,
    phone: data.phone,
    email: data.email,
    age: data.age,
    password: data.password,
  });
  return user;
};

// delete user

const deleteUser = async (id: number) => {
  const user = await db.orm.public.User.where({ id }).delete();
  return user;
};

export default {
  findWithEmailOrPhone,
  createUser,
  getUser,
  getUniqueUser,
  updateUser,
  deleteUser,
};
