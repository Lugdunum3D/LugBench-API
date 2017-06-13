'use strict'

module.exports = {
    name: 'API',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    base_url: process.env.BASE_URL || 'http://localhost:5000',
    db: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/lugbench',
    },
}
