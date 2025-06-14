it("country capital function", () => {
  cy.visit("https://www.whereig.com/world-countries-and-capitals/");

  getCountryCapital("India").then(capital => {
    expect(capital.trim()).to.equal('New Delhi');
  });

  getCountryCapital("Canada").then(capital => {
    expect(capital.trim()).to.equal('Ottawa');
  });
});

function getCountryCapital(country) {
  return cy.get("div.resp-tableizer > table > tbody > tr").then((rows) => {
    // Convert NodeList to Array for easier manipulation
    const rowArr = Array.from(rows);
    // Find the row that contains the country name
    const targetRow = rowArr.find(row => row.innerText.includes(country));
    if (!targetRow) throw new Error(`Country "${country}" not found`);
    // Get the capital cell (3rd column)
    const capitalCell = targetRow.querySelector("td:nth-child(3)");
    return capitalCell ? capitalCell.innerText : null;
  });
}

