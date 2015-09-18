/*
 * copyright (c) 2015 Susisu
 */

"use strict";

function LoginScreen(chat) {
    var loginScreen = window.document.getElementById("login-screen");

    var serverFormPort = window.document.getElementById("server-form-port");
    serverFormPort.value = chat.localport.toString();
    serverFormPort.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });
    var serverFormToggleStart = window.document.getElementById("server-form-toggle-start");
    serverFormToggleStart.addEventListener("click", function () {
        chat.localport = parseInt(serverFormPort.value);
        if (chat.server.isRunning) {
            chat.stopServer();
        }
        else {
            chat.startServer();
        }
        reflectServerState();
    });

    function reflectServerState() {
        if (chat.server.isRunning) {
            serverFormPort.setAttribute("disabled", "");
            serverFormToggleStart.value = "Stop"
        }
        else {
            serverFormPort.removeAttribute("disabled");
            serverFormToggleStart.value = "Start";
        }
    }
    reflectServerState();

    var loginFormName = window.document.getElementById("login-form-name");
    loginFormName.value = chat.screenName;
    loginFormName.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });
    var loginFormHost = window.document.getElementById("login-form-host");
    loginFormHost.value = chat.host;
    loginFormHost.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });
    var loginFormPort = window.document.getElementById("login-form-port");
    loginFormPort.value = chat.port.toString();
    loginFormPort.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });
    var loginFormLogin = window.document.getElementById("login-form-login");
    loginFormLogin.addEventListener("click", function () {
        chat.login(loginFormName.value, loginFormHost.value, parseInt(loginFormPort.value));
    });

    return loginScreen;
}

module.exports = LoginScreen;
