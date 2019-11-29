/*describe('Go on sign in page', function() {
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
  });
});*/

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjRkYzYyMjg4Mzg3YjdjMWJiMTYzNmU2OWRlN2E4MTkxMDE5MDk3N2YxNGJmYTRiMGFjNDU4ZGEyMWI5NTc3MzAxNjVhMTRkMzY2NDRhY2EwIn0.eyJhdWQiOiIxIiwianRpIjoiNGRjNjIyODgzODdiN2MxYmIxNjM2ZTY5ZGU3YTgxOTEwMTkwOTc3ZjE0YmZhNGIwYWM0NThkYTIxYjk1NzczMDE2NWExNGQzNjY0NGFjYTAiLCJpYXQiOjE1NzUwMTExOTgsIm5iZiI6MTU3NTAxMTE5OCwiZXhwIjoxNjA2NjMzNTk4LCJzdWIiOiIzIiwic2NvcGVzIjpbIioiXX0.C_gz7UnpUSG8iq4sdBlD_9bIgy--JovpgesWgiKJasW_aLGk_vYb8bowOuARAFbfUHDDB3GnV_sR1o7-QzYxfgtZWw8s5OQiVifcWbVdp16rOg--Qsj0phdm8ZWaD6DtSwxxUWbRiweXOHcVGRNvMRpvX5Fio73-jrkLuxJmWA27wu1rkVnHsA3aKgXHHNxtmGMqvE_d1M9H6rrwIisOVZGNZcrFfoV5NS_-dHIYFZM-GfrQ4UDIhJgNrToziEJY4Bmd-XR1b9hIVt2R5xoGVo5IwNxTYEObgfa6G28nwNxxgtY_-R_pSpFGQPz_POmjh1ol6nhWTnkIKjlj24G31A4w--zz4F-MsZn0SE3rbwQCVTin5pUk2TvOsOPyqInT0JnPrF0EcvK7y82DRdSjW9pSZlkB5FdKcmQUSs1mgedwzE48IgM1m-UNJmugpLbnWHoPkeDg-of_IccZXWbUdBGpDtoEnUd9JzALBya_8xtPn8cJBL4COJIfIHDRApBK8EXDUu5QhGMvMKAiduALKJWEL3TowTmq5HAC2WFL4FJW_ExMpnP8nmEnDhhGEprhKjuWYUsPrPJURMvUyqC-HuT1mxIPVTTG1tDD9n_ZB2e9ea1JPHyEG3wF3FfbY4S6e6naJTGr5r8C3RbIy04Y69rcxiYEpvK7cdV2SOpV8wg";

describe('Create Event', function() {
  it('creates an event in the calendar', function() {
    cy.setCookie('accessToken', token);
    cy.visit('/dashboard');
    cy.get("div[class='rbc-day-bg']").first().click();
    cy.get('input').type("Cypress event");
    cy.get('button').contains('Valider').click();
  });
});



describe('Delete Event', function() {
  it('Deletes an event in the calendar', function() {
    cy.get("div[title='Cypress event']").dblclick();
    cy.get('button').contains('Valider').click();
  });
});

describe('Stat', function() {
  it('Checks the stat view', function() {
    cy.setCookie('accessToken', token);
    cy.get("div").contains('Statistiques').click();
  });
});

/*
describe('Logs out', function() {
  it('tries to logout', function() {
    cy.get("li").within(() => {
      cy.get("div").contains("Déconnexion").click();
    });
  });
});*/
