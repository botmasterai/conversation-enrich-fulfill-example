module.exports = {
    build: {
        watch: true,
        tunnel: true
    },
    port: 9000,
    subdomain: 'conversationenrichfulfillexample', // required for tunnel
    bots: {
        messenger: require('./parts/secrets').messengerSettings
    }
};
