/// <reference types="cypress" />

it("Verify if the Apple is present", () => {
  cy.visit("http://127.0.0.1:5500/HTML/appleProducts.html");
  cy.get("li")
    .then(listItems =>{
        let items = Cypress._.toArray(listItems)
        let appleEle = items.find(item =>{
            return item.innerText.trim() == "Apple"
        })
        cy.log(appleEle.innerText)
    })
});

