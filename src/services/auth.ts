import {AUTH_URL} from '@/config/endpoint';
import {fetchClient} from '@/utils/request';

const authServices = {
  getToken: (): Promise<any> => fetchClient.token('POST', AUTH_URL.TOKEN),
};

export default authServices;
