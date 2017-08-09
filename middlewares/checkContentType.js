'use strict'

const errors    = require('restify-errors')


module.exports.checkContentType = function(req, res, next) {
    const contentType = req.headers['content-type'];
    if (!contentType || contentType.indexOf('application/json') !== 0) {
        return next(new errors.UnauthorizedError('Bad content-type'))
    }
    return next()
}
