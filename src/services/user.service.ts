import { db } from "../prisma/db";
import { ICreateUserPayload, ICreateUserPaylod } from "../types/user.type";

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

//identitfier would be email or   phone
const findOne = async (identitfier: string) => {
  const user = await db.orm.public.User.first();
  return user;
};

// user create
const createUser = async (data: ICreateUserPayload) => {
  const { phone_number, username, email, password, age } = data;

  const user = await db.orm.public.User.create({
    phone: phone_number,
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
  findOne,
  createUser,
  getUser,
  getUniqueUser,
  updateUser,
  deleteUser,
};
