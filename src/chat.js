/*
 * copyright (c) 2015 Susisu
 */

"use strict";

var remote = require("remote");
var io = require("socket.io-client");
var EventEmitter = require("events");

function Chat(appInfo) {
    if (!(this instanceof Chat)) {
        return new Chat(appInfo);
    }

    EventEmitter.call(this);

    this.server = remote.require(appInfo.rootDir + "/src/server.js");
    this.screenName = "user";
    this.localhost = "localhost";
    this.localport = 8000;
    this.host = "localhost";
    this.port = 8000;
    this.loggedIn = false;
    this.socket = null;

    this.loginScreen = require("./screens/login.js")(this);
    this.chatScreen = require("./screens/chat.js")(this);

    this.switchToLoginScreen();
}

Chat.prototype = Object.create(EventEmitter.prototype);
Chat.prototype.constructor = Chat;

Chat.prototype.startServer = function () {
    this.server.start(this.localport);
};

Chat.prototype.stopServer = function () {
    this.server.stop();
};

Chat.prototype.login = function (screenName, host, port) {
    if (!this.loggedIn) {
        this.screenName = screenName;
        this.host = host;
        this.port = port;
        this.socket =
            io("http://" + this.host + ":" + this.port.toString(), {
                "multiplex": false
            });
        this.__setupSocket__();
    }
    this.switchToChatScreen();
    this.loggedIn = true;
};

Chat.prototype.__setupSocket__ = function () {
    var chat = this;
    this.socket.on("welcome", function (data) {
        chat.emit("welcome", data);
        chat.socket.emit("login", {
            "screen_name": chat.screenName
        });
    });
    this.socket.on("userConnected", function (data) {
        chat.emit("userConnected", data);
    });
    this.socket.on("userDisconnected", function (data) {
        chat.emit("userDisconnected", data);
    });
    this.socket.on("serverMessage", function (data) {
        chat.emit("serverMessage", data);
    });
    this.socket.on("message", function (data) {
        chat.emit("message", data);
    });
    this.socket.on("disconnect", function (data) {
        chat.emit("disconnect", data);
    });
};

Chat.prototype.sendMessage = function (message) {
    if (this.loggedIn && this.socket) {
        this.socket.emit("message", {
            "date"   : Date.now(),
            "message": message
        });
    }
};

Chat.prototype.logout = function () {
    this.socket.disconnect();
    this.socket.removeAllListeners();
    this.socket = null;
    this.loggedIn = false;
    this.switchToLoginScreen();
};

Chat.prototype.switchToLoginScreen = function () {
    this.loginScreen.style.display = "block";
    this.chatScreen.style.display = "none";
};

Chat.prototype.switchToChatScreen = function () {
    this.loginScreen.style.display = "none";
    this.chatScreen.style.display = "block";
};

module.exports = Chat;
