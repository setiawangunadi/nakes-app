const Joi = require("joi");

const UserPayloadSchema = Joi.object({
    // role : Joi.number().required(), 
    email : Joi.string().required(), 
    phone : Joi.number().required(), 
    password : Joi.string().required(), 
    name : Joi.string().required(), 
    address : Joi.string().required(), 
    kelurahan : Joi.string().required(), 
    kecamatan : Joi.string().required(), 
    city : Joi.string().required(),
    province : Joi.string().required(), 
    postal_code : Joi.number().required(), 
    birthdate : Joi.date().required(), 
    gender : Joi.string().required(),
});

module.exports = { UserPayloadSchema };