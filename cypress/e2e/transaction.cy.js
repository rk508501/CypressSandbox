/// <reference types="cypress" />

it("Transaction", () => {
  cy.visit("http://127.0.0.1:5500/cypress/support/guidTransactionFlow.html");
  cy.get("#startButton").click();

  cy.contains("The following transaction ID will be processed...", {
    timeout: 5000,
  }).should("be.visible");

  cy.get("#guid")
    .invoke("text")
    .should("have.length.greaterThan", 0, { timeout: 5000 })
    .then((guidText) => {
      cy.log(guidText);

      cy.get("#processButton").click();

      cy.get("#confirmation").invoke("text").should("include", guidText);
    });
});
