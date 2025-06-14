
import './commands'
const fs = require('fs');
const path = require('path');

Cypress.on('uncaught:exception', (err, runnable) =>{
    return false
})

const reportsDir = path.resolve('cypress/reports');

before(() => {
    if (fs.existsSync(reportsDir)) {
        fs.rmSync(reportsDir, { recursive: true, force: true });
    }
});


