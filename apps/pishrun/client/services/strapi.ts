import Strapi from 'strapi-sdk-js';

export const strapi = new Strapi({
  url: process.env.NEXT_PUBLIC_STRAPI_URL,
  store: {
    key: 'access_token',
    useLocalStorage: true,
  },
});
