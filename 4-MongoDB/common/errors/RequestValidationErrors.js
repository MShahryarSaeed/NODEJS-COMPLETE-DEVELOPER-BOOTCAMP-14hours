const customError = require("./customError");

module.exports = class RequestValidationError extends customError {
  constructor(errorsArray) {

    super("Inavlid Request"),
      this.statusCode = 400,
      this.errorsArray = errorsArray

  }

  generateErrors() {

    return this.errorsArray.map((error) => {

      return { message: error.msg, field: error.path }; //error.msg is from express-validtor npm package

    });
    
  }
};
