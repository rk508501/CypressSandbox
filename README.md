# Cypress Workflow YAML Generator

A Node.js utility that automatically generates GitHub Actions workflow YAML configurations for running Cypress tests in parallel batches. This tool automatically discovers Cypress test specs in your project and creates a workflow that runs each spec in a separate job, with consolidated reporting.

## Features

- Automatic test spec discovery from your Cypress `e2e` directory
- Configurable workflow settings
- Parallel test execution (one spec per job)
- Mochawesome report integration
- Automatic report merging
- Artifact upload and storage
- Support for both `.cy.js` and `.cy.ts` files

## Installation

```bash
npm install js-yaml
```

## Usage

### Basic Usage

```javascript
const generateWorkflowYaml = require('./generateWorkflowYaml');

// The config object is optional - the generator will use default values
generateWorkflowYaml();
```

### Configuration Options

```javascript
const config = {
  workflowName: 'Custom Cypress Run',  // Default: 'Cypress Batch Run'
  nodeVersion: '20',                   // Default: '18'
  retentionDays: 60,                  // Default: 30
  testSpecs: [                        // Optional: Specify specific specs
    'cypress/e2e/regression/actions.cy.js',
    'cypress/e2e/regression/misc.cy.js'
  ]
};

generateWorkflowYaml(config);
```

### Output

The script generates a `SpecRunner.yml` file in your project directory that can be used as a GitHub Actions workflow configuration. The workflow:

1. Creates separate jobs for each test spec
2. Runs tests in parallel
3. Generates individual Mochawesome reports
4. Merges all reports into a single HTML report
5. Uploads all reports as GitHub Actions artifacts

## Generated Workflow Structure

- Each test spec runs in its own job
- All jobs run in parallel on Ubuntu latest
- Node.js setup with npm caching
- Mochawesome reporter configuration
- Report merging job that runs after all test jobs complete
- Artifact upload for both individual and merged reports

## Requirements

- Node.js 18 or higher
- A Cypress project with tests in the `cypress/e2e` directory
- npm or yarn package manager
- GitHub repository (for using the generated workflow)

## File Structure

Your project should have the following structure for automatic spec discovery:

```
your-project/
├── cypress/
│   └── e2e/
│       └── **/*.cy.js
│       └── **/*.cy.ts
├── generateWorkflowYaml.js
└── package.json
```

## Notes

- The generator will automatically discover all `.cy.js` and `.cy.ts` files in your Cypress `e2e` directory
- If you specify `testSpecs` in the config, it will override the automatic discovery
- Reports are retained for the specified number of days (default: 30)
- The workflow runs on both push and pull request events

## Error Handling

The script includes error handling for:
- Report merging failures
- Missing test specs
- Invalid directory structures

## Contributing

Feel free to open issues or submit pull requests for improvements to the generator.