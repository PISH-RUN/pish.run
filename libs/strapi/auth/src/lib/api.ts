import axios, { Axios } from 'axios';

export const api = (baseURL: string): Axios => {
  const instance = axios.create({
    baseURL: baseURL,
  });

  instance.defaults.headers.common['Accept'] = 'application/json';
  instance.defaults.headers.common['Content-Type'] = 'application/json';

  return instance;
};

export default api;
