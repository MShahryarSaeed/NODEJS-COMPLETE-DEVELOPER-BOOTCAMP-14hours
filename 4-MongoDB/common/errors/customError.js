// Parenrt Class of All Types of Errors

module.exports = class customError extends Error {

    constructor(message) {
        
        super(message);

        if(new.target === customError) {
            throw new TypeError('Cannot construct CustomError instances directly')
        }
        
    }

    /**
     * @abstract
     * @returns Array<{ message: string, field?: string }>
     */
    generateErrors() {
        throw new Error('generateErrors must be implemented in subclass') //This function will return array of objects when we use in sub classes
    }
}
