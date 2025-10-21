// cypress/e2e/homepage.cy.js
describe('WPK Homepage Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the homepage successfully', () => {
    cy.contains('Welcome to WPK\'s Homepage').should('be.visible');
  });

  it('should have correct title', () => {
    cy.title().should('include', 'WPK\'s Homepage');
  });

  it('should display profile link', () => {
    cy.contains('My Profile').should('be.visible');
    cy.get('a[href*="github.com/WPK2006"]').should('exist');
  });

  it('should display schedule link', () => {
    cy.contains('My schedule for school').should('be.visible');
    cy.get('a[href*="tcstenungsund.github.io"]').should('exist');
  });

  it('should have working links', () => {
    cy.get('a[href*="github.com/WPK2006"]')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer');
  });

  it('should display footer', () => {
    cy.contains('© 2025 WPK2006').should('be.visible');
  });

  it('should be responsive', () => {
    // Test mobile viewport
    cy.viewport('iphone-x');
    cy.contains('Welcome to WPK\'s Homepage').should('be.visible');
    
    // Test tablet viewport
    cy.viewport('ipad-2');
    cy.contains('Welcome to WPK\'s Homepage').should('be.visible');
  });

  it('should register service worker', () => {
    cy.window().then((win) => {
      expect(win.navigator.serviceWorker).to.exist;
    });
  });
});
