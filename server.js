/**
 * Bottle server start
 */

var irc = require("irc");

var config = require("./config");

// Spin off IRC client instance
var irc_client = new irc.Client(config.irc.server, config.irc.nick, {
    userName: config.irc.userName || "_applaitbot_",
    realName: config.irc.realName || "Applait Bot",
    password: config.irc.password,
    port: config.irc.port || 6697,
    channels: config.irc.channels || [],
    secure: config.irc.secure || false,
    selfSigned: config.irc.selfSigned || true,
    certExpired: config.irc.certExpired || false,
    sasl: config.irc.sasl || false,
    autoRejoin: true,
    autoConnect: true,
    showErrors: true,
    retryDelay: 5000,
    debug: true
});
