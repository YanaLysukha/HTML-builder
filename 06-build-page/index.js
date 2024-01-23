const fs = require('fs');
const path = require('path');

const componentsDirectory = path.join(__dirname, 'components');
const stylesDirectory = path.join(__dirname, 'styles');
const templateFile = path.join(__dirname, 'template.html');
const projectDistDirectory = path.join(__dirname, 'project-dist');
const assetsDirectory = path.join(__dirname, 'assets');
const assetsDirCopy = path.join(projectDistDirectory, 'assets');



function buildHtml(originalFile, pageComponentsDir) {
  fs.mkdir(projectDistDirectory, { recursive: true }, (error) => {
    if (error) return console.error(error.message);
  });
  
  fs.readFile(originalFile, 'utf8', (error, data) => {
    if (error) return console.error(error.message);
    let templateHtmlData = data;
  
    fs.readdir(pageComponentsDir, { withFileTypes: true }, (error, componentFiles) => {
      if (error) return console.error(error.message);
      const filteredComponents = componentFiles.filter((file) => path.extname(file.name) === '.html');
  
      function processFile(i) {
        if (filteredComponents.length === i){
          fs.writeFile(path.join(projectDistDirectory, 'index.html'), templateHtmlData, (error) => {
            if (error) return console.error(error.message);
          })
        }
        else{
          fs.readFile(path.join(pageComponentsDir, filteredComponents[i].name), 'utf-8', (error, componentData) => {
            if (error) return console.error(error.message);
            const compName = filteredComponents[i].name.split('.')[0];
            templateHtmlData = templateHtmlData.replace(`{{${compName}}}`, componentData.toString());
      
            processFile(i + 1);
          })
        }
      }

      if (filteredComponents.length === 0){
        return;
      }
      processFile(0);
    })
  })
}



function mergeStyles(originStylesDir) {
  fs.readdir(originStylesDir, { withFileTypes: true }, (error, files) => {
    if (error) return console.error(error.message);
    let stylesString = '';
    const filteredFiles = files.filter((file) => file.isFile() && path.extname(file.name) === '.css');
    for (const file of filteredFiles) {
      fs.readFile(path.join(originStylesDir, file.name), 'utf8', (error, data) => {
        if (error) return console.error(error.message);
        stylesString += data;
  
        fs.writeFile(path.join(projectDistDirectory, 'style.css'), stylesString, (error) => {
          if (error) return console.error(error.message);
        })
      })
    }
  })
}

function copyDirectory(copyFrom, copyTo) {
  fs.mkdir(copyTo, { recursive: true }, (error) => {
    if (error) return console.error(error.message);
  })

  fs.readdir(copyFrom, 'utf8', (error, directories) => {
    if (error) return console.error(error.message);

    for (const directory of directories) {
      fs.readdir(path.join(copyFrom, directory), 'utf8', (error, files) => {
        if (error) return console.error(error.message);

        fs.mkdir(path.join(copyTo, directory), { recursive: true }, (error) => {
          if (error) return console.error(error.message);

          files.forEach((file) => {
            const copyFileFrom = path.join(copyFrom, directory, file);
            const copyFileTo = path.join(copyTo, directory, file);

            fs.copyFile(copyFileFrom, copyFileTo, (error) => {
              if (error) return console.error(error.message);
            });
          })
        })
      })
    }
  })
}

buildHtml(templateFile, componentsDirectory);
mergeStyles(stylesDirectory);
copyDirectory(assetsDirectory, assetsDirCopy);