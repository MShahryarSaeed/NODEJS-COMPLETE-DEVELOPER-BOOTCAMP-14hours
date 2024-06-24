const customError = require("./customError");
// child class of cutomError

module.exports = class NotFoundError extends customError {

    constructor(customMessage) {

        super('Not found!') // logging
        this.statusCode = 404,
        this.customMessage=customMessage

    }

    generateErrors() {

       if(this.customMessage){
        return [{ message: this.customMessage }]
       }

       return [{ message: 'Not Found! 404' }]
    }
}