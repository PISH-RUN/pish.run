import { JWT, User } from '..';

export type LoginParams = {
  email: string;
  password: string;
};

export type SuccessLoginResponse = {
  jwt: JWT;
  user: User;
};

export type FailedLoginResponse = {
  status: number;
  message: string;
};
