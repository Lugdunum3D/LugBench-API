module.exports = {
    server: {
        port: process.env.PORT || 5000
    },
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/lugbench_localdb',
    authToken: process.env.AUTH_TOKEN
};
