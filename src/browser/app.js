/*
 * copyright (c) 2015 Susisu
 */

"use strict";

var BrowserWindow = require("browser-window");

var mainWindow = null;

function Application(appInfo) {
    if (!(this instanceof Application)) {
        return new Application(appInfo);
    }
    openMainWindow(appInfo);
}

function openMainWindow(appInfo) {
    if (!mainWindow) {
        mainWindow = new BrowserWindow({ "width": 480, "height": 640 });
        mainWindow.once("closed", function () {
            mainWindow = null;
        });
        mainWindow.loadUrl("file://" + appInfo.rootDir + "/static/index.html#" + JSON.stringify(appInfo));
    }
}

module.exports = Application;
