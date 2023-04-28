const browserPermissions = require('cypress-browser-permissions')

module.exports = (on, config) => {
  on('before:browser:launch', (browser, launchOptions) => {
    return browserPermissions(browser, {
      permissions: {
        geolocation: 'allow'
      }
    })
  })
}