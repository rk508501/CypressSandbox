describe("Test ISRO vehicles", function () {
  let testdata = Cypress.env('entities').spacecrafts;

  testdata.forEach(spacecraft => {
    it("Testing " + spacecraft.name, ()=>{
      cy.log(spacecraft.id)
    })
  })
});