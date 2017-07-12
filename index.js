'use strict'

/**
 * Module Dependencies
 */
const config                  = require('./config')
const restify                 = require('restify')
const paginate                = require('restify-paginate')
const winston                 = require('winston')
const bunyanWinston           = require('bunyan-winston-adapter')
const mongoose                = require('mongoose')
const autoload                = require('auto-load')
const validator               = require('restify-joi-middleware')
const errors                  = require('restify-errors')

const checkClientVersion      = require('./middlewares/checkClientVersion').checkClientVersion
const corsMiddleware          = require('./middlewares/cors').allowCrossDomain

const validateDevicesGet      = require('./validation/devices/get')
const validateDevicesGetId    = require('./validation/devices/get/id')
const validateDevicesPost     = require('./validation/devices/post')

const validateScoresGet       = require('./validation/scores/get')
const validateScoresGetId     = require('./validation/scores/get/id')
const validateScoresPost      = require('./validation/scores/post')

const validateScenariosGet    = require('./validation/scenarios/get')
const validateScenariosGetId  = require('./validation/scenarios/get/id')

/**
 * Logging
 */
const log = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            timestamp: () => {
                return new Date().toString()
            },
            json: true,
        }),
    ],
})

/**
 * Validation
 */
const joiOptions = {}
const joiOverrides = {
    errorResponder: (err, req, res, next) => {
        if (process.env.NODE_ENV !== 'test') {
            log.error(err)
        }
        return next(new errors.BadRequestError(err.body.data[0].message))
    },
}

/**
 * Initialize Server
 */
const server = restify.createServer({
    name    : config.name,
    version : config.version,
    log     : bunyanWinston.createAdapter(log),
})

/**
 * Middleware
 */
server.use(restify.jsonBodyParser({ mapParams: true }))
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser({ mapParams: true }))
server.use(restify.fullResponse())
server.use(paginate(server))
server.use(validator(joiOptions, joiOverrides))

/**
 * Error Handling
 */
server.on('uncaughtException', (req, res, route, err) => {
    log.error(err.stack)
    res.send(err)
})

const configRoutes = function(server, handlers) {
    // Devices
    server.get({ path: '/devices', validation: validateDevicesGet }, [corsMiddleware], handlers.devices.index.get)
    server.post({ path: '/devices', validation: validateDevicesPost }, [corsMiddleware, checkClientVersion], handlers.devices.index.post)

    server.get({ path: '/devices/:id', validation: validateDevicesGetId }, [corsMiddleware], handlers.devices.id.index.get)

    // Scores
    server.get({ path: '/scores', validation: validateScoresGet }, [corsMiddleware], handlers.scores.index.get)
    server.post({ path: '/scores', validation: validateScoresPost }, [corsMiddleware], handlers.scores.index.post)

    server.get({ path: '/scores/:id', validation: validateScoresGetId }, [corsMiddleware], handlers.scores.id.index.get)

    // Scenarios
    server.get({ path: '/scenarios', validation: validateScenariosGet }, [corsMiddleware], handlers.scenarios.index.get)

    server.get({ path: '/scenarios/:id', validation: validateScenariosGetId }, [corsMiddleware], handlers.scenarios.id.index.get)
}

/**
 * Lift Server, Connect to DB & Bind Routes
 */
server.listen(config.port, function() {

    mongoose.connection.on('error', function(err) {
        log.error('Mongoose default connection error: ' + err)
        process.exit(1)
    })

    mongoose.connection.on('open', function(err) {

        if (err) {
            log.error('Mongoose default connection error: ' + err)
            process.exit(1)
        }

        log.info(
            '%s v%s ready to accept connections on port %s in %s environment.',
            server.name,
            config.version,
            config.port,
            config.env
        )

        const handlers = autoload(__dirname + '/routes')
        configRoutes(server, handlers)
    })

    mongoose.connect(config.db.uri)
})

module.exports.log = log
module.exports.server = server
