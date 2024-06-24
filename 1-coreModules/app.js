const isEven=require("is-even"); //a dev dependency
//main:app.js


// To install the latest version of the package use :  npm install package-name@latest
// To install the specific version of the package use :  npm install package-name@1.0.0
// To uninstall the Package use : npm uninstall package-name
//To update the package use : npm update package-name
// To check the version of the package use : npm view package-name version
// To checkoutDated pacakegs in project : npm outdated

//To install npm package as a core dependency use : npm install mooment --save
//To install npm package as a dev dependency use : npm install mooment --save-dev
//To install npm package as a optional dependency use : npm install mooment --save-optional

// npm install --production  (This will install all the dependencies in production mode) which are necessary for production mode
// npm install --save-dev  (This will install all the dependencies in development mode) which are necessary for only development mode

//use can use --watch flag to watch the changes in the file (You have to write it in script like "start": "nodemon --watch app.js")
 
console.log(isEven(2)); 