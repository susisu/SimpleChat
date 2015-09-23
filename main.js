/*
 * copyright (c) 2015 Susisu
 */

"use strict";

var app = require("app");
var packageInfo = require("./package.json");

var appInfo = {
    "name"      : packageInfo.name,
    "version"   : packageInfo.version,
    "rootDir"   : __dirname,
    "bootScript": __dirname + "/src/chat.js"
};

app.on("ready", function () {
    require("./src/browser/app.js")(appInfo);
});

app.on("window-all-closed", function () {
    if (process.platform != "darwin") {
        app.quit();
    }
});
