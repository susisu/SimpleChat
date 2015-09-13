/*
 * copyright (c) 2015 Susisu
 */

"use strict";

function Chat(appInfo) {
    if (!(this instanceof Chat)) {
        return new Chat(appInfo);
    }
    console.log("success!");
}

module.exports = Chat;
