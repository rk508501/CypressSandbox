const { defineConfig } = require("cypress");
const XLSX = require("xlsx");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout:3000,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome',
      overwrite: false,
      html: false,
      json: true,
      code: false, // Do not display code in the report
      reportTitle: 'Cypress Docker Report' // Set custom report title
    },
    setupNodeEvents(on, config) {
      // Add a Cypress task for reading an Excel file
      on("task", {
        readExcelFile() {
          // Load the Excel file
          const filePath = 'C:\\Users\\itsga\\Documents\\Automation\\CypressSandbox\\cypress\\fixtures\\Logins.xlsx';
          const workbook = XLSX.readFile(filePath);

          // Get the first sheet name
          const sheetName = workbook.SheetNames[0];

          // Get the sheet data
          const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

          // Log the data to the console
          console.log(sheetData);

          // Example assertion (pure Node.js)
          if (sheetData.length === 0) {
            throw new Error('Sheet data is empty');
          }

          // Return the sheet data to Cypress
          return sheetData;
        },
        logToReport(message) {
          // Write logs to a file for mochawesome-report-generator to pick up
          const fs = require('fs');
          const logPath = 'cypress/reports/mochawesome/custom-logs.txt';
          fs.appendFileSync(logPath, message + '\n');
          return null;
        }
      });
    },
  },
});
