const fs = require('fs');
const path = require('path');

// 1. Set the folder path
const folderPath = "C:\\Users\\needm\\OneDrive\\Desktop\\salary";

// 2. Get and sort all .xlsx files
if (!fs.existsSync(folderPath)) {
    console.error(`ERROR: The folder path does not exist.`);
    process.exit(1);
}

let files = fs.readdirSync(folderPath)
    .filter(file => file.endsWith('.xlsx'))
    .sort();

if (files.length === 0) {
    console.error("ERROR: No .xlsx files found in the folder!");
    process.exit(1);
}

// 3. Intelligently build the exact number of target names needed
const targetNames = [];
const startYear = 2010;
let yearOffset = 0;

while (targetNames.length < files.length) {
    const currentYear = startYear + yearOffset;
    targetNames.push(`FY${currentYear} Digital Hub.xlsx`);
    targetNames.push(`FY${currentYear} US_Site.xlsx`);
    yearOffset++;
}

console.log(`Found ${files.length} files. Starting rename process...`);

// 4. Rename each file sequentially
for (let i = 0; i < files.length; i++) {
    const oldPath = path.join(folderPath, files[i]);
    const newPath = path.join(folderPath, targetNames[i]);

    console.log(`Renaming: ${files[i]}  -->  ${targetNames[i]}`);
    fs.renameSync(oldPath, newPath);
}

console.log(`\nDone! All ${files.length} files successfully processed.`);
