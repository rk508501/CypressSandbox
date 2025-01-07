const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

function generateWorkflowYaml(config = {}) {
  const {
    workflowName = 'Cypress Batch Run',
    nodeVersion = '18',
    retentionDays = 30
  } = config;

  // Read test specs from cypress/e2e directory
  const testSpecsDir = path.join(__dirname, 'cypress/e2e');
  const getAllTestSpecs = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getAllTestSpecs(filePath));
      } else if (file.endsWith('.cy.js') || file.endsWith('.cy.ts')) {
        results.push(filePath);
      }
    });
    return results;
  };

  const testSpecs = getAllTestSpecs(testSpecsDir).map(file => path.relative(__dirname, file));

  // Generate batch jobs
  const batchJobs = testSpecs.reduce((acc, spec, index) => {
    const batchNumber = index + 1;
    acc[`batch${batchNumber}`] = {
      'runs-on': 'ubuntu-latest',
      steps: [
        {
          name: 'Checkout',
          uses: 'actions/checkout@v3'
        },
        {
          name: 'Setup Node',
          uses: 'actions/setup-node@v3',
          with: {
            'node-version': nodeVersion,
            cache: 'npm'
          }
        },
        {
          name: 'Install Dependencies',
          run: 'npm ci\nnpm install -g mochawesome-merge mochawesome-report-generator'
        },
        {
          name: 'Create reports directory',
          run: `mkdir -p cypress/reports/mocha/batch${batchNumber}`
        },
        {
          name: `Run Batch ${batchNumber} tests`,
          run: [
            'npx cypress run \\',
            `  --spec "${spec}" \\`,
            '  --reporter mochawesome \\',
            `  --reporter-options reportDir=cypress/reports/mocha/batch${batchNumber},overwrite=false,html=false,json=true`
          ].join('\n'),
          'continue-on-error': true
        },
        {
          name: `Upload Batch ${batchNumber} Reports`,
          if: 'always()',
          uses: 'actions/upload-artifact@v3',
          with: {
            name: `batch${batchNumber}-reports`,
            path: `cypress/reports/mocha/batch${batchNumber}`,
            'retention-days': retentionDays
          }
        }
      ]
    };
    return acc;
  }, {});

  // Generate merge reports job
  const mergeReportsJob = {
    'runs-on': 'ubuntu-latest',
    needs: Object.keys(batchJobs),
    if: 'always()',
    steps: [
      {
        name: 'Checkout',
        uses: 'actions/checkout@v3'
      },
      {
        name: 'Setup Node',
        uses: 'actions/setup-node@v3',
        with: {
          'node-version': nodeVersion,
          cache: 'npm'
        }
      },
      {
        name: 'Download all artifacts',
        uses: 'actions/download-artifact@v3',
        with: {
          path: 'cypress/reports/mocha'
        }
      },
      {
        name: 'Install dependencies',
        run: 'npm ci\nnpm install -g mochawesome-merge mochawesome-report-generator'
      },
      {
        name: 'Merge JSON reports',
        run: [
          '# Ensure directory exists',
          'mkdir -p cypress/reports/mocha',
          '',
          '# Debug: List all json files',
          'echo "Available report files:"',
          'find cypress/reports/mocha -name "*.json" -type f',
          '',
          '# Create empty array if no reports exist',
          'echo "[]" > cypress/reports/mocha/merged-report.json',
          '',
          '# Merge reports with error handling',
          'if find cypress/reports/mocha -name "*.json" -type f | grep -q .; then',
          '  mochawesome-merge "cypress/reports/mocha/**/mochawesome*.json" > cypress/reports/mocha/merged-report.json || echo "[]" > cypress/reports/mocha/merged-report.json',
          'fi'
        ].join('\n')
      },
      {
        name: 'Generate HTML report',
        if: 'always()',
        run: [
          'marge cypress/reports/mocha/merged-report.json \\',
          '  --reportDir cypress/reports/mocha \\',
          '  --reportFilename merged-report \\',
          '  --inline true \\',
          '  --charts true \\',
          '  --overwrite true'
        ].join('\n')
      },
      {
        name: 'Upload HTML Report',
        if: 'always()',
        uses: 'actions/upload-artifact@v3',
        with: {
          name: 'cypress-html-report',
          path: 'cypress/reports/mocha/merged-report.html',
          'retention-days': retentionDays
        }
      }
    ]
  };

  // Construct the complete workflow
  const workflow = {
    name: workflowName,
    on: ['push', 'pull_request'],
    jobs: {
      ...batchJobs,
      'merge-reports': mergeReportsJob
    }
  };

  // Convert to YAML
  const yamlContent = yaml.dump(workflow, {
    lineWidth: -1,
    noRefs: true,
    quotingType: '"'
  });

  // Write to file
  const filePath = path.join(__dirname, 'SpecRunner.yml');
  fs.writeFileSync(filePath, yamlContent, 'utf8');
}

//If you wish to execute selected specs, you can pass the testSpecs array in the config object.
const config = {
  workflowName: 'Cypress Batch Run',
  nodeVersion: '18',
  testSpecs: [
    // 'cypress/e2e/regression/actions.cy.js',
    // 'cypress/e2e/regression/misc.cy.js',
    //'cypress/e2e/regression/viewport.cy.js'
  ],
  retentionDays: 30
};

generateWorkflowYaml(config);

module.exports = generateWorkflowYaml;