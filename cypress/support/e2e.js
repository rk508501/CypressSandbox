
import './commands'
const fs = require('fs');
const path = require('path');

Cypress.on('uncaught:exception', (err, runnable) =>{
    return false
})

