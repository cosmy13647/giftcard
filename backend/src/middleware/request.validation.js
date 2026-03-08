const AppError = require('../errors/AppError');

/**
 * Higher-order function to wrap a validation logic
 */
const validate = (validationFn) => {
    return (req, res, next) => {
        const errors = validationFn(req.body);
        if (errors && errors.length > 0) {
            return next(new AppError(errors.join(', '), 400));
        }
        next();
    };
};

module.exports = validate;
