const fs = require('fs');
const path = require('path');

const stylesDirPath = path.join(__dirname, 'styles');
fs.readdir(stylesDirPath, { withFileTypes: true }, (error, files) => {
  if (error) return console.error(error.message);
  let stylesString = '';
  const filteredFiles = files.filter((file) => file.isFile() && path.extname(file.name) === '.css');
  for (const file of filteredFiles) {
    fs.readFile(path.join(__dirname, 'styles', file.name), 'utf8', (error, data) => {
      if (error) return console.error(error.message);
      stylesString += data;

      fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), stylesString, (error) => {
        if (error) return console.error(error.message);
      });
    });
  }
});