describe('Go on sign in page', function() {
  it('tries to go on sign in page', function() {
    cy.visit('/'); // change URL to match your dev URL
    cy.contains('Connexion').click();
    cy.url().should('match', /sign-in/);
  });
});

describe('Logs in', function() {
  it('tries to login', function() {
    cy.get('form').within(() => {
      cy.get('input[name="email"]')
        .click()
        .type('dbcassee@gmail.com');
      cy.get('input[name="password"]')
        .click()
        .type('jgg123');
    });
    cy.get('button').click();
    cy.url().should('match', /dashboard/);
    cy.url().should('match', /accueil/);
  });
});

describe('Logs out', function() {
  it('tries to logout', function() {
    cy.get("li").within(() => {
      cy.get("div").contains("Déconnexion").click();
    });
  });
});
