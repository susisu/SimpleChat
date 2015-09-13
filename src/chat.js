/*
 * copyright (c) 2015 Susisu
 */

"use strict";

function Chat(appInfo) {
    if (!(this instanceof Chat)) {
        return new Chat(appInfo);
    }

    this.server = null;
    this.localhost = "localhost";
    this.localport = 8000;
    this.host = "";
    this.port = 8000;
    this.loggedIn = false;

    this.loginScreen = require("./screens/login.js")(this);
    this.chatScreen = require("./screens/chat.js")(this);

    this.switchToLoginScreen();
}

Chat.prototype.startServer = function () {
    if (!this.server) {
        this.server = require("./server.js")();
        this.server.listen(this.localport);
    }
};

Chat.prototype.stopServer = function () {
    if (this.server) {
        this.server.close();
    }
};

Chat.prototype.login = function (host, port) {
    if (!this.loggedIn) {
        this.host = host;
        this.port = port;
    }
    this.switchToChatScreen();
    this.loggedIn = true;
};

Chat.prototype.loginLocal = function (localport) {
    if (!this.loggedIn && !this.server) {
        this.localport = localport;
        this.startServer();
    }
    this.switchToChatScreen();
    this.loggedIn = true;
};

Chat.prototype.logout = function () {
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
