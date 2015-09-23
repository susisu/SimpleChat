/*
 * copyright (c) 2015 Susisu
 */

"use strict";

var app = require("app");
var Menu = require("menu");
var MenuItem = require("menu-item");

function ApplicationMenu(appInfo) {
    var template = [
        {
            "label"  : "File",
            "submenu": [
                {
                    "label": "Open Window",
                    "accelerator": "CmdOrCtrl+O",
                    "click": function () {
                        require("./window.js").openMainWindow(appInfo);
                    }
                },
                {
                    "label": "Close Window",
                    "accelerator": "CmdOrCtrl+W",
                    "click": function () {
                        require("./window.js").closeMainWindow();
                    }
                }
            ]
        },
        {
            "label"  : "Edit",
            "submenu": [
                {
                    "label"      : "Undo",
                    "accelerator": "CmdOrCtrl+Z",
                    "role"       : "undo"
                },
                {
                    "label"      : "Redo",
                    "accelerator": "Shift+CmdOrCtrl+Z",
                    "role"       : "redo"
                },
                {
                    "label"      : "Cut",
                    "accelerator": "CmdOrCtrl+X",
                    "role"       : "cut"
                },
                {
                    "label"      : "Copy",
                    "accelerator": "CmdOrCtrl+C",
                    "role"       : "copy"
                },
                {
                    "label"      : "Paste",
                    "accelerator": "CmdOrCtrl+V",
                    "role"       : "paste"
                },
                {
                    "label"      : "Select All",
                    "accelerator": "CmdOrCtrl+A",
                    "role"       : "selectall"
                }
            ]
        }
    ];
    if (process.platform === "darwin") {
        template.unshift({
            "label"  : appInfo.name,
            "submenu": [
                {
                    "label": "About " + appInfo.name,
                    "role" : "about"
                },
                {
                    "type": "separator"
                },
                {
                    "label"      : "Hide " + appInfo.name,
                    "accelerator": "Command+H",
                    "role"       : "hide"
                },
                {
                    "label"      : "Hide Others",
                    "accelerator": "Command+Shift+H",
                    "role"       : "hideothers"
                },
                {
                    "label": "Show All",
                    "role" : "unhide"
                },
                {
                    "type": "separator"
                },
                {
                    "label": "Quit",
                    "accelerator": "CmdOrCtrl+Q",
                    "click": function () {
                        app.quit();
                    }
                }
            ]
        });
    }
    return Menu.buildFromTemplate(template);
}

module.exports = ApplicationMenu;
