it("country capital function", () => {
  cy.visit("https://www.whereig.com/world-countries-and-capitals/");

   getCountryCapital("India").then(capital =>{
    expect(capital.trim()).to.deep.equal('New Delhi')
   })

   getCountryCapital("Canada").then(capital =>{
    expect(capital.trim()).to.deep.equal('Ottawa')
   })
});

function getCountryCapital(country){
    return cy.get("div.resp-tableizer > table > tbody > tr").then((tableRows) => {
        for (let rowIndex = 0; rowIndex < tableRows.length; rowIndex++) {
          let rowText = tableRows[rowIndex].innerText;
          if (rowText.includes(country)) {
            cy.log("Row index for India is " + rowIndex);
            cy.log(tableRows[rowIndex].innerText);
    
            return cy.wrap(tableRows[rowIndex])
              .find("td:nth-child(3)")
              .then((capitalElement) => {
                return capitalElement.text()
              });
            break;
          }
        }
      });
}
