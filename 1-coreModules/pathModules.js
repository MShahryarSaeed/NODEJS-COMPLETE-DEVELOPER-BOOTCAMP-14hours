const path = require("path");
const messageLogger = require("./customModules");

console.log("/n");


const joinedPath = path.join("/Documents", "images", "flower.png");
console.log("Joined Path: ", joinedPath, "\n");

const basename = path.basename("/Documents/images/flower.png");
console.log("Base Name: ", basename, "\n");

const dirname = path.dirname("/Documents/images/flower.png");
console.log("Directory Name: ", dirname, "\n");

const parsedPath = path.parse("/Documents/images/flower.png");
console.log("Parsed Path: ", parsedPath, "\n");

messageLogger("Hello Message From path Module File");
console.log("Hello :",messageLogger.config.logFilename);

// SSID6-HOME-TOWN
// P@kistan123@