/*
 * copyright (c) 2015 Susisu
 */

(function () {
    "use strict";
    window.addEventListener("load", function () {
        var appInfo = JSON.parse(decodeURIComponent(window.location.hash.substr(1)));
        var chat = require(appInfo.bootScript)(appInfo);
    });
})();
