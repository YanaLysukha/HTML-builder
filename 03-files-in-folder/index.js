const fs = require('fs');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolderPath,
  { withFileTypes: true },
  (error, files) => {
  if (error) return console.error(error.message);
  const filteredFiles = files.filter((file) => file.isFile());
  filteredFiles.forEach((file) => {
    fs.stat(path.join(secretFolderPath, file.name),
    (error, stats) => {
      if (error) return console.error(error.message);
      const name = file.name.split('.')[0];
      const extension = path.extname(file.name).slice(1);
      const size = stats.size;
      console.log(`${name} - ${extension} - ${size}`);
    })
  });
});