/// <reference types="cypress" />

it("Check matching words", () => {
    cy.visit("http://127.0.0.1:5500/ThreeWords.html")
    cy.get('body').then($body => {
        const matchingElements = $body.find('li:contains("Fruit")').filter(':visible');
        //print the elemnts new line
        matchingElements.each((index, element) => {
            cy.log(index, element.innerText);
        });
        cy.get('li:contains("Fruit")').should('have.length', 3)

        cy.get('li').contains(/Fruit/).then(($li) => {
            cy.log($li.text());
        })
    })
})