import {ENV} from './env';

const AUTH_URL = {
  LOGIN: `${ENV.API_URL}login`,
} as const;

export {AUTH_URL};
