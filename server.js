/**
 * Bottle server start
 */

var irc = { module: require("irc"), servers: {}, clients: {} };

var config = require("./config");

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
