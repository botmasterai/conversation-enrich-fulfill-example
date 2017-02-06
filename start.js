const debug = require('debug')('app:start');

const BUILD = process.env.BUILD || 'local';
debug(`using build ${BUILD}`);

const env = require(`./environments/${BUILD}`);

const setupTunnel = env => {
    const localtunnel = require('localtunnel');
    const tunnel = localtunnel(env.port, {subdomain: env.subdomain}, (err, tunnel) => {
        if (err) {
            debug(err);
            setTimeout(setupTunnel, 1000);
        } else
            debug(`URL is ${tunnel.url}`);
    });

    tunnel.on('close', () => {
        setupTunnel();
    });
    tunnel.on('error', () => {
        setupTunnel();
    });
};

const setupNodemon = () => {
    const nodemon = require('nodemon');
    nodemon({
        script: './main.js',
        ignore: ['./start.js'],
        args: [BUILD],
        ext: 'js json'
    });
    nodemon.on('start', () => {
        debug('nodemon has started app');
    }).on('quit', () => {
        debug('nodedmon has quit');
        process.exit();
    }).on('restart', function(files) {
        debug('App restarted due to: ', files);
    });

};

if (env.build.tunnel)
    setupTunnel(env);

if (env.build.watch)
    setupNodemon(env);
else {
    require('./main');
}
