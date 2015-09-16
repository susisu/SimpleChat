/*
 * copyright (c) 2015 Susisu
 */

"use strict";

function ChatScreen(chat) {
    var chatScreen = window.document.getElementById("chat-screen");

    var chatMembers = window.document.getElementById("chat-members");

    var chatMessageInput = window.document.getElementById("chat-message-input");
    chatMessageInput.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            var message = chatMessageInput.value;
            if (message !== "") {
                chat.sendMessage(message);
                chatMessageInput.value = "";
            }
        }
    });
    var chatMessageSend = window.document.getElementById("chat-message-send");
    chatMessageSend.addEventListener("click", function () {
        var message = chatMessageInput.value;
        chat.sendMessage(message);
        chatMessageInput.value = "";
    });

    var chatMessages = window.document.getElementById("chat-messages");

    var memberElems = [];
    function updateMembers() {
        var oldMemberElems = chatMembers.childNodes;
        var i;
        for (i = 0; i < oldMemberElems.length; i++) {
            chatMembers.removeChild(oldMemberElems[i]);
        }
        for (i = 0; i < memberElems.length; i++) {
            chatMembers.appendChild(memberElems[i]["elem"]);
        }
    }

    function updateMessages(message) {
        var messageElem = window.document.createElement("li");
        messageElem.innerText = message;
        chatMessages.appendChild(messageElem);
    }

    chat.on("userConnected", function (data) {
        var elem = window.document.createElement("li");
        elem.innerText = data["screen_name"];
        memberElems.push({
            "user_id": data["user_id"],
            "elem"   : elem
        });
        updateMembers();
    });
    chat.on("userDisconnected", function (data) {
        for (var i = 0; i < memberElems.length; i++) {
            if (memberElems[i]["user_id"] === data["user_id"]) {
                memberElems.splice(i, 1);
                break;
            }
        }
        updateMembers();
    });
    chat.on("serverMessage", function (data) {
        updateMessages(data["message"]);
    });
    chat.on("message", function (data) {
        updateMessages(data["screen_name"] + ": " + data["message"]);
    });

    return chatScreen;
}

module.exports = ChatScreen;
