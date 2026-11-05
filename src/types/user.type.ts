export interface ICreateUserPayload extends IFindOneUser {
  username: string;
  password: string;
  age: number;
}

export interface IFindOneUser
{
  phone: string;
  email: string;
}