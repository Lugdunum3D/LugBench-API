'use strict'

const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
    body: Joi.object().keys({
        '_id': Joi.objectId(),
        'device': Joi.objectId().required(),
        'scenario':  Joi.objectId().required(),
        'nbFrames': Joi.number().required(),
        'averageFps': Joi.number().required(),
        'date': Joi.date().iso(),
        'userId': Joi.string().length(28),
    }).required(),
}
