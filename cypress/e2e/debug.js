const XLSX = require('xlsx');

// Function to read and log data from the Excel file
function readExcelFile() {
    // Load the Excel file
    const filePath = './cypress/fixtures/Logins.xlsx';
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
}

// Call the function
readExcelFile();