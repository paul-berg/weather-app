declare global {
	var google: any;
}

export const mockGoogleAccounts = () => {

	const initTokenClientMock = jest.fn();
	const requestAccessTokenMock = jest.fn();
	const initMock = jest.fn();
	const resetMock = jest.fn();
	const refreshAccessTokenMock = jest.fn();
	const isSignedInMock = jest.fn();
	const getMock = jest.fn();
	const revokeMock = jest.fn();
	const disableAutoSelectMock = jest.fn();
        // google.accounts.id.disableAutoSelect();
        global.google = global.google || {
                accounts: {
			oauth2: {
				initTokenClient: initTokenClientMock,
				TokenClient: {
					requestAccessToken: requestAccessTokenMock,
					init: initMock,
					reset: resetMock,
					refreshAccessToken: refreshAccessTokenMock,
					isSignedIn: isSignedInMock,
					currentUser: {
						get: getMock,
					}
                                },
                                revoke: revokeMock
			},
			id: {
				disableAutoSelect: disableAutoSelectMock,
			},
		}

	}

  return { requestAccessTokenMock };
};

// declare namespace google {
//   namespace accounts {
//     namespace oauth2 {
//       interface TokenClient {
        // requestAccessToken(options?: {
        //   /** Space-delimited list of requested scope(s). */
        //   scope?: string;
        //   /** The redirect URI to which the authorization server redirects the user-agent to when the end-user authorization step is completed. */
        //   redirect_uri?: string;
        //   /** Must always be set to code for this flow. */
        //   response_type?: string;
        //   /** String value that identifies the client to Google authorization server. */
        //   client_id?: string;
        //   /** An opaque value used by the client to maintain state between the request and callback. */
        //   state?: string;
        //   /** Whether or not to prompt the user for approval even if they have previously consented to the same scope(s) and the authorization server has cached their consent. */
        //   prompt?: string;
        //   /** The URL to which the authorization server directs the user-agent back after the end-user authorization step is completed. */
        //   login_hint?: string;
        //   /** The OpenID Connect 1.0 request parameter. */
        //   openid_realm?: string;
        //   /** The client's central endpoint.
        //    * Must be set to the GSI endpoint https://accounts.google.com 1
        //    * */
        //   endpoint?: string;
        // }): void;

//         /**
//          * Initializes the client with the given configuration.
//          * Must be called exactly once.
//          */
        // init(options: {
        //   client_id: string;
        //   scope?: string;
        //   redirect_uri?: string;
        //   callback?: () => void;
        // }): void;

//         /**
//          * Attempts to refresh the access token for the given client credentials.
//          * Assumes the client has already gone through register and requestAccessToken.
//          * Also assumes the access token has expired.
//          */
//         refreshAccessToken(): void;

//         /**
//          * Resets the GoogleAuth instance to its initial state.
//          */
//         reset(): void;

//         /**
//          * Returns true if the current user is authorized.
//          */
//         isSignedIn(): boolean;

//         /**
//          * Returns the current user that is signed in.
//          */
//         currentUser: {
//           get(): GoogleUser;
//         };

//         /**
//          * Signs in the user and initializes the client.
//          * Includes the authorization state passed in as a parameter.
//          */