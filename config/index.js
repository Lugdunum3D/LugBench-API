module.exports = {
    server: {
        port: process.env.PORT || 5000
    },
    mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/lugbench_localdb',
    auth_token: process.env.AUTH_TOKEN
};
