// src/utils/validator.js
const Joi = require('joi');

module.exports = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                errors: error.details.map(detail => detail.message)
            });
        }
        next();
    };
};
