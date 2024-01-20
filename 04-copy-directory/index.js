const fs = require('fs');
const path = require('path');

function copyDir(copyFrom, copyTo) {
  fs.mkdir(path.join(copyTo), { recursive: true }, (error) => {
    if (error) return console.error(error.message);
  });

  fs.readdir(path.join(copyFrom), 'utf8', (error, files) => {
    if (error) return console.error(error.message);
    files.forEach((file) => {
      const copyFileFrom = path.join(copyFrom, file);
      const copyFileTo = path.join(copyTo, file);
      fs.copyFile(copyFileFrom, copyFileTo, (error) => {
        if (error) return console.error(error.message);
      });
    })
  })
}

const copyDirFrom = path.join(__dirname, 'files');
const copyDirTo = path.join(__dirname, 'files-copy');
copyDir(copyDirFrom, copyDirTo);