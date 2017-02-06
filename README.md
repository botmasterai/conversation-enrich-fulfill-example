# IBM Conversation + Botmaster Enrich Fulfill Tutorial

Example of using botmaster with IBM conversation with enrich and fulfill


```bash
npm init
```

Accept all the defaults. Next we install our dependencies. Let's start with botmaster for now.

```bash
npm i botmaster -S
```

If you are unfamiliar with npm This means install botmaster and save it as a dependency.

To make development a lot quicker we are also going to install two tools for development:
```bash
npm i nodemon localtunnel -D
```

Nodemon is for restarting botmaster on a code change. Localtunnel is for allowing you to run botmaster locally even when you are developing with webhooks which require an incoming connection. You can read more about localtunnel here: http://botmasterai.com/getting-started/webhooks/

Please follow the directions on how to setup Facebook using the botmaster guide: http://botmasterai.com/getting-started/messenger-setup/#getting-your-credentials

Have your credentials? Great. We are going to have a lot of credentials so lets centralize all of them in  a file called "environments/parts/secrets.js"


```js
const messengerSettings = {
    credentials: {
        verifyToken: 'a pretty good secret you will have to tell facebook about',
        pageToken: 'a really long token that facebook will give you',
        fbAppSecret: 'another facebook provided secret'
    },
    webhookEndpoint: '/some-unguessable-endpoint'
};

module.exports = {
    messengerSettings
};
```

Next lets consume these secrets in a file dedicated for our development environment. Call this file "environments/local.js".

Here we import the secrets and set some additional variables like port and some options for the runtime build:

```js
module.exports = {
    build: {
        watch: true, // use nodemon
        tunnel: true // use localtunnell
    },
    port: 9000,
    bots: {
        messenger: require('./secrets').messengerSettings
    }
};
```

Now setup botmaster in "botmaster/index.js"
```js
const Botmaster = require('botmaster');
const debug = require('debug')('app:botmaster');


const setupBotmaster = env => {
    const botmaster = new Botmaster({port: env.port});

    if (env.bots.messenger) {
        const messengerBot = new Botmaster.botTypes.MessengerBot(env.bots.messenger);
        botmaster.addBot(messengerBot);
    }

    botmaster.on('update', (bot, update) => {
        bot.reply(update, 'Hello world!');
    });

    debug('botmaster setup');
};

module.exports = {setupBotmaster};
```

We are using a utility called "debug" to help us know when botmaster is setup. Install it as follows:

```js
npm i debug -S
```

You will also want to set your environment so that you see them. Do
```bash
export DEBUG='app:*'
```

Botmaster and other libraries like express also use debug. You can explore them by doing

```bash
export DEBUG='app:*,botmaster:*'
```

Finally, copy the `start.js` and `main.js` from github here: (TODO)
These two in conjunction restart the server on any changes to your source code (except start.js).

All that remains is to add your start script in package.json:

```json
"scripts": {
    "start": "node ./start.js",
}
```

Now run

```bash
npm run
```

```bash
botmaster-fulfill botmaster-fulfill-actions botmaster-enrich botmaster-session-ware  watson-developer-cloud request-promise -S
```
