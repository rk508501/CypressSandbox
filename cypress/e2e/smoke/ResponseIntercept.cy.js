it("Test intercept", () => {
    cy.intercept('/coffee/coffee/assets/list.json', (req) => {
        req.continue((res) => {
            // Log full request details
            console.log('Request Details:', JSON.stringify({
                method: req.method,
                url: req.url,
                headers: req.headers,
                body: req.body
            }, null, 2));

            // Log full response details
            console.log('Response Details:', JSON.stringify({
                statusCode: res.statusCode,
                headers: res.headers,
                body: res.body
            }, null, 2));
        });
    }).as('list');

    cy.visit("https://seleniumbase.io/coffee/");
    
    // Wait for the intercepted request
    cy.wait('@list').then((interception) => {
        cy.log('Final Interception:', JSON.stringify(interception, null, 2));
    });
});
