

describe('Weather App e2e', () => {

  it('renders correctly', () => {
		cy.visit('/');
    cy.get('header.MuiPaper-root span').should('have.text', 'W App')
    cy.get('button[type="submit"]').should('exist')
    cy.get('input[type="text"]').should('exist')
    cy.get('button[class~="MuiToggleButton-standard"]:first-of-type').should('have.value', 'daily')
    cy.get('button[disabled]').should('have.value', 'daily')
    cy.get('button.MuiToggleButton-standard:last-of-type').should('have.value', 'hourly')
    cy.contains('sign in').should('exist')
    cy.get('li').should('have.length', 3)
  })

  it('changes a location', () => {
    cy.visit('/');    
    cy.get('input[type="text"]').clear()
    cy.get('input[type="text"]').type('Tokyo')
    cy.get('input[type="text"]').should('have.value', 'Tokyo')
    cy.get('button[type="submit"]').click()
    cy.get('div.makeStyles-eventAndTimeStyle-10 p.MuiTypography-root:last-of-type').contains(/tokyo/i)
  })

  it('shows error indicator if location is wrong', () => {
    cy.visit('/');    
    cy.get('input[type="text"]').clear()
    cy.get('input[type="text"]').type('dsdsdsdssadsadsa')
    cy.get('input[type="text"]').should('have.value', 'dsdsdsdssadsadsa')
    cy.get('button[type="submit"]').click()
    cy.get('h1').should('have.text','Oops!')
    cy.get('h5').contains('No matching location found.')
    cy.get('h1~button.MuiButtonBase-root:last-of-type').click()
    cy.get('div.makeStyles-eventAndTimeStyle-10').should('exist')
  })

  it('changes type of forecast', () => {
    cy.visit('/')
    cy.get('button[disabled]').should('have.value', 'daily')
    cy.get('li').should('have.length', 3)
    cy.get('button.MuiToggleButton-standard:last-of-type').should('have.value', 'hourly')
    cy.get('button.MuiToggleButton-standard:last-of-type').click()
    cy.get('button[disabled]').should('have.value', 'hourly')
    cy.get('li').should('have.length', 6)
    cy.get('button.MuiToggleButton-standard:first-of-type').should('have.value', 'daily')
    cy.get('button.MuiToggleButton-standard:first-of-type').click()
    cy.get('li').should('have.length', 3)
  })

  it('should input email and password', () => {
    cy.loginByGoogleApi()
    cy.visit('/')
    cy.contains('sign out').should('exist')
    cy.get('button.makeStyles-buttonStyle-13').click()
    cy.clearCookies()
    cy.visit('/')
    cy.contains('sign in').should('exist')
  });
})