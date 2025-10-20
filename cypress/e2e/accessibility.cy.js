describe('Accessibility tests', () => {
  beforeEach(() => {
    cy.visit('https://wpk2006.github.io/WPK.github.io/')
    cy.injectAxe()
  })

  it('Should have no accessibility violations', () => {
    cy.checkA11y()
  })
})

import 'cypress-axe'
