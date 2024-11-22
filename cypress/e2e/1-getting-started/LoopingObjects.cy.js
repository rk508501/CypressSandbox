describe("Test ISRO vehicles", function () {
  let testdata = []

  before(function () {
    cy.request("https://isro.vercel.app/api/spacecrafts").then(resp => {
      let spaceCrafts = resp.body.spacecrafts
      //cy.log(JSON.stringify(testdata))
      spaceCrafts.forEach(spaceVehicle => {
        //cy.log(spaceVehicle.name)
        testdata.push(spaceCrafts.name)
      })
    })
  })
  // Dynamically create tests after the API call has completed
  it('should have fetched spacecrafts', function () {
    expect(testdata).to.have.length.greaterThan(0); // Assert that we have data
  });

  // Use `after` to run dynamic tests once `testdata` is populated
  after(function () {
    cy.log("After block")
    cy.log("Len of testdata " + testdata.length)
    testdata.forEach((name) => {
      it(`Space vehicle: ${name}`, function () {
        cy.log(name)
        cy.wrap(name).should('not.be.empty')
      });
    });
  });
});