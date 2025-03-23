const fs = require('fs');
const path = require('path');

// Function to read a directory
function readDirectory(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error("Error reading the directory:", err);
      return;
    }

    console.log(`Contents of ${dirPath}:`);
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        console.log(`[Folder] ${file}`);
      } else {
        console.log(`[File] ${file}`);
      }
    });
  });
}

// Example usage
const directoryPath = './example-folder'; // Replace with your folder path
readDirectory(directoryPath);
