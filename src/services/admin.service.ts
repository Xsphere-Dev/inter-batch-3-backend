import { or } from "@prisma/orm-postgres/orm-client";
import { db } from "../prisma/db";
import { ICreateUserPayload, IFindOneUser } from "../types/user.type";
import bcrypt from "bcryptjs";
import {
  ICreateBusPayLoad,
  ICreateBusSchedulePayLoad,
} from "../types/admin.type";

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

// delete admin close

// get bus list

const getBusList = async () => {
  const busList = await db.orm.public.Bus.all();
  return busList;
};

// get bus list close

// create bus
const createBus = async (data: ICreateBusPayLoad) => {
  const { car_no, seat_no, seat_capacity } = data;
  const bus = await db.orm.public.Bus.create({
    car_no,
    seat_no,
    seat_capacity,
  });
  return bus;
};

// create bus close

// create bus schedule

const createBusSchedule = async (data: ICreateBusSchedulePayLoad) => {
  const { bus_id, depart_time, est_arrival_time, per_seat_cost } = data;

  const schedule = await db.orm.public.BusSchedule.create({
    bus_id,
    depart_time: new Date(depart_time),
    est_arrival_time: new Date(est_arrival_time),
    per_seat_cost,
  });
  return schedule;
};

// create bus schedule close

// get bus schedule

const getBusSchedule = async () => {
  const getSchedule = await db.orm.public.BusSchedule.all();
  return getSchedule;
};

// get bus schedule close

// update bus

const updateBus = async (id: number, data: ICreateBusPayLoad) => {
  const updateBus = await db.orm.public.Bus.where({ id }).update({
    car_no: data.car_no,
    seat_no: data.seat_no,
    seat_capacity: data.seat_capacity,
  });
  return updateBus;
};

// update bus close

// update bus schedule

const updateBusSchedule = async (
  id: number,
  data: ICreateBusSchedulePayLoad,
) => {
  const updateBusSchedule = await db.orm.public.BusSchedule.where({
    id,
  }).update(data);
  return updateBusSchedule;
};

// update bus schedule

// delete bus

const deleteBus = async (id: number) => {
  const deleteBus = await db.orm.public.Bus.where({ id }).delete();
  return deleteBus;
};

// delete bus close

// delete bus schedule

const deleteBusSchedule = async (id: number) => {
  const deleteBusSchedule = await db.orm.public.Bus.where({ id }).delete();
  return deleteBusSchedule;
};

// delete bus schedule close

export default {
  findWithEmailOrPhone,
  createAdmin,
  getAdmins,
  getUniqueAdmin,
  updateAdmin,
  deleteAdmin,
  createBus,
  createBusSchedule,
  getBusList,
  getBusSchedule,
  updateBus,
  updateBusSchedule,
  deleteBus,
  deleteBusSchedule,
};
