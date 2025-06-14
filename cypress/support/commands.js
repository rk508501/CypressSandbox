// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, pwd)=>{
    cy.visit("https://www.saucedemo.com/");
    cy.get('#user-name').type(username)
    cy.get('#password').type(pwd)
    cy.get('#login-button').click()
    cy.contains('Swag Labs').should('be.visible')
    return cy.url().then(url =>{
        return url
    })
})

// Custom command to log messages to the Mochawesome report
Cypress.Commands.add('addLog', (message) => {
  cy.task('logToReport', message);
  cy.once('test:after:run', (test, runnable) => {
    // Attach log to the test context for mochawesome
    if (!test.context) test.context = '';
    test.context += `\nLOG: ${message}`;
  });
});