const util = require('util');
const fs = require('fs');

// Convert fs.readFile into a promise-based function
const readFile = util.promisify(fs.readFile);

// Use the promisified function
readFile('mynewfile3.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));
