
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