export const mockGapi = () => {
  const getAuthInstanceMock = jest.fn()
  const initMock = jest.fn();
  const getTokenMock = jest.fn();
  const setTokenMock = jest.fn();
  const loadMock = jest.fn();
  const listMock = jest.fn();
	

	global.gapi = global.gapi || {
	  auth2: {
      getAuthInstance: getAuthInstanceMock
    },
    client: {
      init: initMock,
			getToken: getTokenMock,
			setToken: setTokenMock,
			calendar: {
				Events: {
					items: []
				},
				events: {
					list: listMock
				}
			},
    },
    load: loadMock
	}

  return { getAuthInstanceMock, initMock, getTokenMock, loadMock };
};


	
	// window.gapi = {
	// 	auth2: {
	// 		getAuthInstance: jest.fn(() => ({
	// 			isSignedIn: {
	// 				get: jest.fn(() => {}),
	// 				listen: jest.fn()
	// 			}
	// 		}))
	// 	},
	// 	client: {
	// 		init: jest.fn(() => true),
	// 		getToken: jest.fn(() => {})
	// 	},
	// 	load: jest.fn((a, f) => f())
	// };