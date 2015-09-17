/*
 * copyright (c) 2015 Susisu
 */

"use strict";

var http = require("http");

function Server() {
    var server = http.createServer(function (request, response) {
        response.writeHead(200);
        response.end("It works!");
    });
    var io = require("socket.io")(server);

    server.once("close", function () {
        io.removeListener("connection", onIOConnection);
        server = null;
        io = null;
    });

    io.on("connection", onIOConnection);

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
            io.emit("userConnected", {
                "date"       : Date.now(),
                "user_id"    : userId,
                "screen_name": screenName
            });
            io.emit("serverMessage", {
                "date"   : Date.now(),
                "message": "Welcome, " + screenName + "!"
            });
        }

        socket.on("message", onMessage);
        function onMessage(data) {
            if (loggedIn && data["message"]) {
                io.emit("message", {
                    "date"       : Date.now(),
                    "user_id"    : userId,
                    "screen_name": screenName,
                    "message"    : data["message"]
                });
            }
        }

        socket.once("disconnect", function () {
            io.emit("userDisconnected", {
                "date"       : Date.now(),
                "user_id"    : userId,
                "screen_name": screenName
            });
            io.emit("serverMessage", {
                "date"   : Date.now(),
                "message": "Bye, " + screenName + "!"
            });
            socket.removeListener("login", onLogin);
            socket.removeListener("message", onMessage);
        });
    }

    return server;
}

module.exports = Server;
