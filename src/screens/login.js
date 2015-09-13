/*
 * copyright (c) 2015 Susisu
 */

"use strict";

function LoginScreen(chat) {
    var loginScreen = window.document.getElementById("login-screen");

    var hostFormHost = window.document.getElementById("host-form-host");
    hostFormHost.value = chat.localhost;
    var hostFormPort = window.document.getElementById("host-form-port");
    hostFormPort.value = chat.localport.toString();
    hostFormPort.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });
    var hostFormLogin = window.document.getElementById("host-form-login");
    hostFormLogin.addEventListener("click", function () {
        chat.loginLocal(parseInt(hostFormPort.value));
    });

    var clientFormHost = window.document.getElementById("client-form-host");
    clientFormHost.value = chat.host;
    clientFormHost.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });
    var clientFormPort = window.document.getElementById("client-form-port");
    clientFormPort.value = chat.port.toString();
    clientFormPort.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });
    var clientFormLogin = window.document.getElementById("client-form-login");
    clientFormLogin.addEventListener("click", function () {
        chat.login(clientFormHost.value, parseInt(clientFormPort.value));
    });

    return loginScreen;
}

module.exports = LoginScreen;
