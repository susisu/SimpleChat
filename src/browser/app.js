/*
 * copyright (c) 2015 Susisu
 */

"use strict";

var Menu = require("menu");

function Application(appInfo) {
    if (!(this instanceof Application)) {
        return new Application(appInfo);
    }
    Menu.setApplicationMenu(require("./menu.js")(appInfo));
    require("./window.js").openMainWindow(appInfo);
}

module.exports = Application;
