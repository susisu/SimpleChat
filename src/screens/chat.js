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
    function updateMessages(message) {
        var messageElem = window.document.createElement("li");
        messageElem.innerText = message;
        chatMessages.appendChild(messageElem);
    }

    chat.on("userConnected", function (data) {
    });
    chat.on("userDisconnected", function (data) {
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
