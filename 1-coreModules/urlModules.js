const url = require('url');
//The url module provides utilities to parse URLs or format them.

// Parse a URL string
const myURL = url.parse('https://example.com/path?name=shahryar&age=25');

console.log(myURL);

console.log(myURL.hostname);  // Output: example.com
console.log(myURL.pathname);  // Output: /path
console.log(myURL.query);     // Output: name=shahryar&age=25

console.log(myURL.format());

