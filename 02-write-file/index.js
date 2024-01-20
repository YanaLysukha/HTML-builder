const fs = require('fs');
const path = require('path');
const { exit } = require("process");
const { stdin, stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, 'source.txt'));

console.log('Please type a message');
stdin.on('data', (data) => {
  const message = data.toString();
  if (message.trim() === 'exit') {
    process.on('exit', () => stdout.write('Nice to see you. Good luck!\n'));
    exit();
  }
  output.write(message);
});

process.on('SIGINT', () => {
  stdout.write('\nNice to see you. Good luck!\n');
  exit();
});
