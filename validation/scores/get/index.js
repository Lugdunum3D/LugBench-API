'use strict'

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
    'params': Joi.object().keys({
        'device': [
            Joi.objectId(),
            Joi.array().items(Joi.objectId()),
        ],
        'scenario': [
            Joi.objectId(),
            Joi.array().items(Joi.objectId()),
        ],
        'group': [
            Joi.string().valid('device', 'scenario'),
            Joi.array().items(Joi.string().valid('device', 'scenario')),
        ],
        'populate': [
            Joi.string().valid('device', 'scenario'),
            Joi.array().items(Joi.string().valid('device', 'scenario')),
        ],
        'match': [
            Joi.string().valid('device', 'scenario'),
        ],
        'os': [
            Joi.string().valid('Windows', 'Linux', 'Android'),
        ],
    }).required(),
}
