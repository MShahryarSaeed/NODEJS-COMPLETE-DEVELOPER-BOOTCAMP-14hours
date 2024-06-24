// const customError = require('../common/errors/customError');

// const errorHandler = (error, req, res, next) => {

//   if (error instanceof customError) {

//     return res.status(error.statusCode).json({
//       status: 'Failed',
//       errors: error.generateErrors(),
//     });

//   } else {

//     const statusCode = error.statusCode || 400;
//     const errorMessage = error.message || error;

//     res.status(statusCode).json({
//       status: "Failed",
//       errors: [{message:errorMessage}]
//     })

//   }

//   res.status(500).json({
//     status: 'failed',
//     errors: [{ message: 'Something went wrong' }],
//   });

// };

// module.exports = errorHandler;;;

const customError = require('../common/errors/customError');

const errorHandler = (error, req, res, next) => {

    if (error instanceof customError) {
        return res.status(error.statusCode).json({
            status: 'Failed',
            errors: error.generateErrors(),
        });
    }

    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'Something went wrong';

    res.status(statusCode).json({
        status: "Failed",
        errors: [{ message: errorMessage }],
    });

};

module.exports = errorHandler;


