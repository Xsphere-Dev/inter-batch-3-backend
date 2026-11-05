import { db } from "../prisma/db";

//identitfier would be email or phone
const findOne = async (identitfier: string) => {
  const user = await db.orm.public.User.first();
  return user;
};
 

  const getUser = async () =>
{
  const user = await db.orm.public.User.all();
  return user;
}
const createUser = async (phone: string, username: string, email: string, password: string,age:number) =>
{

  const u = await db.orm.public.User.first();
  console.log(u)

  const user = await db.orm.public.User.create({
    phone,
    username,
    email,
    password,
    age
  }) 

  console.log(user)

  return user;
}

const getUniqueUser = async (id:number) =>
{
  const user = await db.orm.public.User.where({id}).all()
  return user;
}

const updateUser = async (id: number, data: { username: string, phone: string, age: number, email: string, password: string }) =>
{
  const user = await db.orm.public.User.where({ id }).update({
    username: data.username,
    phone: data.phone,
    email: data.email,
    age: data.age,
    password: data.password
  });
  return user;
}

const deleteUser = async (id: number) =>
{
  const user = await db.orm.public.User.where({ id }).delete();
  return user;
}
export default { findOne,getUser ,createUser,getUniqueUser,updateUser,deleteUser};
