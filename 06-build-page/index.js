const fs = require('fs');
const path = require('path');

const assetsDirectory = path.join(__dirname, 'assets');
const componentsDirectory = path.join(__dirname, 'components');
const stylesDirectory = path.join(__dirname, 'styles');
const templateFile = path.join(__dirname, 'template.html');
const projectDistDirectory = path.join(__dirname, 'project-dist');

fs.mkdir(projectDistDirectory, { recursive: true }, (error) => {
  if (error) return console.error(error.message);
});

function buildHtml(originalFile, pageComponentsDir) {
  fs.readFile(originalFile, 'utf8', (error, data) => {
    if (error) return console.error(error.message);
    let templateHtmlData = data;
  
    fs.readdir(pageComponentsDir, { withFileTypes: true }, (error, componentFiles) => {
      if (error) return console.error(error.message);
      const filteredComponents = componentFiles.filter((file) => path.extname(file.name) === '.html');
  
      for (const component of filteredComponents) {
        fs.readFile(path.join(pageComponentsDir, component.name), 'utf-8', (error, componentData) => {
          if (error) return console.error(error.message);
          const compName = component.name.split('.')[0];
          templateHtmlData = templateHtmlData.replace(`{{${compName}}}`, componentData.toString());
  
          fs.writeFile(path.join(projectDistDirectory, 'index.html'), templateHtmlData, (error) => {
            if (error) return console.error(error.message);
            // console.log('File was created');
          })
        })
      }
    })
  })
}

buildHtml(templateFile, componentsDirectory);

// fs.readdir(stylesDirectory, { withFileTypes: true }, (error, files) => {
//   if (error) return console.error(error.message);
//   let stylesString = '';
//   const filteredFiles = files.filter((file) => file.isFile() && path.extname(file.name) === '.css');
//   for (const file of filteredFiles) {
//     fs.readFile(path.join(stylesDirectory, file.name), 'utf8', (error, data) => {
//       if (error) return console.error(error.message);
//       stylesString += data;

//       fs.writeFile(path.join(projectDistDirectory, 'style.css'), stylesString, (error) => {
//         if (error) return console.error(error.message);
//       })
//     })
//   }
// })
