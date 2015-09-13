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
        var screenName = "No Name " + userId.toString();
        userId++;

        io.emit("welcome", "Welcome!");
        
        socket.on("nameChange", onNameChange);
        function onNameChange(data) {
            if (data["screen_name"]) {
                screenName = data["screen_name"];
            }
        }

        socket.on("message", onMessage);
        function onMessage(data) {
            if (data["message"]) {
                io.emit("message", {
                    "screen_name": screenName,
                    "message"    : data["message"]
                });
            }
        }

        socket.once("disconnect", function () {
            socket.removeListener("nameChange", onNameChange);
            socket.removeListener("message", onMessage);
        });
    }

    return server;
}

module.exports = Server;
