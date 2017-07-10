'use strict'

const errors    = require('restify-errors')
const config    = require('../config')


module.exports.checkClientVersion = function(req, res, next) {
    if (!req.headers['user-agent']) {
        return next(new errors.UnauthorizedError('Bad user-agent'))
    }

    const elementToCheck = 'LugBench/' + config.clientVersion
    if (req.headers['user-agent'].indexOf(elementToCheck) === 0){
        return next()
    }
    return next(new errors.UnauthorizedError('Bad user-agent: missing Lugbench client version'))
}
