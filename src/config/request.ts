// Setting up default headers for the Fetch API
const HEADERS_OPTIONS = new Headers({
  'Content-Type': 'application/json',
});

// Setting up the default timeout and credentials options for fetch requests
// Note: Fetch doesn't natively support timeouts, so you'd need to implement this manually
const FETCH_TIMEOUT = 600000; // This will require additional handling to work with fetch

// Whether credentials (cookies, authorization headers) should be sent with the request
const INCLUDE_CREDENTIALS = false; // Use 'include' to send credentials
// Exporting the configurations

export {FETCH_TIMEOUT, HEADERS_OPTIONS, INCLUDE_CREDENTIALS};
