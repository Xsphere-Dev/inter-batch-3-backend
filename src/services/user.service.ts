import { db } from "../prisma/db";

//identitfier would be email or phone
const findOne = async (identitfier: string) => {
  const user = await db.orm.public.User.first();
  return user;
};

export default { findOne };
