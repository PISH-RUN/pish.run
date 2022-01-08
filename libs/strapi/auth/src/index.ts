import API from './lib/api';
import login, { LoginParams } from './lib/login';

type StrapiAuthConfig = {
  baseURL: string;
};

type StrapiAuth = {
  login: <T>(params: LoginParams) => Promise<T>;
};

function strapiAuth(config: StrapiAuthConfig): StrapiAuth {
  const api = API(config.baseURL);

  return {
    login: login(api),
  };
}

export default strapiAuth;
