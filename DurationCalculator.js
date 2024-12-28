const fs = require('fs');
const path = require('path');

const reportsDirectory = path.join(__dirname, 'cypress/reports/mocha');

function parseMochaReports() {
    const result = [];

    fs.readdirSync(reportsDirectory).forEach(file => {
        const filePath = path.join(reportsDirectory, file);
        if (file.endsWith('.json')) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            //Add to result
            result.push({
                duration: data.stats.duration,
                file: data.results[0].file
            });
        }
    });

    return result;
}

const parsedResults = parseMochaReports();
console.log(parsedResults);

const numberOfBatches = 3;
const batches = createBatches(parsedResults, numberOfBatches);
console.log(batches);

// Calculate and log batch durations
batches.forEach((batch, index) => {
    const totalDuration = batch.reduce((sum, spec) => sum + spec.duration, 0);
    console.log(`Batch ${index + 1}: Total Duration = ${totalDuration} ms`);
    console.table(batch);
});

function createBatches(specs, numberOfBatches) {
    // Sort specs by duration in descending order
    specs.sort((a, b) => b.duration - a.duration);

    // Initialize batches
    const batches = Array.from({ length: numberOfBatches }, () => []);

    // Distribute specs into batches
    specs.forEach(spec => {
        // Find the batch with the smallest total duration
        let smallestBatch = batches.reduce((prev, curr) => {
            return prev.reduce((sum, spec) => sum + spec.duration, 0) <
                   curr.reduce((sum, spec) => sum + spec.duration, 0) ? prev : curr;
        });

        // Add the spec to the smallest batch
        smallestBatch.push(spec);
    });

    return batches;
}