const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'cypress');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else if (file.endsWith('.cy.js')) {
      arrayOfFiles.push(path.relative(__dirname, path.join(dirPath, file)));
    }
  });

  return arrayOfFiles;
}

function splitIntoBatches(files, batchSize) {
  const batches = [];
  for (let i = 0; i < files.length; i += batchSize) {
    batches.push(files.slice(i, i + batchSize));
  }
  return batches;
}

const allFiles = getAllFiles(directoryPath);
const batchSize = Math.ceil(allFiles.length / 3);
const batches = splitIntoBatches(allFiles, batchSize);

console.log('Batch 1:', batches[0]);
console.log('Batch 2:', batches[1]);
console.log('Batch 3:', batches[2]);