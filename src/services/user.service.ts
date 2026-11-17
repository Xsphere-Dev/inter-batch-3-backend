import { or } from "@prisma/orm-postgres/orm-client";
import { db } from "../prisma/db";
import { ICreateSeat, ICreateUserPayload, IFindOneUser } from "../types/user.type";
import bcrypt from "bcryptjs";


// get user

const getUser = async () => {
  const user = await db.orm.public.User.all();
  return user;
};

// get unique user

const getUniqueUser = async (id: number) => {
  const user = await db.orm.public.User.where({ id }).first();
  return user;
};

//  idy would be email or phone
const findWithEmailOrPhone = async (identity: string) => {
  const user = await db.orm.public.User.where((u) =>
    or(u.email.eq(identity), u.phone.eq(identity)),
  ).first();
  return user;
};

// user create
const createUser = async (data: ICreateUserPayload) => {
  const { phone, username, email, password, age } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.orm.public.User.create({
    phone,
    username,
    email,
    password: hashedPassword,
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

// delete user close

// user book ticket

const seatCheck = async (car_no: string, seat_capacity: number, seat_no: string[]) =>
{
  const [seatCheck, seatCount] = await Promise.all([
    await db.orm.public.Bus.where({
    car_no
    }).first(),
    await db.orm.public.Bus.where({
    car_no
  }).first(),
  ])
  if (
    seatCount &&
    seatCheck &&
    seatCheck?.seat_no === seat_no && (seatCount?.seat_capacity >= seat_capacity || seatCount?.seat_capacity <= seat_capacity))
  {
    return true;
  }
  return false;
}

const bookSeat = async (id: number, data: ICreateSeat ) =>
{
  const { car_no, seat_capacity, seat_no } = data;
  const isAvailableSeat = await seatCheck(car_no, seat_capacity, seat_no);
  if (isAvailableSeat === true) return JSON.parse("Seat can't available!.");
  const bookingSeat = await db.orm.public.Bus.create({
    car_no,
    seat_capacity,
    seat_no
  });
  return bookingSeat;
}

// user book ticket close

export default {
  findWithEmailOrPhone,
  createUser,
  getUser,
  getUniqueUser,
  updateUser,
  deleteUser,
  bookSeat,
};
