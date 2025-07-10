const API_CODE = {
  // TODO: App-particular API
} as const;
const APP_HTTP_STATUS_CODE = {
  ...API_CODE,
} as const;

export {APP_HTTP_STATUS_CODE};
