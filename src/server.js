/*
 * copyright (c) 2015 Susisu
 */

"use strict";

var http = require("http");

function Server() {
    this.isRunning = false;
    this.server = null;
    this.io = null;
}

Server.prototype.start = function (port) {
    if (this.isRunning) {
        return;
    }
    var self = this;
    this.server = http.createServer(function (request, response) {
        response.writeHead(200);
        response.end("It works!");
    });
    this.io = require("socket.io")(this.server);

    this.server.once("close", function () {
        self.io.removeListener("connection", onIOConnection);
        self.server = null;
        self.io = null;
    });

    this.io.on("connection", onIOConnection);

    var userId = 0;
    function onIOConnection(socket) {
        var screenName = "User " + userId.toString();
        var loggedIn = false;
        userId++;

        socket.emit("welcome", {
            "date"   : Date.now(),
            "message": "Welcome!"
        });
        
        socket.on("login", onLogin);
        function onLogin(data) {
            if (data["screen_name"]) {
                screenName = data["screen_name"];
            }
            loggedIn = true;
            self.io.emit("userConnected", {
                "date"       : Date.now(),
                "user_id"    : userId,
                "screen_name": screenName
            });
            self.io.emit("serverMessage", {
                "date"   : Date.now(),
                "message": "Welcome, " + screenName + "!"
            });
        }

        socket.on("message", onMessage);
        function onMessage(data) {
            if (loggedIn && data["message"]) {
                self.io.emit("message", {
                    "date"       : Date.now(),
                    "user_id"    : userId,
                    "screen_name": screenName,
                    "message"    : data["message"]
                });
            }
        }

        socket.once("disconnect", function () {
            self.io.emit("userDisconnected", {
                "date"       : Date.now(),
                "user_id"    : userId,
                "screen_name": screenName
            });
            self.io.emit("serverMessage", {
                "date"   : Date.now(),
                "message": "Bye, " + screenName + "!"
            });
            socket.removeListener("login", onLogin);
            socket.removeListener("message", onMessage);
        });
    }
    this.server.listen(port);
    this.isRunning = true;
};

Server.prototype.stop = function () {
    if (!this.isRunning) {
        return;
    }
    this.server.close();
    this.server.removeAllListeners();
    this.io.of("/").removeAllListeners();
    this.server = null;
    this.io = null;
    this.isRunning = false;
};

module.exports = new Server();
