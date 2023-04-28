/// <reference types="cypress" />



Cypress.Commands.add('loginByGoogleApi', () => {
  cy.log('Logging in to Google')
  cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {
      grant_type: 'refresh_token',
      client_id: Cypress.env('googleClientId'),
      client_secret: Cypress.env('googleClientSecret'),
      refresh_token: Cypress.env('googleRefreshToken'),
    },
    failOnStatusCode: false
  }).then(({ body }) => {
    const { access_token } = body
    cy.setCookie('googleAccessToken', access_token)
  })
})

