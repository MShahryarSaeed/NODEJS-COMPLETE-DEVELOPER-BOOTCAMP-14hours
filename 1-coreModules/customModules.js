const fs=require("fs");

const messageLogger=(message)=>{

    fs.appendFile("Logger.log",message+"\n",(error)=>{

        if(error){
            console.log("Error occured :",error.message,"/n");
        }else{
            console.log("Message Logged :",message,"/n");
        }
        
    })

}


// Named Export
module.exports = messageLogger; // Exports the messageLogger function

// Name Export
module.exports.config = {
    logFilename: "Logger.log"
};  
// By exporting the config object separately, we can access both the messageLogger function and the config object.

// Sometimes we want more than  one thing to export from a file by using default export we can only export one thing but attach the config properties then we have access to all fileds passing to this object


/*
Another way to use this function and config object in different files
const messageLogger = require('./path/to/messageLogger'); // Importing the messageLogger function
const loggerConfig = require('./path/to/messageLogger').config; // Importing the config object separately

// Now you can use both the messageLogger function and the config object
messageLogger('Some message'); // Example usage of the messageLogger function

console.log(loggerConfig.logFilename); // Example usage of the logFilename property in the config object

*/