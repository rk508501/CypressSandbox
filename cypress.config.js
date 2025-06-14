const { defineConfig } = require("cypress");
const XLSX = require("xlsx");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 3000,
    reporter: 'mochawesome',
    // Block common advertising and tracking domains
    blockHosts: [
      "doubleclick.net",
      "www.doubleclick.net",
      "ad.doubleclick.net",
      "googleadservices.com",
      "www.googleadservices.com",
      "googlesyndication.com",
      "www.googlesyndication.com",
      "google-analytics.com",
      "www.google-analytics.com",
      "analytics.google.com",
      "ads.google.com",
      "adservice.google.com",
      "pagead2.googlesyndication.com",
      "adnxs.com",
      "www.adnxs.com",
      "advertising.com",
      "www.advertising.com",
      "scorecardresearch.com",
      "sb.scorecardresearch.com",
      "facebook.com",
      "pixel.facebook.com"
    ],
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
