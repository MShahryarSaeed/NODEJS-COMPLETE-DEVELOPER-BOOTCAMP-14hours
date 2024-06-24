const customError=require("./customError");

module.exports = class NotAuthorizedError extends customError {
    
    constructor() {
        super('Not authorizeds');

        this.statusCode = 401
    }

    generateErrors() {
        return [{ message: 'Not Authorized 401' }]
    }
}