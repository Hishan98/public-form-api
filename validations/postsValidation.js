const Joi = require('@hapi/joi');

const postValidation = data => {
    const schema = Joi.object({
        user_name: Joi.string().min(6).max(50).required(),
        user_image_url: Joi.string().min(6).max(1024).required(),
        post_media: Joi.string().max(1024).default(' '),
        caption: Joi.string().min(6).max(2048).required(),
    });

    return schema.validate(data);
}

module.exports.postValidation = postValidation;