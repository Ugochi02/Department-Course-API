const Joi = require('joi');

const createDepartmentValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(50).required().messages({
            'any.required': 'Department name is required',
            'string.min': 'Department name must be at least 3 characters',
            'string.max': 'Department name cannot exceed 50 characters',
            'string.empty': 'Department name cannot be empty'
        }),
        faculty: Joi.string().trim().min(3).max(50).required().messages({
            'any.required': 'Faculty name is required',
            'string.min': 'Faculty name must be at least 3 characters',
            'string.max': 'Faculty name cannot exceed 50 characters',
            'string.empty': 'Faculty name is required'
        }),
    })

    const { error } = schema.validate( req.body );

    if ( error ) {
        return res.status( 400 ).json( {
            message: error.details[ 0 ].message
        } );
    }

    next()
};


module.exports = {
    createDepartmentValidation
}