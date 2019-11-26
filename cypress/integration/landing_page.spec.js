describe('The Home Page', function() {
  it('successfully loads landing page', function() {
    cy.visit('/'); // change URL to match your dev URL
  });
});

describe('Go on sign up page', function() {
  it('tries to go on sign up page', function() {
    cy.visit('/'); // change URL to match your dev URL
    cy.contains('Inscription').click();
    cy.url().should('match', /sign-up/);
  });
});
