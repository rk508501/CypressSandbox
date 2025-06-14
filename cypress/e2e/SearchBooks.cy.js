/// <reference types="cypress" />
const testData = require("../fixtures/books.json");

let keywords = testData.BooksToDisplay;

keywords.forEach((searchString) => {
  it("Search and verify if a book is displayed for " + searchString, () => {
    // 1. Naviate to books application https://demoqa.com/books
    cy.visit("https://demoqa.com/books");

    // 2. Search for the given book in the search box (used "Git") + // 3. Hit enter key
    cy.get("#searchBox").clear();
    cy.get("#searchBox").type(searchString + "{enter}");

    cy.get(".rt-tr-group").eq(0).should('include.text', searchString)

    cy.get(".rt-tr-group").each((bookRow, rowIndex) => {
      cy.wrap(bookRow)
        .invoke("text")
        .then((text) => {
          text = text.trim();
          if (text.length > 0) {
            cy.wrap(bookRow).should("include.text", searchString);
          } else {
            cy.log("Empty row found at " + rowIndex);
          }
        });
    });
  });
});
