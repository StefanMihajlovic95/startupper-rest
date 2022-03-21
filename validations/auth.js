const Joi = require('joi');

const loginParam = {
    body: {
        email: Joi.string().email({minDomainAtoms: 2}).required(),
        password: Joi.string().required()
    }
};

const projectParam = {
    body: {
        name: Joi.string(),
        description: Joi.string()
    }
};

module.exports = {loginParam, projectParam};
