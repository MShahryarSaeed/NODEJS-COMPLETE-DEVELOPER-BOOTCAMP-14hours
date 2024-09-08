// The fs module allows you to interact with the file system (reading, writing, updating, and deleting files).

const fs = require("fs"); //Builtin module of Node js

// 1-Writing to a File

/*
fs.writeFile("mynewfile3.txt", "Hello World", (error) => {
  if (error) throw error;
  console.log('Data has been written to the file.');
});
*/

// 2-Reading from a File (Asynchronous file reading)

/*
fs.readFile('mynewfile3.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File contents:', data);
});
*/

// Deleting a File
/* 
fs.unlink("mynewfile3.txt", (error) => {
  if (error) throw error;
  console.log("File Deleted!");
});
 */

// Asynchronous file append
/*
const additionalContent = '\nThis is additional text appended to the file.';
fs.appendFile('mynewfile3.txt', additionalContent, 'utf8', (err) => {
  if (err) {
    console.error('Error appending to file:', err);
    return;
  }
  console.log('Data has been appended (along with previous content) to the file.');
});
*/

// Asynchronous file/directory information

/*
fs.stat('mynewfile3.txt', (err, stats) => {
    if (err) {
      console.error('Error getting file/directory information:', err);
      return;
    }
    console.log('File/directory information:', stats);
  });
*/
  