/*
 * copyright (c) 2015 Susisu
 */

(function () {
    "use strict";

    var appInfo = JSON.parse(window.location.hash.substr(1));
    var chat = require(appInfo.bootScript)(appInfo);
})();
