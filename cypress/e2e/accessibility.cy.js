// cypress/e2e/accessibility.cy.js
describe('Accessibility Tests with axe-core', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('should have no detectable accessibility violations on load', () => {
    cy.checkA11y();
  });

  it('should have no accessibility violations on main content', () => {
    cy.checkA11y('.container');
  });

  it('should have accessible links', () => {
    cy.checkA11y('a');
  });

  it('should have proper color contrast', () => {
    cy.checkA11y(null, {
      rules: {
        'color-contrast': { enabled: true }
      }
    });
  });

  it('should have proper heading hierarchy', () => {
    cy.checkA11y(null, {
      rules: {
        'heading-order': { enabled: true }
      }
    });
  });
});
