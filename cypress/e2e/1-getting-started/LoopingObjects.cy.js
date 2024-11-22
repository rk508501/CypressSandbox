describe("Test ISRO vehicles", function () {
  let testdata = []

  before(function () {
    cy.task('getEntities').then(resp =>{
      testdata = resp.spacecrafts
      testdata.forEach(spaceCraft =>{
        cy.log(spaceCraft)
      })
    })
  })

  testdata.forEach(spacecraft => {
    it("Testing " + spacecraft.name, ()=>{
      cy.log(spacecraft.id)
    })
  })
});