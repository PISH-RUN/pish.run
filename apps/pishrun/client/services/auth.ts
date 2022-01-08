import strapiAuth from '@pishrun/strapi/auth';
import authConfig from '../configs/auth';

export const auth = strapiAuth({
  baseURL: authConfig.baseURL,
});
