const errorHandler = (error, req, res, next) => {

    const errorMessage = error.message;
    const statusCode = error.statusCode || 500;

    if (error) {

        if (error.message) {

            return res.status(statusCode).json({
                success: false,
                status: "Failed",
                error: errorMessage
            })

        } else {

            return res.status(statusCode).json({
                success: false,
                status: "Failed",
                error: error
            })

        }

    } else {
        next();
    }

}

module.exports = errorHandler;