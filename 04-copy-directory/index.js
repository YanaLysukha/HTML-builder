const fs = require('fs');
const path = require('path');

function copyDir(copyFrom, copyTo) {
  fs.mkdir(path.join(copyTo), { recursive: true }, (error) => {
    if (error) return console.error(error.message);
  });

  fs.readdir(path.join(copyFrom), 'utf8', (error, originalFiles) => {
    if (error) return console.error(error.message);
    originalFiles.forEach((file) => {
      const copyFileFrom = path.join(copyFrom, file);
      const copyFileTo = path.join(copyTo, file);
      fs.copyFile(copyFileFrom, copyFileTo, (error) => {
        if (error) return console.error(error.message);
      });
    })
    fs.readdir(copyTo, 'utf8', (error, files) => {
      if (error) return console.error(error.message);
      for (const file of files) {
        if (!originalFiles.includes(file)) {
          fs.rm(path.join(copyTo, file), (error) => {
            if (error) return console.error(error.message);
          })
        }
      }
    })
  })
}

const copyDirFrom = path.join(__dirname, 'files');
const copyDirTo = path.join(__dirname, 'files-copy');
copyDir(copyDirFrom, copyDirTo);