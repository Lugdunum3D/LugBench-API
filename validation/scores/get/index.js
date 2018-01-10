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
        'userId': [
            Joi.string().length(28),
            Joi.array().items(Joi.string().length(28)),
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
