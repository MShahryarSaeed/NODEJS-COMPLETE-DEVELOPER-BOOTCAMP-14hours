const customError = require("./customError");

module.exports=class BadRequest extends customError{

    constructor(customMessage) {

        super('Bad Request'),

        this.statusCode = 400,
        this.customMessage=customMessage

    }

    generateErrors(){

        if(this.customMessage){
            return [{message:this.customMessage}]
        }
        
        return [{message:'Bad Request| 400'}]
    }
}