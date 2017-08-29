'use strict'

const errors    = require('restify-errors')
const config    = require('../config')


module.exports.checkClientVersion = function(req, res, next) {
    if (!req.headers['x-lugbench-version']) {
        return next(new errors.UnauthorizedError('Bad x-lugbench-version: missing Lugbench client version'))
    }

    const elementToCheck = 'LugBench/' + config.clientVersion
    if (req.headers['x-lugbench-version'].indexOf(elementToCheck) === 0){
        return next()
    }
    return next(new errors.UnauthorizedError('Bad x-lugbench-version: error on Lugbench client version'))
}
