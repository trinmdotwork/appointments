import {
  FETCH_TIMEOUT,
  HEADERS_OPTIONS,
  INCLUDE_CREDENTIALS,
} from '@/config/request';
import {hideLoading, hidePopup, showPopup} from '@/store/app';
import i18n from '@/i18n';
import store from '../store';
import {errorHandler} from './string';

interface IFetchOptions extends Omit<RequestInit, 'headers'> {
  timeout?: number;
  body?: any;
  params?: any;
  headers?:
    | Headers
    | string[][]
    | {[key: string]: string}
    | {[key: string]: number};
}

const fetchWithTimeout = (
  url: string,
  options: IFetchOptions,
): Promise<Response> => {
  const {timeout = FETCH_TIMEOUT} = options;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Request timed out'));
    }, timeout);

    fetch(url, options as any).then(
      response => {
        clearTimeout(timer);
        resolve(response);
      },
      err => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
};

const BASE_URL = '';

const fetchClient = {
  getToken: async () => {},

  request: async (
    method: string,
    path: string,
    options: IFetchOptions = {},
  ) => {
    try {
      let accessToken;

      // const url = `${ENV.API_URL}${path}`;
      // Fetch token if not available
      if (!accessToken) {
        accessToken = await fetchClient.getToken();
      }

      let url = `${BASE_URL}/${path}`;

      if (options.params) {
        const queryString = new URLSearchParams(options.params).toString();
        url = `${url}?${queryString}`;
      }

      const defaultOptions: IFetchOptions = {
        ...options,
        method,
        headers: {
          ...HEADERS_OPTIONS,
          ...options.headers,
          'Content-Type': 'application/json',
          'x-access-token': `${accessToken}`,
        },
        credentials: INCLUDE_CREDENTIALS ? 'include' : 'omit',
      };

      if (options.body) {
        defaultOptions.body = JSON.stringify(options.body);
      }
      const response = await fetchWithTimeout(url, defaultOptions);

      if (response.status >= 500) {
        throw new Error(
          i18n.t('error.500', {
            error: `${response.status} - Loading Failed`,
          }),
        );
      }

      return response.json().then(res => {
        if (
          res?.code === 440 ||
          res?.code === 441 ||
          res?.code === 401 ||
          res?.code === 403 ||
          res?.code === 110
        ) {
          store.dispatch(
            showPopup({
              onActionPress: () => {
                store.dispatch(hidePopup());
              },
              actionButtonText: i18n.t('button.close'),
              message: res?.message || 'Error',
              type: 'failure',
            }),
          );
          if (__DEV__) {
            console.warn(
              '[!response.ok] - request erorr',
              options.body || options.params,
            );
            console.error('[!response.ok] - error:', res);
          }
          throw res;
        }

        return res;
      });
    } catch (err: any) {
      const error = err;
      if (__DEV__) {
        console.warn('[catch] - request erorr', options.body || options.params);
        console.error('[catch] - Error:', error);
      }
      if (error?.message === 'Network request failed') {
        error.message = errorHandler(error?.message);
      }
      if (error || error?.message) {
        store.dispatch(
          showPopup({
            onActionPress: () => {
              store.dispatch(hideLoading());
              store.dispatch(hidePopup());
            },
            actionButtonText: i18n.t('button.close'),
            message: error?.message || 'Error',
            type: 'failure',
          }),
        );
      }
      throw error;
    }
  },

  get: (path: string, options?: any) =>
    fetchClient.request('GET', path, options),

  post: (path: string, body: any, options?: IFetchOptions) =>
    fetchClient.request('POST', path, {...options, body}),

  put: (path: string, body: any, options?: IFetchOptions) =>
    fetchClient.request('PUT', path, {...options, body}),

  delete: (path: string, options?: IFetchOptions) =>
    fetchClient.request('DELETE', path, options),

  token: async (method: string, path: string, options: IFetchOptions = {}) => {
    let url = `${BASE_URL}/${path}`;

    if (options.params) {
      const queryString = new URLSearchParams(options.params).toString();
      url = `${url}?${queryString}`;
    }

    const defaultOptions: IFetchOptions = {
      ...options,
      method,
      headers: {
        ...HEADERS_OPTIONS,
        ...options.headers,
        'Content-Type': 'application/json',
        redirect: 'follow',
      },
    };

    if (options.body) {
      defaultOptions.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetchWithTimeout(url, defaultOptions);
      if (response.status >= 500) {
        throw new Error(
          i18n.t('error.500', {
            error: `${response.status} - Loading Failed`,
          }),
        );
      }

      return response
        .json()
        .then(res => {
          if (res?.code === 110) {
            if (__DEV__) {
              console.warn(
                'token [!response.ok] - request erorr',
                options.body || options.params,
              );
              console.error('token [!response.ok] - error:', res);
            }
            throw res;
          }
          return res;
        })
        .catch(err => {
          if (__DEV__) {
            console.log('[token] - response.json() - err', err);
          }
          return err;
        });
    } catch (error: any) {
      if (__DEV__) {
        console.warn(
          'token [catch] - request erorr',
          options.body || options.params,
        );
        console.error('token [catch] - Error:', error);
      }
      throw error;
    }
  },
};

export {fetchClient};
