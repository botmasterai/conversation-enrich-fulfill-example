const Botmaster = require('botmaster');
const debug = require('debug')('app:botmaster');

const setupBotmaster = env => {
    const botmaster = new Botmaster({port: env.port});

    if (env.bots.messenger) {
        const messengerBot = new Botmaster.botTypes.MessengerBot(env.bots.messenger);
        botmaster.addBot(messengerBot);
    }

    botmaster.on('update', (bot, update) => {
        debug(`got an update on ${bot.type}: ${update.message.text}`);
        bot.reply(update, 'Hello world!');
    });

    debug('botmaster setup');
    return botmaster;
};

module.exports = {setupBotmaster};
