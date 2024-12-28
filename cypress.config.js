const { defineConfig } = require("cypress");
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  "reporter": "cypress-multi-reporters",
  "reporterOptions": {
    "reporterEnabled": "mochawesome",
    "mochawesomeReporterOptions": {
      "reportDir": "cypress/reports/mocha",
      "quite": true,
      "overwrite": false,
      "html": false,
      "json": true
    }
  },
  e2e: {
    async setupNodeEvents(on, config) {
      let entities = await axios.get("https://isro.vercel.app/api/spacecrafts");
      config.env.entities = entities.data;

      on('after:run', (results) => {
        const jsonResults = JSON.stringify(results, null, 2);
        const testReportDirectory = path.join(process.cwd(), 'TestReport');

        // Create the TestReport directory if it doesn't exist
        if (!fs.existsSync(testReportDirectory)) {
          fs.mkdirSync(testReportDirectory, { recursive: true });
        }

        fs.writeFile(path.join(testReportDirectory, 'results.json'), jsonResults, (err) => {
          if (err) {
            console.error('Failed to write the test results:', err);
          } else {
            console.log('Test results written successfully to results.json');
          }
        });
      });

      return config;
    },
  },
});