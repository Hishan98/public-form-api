const Joi = require('@hapi/joi');

const commentsValidation = data => {
    const schema = Joi.object({
        post_id: Joi.string().min(6).max(100).regex(/^[A-Za-z0-9]*$/).required(),
        name: Joi.string().min(6).max(100).required(),
        url: Joi.string().min(6).max(255).required(),
        comment: Joi.string().min(6).max(2048).required(),
    });

    return schema.validate(data);
}

module.exports.commentsValidation = commentsValidation;