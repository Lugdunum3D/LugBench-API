'use strict'

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
    'params': Joi.object().keys({
        'id': Joi.objectId().required(),
    }).required(),
}
