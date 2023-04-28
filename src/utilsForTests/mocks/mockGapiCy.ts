

// export const mockGapiCy = () => {
//   const getAuthInstanceMock = cy.stub()
//   const initMock = cy.stub()
//   const getTokenMock = cy.stub()
//   const setTokenMock = cy.stub()
//   const loadMock = cy.stub()
//   const listMock = cy.stub()


// 	global.gapi = global.gapi || {
// 	  auth2: {
//       getAuthInstance: getAuthInstanceMock
//     },
//     client: {
//       init: initMock,
// 			getToken: getTokenMock,
// 			setToken: setTokenMock,
// 			calendar: {
// 				Events: {
// 					items: []
// 				},
// 				events: {
// 					list: listMock
// 				}
// 			},
//     },
//     load: loadMock
// 	}

//   return { getAuthInstanceMock, initMock, getTokenMock, loadMock };
// };