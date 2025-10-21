import 'cypress-axe';
it('has no accessibility violations', () => {
  cy.visit('/');
  cy.injectAxe();
  cy.checkA11y();
});

it('displays homepage content', () => {
  cy.visit('/');
  cy.contains("Welcome to WPK's Homepage").should('be.visible');
});
