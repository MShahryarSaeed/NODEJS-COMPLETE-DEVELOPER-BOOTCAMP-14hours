const crypto = require('crypto');

// Create a hash of a string
const hash = crypto.createHash('sha256').update('password123').digest('hex');
console.log(hash);  // Output: (hash value of 'password123')
