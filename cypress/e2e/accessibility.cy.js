describe('Accessibility tests', () => {
  beforeEach(() => {
    cy.visit('https://wpk2006.github.io./WPK.github.io/')
    cy.injectAxe()
  })

  it('Should have no accessibility violations', () => {
    cy.checkA11y()
  })
})

import 'cypress-axe'
// cypress/e2e/pwa-tests.cy.js

describe('WPK Homepage - PWA Tests', () => {
  
  beforeEach(() => {
    // Besök din sida före varje test
    cy.visit('https://wpk2006.github.io./WPK.github.io/')
  })

  // ===== E2E TESTER =====
  
  it('Should load the homepage', () => {
    cy.contains('Welcome to WPK\'s Homepage').should('be.visible')
  })

  it('Should have working links', () => {
    // Testa GitHub profil-länken
    cy.contains('My Profile')
      .should('have.attr', 'href', 'https://github.com./WPK2006')
      .should('have.attr', 'target', '_blank')
    
    // Testa schema-länken
    cy.contains('My schedule for school')
      .should('have.attr', 'href')
      .and('include', 'tcstenungsund.github.io')
  })

  it('Should display emojis correctly', () => {
    cy.get('.emoji').should('have.length', 2)
  })

  it('Should have correct page title', () => {
    cy.title().should('eq', 'WPK\'s Homepage')
  })

  it('Should have footer with copyright', () => {
    cy.get('footer').should('contain', '© 2025 WPK2006')
  })

  // ===== PWA TESTER =====
  
  it('Should have manifest.json', () => {
    cy.request('/WPK.github.io/manifest.json')
      .its('status')
      .should('eq', 200)
  })

  it('Should register service worker', () => {
    cy.window().then((win) => {
      expect(win.navigator.serviceWorker).to.exist
    })
  })

  // ===== UI/RESPONSIVENESS TESTER =====
  
  it('Should be responsive on mobile', () => {
    cy.viewport('iphone-x')
    cy.contains('Welcome to WPK\'s Homepage').should('be.visible')
  })

  it('Should be responsive on tablet', () => {
    cy.viewport('ipad-2')
    cy.contains('Welcome to WPK\'s Homepage').should('be.visible')
  })

  it('Should have gradient background', () => {
    cy.get('body').should('have.css', 'background-image')
      .and('include', 'linear-gradient')
  })

})

// ===== ACCESSIBILITY (A11Y) TESTER =====

describe('Accessibility Tests', () => {
  
  beforeEach(() => {
    cy.visit('https://wpk2006.github.io./WPK.github.io/')
    cy.injectAxe()
  })

  it('Should have no accessibility violations', () => {
    cy.checkA11y()
  })

  it('Should have proper heading hierarchy', () => {
    cy.get('h1').should('have.length', 1)
    cy.get('h2').should('have.length', 2)
  })

  it('All links should have accessible names', () => {
    cy.get('a').each(($link) => {
      cy.wrap($link).should('have.text')
    })
  })

  it('Should have proper color contrast', () => {
    cy.checkA11y(null, {
      rules: {
        'color-contrast': { enabled: true }
      }
    })
  })

})
