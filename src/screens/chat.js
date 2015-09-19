/*
 * copyright (c) 2015 Susisu
 */

"use strict";

function ChatScreen(chat) {
    var chatScreen = window.document.getElementById("chat-screen");

    var chatMembers = window.document.getElementById("chat-members");

    var chatExit = window.document.getElementById("chat-logout");
    chatExit.addEventListener("click", function () {
        chat.logout();
    });

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
        while (chatMembers.firstChild) {
            chatMembers.removeChild(chatMembers.firstChild);
        }
        for (var i = 0; i < memberElems.length; i++) {
            chatMembers.appendChild(memberElems[i]["elem"]);
        }
    }

    function updateMessages(data) {
        var name = window.document.createElement("p");
        name.className = "chat-message-name";
        name.innerText = data["screen_name"];
        var text = window.document.createElement("p");
        text.className = "chat-message-text";
        text.innerText = data["message"];
        var date = window.document.createElement("p");
        date.className = "chat-message-date";
        date.innerText = new Date(data["date"]).toLocaleString();
        var messageElem = window.document.createElement("li");
        messageElem.className = "chat-message";
        messageElem.appendChild(name);
        messageElem.appendChild(text);
        messageElem.appendChild(date);
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
        updateMessages(data);
    });
    chat.on("message", function (data) {
        updateMessages(data);
    });

    return chatScreen;
}

module.exports = ChatScreen;
