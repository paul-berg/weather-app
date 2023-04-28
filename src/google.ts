// declare global {
//   interface Window { gapi: any; }
// }

const loadGoogleClient = (): Promise<void> => {
  return new Promise((resolve) => {
    window.gapi.load('client', () => {
      resolve();
    });
  });
};

const loadGoogleAuth = (): Promise<void> => {
  return new Promise((resolve) => {
    window.gapi.load('auth2', () => {
      resolve();
    });
  });
};

const initGoogleClient = async (): Promise<void> => {
  await loadGoogleClient();
  await loadGoogleAuth();
  await window.gapi.client.init({
    apiKey: '<YOUR_API_KEY>',
    clientId: '<YOUR_CLIENT_ID>',
    scope: '<YOUR_SCOPES>',
  });
};