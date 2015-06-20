/**
 * Bottle server start
 */

var irc = { module: require("irc"), servers: {}, clients: {} },
    util = require("util"),
    config = require("./config");

// set up github webhook listener
var gh_webhook = require('githubhook')({
        host: config.github.webhook.ip || "0.0.0.0",
        port: config.github.webhook.port || 8081,
        path: config.github.webhook.path || "push",
        secret: config.github.webhook.secret
    });

// Spin off IRC client instance
irc.clients.freenode = new irc.module.Client(config.irc.freenode.server, config.irc.freenode.nick, {
    userName: config.irc.freenode.userName || "_applaitbot_",
    realName: config.irc.freenode.realName || "Applait Bot",
    password: config.irc.freenode.password,
    port: config.irc.freenode.port || 6697,
    channels: config.irc.freenode.channels || [],
    secure: config.irc.freenode.secure || false,
    selfSigned: config.irc.freenode.selfSigned || true,
    certExpired: config.irc.freenode.certExpired || false,
    sasl: config.irc.freenode.sasl || false,
    autoRejoin: true,
    autoConnect: true,
    showErrors: true,
    retryDelay: 5000,
    debug: true
});

// Listen to push on github on branch master
gh_webhook.on('push', function (repo, ref, data) {
    util.log("GH push", data);
    irc.clients.freenode.say("#applait",
                             ["[Github]", data.pusher.name, "pushed", data.commits.length, "commits to",
                              data.repository.full_name, data.compare].join(" "));
});

// Listen to github push
gh_webhook.listen();
