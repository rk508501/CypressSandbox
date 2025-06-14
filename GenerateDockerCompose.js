const fs = require('fs');
const path = require('path');

function generateDockerCompose(testDir, outputFile) {
    // Find all test files recursively with specified extensions
    function findTestFiles(dir, fileList = []) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                findTestFiles(fullPath, fileList);
            } else if (
                file.endsWith('.cy.js') ||
                file.endsWith('.cy.ts') ||
                file.endsWith('.spec.js') ||
                file.endsWith('.spec.ts')
            ) {
                fileList.push(fullPath);
            }
        });
        return fileList;
    }

    const testFiles = findTestFiles(testDir);
    let batches = [];
    if (testFiles.length > 10) {
        // Divide into 10 batches as evenly as possible
        const batchCount = 10;
        const minBatchSize = Math.floor(testFiles.length / batchCount);
        const remainder = testFiles.length % batchCount;
        let start = 0;
        for (let i = 0; i < batchCount; i++) {
            let end = start + minBatchSize + (i < remainder ? 1 : 0);
            batches.push(testFiles.slice(start, end));
            start = end;
        }
    } else {
        // Each spec gets its own batch
        batches = testFiles.map(f => [f]);
    }

    // Generate docker-compose YAML
    let compose = `version: '3.8'\nservices:\n`;
    batches.forEach((batch, idx) => {
        compose += `  cypress_batch_${idx + 1}:\n`;
        compose += `    image: cypress-docker-image\n`;
        compose += `    volumes:\n`;
        compose += `      - .:/e2e\n`;
        compose += `    working_dir: /e2e\n`;
        compose += `    command: npx cypress run --spec "${batch.map(f => f.replace(/\\/g, '/')).join(',')}"\n`;
    });

    fs.writeFileSync(outputFile, compose);
}

// Example usage:
generateDockerCompose('./cypress/e2e', './docker-compose.yml');

module.exports = generateDockerCompose;