const os = require('os');
//The os module provides information about the operating system and hardware.

// Get the system's platform
console.log(os.platform());  // Output: win32, linux, darwin (depends on the system)

// Get the total memory
console.log(os.totalmem());  // Output: Total system memory in bytes

// Get the free memory
console.log(os.freemem());   // Output: Free memory in bytes'

console.log(os.cpus()); //Returns information about each CPU/core installed.

