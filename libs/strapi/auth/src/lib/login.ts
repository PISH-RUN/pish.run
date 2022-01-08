import { Axios } from 'axios';
import {
  EmailLoginParams,
  loginWithEmail,
} from './login-providers/email-login';

export type LoginParams = EmailLoginParams;

const logins = {
  email: loginWithEmail,
};

export const login =
  <T>(api: Axios) =>
  (params: LoginParams): Promise<T> => {
    return logins[params.provider](api, params);
  };

export default login;
