const {setupBotmaster} = require('./botmaster');
const BUILD = process.env.BUILD || 'local';
const env = require(`./environments/${BUILD}`);

const botmaster = setupBotmaster(env);

process.once('SIGUSR2', () => {
    botmaster.server.close( () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
