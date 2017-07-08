'use strict'

const Joi = require('joi')

module.exports = {
    'params': Joi.object().keys({
        'name': Joi.string(),
        'os': Joi.string().valid('Windows', 'Linux', 'Android'),
        'driverVersion': Joi.number(),
        'vendorId': Joi.number(),
        'deviceId': Joi.number(),
    }).required(),
}
